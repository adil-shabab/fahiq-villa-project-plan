# 12 — Tech Stack

## 12.1 Backend

| Concern | Choice | Notes |
|---|---|---|
| Language | **Python 3.12+** | |
| Framework | **Django 5.x** | ORM, admin, migrations, auth base |
| API | **Django REST Framework** | serializers, viewsets, permissions |
| API schema/docs | **drf-spectacular** | OpenAPI 3 → Swagger UI + TS client generation |
| Auth (staff) | **djangorestframework-simplejwt** + **django-otp** / `pyotp` | JWT + TOTP 2FA |
| Auth (tenant) | Custom phone-OTP backend | OTP in Redis with TTL, rate-limited |
| Filtering | **django-filter** | |
| Async / jobs | **Celery 5** + **Celery Beat** (`django-celery-beat`) | Redis broker + result backend |
| Cache / locks / OTP | **Redis** (`django-redis`) | + `redis-py` locks for job guards |
| DB | **PostgreSQL 16** | |
| Files | **django-storages** + **boto3** | S3 or Cloudflare R2; private buckets; signed URLs |
| PDF generation | **WeasyPrint** (HTML→PDF) | invoices, receipts, statements, agreements; ReportLab as fallback |
| Money | `Decimal` + **py-moneyed / django-money** (optional) | INR fixed v1, stored explicitly |
| Phone numbers | **django-phonenumber-field** + `phonenumbers` | E.164, +91 default |
| Import/export | **django-import-export** + **openpyxl** | CSV/XLSX for units, reports |
| Images | **Pillow** + **django-imagekit** or on-the-fly CDN resizing | thumbnails, WebP/AVIF |
| Rate limiting | **django-ratelimit** or DRF throttling | auth, OTP, public enquiry |
| Env config | **django-environ** / **pydantic-settings** | 12-factor |
| Secrets at rest | **cryptography (Fernet)** or cloud KMS | `IntegrationCredentials` encryption |
| Payments SDK | **razorpay** (official Python) | Payment Links, Orders, Subscriptions, Payouts, webhook verify |
| WhatsApp | HTTP clients per BSP (**httpx**) behind an adapter | AiSensy / Gupshup / Twilio / Interakt |
| SMS | **MSG91** or **Twilio** SDK | OTP + fallback |
| Email | **django-anymail** (SES / SendGrid) or SMTP | |
| e-sign | **Digio** / **Leegality** REST | optional |
| Monitoring | **sentry-sdk** | API + workers |
| Task monitoring | **Flower** (dev) / platform metrics | |
| Lint / format | **ruff** + **ruff format** | |
| Types | **mypy** + `django-stubs`, `djangorestframework-stubs` | |
| Tests | **pytest** + **pytest-django** + **factory_boy** + **freezegun** + **responses/respx** | |
| Coverage | **coverage.py** | gate in CI |

## 12.2 Frontend

| Concern | Choice | Notes |
|---|---|---|
| Framework (dashboard, portal) | **React 18 + Vite + TypeScript** | client-rendered SPAs behind auth |
| Framework (public site) | **Next.js (App Router)** or Vite + prerender | SSR/SSG for SEO |
| Routing (SPA) | **React Router v6** | |
| Server state | **TanStack Query** | caching, retries, background refetch |
| HTTP | **Axios** or `fetch` wrapper | auth interceptor, refresh handling |
| API types/client | **openapi-typescript** + **orval** (or `openapi-fetch`) | generated from `/api/schema/` |
| Client state | **Zustand** (light) or Redux Toolkit | filters, UI state |
| Forms | **React Hook Form** + **Zod** | shared schemas, resolver |
| UI kit | **Tailwind CSS** + **shadcn/ui** (Radix) | or Ant Design if the team prefers batteries-included tables |
| Tables | **TanStack Table** | sorting, filtering, column visibility, virtualization |
| Charts | **Recharts** | KPI charts (see [dataviz guidance]) |
| Dates | **date-fns** + `date-fns-tz` (`Asia/Kolkata`) | |
| Maps | **MapLibre / Mapbox GL** or **Leaflet** | listing map, property pins |
| File upload | **react-dropzone** + direct-to-S3 presigned uploads | photos, KYC, ticket images |
| i18n | **i18next** / `react-i18next` | English / Hindi (P3) |
| Auth storage | in-memory access token + httpOnly refresh cookie (or secure storage) | |
| PWA | **vite-plugin-pwa** / Next PWA | tenant portal (P3) |
| Payments | **Razorpay Checkout** JS (`checkout.js`) | plus hosted Payment Links for WhatsApp |
| Lint/format | **eslint** + **prettier** | |
| Tests | **Vitest** + **React Testing Library** | |
| E2E | **Playwright** | critical flows: enquiry, onboarding, billing run, pay |
| Component workshop | **Storybook** (optional) | design system |

