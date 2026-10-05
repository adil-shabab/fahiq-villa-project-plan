# 11 — Tenant Self-Service Portal

A focused React app (or a section of the same frontend) for onboarded tenants. Everything is
**self-scoped** — a tenant only ever sees their own tenancy. Mobile-first; installable as a
PWA (P3).

## 11.1 Auth

- **Phone + OTP** (`/auth/tenant/otp/request` → `/auth/tenant/otp/verify`). OTP sent via
  SMS, with WhatsApp as a secondary.
- Optional 4-digit PIN / biometric for quick re-entry on a remembered device.
- Session = short-lived JWT + refresh; auto-logout on inactivity; "log out all devices".
- A tenant account is created at onboarding completion and linked to the `Tenant` record;
  co-tenants can each get their own login.

## 11.2 Screens

### Home / Dashboard
- **Amount due now** (big) + due date; **Pay now** button.
- Next invoice date; this month's charges summary.
- Quick tiles: My invoices · Payment history · Raise a complaint · My agreement ·
  Announcements.
- Manager contact (call / WhatsApp).
- Banner alerts: overdue, agreement expiring, KYC document rejected, planned maintenance.

### Dues & Pay
- List of unpaid / partially-paid invoices with balance and due date.
- Select one or more → **Pay** → `POST /me/pay` → Razorpay Checkout / payment link.
- Shows autopay status; "Set up autopay" (UPI e-mandate) if not active (P2).
- After payment: instant receipt, updated balance.

### Invoices
- All invoices (paid + unpaid), filter by year.
- Invoice detail: line items (rent, electricity with units & rate, water, wifi, late fee…),
  total, status, download PDF.

### Payments & Receipts
- Chronological payments: amount, method, date, allocated invoice(s), **download receipt**.
- Great for reimbursement / HRA proof.

### Ledger / Statement
- Running account (charges vs payments vs balance).
- `Download statement` for a date range (PDF) — itemized rent receipts for HRA.

### Agreement & Documents
- Rental agreement PDF (signed copy).
- KYC documents with status (`pending / verified / rejected` + reason); re-upload if
  rejected.
- Shared property documents: house rules, Wi-Fi password, emergency contacts, guidelines,
  NOC templates.

### Maintenance / Complaints
- **Raise ticket**: category, description, photos, priority.
- My tickets: status timeline, tenant-visible comments, add a comment/photo.
- Rate resolution (1–5 + comment) when resolved.
- SLA / expected-by shown if configured.

### Meter readings (if `allow_tenant_meter_submission`)
- Submit current reading + photo for the unit's electricity/water meter before the billing
  date; previous reading shown; computed units preview.
- History of submitted readings and which invoice they were billed in.

### Announcements
- Feed of notices for the property / all tenants; pinned items on top.
- Acknowledge when `require_ack` (records `AnnouncementAck`).

### Move-out
- "Request to vacate" → pick intended vacate date → system computes earliest allowed date
  from notice period and lock-in → submit → `notice_ack` WhatsApp + staff alert.
- Track move-out status; view the settlement statement and refund status when generated.

### Profile
- Edit contact number (re-verify via OTP), email, emergency contact, vehicle details.
- KYC edits go to a staff review queue, not applied directly.
- Notification preferences: channel per event, opt-out of non-essential messages, quiet
  hours (P2).
- Language: English / Hindi (P3).

### PG extras (P3)
- Roommate list & bed info.
- Mess menu for the week; mark meals on/off; mess bill line visibility.

### Refer a friend (P3)
- Submit a friend's name + phone → tracked as a referral lead; reward credited to the
  tenant's ledger when the referral converts and stays N months.

## 11.3 Notifications to the tenant

All the WhatsApp templates in [07](07-whatsapp-automation.md) also surface as an in-app
**notifications** list, plus optional push (P3). Tenant can reply to WhatsApp with
`BALANCE`, `PAY`, `RECEIPT`, `TICKET …` (see [07 §7.5](07-whatsapp-automation.md)).

## 11.4 Guardrails

- Read/write strictly limited to the tenant's own `tenancy` (and co-tenancies).
- Cannot see amounts owed by others, other units, staff notes (`visibility=internal`), or
  any financial totals beyond their own ledger.
- Payment always goes through the gateway; the portal never stores card/UPI data.
- Rate-limit OTP requests; lock after repeated failures.
- Document downloads via short-lived signed URLs.

## 11.5 Nice-to-haves (P4)

- Native mobile app (React Native) sharing the API.
- Community board / marketplace between tenants.
- In-app chat with the manager (beyond WhatsApp).
- Rent payment reminders as calendar invites.
- Renewal self-service (accept new terms + e-sign from the portal).
