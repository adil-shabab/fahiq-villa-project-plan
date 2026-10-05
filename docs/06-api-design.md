# 06 — API Design

REST over HTTPS, JSON. Built with Django REST Framework. OpenAPI schema published via
`drf-spectacular` at `/api/schema/` and Swagger UI at `/api/docs/`.

## 6.1 Conventions

- Base path: `/api/v1/`
- **Auth**: `Authorization: Bearer <JWT>` (staff & tenant). Public catalog endpoints need no
  auth. Webhooks use signed secrets, not JWT.
- **Pagination**: cursor or page-number (`?page=&page_size=`, default 25, max 100).
- **Filtering**: `django-filter` — documented query params per collection.
- **Sorting**: `?ordering=field` / `-field`.
- **Sparse fields / expansion**: `?fields=` and `?expand=` on heavy resources.
- **Errors**: RFC 7807-ish — `{ "type", "title", "status", "detail", "errors": {field: [..]} }`.
- **Idempotency**: `Idempotency-Key` header honoured on POST for payments, invoice runs,
  message sends.
- **Rate limits**: per-IP on auth/OTP and public enquiry; per-user on the rest.
- **Money** returned as string decimals (`"12500.00"`) with a sibling `currency: "INR"`.
- **Timestamps** ISO-8601 UTC; server also returns `*_local` where useful.

## 6.2 Auth & session

| Method | Path | Purpose |
|---|---|---|
| POST | `/auth/staff/login` | email + password → tokens; `mfa_required` challenge if 2FA on |
| POST | `/auth/staff/mfa` | TOTP code → tokens |
| POST | `/auth/token/refresh` | refresh JWT |
| POST | `/auth/staff/logout` | revoke refresh token |
| POST | `/auth/tenant/otp/request` | `{ phone }` → OTP via SMS/WhatsApp |
| POST | `/auth/tenant/otp/verify` | `{ phone, code }` → tokens |
| GET | `/auth/me` | current user + role + permissions + assigned properties |
| POST | `/auth/password/forgot` · `/auth/password/reset` | staff password reset |

## 6.3 Resource groups

### Organization & settings (Admin only)

```
GET  /org                          PATCH /org
GET  /org/settings                 PATCH /org/settings
GET  /org/integrations             PATCH /org/integrations         # secrets write-only, masked on read
POST /org/integrations/test        # {service} → ping BSP/Razorpay/SMTP
GET  /users            POST /users            GET/PATCH/DELETE /users/{id}
POST /users/{id}/assign-properties
GET  /audit-logs?actor=&action=&target_type=&from=&to=
GET  /change-requests?status=pending   POST /change-requests/{id}/approve  /reject
```

### Properties & inventory

```
GET/POST            /properties
GET/PATCH/DELETE     /properties/{id}
GET/POST            /properties/{id}/blocks           # + floors nested or flat
GET/POST            /units?property=&status=&type=&is_listed=&q=
GET/PATCH/DELETE     /units/{id}
POST                /units/{id}/status                # {status, available_from?, reason?}
POST                /units/{id}/clone
GET/POST            /units/{id}/media   (multipart)   PATCH/DELETE /media/{id}   POST /media/reorder
GET/POST            /units/{id}/beds                  # PG
GET/POST            /amenities
POST                /units/{id}/amenities             # {amenity_ids: [...]}
GET/POST            /units/{id}/meters
GET/POST            /meters/{id}/readings  (multipart for photo)
GET                 /units/{id}/consumption?type=electricity&from=&to=
POST                /import/units        (CSV/XLSX)    GET /import/{job_id}
```

### Public catalog (no auth)

```
GET  /public/listings?locality=&city=&budget_min=&budget_max=&type=&furnishing=
        &available_from=&amenities=wifi,ac&tenant_type=&sharing=&property=&sort=&page=
GET  /public/listings/{slug}
GET  /public/properties/{slug}
GET  /public/localities                        # facet counts for filters
POST /public/enquiries        # {name, phone, email?, unit_slug?, message, move_in_date?}
POST /public/visits          # {lead_ref | name+phone, unit_slug, slot}
GET  /public/visits/slots?unit_slug=&date=
POST /public/bookings        # {unit_slug, name, phone, email} -> {razorpay_order, amount}
GET  /public/content/{key}   # CMS blocks: hero, about, faq, testimonials
GET  /public/reviews?property_slug=
GET  /sitemap.xml   /robots.txt
```

### Leads / CRM

```
GET/POST            /leads?stage=&source=&assigned_to=&follow_up=overdue&q=
GET/PATCH           /leads/{id}
POST                /leads/{id}/stage           # {stage, lost_reason?}
POST                /leads/{id}/activities      # note / call / message
POST                /leads/{id}/assign          # {user_id}
POST                /leads/{id}/send-details    # push listing link on WhatsApp
POST                /leads/{id}/convert         # -> creates draft tenancy/onboarding
GET/POST            /visits?date=&staff=&status=
POST                /visits/{id}/outcome
```

