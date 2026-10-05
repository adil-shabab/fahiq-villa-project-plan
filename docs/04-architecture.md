# 04 — Architecture

## 4.1 High-level

```
                         ┌──────────────────────────────────────────────┐
                         │                Clients                       │
                         │                                              │
  Public visitor  ─────► │  Public Website (React SPA / SSR)             │
  Tenant          ─────► │  Tenant Portal (React SPA)                    │
  Staff / Owner   ─────► │  Admin Dashboard (React SPA)                  │
                         └───────────────┬──────────────────────────────┘
                                         │ HTTPS / JSON (REST)
                                         ▼
                         ┌──────────────────────────────────────────────┐
                         │         Django + Django REST Framework        │
                         │  Auth · RBAC · Domain services · Serializers  │
                         │  OpenAPI (drf-spectacular)                    │
                         └───┬───────────────┬───────────────┬──────────┘
                             │               │               │
                 ┌───────────▼───┐   ┌───────▼───────┐   ┌────▼───────────┐
                 │  PostgreSQL   │   │  Redis        │   │ Object storage │
                 │  (system of   │   │  cache +      │   │ S3 / R2        │
                 │   record)     │   │  Celery broker│   │ (media, PDFs)  │
                 └───────────────┘   └───────┬───────┘   └────────────────┘
                                             │
                                   ┌─────────▼───────────┐
                                   │ Celery workers      │
                                   │ Celery Beat (cron)  │
                                   │  · invoice run      │
                                   │  · reminder run     │
                                   │  · escalations      │
                                   │  · PDF generation   │
                                   │  · webhook retries  │
                                   └─────────┬───────────┘
                                             │ outbound
      ┌──────────────────────────────────────┼───────────────────────────────────┐
      ▼                 ▼                     ▼                ▼                   ▼
 WhatsApp BSP      Razorpay            SMS gateway       Email (SES/       e-sign (Digio/
 (AiSensy/Gupshup/ (Payment Links,     (MSG91/Twilio)    SendGrid/SMTP)    Leegality)
 Twilio/Interakt)  UPI Autopay,
                   Payouts, Webhooks)

 Inbound webhooks (Razorpay payment.captured, BSP delivery + inbound messages,
 e-sign completed) → Django webhook endpoints → queued handlers.
```

## 4.2 Application components

| Component | Tech | Responsibility |
|---|---|---|
| **API service** | Django 5, DRF, Gunicorn/Uvicorn | All business logic, auth, REST API, webhook receivers, admin |
| **Worker** | Celery | Async & scheduled jobs (billing, reminders, PDFs, notifications, webhook processing, exports) |
| **Scheduler** | Celery Beat (DB-backed schedule) | Fires daily/periodic jobs |
| **Admin dashboard** | React + Vite + TS | Staff UI |
| **Public website** | React (SSR/SSG preferred for SEO — Next.js or Vite + prerender) | Marketing + listings + enquiry/booking |
| **Tenant portal** | React + Vite + TS | Tenant UI (can share codebase/design system with dashboard) |
| **PostgreSQL** | Managed Postgres 16 | System of record |
| **Redis** | Managed Redis | Cache, Celery broker + result backend, rate-limit counters, OTP store |
| **Object storage** | S3 or Cloudflare R2 via `django-storages` | Photos, videos, generated PDFs, KYC docs (private buckets, signed URLs) |

> Frontend split: the **public website** benefits from SSR/SSG for SEO, so it may run as a
> small Next.js app or a prerendered Vite build. The **dashboard** and **tenant portal** are
> plain client-rendered React SPAs behind auth. All three talk to the same Django API.

## 4.3 Backend module layout (Django apps)

