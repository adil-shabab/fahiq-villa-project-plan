# 09 — Admin Dashboard

React SPA behind staff auth. Property-scoped: managers see only assigned properties;
Owner/Admin sees all with a property switcher.

## 9.1 Navigation

```
┌ Sidebar ─────────────────┐
│ ● Home (KPIs)            │
│ ● Properties             │
│    – Units / Rooms       │
│    – Beds (PG)           │
│    – Amenities           │
│    – Meter readings      │
│ ● Listings (public)      │
│ ● Leads / Enquiries      │
│    – Visits calendar     │
│ ● Onboarding             │
│ ● Tenancies             │
│    – Renewals            │
│    – Notices & move-outs │
│ ● Billing                │
│    – Invoices            │
│    – Billing run         │
│    – Credit notes        │
│ ● Payments               │
│    – Collections         │
│    – Autopay mandates    │
│    – Refunds / payouts   │
│ ● Maintenance            │
│    – Tickets             │
│    – Preventive          │
│    – Vendors / Assets    │
│ ● Messaging              │
│    – Inbox (2-way)       │
│    – Broadcasts          │
│    – Announcements       │
│    – Templates           │
│ ● Finance                │
│    – Expenses            │
│    – Owner payouts       │
│    – P&L                 │
│ ● Reports                │
│ ● Documents              │
│ ● Settings               │
│ ● Users & roles          │
│ ● Audit log              │
└──────────────────────────┘
Top bar: property switcher · global search (tenant/unit/invoice) · notifications bell · profile
```

## 9.2 Home — KPI widgets

**Portfolio**
- Properties · Units/Beds · Occupied · Vacant · **Occupancy %** (gauge)
- On notice (count) · Move-ins today · Move-outs today
- Units vacant > 15 days (attention)

**Money (this month)**
- Expected rent · **Collected** · Outstanding · **Collection efficiency %** (progress)
- Overdue amount · Overdue tenant count
- Deposits held · Expenses MTD · **Net income MTD**
- MRR · ARPU / ADR

**Charts**
- Occupancy trend (12 mo) · Collection trend (billed vs collected, 12 mo)
- Revenue by property (bar) · Expense breakdown (donut)
- Lead funnel (enquiry → visit → won) · Avg vacancy days trend
- Aging split (0–30 / 31–60 / 61–90 / 90+)

**Action lists**
- Today's follow-up queue (overdue invoices) → one-tap "Remind" / "Call"
- Agreements expiring in 60 days
- KYC pending > 7 days
- Meter readings missing before next billing
- Unhandled WhatsApp inbox items
- Pending approvals (change requests, offline payments)

**Alerts feed** — new lead, payment received, ticket raised, invoice send failed, tenant
gave notice.

## 9.3 Key screens

### Properties → Units
- Table + gallery toggle. Columns: code, property, type, floor, rent, deposit, status
  badge, tenant (if occupied), available-from, listed?.
- Filters: property, status, type, furnishing, listed.
- Row actions: edit, change status, clone, view on site, open tenancy.
- **Unit detail**: tabs — Overview | Photos/Video | Amenities | Meters & readings |
  Listing (public copy, slug, SEO) | History (tenancies, price revisions) | Assets.
- **Bulk**: import CSV, bulk edit rent/status, bulk publish.

### Listings (public)
- What's live on the website, with preview links; toggle listed/unlisted; edit listing
  title/description/photos; per-locality SEO page editor (P3).

### Leads
- Kanban by stage + list view. Card: name, phone (click-to-call / WhatsApp), interested
  unit, budget, source, follow-up date, assignee.
- Lead drawer: timeline, activities, schedule visit, send details, convert.
- **Visits calendar**: day/week view, staff swimlanes, drag to reschedule.

### Onboarding
- Wizard: 1) Applicant & co-occupants → 2) KYC upload & verify → 3) Terms (unit, rent,
  deposit, dates, escalation, due day, inclusions) → 4) Agreement (generate → e-sign / upload)
  → 5) Move-in inspection & opening readings → 6) Review & Activate.
- Progress saved; resumable; shows a checklist.

### Tenancies
- List: tenant, unit, rent, start–end, status, outstanding, next due, agreement status.
- **Tenancy detail**: Overview | Ledger | Invoices | Payments | Deposit | Recurring charges
  | Agreement & documents | Inspections | Tickets | Communication log | Notice/Move-out.
- Actions: edit terms (→ approval if manager), add recurring charge, generate ad-hoc
  invoice, record payment, send reminder, start renewal, record notice.

### Billing → Invoices
- Filters: status, period, property, overdue, aging bucket, `electricity_pending`.
- Bulk: issue drafts, send, apply late fees, export.
- **Invoice detail**: line items, PDF preview, payment history, "Send" (channel picker),
  "Payment link", "Credit note", "Void".
- **Billing run**: pick period + scope → dry-run preview table (per tenancy: rent, recurring,
  electricity, water, total, warnings) → confirm → job progress → results.

### Payments → Collections
- Expected vs collected header. Overdue table sorted by amount/age with inline
  "Remind" / "Call" / "Promise to pay" / "Record payment".
- Promise-to-pay list with kept/broken tracking.
- Reconciliation view: Razorpay events vs recorded payments; mismatches highlighted.

### Maintenance → Tickets
- Board by status; SLA countdown chips; filters by property/category/priority/assignee.
- Ticket detail: description, photos, tenant-visible thread vs internal notes, assign
  (staff/vendor), cost + "bill to tenant", status, resolution + rating.
- Preventive: schedule list with next-due; generate tasks; completion log.

### Messaging → Inbox
- Conversation list (WhatsApp), unread first, tenant/lead name resolved.
- Reply pane (free-form within 24 h window, template picker outside it).
- "Create ticket from message", "Send payment link", "Send statement".
- **Broadcasts**: pick segment → template → variable mapping → schedule/send → delivery
  report.
- **Templates**: per event, per channel; edit body preview; BSP approval status.

### Finance
- **Expenses**: add (category, vendor, property, amount, receipt), list, filter, export.
- **Owner payouts**: record, list.
- **P&L**: per property + consolidated; income by charge type, expenses by category, net,
  occupancy, yield; period picker; export.

### Reports
- Cards for each report ([02 §L](02-features.md)); each opens a filterable table with
  export (XLSX/PDF) and "email me / schedule".

### Settings
- Business profile & branding · Billing policy · Utility rates · Invoice series ·
  Reminder cadence editor · Amenity master · Charge types & default rates ·
  Integrations (BSP, Razorpay, SMS, email, e-sign, maps, storage) with "Test" buttons ·
  Notification rules · Localization · Public-site content (P3).

### Users & roles
- Invite staff, set role, set property assignments, set waiver/discount limits, reset 2FA.

### Audit log
- Filter by actor/action/target/date; before→after diff view.

## 9.4 UX conventions

- Every money figure shows currency and is right-aligned; negative in red.
- Status as consistent colour-coded badges across the app.
- Bulk selection on every table; sticky action bar.
- Optimistic updates with toast + undo where safe.
- Empty states explain the next action.
- Everything filterable is URL-encoded (shareable views).
- Keyboard: `/` focus search, `g` then letter to jump sections.
- Responsive down to tablet; field-staff flows (meter reading, ticket update) usable on
  phone.
- Loading via skeletons; server errors surfaced with the RFC-7807 `detail`.
- All destructive actions confirm; voids/refunds require a reason.