### Tenants & onboarding

```
GET/POST            /tenants?kyc_status=&blacklisted=&q=
GET/PATCH           /tenants/{id}
GET/POST            /tenants/{id}/documents  (multipart)
POST                /documents/{id}/verify       # {status, note}
POST                /tenants/{id}/blacklist  /unblacklist   # blacklist -> change-request

POST                /onboardings                 # {lead_id? , tenant_payload, unit_id/bed_id, terms}
GET/PATCH           /onboardings/{id}
POST                /onboardings/{id}/agreement/generate
POST                /onboardings/{id}/agreement/send-esign
POST                /onboardings/{id}/agreement/upload   (multipart)
POST                /onboardings/{id}/inspection         # move-in items + photos
POST                /onboardings/{id}/opening-readings
POST                /onboardings/{id}/complete           # -> Tenancy active, Unit occupied, welcome msg
```

### Tenancies / lease lifecycle

```
GET                 /tenancies?status=&property=&unit=&expiring_before=&q=
GET/PATCH           /tenancies/{id}                       # term edits by manager -> change-request
GET                 /tenancies/{id}/summary               # dues, next due, agreement, ledger head
GET/POST            /tenancies/{id}/recurring-charges     PATCH/DELETE /recurring-charges/{id}
POST                /tenancies/{id}/notice                # {by, date}
POST                /tenancies/{id}/renew                 # {new_end_date, new_rent, re_sign}
POST                /tenancies/{id}/transfer              # {to_unit_id, effective_date}
GET/POST            /tenancies/{id}/move-out              # settlement draft -> finalize
POST                /move-outs/{id}/finalize
GET                 /tenancies/{id}/agreement             GET /agreements/{id}/pdf
```

### Billing

```
GET/POST            /charge-types
GET                 /invoices?tenancy=&status=&period=&property=&overdue=true&aging=61_90
POST                /invoices                              # ad-hoc {tenancy, lines[], due_date}
GET                 /invoices/{id}    GET /invoices/{id}/pdf
POST                /invoices/{id}/issue                   # draft -> issued (+ notify)
POST                /invoices/{id}/void
POST                /invoices/{id}/send                    # {channels:[whatsapp,email]}
POST                /invoices/{id}/credit-notes            # {amount, reason, type}  (limits/approval)
POST                /billing/run                           # {period, property?, tenancy?} manual batch
GET                 /billing/run/{job_id}
POST                /billing/apply-late-fees               # {period}
GET                 /billing/preview?tenancy=&period=       # dry-run invoice
```

### Payments & collections

```
POST                /payments/link                        # {invoice_id} -> razorpay payment link
POST                /payments/offline                      # {tenancy, amount, method, proof?, allocations[]}
POST                /payments/{id}/approve                 # accountant/admin
GET                 /payments?tenancy=&method=&status=&from=&to=
GET                 /payments/{id}   GET /payments/{id}/receipt
POST                /payments/{id}/refund                  # deposit/other -> razorpay payout
POST                /autopay/mandate                       # {tenancy} -> razorpay subscription auth link
DELETE              /autopay/mandate/{tenancy_id}
GET                 /collections/dashboard?property=&period=
GET                 /collections/queue?bucket=today|overdue|promise
POST                /collections/{invoice_id}/promise-to-pay   # {date, amount?, note}
POST                /collections/{invoice_id}/remind           # manual reminder now
GET                 /ledger/{tenancy_id}                   GET /ledger/{tenancy_id}/statement.pdf
GET                 /deposit-ledger/{tenancy_id}
```

### Messaging

```
GET/PATCH           /notification-templates?event=&channel=
GET                 /messages?tenancy=&channel=&status=&event=&from=&to=
POST                /messages/test                         # {event, to} send a test
GET                 /inbound-messages?handled=false        POST /inbound-messages/{id}/route
GET/POST            /broadcasts                            POST /broadcasts/{id}/send
GET                 /broadcasts/{id}/recipients
GET/POST            /announcements                         POST /announcements/{id}/publish
```

### Maintenance

```
GET/POST            /tickets?status=&priority=&property=&category=&assignee=&sla=breached
GET/PATCH           /tickets/{id}
POST                /tickets/{id}/assign                   # {staff_id|vendor_id}
POST                /tickets/{id}/status                   # {status}
POST                /tickets/{id}/comments                 # {body, visibility}
POST                /tickets/{id}/cost                     # {amount, billable_to_tenant}
GET/POST            /vendors
GET/POST            /preventive-maintenance                GET /preventive-tasks?due_before=
POST                /preventive-tasks/{id}/complete
GET/POST            /assets?unit=
```

