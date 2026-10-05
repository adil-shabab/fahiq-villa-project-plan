# 20 — Backend Implementation Plan & Architecture

> Status: **proposed** — to be reviewed before the first line of backend code.
> Builds on [04 Architecture](04-architecture.md), [05 Data Model](05-data-model.md),
> [06 API Design](06-api-design.md), [12 Tech Stack](12-tech-stack.md) and
> [14 Roadmap](14-roadmap.md). Those docs define *what* to build; this one defines *how the
> backend is structured internally, which decisions are locked, where the already-built
> dashboard disagrees with the spec, and in what order to build it*.

---

## 20.1 Where we are

| Asset | State |
|---|---|
| Product spec (docs 01–15) | Complete. Feature catalogue, roles, data model, API surface, WhatsApp + billing rules, NFRs, roadmap. |
| Admin dashboard (`frontend/apps/dashboard`) | **UI built for 16 modules** (React 19 + Vite + Tailwind 4 + Recharts), all driven by mock data in `src/data/*.ts`. No API layer, no auth, no login page yet. |
| Tenant portal / public website | Design prompts only (docs 16–19). No code. |
| Backend | Nothing yet. |

**What this means for the backend:** the dashboard is effectively a **finished UI contract**.
The fastest path to a working product is to build the API **module by module in the order
the dashboard needs it**, replacing one `src/data/*.ts` file at a time with real queries.
Each sprint below ends with one or more dashboard pages wired to live data.

---

## 20.2 Architecture at a glance

**Style: a modular monolith.** One Django codebase and one deployable image, run as three
processes (`api`, `worker`, `beat`). The code is split into domain apps with **enforced
dependency direction**. We get microservice-like boundaries without the operational cost,
which suits a single-owner business of ≤ 2,000 units.

```
                ┌─────────────── clients ───────────────┐
                │ Dashboard SPA · Tenant Portal · Website│
                └───────────────────┬────────────────────┘
                                    │ REST/JSON (camelCase), JWT
┌───────────────────────────────────▼────────────────────────────────────────┐
│ API process (Django + DRF, gunicorn)                                       │
│                                                                            │
│  api layer      views / serializers / filters / permissions  (thin)        │
│       │                                                                    │
│  domain layer   services.py (writes, transactional)                        │
│                 selectors.py (reads, scoped querysets)                     │
│                 state machines · policies · calculators (pure functions)   │
│       │                                                                    │
│  data layer     models.py (fields, constraints, no business logic)         │
│       │                                                                    │
│  infra layer    integrations/ (Razorpay, BSP, SMS, email, e-sign, S3)      │
│                 behind Protocol interfaces + fake/console adapters         │
│                                                                            │
│  cross-cutting  outbox (DomainEvent) · audit · numbering · scoping · money │
└──────────┬───────────────────────┬───────────────────────┬─────────────────┘
           │                       │                       │
     PostgreSQL 16            Redis 7                 S3 / R2
     (system of record,      (Celery broker, cache,  (media, PDFs, KYC in a
      outbox, jobs)           locks, OTP, counters)   separate private bucket)
           │                       │
┌──────────▼───────────────────────▼─────────────┐
│ worker (Celery, queues: default · billing ·    │◄── beat (django-celery-beat)
│ messaging · pdf · exports · webhooks)          │
└──────────┬─────────────────────────────────────┘
           ▼
 Razorpay · WhatsApp BSP · SMS · Email · e-sign · Maps · Sentry
```

### Request & side-effect flow (the one pattern to internalise)

```
HTTP POST /invoices/{id}/issue
  └─ view: authenticate → authorise (permission + property scope) → validate
      └─ services.issue_invoice(invoice, actor)            ← one DB transaction
           ├─ state machine: draft → issued
           ├─ numbering.next("invoice", fy)                ← gap-free, row-locked
           ├─ ledger.post_charge(...)                      ← append-only entries
           ├─ audit.record(actor, "invoice.issued", before, after)
           └─ outbox.emit("invoice.issued", {...})         ← row in same transaction
  ← 200 response
after commit: outbox relay → Celery tasks
           ├─ pdf.render_invoice
           ├─ payments.create_payment_link
           ├─ messaging.notify("invoice_issued", ...)      ← WhatsApp + email
           └─ activity feed / in-app notification for staff
```