## 12.3 Repository layout

Monorepo (pnpm workspaces + a Python backend dir), or two repos. Suggested monorepo:

```
fahiq/
  backend/                 # Django project (see 04 §4.3 for apps)
    config/  apps/  manage.py  pyproject.toml  Dockerfile
  frontend/
    packages/
      api-client/           # generated TS client + shared types
      ui/                   # shared design-system components
      config/               # eslint/tsconfig/tailwind presets
    apps/
      dashboard/            # React + Vite (staff)
      portal/               # React + Vite (tenant)
      website/              # Next.js (public, SEO)
  infra/
    docker-compose.yml      # local: db, redis, minio, mailhog, api, worker, beat
    nginx/  terraform|render.yaml|fly.toml
  docs/                     # these documents
  .github/workflows/        # CI
```

## 12.4 Local development

```bash
# one-time
cp .env.example .env
docker compose -f infra/docker-compose.yml up -d db redis minio mailhog

# backend
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements/dev.txt
python manage.py migrate
python manage.py seed_demo          # demo org, properties, units, a tenant, invoices
python manage.py runserver
celery -A config worker -l info
celery -A config beat -l info

# frontend
cd ../frontend
pnpm install
pnpm --filter website dev           # public site
pnpm --filter dashboard dev         # admin
pnpm --filter portal dev            # tenant
pnpm --filter api-client generate   # regenerate TS client from backend OpenAPI
```

Services: API `:8000`, dashboard `:5173`, portal `:5174`, website `:3000`,
MailHog `:8025`, MinIO console `:9001`.

For webhooks in dev: **ngrok**/**cloudflared** tunnel to `:8000`; point Razorpay & BSP
sandbox webhooks at the tunnel. A `console` WhatsApp provider and Razorpay test mode avoid
real sends/charges.

## 12.5 Environment variables (excerpt)

```
# core
DJANGO_SETTINGS_MODULE=config.settings.dev
SECRET_KEY=...
DATABASE_URL=postgres://...
REDIS_URL=redis://...
ALLOWED_HOSTS=...
CORS_ALLOWED_ORIGINS=...
FIELD_ENCRYPTION_KEY=...            # Fernet key for IntegrationCredentials

# storage
AWS_S3_ENDPOINT_URL=...             # R2/S3
AWS_STORAGE_BUCKET_NAME=...
AWS_ACCESS_KEY_ID=...  AWS_SECRET_ACCESS_KEY=...
KYC_BUCKET_NAME=...                 # stricter bucket/prefix

# payments
RAZORPAY_KEY_ID=...  RAZORPAY_KEY_SECRET=...  RAZORPAY_WEBHOOK_SECRET=...
BOOKING_TOKEN_AMOUNT=2000  BOOKING_HOLD_DAYS=3

# whatsapp (BSP)
WHATSAPP_PROVIDER=aisensy           # aisensy|gupshup|twilio|interakt|console
WHATSAPP_API_KEY=...  WHATSAPP_SENDER_ID=...  WHATSAPP_WEBHOOK_SECRET=...

# sms / email / esign / maps / sentry
SMS_PROVIDER=msg91  SMS_API_KEY=...
EMAIL_URL=...  DEFAULT_FROM_EMAIL=...
ESIGN_PROVIDER=digio  ESIGN_CLIENT_ID=...  ESIGN_CLIENT_SECRET=...
MAPS_API_KEY=...
SENTRY_DSN=...

# frontend (per app)
VITE_API_BASE_URL=...  VITE_RAZORPAY_KEY_ID=...  VITE_MAPS_TOKEN=...  VITE_SENTRY_DSN=...
```

## 12.6 Why this stack

- **Django + DRF**: fastest path to a correct, auditable domain model with migrations,
  admin, and mature auth — ideal for money + records.
- **Celery + Beat**: the billing/reminder automation is inherently scheduled + async;
  this is the standard, well-understood tool.
- **PostgreSQL**: transactions, constraints, JSONB for flexible config, strong indexing —
  right for financial data.
- **React + Vite + TS**: fast DX for the data-dense dashboard; **Next.js** only where SEO
  needs SSR (the public site).
- **Razorpay**: first-class UPI, Payment Links (perfect for WhatsApp), UPI Autopay, Payouts
  — India-native.
- **BSP adapter**: avoids lock-in; provider is a config choice.
- Everything here is boring, documented, and hireable-for.