### Finance & reports

```
GET/POST            /expenses?property=&category=&from=&to=
GET/POST            /expense-categories
GET/POST            /owner-payouts
GET                 /reports/rent-roll?property=&as_of=
GET                 /reports/occupancy?property=&from=&to=
GET                 /reports/collections?property=&period=
GET                 /reports/aging?property=&as_of=
GET                 /reports/upcoming-vacancies?days=90
GET                 /reports/expiring-agreements?days=60
GET                 /reports/utility-consumption?property=&from=&to=
GET                 /reports/lead-funnel?from=&to=
GET                 /reports/pnl?property=&period=
GET                 /reports/{name}/export?format=xlsx|pdf&...    # 202 -> job -> file url
GET                 /dashboard/summary                      # all KPI widgets for admin home
```

### Tenant portal (tenant JWT; always self-scoped)

```
GET   /me/tenancy                    # unit, terms, manager contact, agreement link
GET   /me/dues                       # outstanding, next due date, payable invoices
GET   /me/invoices    GET /me/invoices/{id}/pdf
POST  /me/pay                        # {invoice_ids[]} -> razorpay payment link/order
GET   /me/payments    GET /me/payments/{id}/receipt
GET   /me/ledger      GET /me/ledger/statement.pdf
GET   /me/agreement/pdf
GET/POST /me/tickets  POST /me/tickets/{id}/comments  POST /me/tickets/{id}/rate
POST  /me/meter-readings   (multipart)          # if allowed
GET   /me/announcements    POST /me/announcements/{id}/ack
GET   /me/documents                             # shared docs, wifi password etc.
POST  /me/move-out/request
PATCH /me/profile                               # contact/emergency/vehicle; KYC -> review
POST  /me/referrals                             # {friend_name, friend_phone}
```

## 6.4 Webhooks (inbound, no JWT — signature verified)

| Path | Source | Handles |
|---|---|---|
| `POST /webhooks/razorpay` | Razorpay | `payment_link.paid`, `payment.captured`, `payment.failed`, `subscription.charged` (autopay), `payout.processed`/`payout.failed` (refunds). Verify `X-Razorpay-Signature`; dedupe on event id; enqueue `payments.handle_razorpay_event`. |
| `POST /webhooks/whatsapp` | BSP | Delivery status (`sent/delivered/read/failed`) → update `MessageLog`; inbound messages → `InboundMessage` + keyword auto-reply + routing. |
| `POST /webhooks/esign` | Digio/Leegality | Agreement signed/declined → update `RentalAgreement`, store signed PDF, advance onboarding. |
| `POST /webhooks/sms` (optional) | MSG91/Twilio | Delivery receipts. |

All webhook handlers: return 2xx fast, do work async, are idempotent, and log the raw
payload to a `WebhookEvent` table for replay.

## 6.5 Representative payloads

**Create ad-hoc invoice**

```http
POST /api/v1/invoices
{
  "tenancy": "b1f2...",
  "billing_period": "2026-09",
  "due_date": "2026-09-05",
  "lines": [
    { "charge_type": "rent", "description": "Rent Sep 2026", "quantity": 1, "unit_price": "15000.00" },
    { "charge_type": "electricity", "description": "Electricity (units 340-512)",
      "meter_reading": "mr_889", "quantity": 172, "unit_price": "8.50" },
    { "charge_type": "wifi", "description": "Wi-Fi", "quantity": 1, "unit_price": "500.00" }
  ],
  "notes": "Please pay by due date to avoid late fee."
}
```

**Generate payment link**

```http
POST /api/v1/payments/link
{ "invoice_id": "inv_1029" }
=> 201
{ "url": "https://rzp.io/i/AbCdEf", "amount": "16962.00", "expires_at": "2026-09-20T00:00:00Z",
  "razorpay_link_id": "plink_..." }
```

**Public enquiry**

```http
POST /api/v1/public/enquiries
{ "name": "Rahul", "phone": "+919812345678", "unit_slug": "green-view-a-101-2bhk",
  "message": "Available from Oct 1?", "move_in_date": "2026-10-01" }
=> 202  { "lead_id": "lead_55", "whatsapp_ack": "queued" }
```

## 6.6 API standards checklist

- Every list endpoint: pagination + documented filters + `ordering` + total count header.
- Every mutating endpoint: permission class, audit log, validation error contract.
- Long operations (billing run, exports, imports, broadcasts) return `202` + a `job` you
  poll at `/jobs/{id}`.
- Consistent enum values shared with the frontend via the OpenAPI schema (generate a TS
  client with `openapi-typescript` / `orval`).
- Versioned under `/v1`; additive changes only within a version.