Nothing that talks to the outside world runs inside the request transaction. If Razorpay
or the BSP is down, the invoice still exists. The side effects retry from the outbox.

---

## 20.3 Locked decisions (ADR summary)

Each row becomes a short ADR in `docs/adr/` when we scaffold. The ones marked ⚠ change or
clarify the current spec.

| # | Decision | Choice | Why / notes |
|---|---|---|---|
| 001 | Architecture style | Modular monolith, Django apps with layered imports | Single team, single owner; transactions across billing/ledger/payments matter more than independent scaling. |
| 002 | Code organisation inside an app | `models` / `selectors` / `services` / `api/` / `tasks` / `events` (HackSoft-style) | Views stay thin, business rules become unit-testable, Celery and webhooks reuse the same services. |
| 003 | Primary keys | **UUIDv7** PKs + separate human codes (`INV-2026-0582`, `T-204`, `LD-0091`) | UUIDv7 is time-ordered, so it stays B-tree friendly. Human codes are what staff and tenants quote. |
| 004 | Multi-tenancy | Every business table has `organization_id` from day 1; one org in v1 | Matches doc 05. An `OrgScopedModel` base and manager make filtering automatic. |
| 005 ⚠ | API casing | **camelCase on the wire** (`djangorestframework-camel-case`), snake_case in Python | The dashboard is already written in camelCase. Not in the spec. |
| 006 ⚠ | Enum values | Wire values are **snake_case codes** (`partially_paid`); the frontend maps codes to labels | The mock data uses display labels (`"Partially Paid"`). Labels belong to the UI and to i18n (Hindi in P3). |
| 007 ⚠ | Derived statuses | `overdue` (invoice) and `ending_soon` (tenancy) are **computed, not stored**. The API returns both `status` and `displayStatus`. | The UI shows `Overdue` as a status, but storing it would need a nightly mutation and could drift. |
| 008 | Money | `Decimal(12,2)`, INR, `ROUND_HALF_UP` to the paisa per line; invoice total rounded to the rupee (configurable) | Matches doc 04 §4.6. One `money.py` helper; floats banned by a lint rule. |
| 009 ⚠ | Ledger | **One `LedgerEntry` table with an `account` column** (`rent_receivable` \| `deposit_liability`) instead of two tables | Same append-only semantics as doc 05 with one code path. The balance is materialised on `Tenancy` under a row lock. |
| 010 | Numbering | `NumberSeries(org, kind, fiscal_year, prefix, next_value)` allocated with `SELECT … FOR UPDATE` inside the issuing transaction | Gap-free invoice, receipt and credit-note numbers. Drafts get no number. |
| 011 | Side effects | **Transactional outbox** (`DomainEvent` table) + relay task; handlers are idempotent | Guarantees "no WhatsApp for an invoice that rolled back" and "no invoice without its WhatsApp". Also feeds the activity feed and notifications panel. |
| 012 | State machines | Small in-house `transition(obj, to, actor, reason)` helper per model, with an explicit allowed-transitions map | Units, leads, onboarding, tenancies, invoices, payments and tickets all have lifecycles. One helper keeps audit and events consistent. No extra dependency. |
| 013 ⚠ | Users | **One `User` model** with `kind = staff \| tenant`. Staff log in with email + password + TOTP. Tenants log in with phone + OTP and link to `Tenant`. | One auth stack, one JWT pipeline, one audit actor type. |
| 014 | Tokens | SimpleJWT: 15-min access token held in memory; rotating refresh token in an **httpOnly, Secure, SameSite=Lax cookie** with reuse detection | Per doc 13. Requires the dashboard and API on the same site (e.g. `app.` + `api.` subdomains). |
| 015 ⚠ | Roles | **DB-backed `Role` → `Permission` codes**, seeded with the doc-03 defaults; per-user overrides (`waiver_limit` etc.) | The dashboard has an *Edit Role* modal and a roles matrix, so roles must be editable, not hard-coded Groups. |
| 016 ⚠ | Property scope | Optional `X-Property-Id` request header set by the dashboard's property switcher, **intersected** with the user's assigned properties in every selector | One global switcher in the UI. The server never trusts the header beyond the user's grant. |
| 017 | File uploads | Direct-to-S3 **presigned PUT** → `FileObject` row → attach by id. KYC goes to its own bucket with 2–5-min download URLs. | Keeps large files off the API. |
| 018 | PDFs | WeasyPrint HTML templates, rendered on the `pdf` queue; output stored as a `FileObject` | Invoices, receipts, statements, agreements, settlements. |
| 019 | Integrations | `Protocol` interface + real adapter + **fake/console adapter** per provider, chosen by settings | Local dev and tests never hit real WhatsApp or Razorpay. |
| 020 | Long operations | Generic `Job` model (`queued/running/succeeded/failed`, progress, result file) behind `GET /jobs/{id}` | Billing runs, exports, imports, broadcasts. |
| 021 | API docs & client | drf-spectacular → `openapi.json` committed → **orval** generates TanStack Query hooks into `frontend/packages/api-client` | A schema diff in CI catches breaking changes. |
| 022 | Python tooling | Python 3.12, **uv** for dependencies, ruff + mypy (django-stubs), pytest | uv is fast and uses a lockfile. |