```
backend/
  config/                # settings (split: base/dev/prod), urls, celery, asgi/wsgi
  apps/
    accounts/            # staff users, roles, permissions, 2FA, property assignment
    organization/        # business profile, settings, integration credentials (encrypted)
    properties/          # property, block, floor, unit, bed, amenity, media
    catalog/             # public-facing read models, search, filters, SEO pages
    leads/               # enquiries, pipeline, visits, activities
    tenants/             # tenant persons, KYC documents, co-tenants, guarantors
    tenancies/           # lease/tenancy, terms, escalation, renewal, notice, move-out, transfer
    agreements/          # templates, generation, e-sign integration, versions
    inspections/         # move-in/out inventory, condition photos
    meters/              # meter definitions, readings, photos, consumption
    billing/             # charge types, recurring charges, invoices, line items,
                         # proration, late fees, credit notes, numbering
    payments/            # razorpay client, payment links, autopay mandates, webhooks,
                         # offline payments, receipts, refunds, payouts, reconciliation
    ledger/              # tenant ledger, deposit ledger, aging, statements
    collections/         # reminder cadence engine, dunning, promise-to-pay, queues
    maintenance/         # tickets, SLA, vendors, preventive schedules, asset register
    messaging/           # notification templates, channel router, whatsapp BSP adapter,
                         # sms/email adapters, delivery logs, inbound handler, broadcasts
    finance/             # expenses, categories, vendors, P&L, owner payouts, exports
    reports/             # rent roll, occupancy, collections, aging, funnel, exports
    documents/           # document vault, PDF rendering, signed URLs
    audit/               # audit log, change requests / approvals
    common/              # base models, money helpers, phone helpers, pagination, permissions
```

Domain logic lives in `services.py` per app (thin views, thin models, fat services).
Scheduled/async entry points in `tasks.py` per app.

## 4.4 Key scheduled jobs (Celery Beat)

| Job | Schedule | What it does |
|---|---|---|
| `billing.run_daily_invoicing` | 06:00 IST daily | For every active tenancy whose due day == today (or configured lead days), build the invoice: rent + recurring + latest electricity/water from meter readings + carry-forward + taxes; render PDF; queue "invoice" notification. Idempotent per (tenancy, billing-period). |
| `collections.run_reminders` | 08:00 IST daily | For every unpaid/partially-paid invoice, evaluate the cadence rule against due date and send the appropriate reminder template with its payment link; skip if paid, opted-out, or within quiet hours; respect promise-to-pay dates. |
| `billing.apply_late_fees` | 09:00 IST daily | After grace period, add a late-fee line/charge per policy (once per invoice per period). |
| `tenancies.escalate_rent` | 02:00 IST daily | Apply rent escalation on tenancies hitting their anniversary. |
| `tenancies.expiry_reminders` | 07:00 IST daily | 60/30/7-day agreement-expiry reminders to tenant + staff alert. |
| `meters.reading_reminders` | 10:00 IST daily | Alert staff for units missing a current-month reading N days before billing. |
| `maintenance.preventive_due` | 07:30 IST daily | Create/notify preventive-maintenance tasks that are due. |
| `payments.reconcile_pending` | every 30 min | Poll Razorpay for links still "created" past webhook grace; sync status. |
| `messaging.retry_failed` | every 15 min | Retry failed WhatsApp/SMS/email sends with backoff; fall back channel after N tries. |
| `reports.email_digests` | Mon 08:00 / 1st 08:00 | Weekly collections + monthly P&L email to owner. |
| `common.nightly_backup_check` | 01:00 IST | Verify last DB + media backup succeeded; alert if not. |

All jobs are **idempotent** and guarded by a Redis lock so overlapping runs are safe.

## 4.5 Integrations

