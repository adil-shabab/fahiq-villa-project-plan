# 03 — User Roles & Permissions

Two account populations:

1. **Staff users** — log into the admin dashboard. Role-based, property-scoped.
2. **Tenant users** — log into the self-service portal only. Scoped to their own tenancy.

Prospective tenants browsing the public website are **anonymous** (optional lightweight
account only for shortlist sync).

---

## Staff roles

| Capability | Owner / Admin | Property Manager | Accountant | Field / Maintenance | Front desk | Read-only |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| See all properties | ✅ | assigned only | assigned/all* | assigned only | assigned only | assigned/all* |
| Create/edit properties & units | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Manage amenities / master data | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Publish/unpublish a listing | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| View & manage leads | ✅ | ✅ | ❌ | ❌ | ✅ | view |
| Schedule / record visits | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| Onboard a tenant (application, KYC) | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| Verify KYC | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Generate / send agreement, trigger e-sign | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Record move-in inventory & meter readings | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ |
| Edit tenancy terms (rent, dates, escalation) | ✅ | approve-required | ❌ | ❌ | ❌ | ❌ |
| Configure recurring charges | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Enter meter readings | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Generate invoices (batch / ad-hoc) | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Apply discounts / credit notes / waivers | ✅ | ≤ limit | ≤ limit | ❌ | ❌ | ❌ |
| Record offline payments | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| Approve offline payments | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Issue refunds / payouts | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Send WhatsApp reminders (manual) | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| Edit reminder cadence / templates | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Send broadcasts | ✅ | assigned property | ❌ | ❌ | ❌ | ❌ |
| Manage maintenance tickets | ✅ | ✅ | ❌ | assigned tickets | create/view | view |
| Manage vendors | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Record expenses | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| View financial reports & P&L | ✅ | assigned property | ✅ | ❌ | ❌ | assigned/all* |
| Export data | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| Manage users & roles | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Edit integration credentials & settings | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| View audit log | ✅ | own actions | own actions | own actions | own actions | ❌ |
| Blacklist a tenant | ✅ | request | ❌ | ❌ | ❌ | ❌ |

\* Read-only and Accountant scope (all properties vs assigned) is set per user by the Admin.

"approve-required" / "request" = the action creates a pending request the Admin approves.
"≤ limit" = allowed up to a configurable rupee amount per transaction; above that needs
Admin approval.

---

## Permission model (implementation)

- **RBAC** with roles as named permission bundles, plus **object-scoping** by `property`.
- Django: use Groups for roles + a custom `has_perm` / DRF permission classes; property
  scoping enforced in querysets (a `PropertyScopedQuerySet` mixin filters by
  `request.user.assigned_properties`).
- Approval-required actions write a `ChangeRequest` row (`type`, `payload`, `status`,
  `requested_by`, `reviewed_by`) instead of mutating directly.
- Amount limits (`waiver_limit`, `discount_limit`) are per-user settings with a role default.
- Every mutating money/status/agreement/KYC action writes an `AuditLog` entry
  (`actor`, `action`, `target_type`, `target_id`, `before`, `after`, `ip`, `at`).

---

## Tenant portal permissions

A tenant user can only ever see data where `tenancy.tenant == request.user.tenant` (or they
are a listed co-tenant). They can:

- View their own invoices, receipts, ledger, agreement, KYC status.
- Make payments for their own invoices.
- Raise / comment on / rate their own maintenance tickets.
- Submit meter readings (if enabled) for their own unit.
- Read announcements and shared documents for their property.
- Initiate a move-out request.
- Edit their own profile fields (contact, emergency contact, vehicle) — KYC edits go to a
  review queue.
- They **cannot** see other tenants, other units, financials, or any staff view.

---

## Authentication

| Population | Method |
|---|---|
| Staff | Email + password, **mandatory 2FA (TOTP)** for Owner/Admin and Accountant, optional for others; session or JWT |
| Tenant | Phone number + OTP (SMS/WhatsApp); optional PIN for repeat login |
| Public visitor | None; optional email magic-link for shortlist sync |
| Service/webhooks | Signed webhook secrets (Razorpay, BSP), IP allowlist where supported |

Password policy, lockout after N failed attempts, forced rotation for staff, and full
session revocation on role change. See [13 — Non-Functional Requirements](13-non-functional-requirements.md).