---

## 20.4 Backend repository layout

```
backend/
  pyproject.toml            # uv-managed; ruff, mypy, pytest config
  uv.lock
  manage.py
  Dockerfile                # one image: api | worker | beat via CMD
  config/
    settings/  base.py  dev.py  test.py  prod.py
    urls.py                 # /api/v1/, /webhooks/, /healthz, /admin-<secret>/
    celery.py               # queues + beat schedule bootstrap
    asgi.py  wsgi.py
  apps/
    common/                 # see 20.5 — the shared kernel
    accounts/  organization/  audit/
    properties/  listings/  leads/
    tenants/  onboarding/  tenancies/  agreements/  inspections/  documents/
    meters/  billing/  ledger/  payments/  collections/
    messaging/  notifications/
    maintenance/  finance/  reports/  dashboard/
    portal/                 # tenant-facing API (/me/*), composes other apps' selectors
    public/                 # anonymous website API (/public/*)
  integrations/
    razorpay/  whatsapp/ (aisensy, gupshup, interakt, twilio, console)
    sms/  email/  esign/  storage/  maps/
  templates/pdf/            # invoice.html, receipt.html, statement.html, …
  fixtures/seed/            # demo org used by `manage.py seed_demo`
  tests/                    # cross-app integration + e2e API flows
```

Standard shape of every domain app:

```
apps/billing/
  models.py         # fields, constraints, indexes — no business logic
  choices.py        # TextChoices enums (shared with OpenAPI)
  selectors.py      # read queries; always take `scope` and return scoped querysets
  services.py       # write use-cases; @transaction.atomic; emit events; write audit
  calculators.py    # pure functions (proration, late fee, electricity split) — no DB
  state.py          # allowed transitions
  events.py         # event names + payload dataclasses this app emits
  handlers.py       # reactions to other apps' events (registered with the outbox)
  tasks.py          # Celery entry points — call services only
  api/ serializers.py  views.py  filters.py  urls.py  permissions.py
  admin.py
  tests/ test_calculators.py  test_services.py  test_api.py  factories.py
```

### Dependency rule

Apps may only import **downward**. `import-linter` enforces this in CI. Upward
communication goes through outbox events.

```
L6  dashboard · reports · portal · public          (read-model composers)
L5  collections · messaging · notifications · maintenance · finance
L4  payments · ledger
L3  billing · meters · agreements · inspections · documents
L2  tenancies · onboarding · tenants · leads · listings
L1  properties
L0  accounts · organization · audit · common
```

Example: `payments` (L4) must not import `collections` (L5). When a payment succeeds,
`payments` emits `payment.succeeded`, and `collections.handlers` stops the reminders.

---

## 20.5 The shared kernel (`apps/common` + L0)

Build these first. Every later module depends on them, and retrofitting them is painful.