| Integration | Purpose | Direction | Notes |
|---|---|---|---|
| **WhatsApp BSP** (AiSensy / Gupshup / Twilio / Interakt) | Send template messages; receive delivery status & inbound replies | out + in (webhook) | One `WhatsAppProvider` interface; concrete adapter chosen by `settings.WHATSAPP_PROVIDER`. Templates managed on the BSP; local registry maps event → template name + variable order. |
| **Razorpay** | Payment Links per invoice, UPI Autopay mandates, Payouts (refunds/owner), webhooks | out + in (webhook) | Verify webhook signature; idempotency by `razorpay_event_id`; store raw payload. |
| **SMS** (MSG91 / Twilio) | OTP + fallback notifications | out | |
| **Email** (SES / SendGrid / SMTP) | Invoices, receipts, digests, staff alerts | out | |
| **e-sign** (Digio / Leegality / Aadhaar eSign) | Rental-agreement signing | out + in (webhook) | Optional; manual signed-scan upload always available. |
| **Maps** (Google Maps / Mapbox) | Geocoding on property save, map view on site | out | |
| **Sentry** | Error monitoring (API + frontends) | out | |
| **Object storage** (S3 / R2) | Media & documents | out | Private by default; signed URLs; separate stricter bucket/prefix for KYC. |
| **Push** (Firebase Cloud Messaging) — P3 | Portal/app push notifications | out | |

### WhatsApp provider adapter (interface sketch)

```python
class WhatsAppProvider(Protocol):
    def send_template(self, *, to: str, template: str, language: str,
                      variables: list[str], media_url: str | None = None
                      ) -> ProviderMessageResult: ...
    def parse_status_webhook(self, payload: dict) -> list[DeliveryStatusEvent]: ...
    def parse_inbound_webhook(self, payload: dict) -> list[InboundMessage]: ...
```

Adapters: `AiSensyProvider`, `GupshupProvider`, `TwilioWhatsAppProvider`,
`InteraktProvider`. Switching provider = config change + re-mapping template names; no
domain code changes.

## 4.6 Data & consistency notes

- **Money**: `DecimalField(max_digits=12, decimal_places=2)`, currency fixed to INR in v1
  but stored explicitly; all arithmetic in `Decimal`; rounding rule documented per charge.
- **Invoices are immutable** once issued; corrections via credit note / adjustment.
- **Ledger** is append-only; balances are derived (and cached) from ledger entries.
- **Idempotency keys** on invoice generation (`tenancy_id + period`), payments
  (`razorpay_payment_id`), and outbound messages (`event_id`).
- **Soft-delete** (`is_active` / `deleted_at`) for tenants, units, tenancies — never hard
  delete records with financial history.
- Timezone `Asia/Kolkata`; store UTC, present IST.

## 4.7 Environments & deployment

| Env | Purpose |
|---|---|
| `local` | Docker Compose: api, worker, beat, postgres, redis, mailhog, minio |
| `staging` | Mirrors prod; test BSP/Razorpay keys; seeded demo data |
| `production` | Managed Postgres + Redis; object storage; HTTPS; backups; monitoring |

- **Containers**: one image for `api` / `worker` / `beat` (different command).
- **Reverse proxy**: Nginx (TLS, static, media passthrough to signed URLs).
- **Hosting options**: Render / Railway / Fly.io / AWS ECS / DigitalOcean App Platform for
  the Django + worker + beat; managed Postgres + Redis; S3/R2 for storage. Frontends on
  Vercel/Netlify (public site) and static hosting/CDN (dashboard, portal).
- **CI/CD**: lint (ruff) → type-check (mypy) → tests (pytest) → build images → migrate →
  deploy; frontend: eslint → tsc → vitest → build → deploy. Preview env per PR optional.
- **Migrations** run as a release step; zero-downtime pattern (add nullable → backfill →
  enforce).
- **Config** via environment variables; secrets in the platform secret store; integration
  credentials that must be user-editable are stored **encrypted at rest** in the DB
  (`organization.integration_credentials`, Fernet/KMS).

## 4.8 Observability

- Structured JSON logs with request id / task id correlation.
- Sentry for exceptions (API + both frontends) with release tagging.
- Metrics: invoice run success, messages sent/failed, reminder queue depth, webhook
  latency, payment reconciliation lag, Celery queue length.
- Uptime check on `/healthz` (DB + Redis + storage ping) and on the reminder/billing jobs
  ("last successful run" freshness alert).
- Audit log queryable in the dashboard.