| Piece | Responsibility |
|---|---|
| `BaseModel` | UUIDv7 `id`, `created_at`, `updated_at`; `OrgScopedModel` adds `organization` + scoped manager; `SoftDeleteModel` adds `deleted_at`. |
| `money.py` | `Money` helpers, rounding policy, `to_words_inr()` for PDFs. |
| `scope.py` | `RequestScope(org, user, property_ids)` built by middleware from JWT + `X-Property-Id`; `scoped(qs, scope)` helper used by every selector. |
| `permissions.py` | `HasPerm("billing.invoice.issue")` DRF permission; `amount_limit` checks; deny by default. |
| `state.py` | `transition()` helper: validate → mutate → audit → emit. |
| `outbox.py` | `emit(name, payload)` writes a `DomainEvent`; `on_commit` relay + periodic sweeper; handler registry; per-handler idempotency (`ProcessedEvent`). |
| `audit` app | `AuditLog` writer used by `transition()` and services; `ChangeRequest` for approval-required actions (doc 03). |
| `numbering.py` | `NumberSeries` allocation (ADR-010). |
| `files.py` | `FileObject`, presign endpoint, MIME/size allowlist, EXIF strip job. |
| `jobs.py` | `Job` model + progress API (ADR-020). |
| `errors.py` | RFC 7807 exception handler; domain errors (`InvalidTransition`, `LimitExceeded`, `ApprovalRequired` → 202 + change-request id). |
| `pagination.py` / `filters.py` | Page-number pagination (`?page`, `?pageSize`, max 100), `X-Total-Count`, base filtersets. |
| `phone.py` | E.164 normalisation, +91 default. |
| `locks.py` | Redis lock decorator for beat jobs (`@single_flight("billing-run")`). |
| `health.py` | `/healthz` (liveness) and `/readyz` (DB + Redis + storage). |

---

## 20.6 Domain modules — models, lifecycle, phase

Fields follow doc 05 unless noted. Only **additions and changes** are listed here.

| App | Key models | Lifecycle / notes | Phase |
|---|---|---|---|
| accounts | `User`, `Role`, `Permission`, `RolePermission`, `PropertyAssignment`, `Invitation`, `TOTPDevice`, `LoginAttempt` | Invitation flow (`invited` badge in Users page). FIDO/WebAuthn shown in UI → **P3**. | P0 |
| organization | `Organization`, `Settings`, `IntegrationCredential` (Fernet) | Settings gains **`bill_delivery_mode`** (`consolidated\|itemized`), **`proration_basis`** (`actual_days\|fixed_30`) and `brand_theme`, all from the Settings UI. | P0 |
| properties | `Property`, `Block`, `Floor`, `Unit`, `Bed`, `Amenity`, `PropertyAmenity`, `UnitAmenity`, `MediaAsset`, `NearbyPlace` | Unit: `available → booked → occupied → notice → available/maintenance`, `blocked` from any. Changed only by tenancy/booking services, never by a PATCH. | P0 |
| listings | `ListingStats` (unit, date, views, enquiries), `LocalityPage` (slug, SEO copy) | **New.** The Listings page shows views, enquiries, conversion and locality SEO. Views are counted in Redis and flushed nightly. Listing copy stays on `Unit`. | P1 |
| leads | `Lead`, `LeadActivity`, `Visit` | `new → contacted → visit_scheduled → visited → negotiating → won\|lost`. Duplicate check by phone. | P1 |
| tenants | `Tenant`, `TenantDocument` (KYC), `Guarantor` | KYC numbers encrypted and masked. Blacklist goes through a `ChangeRequest`. | P1 |
| onboarding | `Onboarding` (draft aggregate: applicant JSON, unit/bed, terms, step), `OnboardingOccupant` | **New first-class model.** The 6-step wizard (Applicant → KYC → Terms → Agreement → Inspection → Review) saves per step. `complete()` creates the `Tenant`, the `Tenancy`, the opening ledger and readings in one transaction. | P1 |
| tenancies | `Tenancy`, `TenancyOccupant`, `RecurringCharge`, `Notice`, `Renewal`, `Transfer`, `MoveOutSettlement` | `onboarding → active → notice → ended`; `transferred`. `ending_soon` is derived (ADR-007). | P1 / P2 |
| agreements | `AgreementTemplate`, `AgreementTemplateVersion`, `RentalAgreement` | P1 = upload a signed scan; P2 = merge-field generation + e-sign webhook. | P1 / P2 |
| inspections | `Inspection`, `InspectionItem` | P1 records items in onboarding step 5; P2 compares move-out against move-in. | P1 / P2 |
| documents | `Document` (polymorphic owner, `code`, `category`, `validity_until`, `sign_status`) | Vault page: expiring and expired flags are derived from `validity_until`. | P1 |
| meters | `Meter`, `MeterReading`, `SharedMeterBill` | Unique `(meter, reading_date)`. A missing reading becomes a billing-run warning. | P1 |
| billing | `ChargeType`, `Invoice`, `InvoiceLineItem`, `CreditNote`, **`BillingRun`**, **`BillingRunItem`** | Invoice: `draft → issued → partially_paid → paid`, `void` from draft/issued with no payments. **BillingRun** mirrors the 3-step UI: `preview` (draft invoices + warnings) → `confirm` (issue chunk-by-chunk on the `billing` queue) → `completed`. The daily beat job creates the same kind of run with `trigger=scheduled`. | P1 |
| ledger | `LedgerEntry` (account, debit, credit, running_balance, source) | Append-only (ADR-009). A nightly drift check compares the ledger with invoice balances. | P1 |
| payments | `Payment`, `PaymentAllocation`, `PaymentLink`, `Receipt`, `Refund`, `AutopayMandate`, `WebhookEvent` | Payment: `pending → succeeded\|failed`; offline: `needs_verification → succeeded\|rejected`; cheque: `in_clearing`. **Unallocated** payments (no matching balance) go to a reconciliation queue, which the UI's "unreconciled alert" needs. Allocation is oldest-first by default. | P1 (autopay/refund P2) |
| collections | `ReminderRule` (moved out of the Settings JSON so the cadence editor can edit rows), `ReminderLog`, `PromiseToPay` | Daily evaluator; stops on `payment.succeeded`; honours promises, opt-out and quiet hours. | P1 (T-3/T0/T+1) → P2 |
| messaging | `NotificationTemplate`, `MessageLog`, **`Conversation`**, `InboundMessage`, `Broadcast`, `BroadcastRecipient`, `Announcement`, `AnnouncementAck` | **Conversation is new.** The inbox UI shows a WhatsApp 24-hour session window (`sessionActive`). Free-form replies are allowed only inside the window; outside it, staff must pick an approved template. Bot replies are marked `kind=bot`. | P1 (outbound) → P2 (inbox) |
| notifications | `StaffNotification` (in-app), `ActivityEvent` | Fed from outbox events. They power the Topbar notifications panel and the Home "Recent activity" feed. | P1 |
| maintenance | `Ticket`, `TicketComment`, `TicketAttachment`, `TicketCost`, `Vendor`, `PreventiveSchedule`, `PreventiveTask`, `Asset` | `open → assigned → in_progress → on_hold → resolved → closed`. The UI also shows a **PO number**, **cost lines** and a **closure OTP** (tenant sign-off), so we add `po_number`, `TicketCost` and `closure_otp_hash`. SLA hours come from priority. | P1 (basic) → P2 |
| finance | `ExpenseCategory`, `Expense`, `OwnerPayout`, `TaxEntry` | The UI has a Tax Ledger tab (TDS deducted, ITC, challan due), so `TaxEntry` is added. P&L comes from selectors, not stored. | P2–P3 |
| reports | `ScheduledReport`, `ExportJob` (→ `Job`) | Every report is a selector returning rows; the export renderer is shared. | P1 (rent roll, occupancy, collections) |
| dashboard | — (read only) | `GET /dashboard/summary` composes KPIs, cached in Redis for 5 minutes and invalidated by events. | P1 |

---

## 20.7 Frontend ↔ spec gap analysis

These came from reading `frontend/apps/dashboard/src/data/*.ts` against docs 05/06. Each one
is resolved by a decision above or a model addition in 20.6.

| # | Dashboard expects | Spec says | Resolution |
|---|---|---|---|
| G1 | camelCase fields, label enums (`"Partially Paid"`) | snake_case, codes | ADR-005 / ADR-006. The FE adds a `labels.ts` map. |
| G2 | `Overdue` invoice status, `Ending Soon` tenancy status | not stored | ADR-007 `displayStatus`. |
| G3 | Billing run: setup → preview with warnings → confirm → results | `POST /billing/run` returns a job | `BillingRun` + `BillingRunItem` resources (see API additions). |
| G4 | Editable roles matrix (`full/view/scoped/none`) | Django Groups | ADR-015. |
| G5 | Global property switcher | per-endpoint `?property=` | ADR-016. Both are supported. |
| G6 | WhatsApp inbox with session timer, bot bubbles, read ticks | template-centric | `Conversation` model + session rules. |
| G7 | Listing views, enquiries, conversion, locality SEO pages | not modelled | `listings` app. |
| G8 | Unreconciled payment alert, "Needs Verification", "In Clearing", "Auto-Debit Failed" | payment statuses `pending/success/failed/refunded` | Expanded payment states + unallocated queue. |
| G9 | Ticket PO number, cost lines, closure OTP | `cost` single field | `TicketCost`, `po_number`, closure OTP. |
| G10 | Tax ledger (TDS, ITC, challan) | GST report P3 only | `TaxEntry` (P3, or P2 if the owner is GST-registered). |
| G11 | Settings: bill delivery mode, proration basis, brand themes | partially in 08 §8.10 as open questions | Added to `Settings`. |
| G12 | Recent activity feed + notifications panel | not modelled | `notifications` app fed by the outbox. |
| G13 | Onboarding list with step progress; resumable wizard | `/onboardings` with no model | `Onboarding` aggregate. |
| G14 | Roles: no "Read-only" in UI; doc 03 has it | 6 roles | Seed all 6; the UI shows whatever the API returns. |
| G15 | No login screen, no API client, no data-fetching library | TanStack Query + generated client (doc 12) | FE work item in Sprint 1: `packages/api-client`, auth context, login + 2FA screens. |
| G16 | Avatar initials, `periodLabel`, `timeLabel` strings | — | **Not sent by the API.** Formatting is the frontend's job (`lib/format.ts`). The API returns ISO dates and raw numbers. |

### API additions to doc 06

```
POST   /billing/runs                    {period, scope:{propertyIds?}} → run (status=previewing)
GET    /billing/runs/{id}               run + items[] (tenancy, amounts, warnings[], excluded)
PATCH  /billing/runs/{id}/items/{itemId} {excluded: true}
POST   /billing/runs/{id}/confirm       → 202, run moves to issuing → completed
GET    /roles   POST /roles   PATCH /roles/{id}     GET /permissions
POST   /users/invite   POST /invitations/{token}/accept
GET    /conversations?unread=&isLead=   GET /conversations/{id}/messages
POST   /conversations/{id}/reply        {body} (409 if session expired) | {templateCode, variables}
GET    /listings/stats?from=&to=        GET/PATCH /localities/{slug}
GET    /payments/unallocated            POST /payments/{id}/allocate {allocations[]}
GET    /onboardings?step=&assignedTo=   PATCH /onboardings/{id}/steps/{step}
GET    /activity?limit=                 GET /notifications  POST /notifications/read
POST   /uploads/presign                 {purpose, filename, contentType, size} → {uploadId, url, fields}
GET    /jobs/{id}
```

---

## 20.8 Cross-cutting conventions

**API**
- Base `/api/v1`. JSON camelCase. Money is sent as strings (`"12500.00"`). Dates are ISO dates; timestamps are ISO UTC.
- List responses use `{results, count, next, previous}`, plus `X-Total-Count`.
- Errors use RFC 7807 with `errors: {field: [codes]}`. **Error codes are stable strings** (`invalid_transition`, `amount_limit_exceeded`) so the UI can map them to friendly text.
- `Idempotency-Key` is honoured on payment, billing-run, message-send and public enquiry POSTs (stored 24 h in Redis).
- Approval-required actions return **202** with `{changeRequestId}` instead of applying the change.

**Data**
- Every money, status, agreement, KYC or permission mutation goes through a service. Services use `transition()` and write an audit row. PATCH endpoints never touch status fields directly.
- Financial rows are soft-deleted at most. Hard delete is blocked with `on_delete=PROTECT`.
- Times are stored in UTC. Business dates (due day, billing period) are computed in `Asia/Kolkata`.

**Jobs**
- Every beat job is idempotent, wrapped in `@single_flight`, records its last success (`JobHeartbeat`) and has a freshness alert.
- Chunked processing isolates failures per tenancy: one bad tenancy must not fail the whole run.

**Security** (summary of doc 13 as it applies to code)
- Querysets are scoped in selectors, never in views (tests assert cross-property leakage is impossible).
- Webhooks: verify the signature, then store the raw event, then dedupe on the provider event id, then enqueue.
- PII scrubbing in logs and Sentry; KYC numbers are encrypted and masked.
- Rate limits on auth, OTP, public enquiry/booking and exports.

---

## 20.9 Testing strategy

| Layer | Tooling | Must cover |
|---|---|---|
| Calculators (pure) | pytest + **hypothesis** | proration, late fee (flat/percent/per-day + cap), electricity submeter/shared split, deposit refund, allocation order, rounding. **100% branch coverage.** |
| Services | pytest-django + factory_boy + freezegun | every state transition (allowed and forbidden), audit + event emitted, idempotency (run the billing run twice → same invoices). |
| Selectors / scoping | pytest | a manager scoped to property A can never read property B, for every list endpoint (parametrised). |
| API | DRF APIClient | contract (status codes, error codes), permissions matrix vs doc 03 (parametrised over roles). |
| Integrations | respx / recorded fixtures | Razorpay link create + webhook verification, each BSP adapter's send/status/inbound parsing. |
| Schema | `spectacular --validate` + openapi diff in CI | no accidental breaking changes. |
| End-to-end | Playwright (later, from the FE) | M3 demo flow: onboard → billing run → WhatsApp (console) → pay (Razorpay test) → webhook → receipt. |

CI order: `ruff` → `mypy` → `import-linter` → `pytest` (Postgres + Redis services) →
schema diff → Docker build. Gate: services/calculators/tasks ≥ 80% coverage, and money
calculators at 100%.

---

## 20.10 Build order — sprints

Two-week sprints, assuming 1–2 backend developers and 1 frontend developer. Each sprint
ends with **dashboard pages on live data** (the "Wire" column). This refines Phase 0–1 of
[14 Roadmap](14-roadmap.md).

| Sprint | Backend scope | Wire (frontend) | Exit check |
|---|---|---|---|
| **S0 — Skeleton** (1 wk) | `backend/` scaffold (uv, settings split, Docker Compose: postgres, redis, minio, mailpit), CI pipeline, `common` kernel (base models, scope, errors, pagination, outbox, numbering, files, jobs, health), drf-spectacular, Sentry, `seed_demo` stub, ADRs 001–022 written. | `packages/api-client` generation pipeline (orval); TanStack Query provider. | `docker compose up` → `/healthz` green; CI green; empty schema generates a client. |
| **S1 — Identity & org** | accounts (staff login, TOTP, refresh cookie, invitations, roles/permissions seeded from doc 03, property assignments), organization (profile, settings, encrypted integrations + test-connection stub), audit log + change requests. | **New** Login + 2FA screens, auth guard, AccountMenu, **Users & Roles**, **Settings** (profile, billing policy), Audit Log page. | Owner logs in with 2FA, invites a manager scoped to one property, edits a role; every change is visible in the audit log. |
| **S2 — Inventory** | properties, units, beds, amenities, media (presigned uploads + thumbnails), meters; unit state machine; listings toggles + copy; `X-Property-Id` scoping. | **Properties**, **Property detail** (all tabs), **Listings**, PropertySwitcher. | M1 from doc 14: manage properties, units, photos, amenities and meters on live data. |
| **S3 — Leads & messaging core** | leads + activities + visits; `/public/enquiries` (rate-limited, captcha hook); messaging core: template registry, `MessageLog`, WhatsApp adapter interface + **console** + one real BSP adapter, delivery webhook; notifications app (activity feed, staff alerts). | **Leads** (kanban + table + detail), NotificationsPanel, Home activity feed. | An enquiry POST creates a lead and sends `enquiry_ack` (console + BSP sandbox); the staff member gets an in-app alert. |
| **S4 — Onboarding & tenancies** | tenants + KYC (private bucket, encryption), onboarding aggregate + wizard steps, agreements (upload path), inspections (move-in), opening readings, tenancy activation → unit occupied + `onboarding_welcome`; tenancies list/detail, recurring charges, notice; documents vault. | **Onboarding list + wizard**, **Tenancies list + detail** (overview, recurring charges, documents, comm log), **Documents**. | Convert a lead → finish the wizard → active tenancy, occupied unit, welcome message. |
| **S5 — Billing** | charge types, meter readings, calculators, invoice + lines, numbering, **BillingRun** preview/confirm, daily scheduled run, ad-hoc invoice, void, credit notes (with limits → change request), invoice PDF, ledger posting + statement PDF. | **Billing** (invoices list, detail, credit notes), **Billing Run**, tenancy Ledger + Invoices tabs. | Running a period twice is idempotent; missing readings show as warnings; ledger balance = sum of open invoices (drift check passes). |
| **S6 — Payments & collections** | Razorpay payment links, webhook ingestion (`WebhookEvent`), allocation, receipts + PDF + `payment_received`, offline payments + approval, unallocated queue; reminder rules (T-3, T0, T+1), reminder evaluator, promise-to-pay, quiet hours / opt-out. | **Payments**, **Collections** (overdue table, aging, promises, reconciliation), tenancy Payments + Deposit tabs, Settings → reminder cadence. | **M3 demo:** invoice → WhatsApp with link → pay in Razorpay test mode → webhook → paid + receipt → reminders stop. |
| **S7 — Insight & portal API** | dashboard summary (cached), reports P1 (rent roll, occupancy, collections) + async export, tenant auth (phone OTP), `/me/*` portal API, maintenance P1 (tickets from staff/portal, assignment, comments). Hardening: load test, security review, backup/restore drill. | **Home** KPIs/charts, **Reports** (hub + rent roll + export), **Maintenance** (kanban, detail). | Phase 1 exit (doc 14) met; tenant portal frontend can start against a stable API. |

**After S7 (Phase 2, ≈ 4 sprints):** late fees + proration + full cadence, autopay, refunds,
move-out settlement, renewal/escalation jobs, e-sign, two-way WhatsApp inbox
(`Conversation`), broadcasts + announcements, vendors/SLA/preventive maintenance, website
booking with token payment, P2 reports. **Phase 3:** finance (expenses, payouts, P&L, tax
ledger, exports), assets, CMS, scheduled reports.

### Critical path & risks

| Risk | Impact | Mitigation |
|---|---|---|
| WhatsApp template approval by Meta takes days to weeks | S3/S6 demos blocked | Pick the BSP and submit the P1 templates **in S0**; use the console adapter until they are approved. |
| Razorpay account KYC / live activation | No real collections | Test mode suffices until launch; start business KYC in S0. |
| Billing-rule ambiguity (doc 08 §8.10) | Rework in S5 | Get owner answers to the questions in 20.11 **before S5 starts**. |
| Dashboard mock shapes differ from API | FE churn | ADR-005/006/007 plus the generated client. Wire one module per sprint; never big-bang. |
| Scope creep from the "maximum features" catalogue | Phase 1 slips | Anything not in the S0–S7 table is Phase 2+. Changes go through the roadmap. |

---

## 20.11 Questions to settle before / during build

**Needed before S0–S1 (infra & vendors)**
1. WhatsApp BSP: AiSensy, Gupshup, Interakt or Twilio? (Affects template submission timing.)
2. Hosting: Render / Railway / Fly / AWS / DigitalOcean? Managed Postgres + Redis provider?
3. Domains: confirm `app.<domain>` (dashboard) + `api.<domain>`, needed for the cookie-based refresh token.
4. Confirm single organisation for v1 (data stays namespaced for SaaS later).

**Needed before S5 (billing) — from doc 08 §8.10, plus new ones**
5. Carry-forward: separate invoices (default) or a line on the next invoice?
6. Proration basis: actual days (default) or a fixed 30 days?
7. Electricity on the main invoice (consolidated) or a separate bill and message?
8. Grace period, late-fee formula and cap. (The UI mock shows ₹100/day, cap ₹1,500, 5 days' grace. Confirm.)
9. Payment allocation order: oldest-first (default) or by charge type?
10. GST-registered? (The UI shows a GSTIN; this turns on tax-invoice format and the TaxEntry ledger.)
11. Invoice total rounding to the nearest rupee: yes or no?
12. Can tenants submit their own meter readings?
13. Default due day per tenancy, or one org-wide date? (The UI offers 1st/5th/7th/10th org-wide; doc 05 has a per-tenancy `due_day`.)

**Needed before Phase 2**
14. e-sign provider (Digio / Leegality) and e-stamp handling per state.
15. Website booking token amount and hold days.
16. Deposit rules: months held, fixed non-refundable deductions.

---

## 20.12 Definition of done (per backend feature)

- [ ] Models have constraints + indexes; migration is reversible / expand-safe.
- [ ] Writes go through a service; status changes go through `transition()`; audit + event emitted.
- [ ] Selector enforces org + property scope; scoping test added.
- [ ] Permission code registered and seeded into default roles; role-matrix test updated.
- [ ] Serializer + filters + ordering + pagination; OpenAPI annotations; client regenerated.
- [ ] Calculators covered by unit/property tests; services by transition + idempotency tests.
- [ ] External calls go through an integration adapter with a fake; never inside a DB transaction.
- [ ] `seed_demo` extended so the dashboard page looks populated on a fresh setup.
- [ ] The corresponding `frontend/.../data/*.ts` mock is deleted once the page is wired.
