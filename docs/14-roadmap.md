# 14 — Roadmap

Phased so that a **usable, revenue-affecting** slice ships first (automated billing +
WhatsApp reminders + payments), then breadth.

Estimates assume ~1–2 backend + 1 frontend engineer. Treat as relative sizing, not commitments.

---

## Phase 0 — Foundations (2–3 weeks)

**Goal:** skeleton that everything else builds on.

- Repo setup (monorepo, CI, Docker Compose, envs, Sentry).
- Django project + apps scaffold; PostgreSQL; Redis; Celery + Beat; S3/R2 storage.
- Auth: staff login + 2FA; tenant phone-OTP; RBAC + property scoping; audit log.
- Organization / Settings / IntegrationCredentials (encrypted) + "test connection".
- Core models + migrations: Property, Block/Floor, Unit, Bed, Amenity, MediaAsset, Meter.
- Admin dashboard shell (nav, auth, property switcher, design system) + Properties/Units CRUD
  with photo upload.
- OpenAPI schema + generated TS client pipeline.
- Seed/demo data command.

**Exit:** staff can log in and manage properties, units, photos, amenities, meters.

---

## Phase 1 — MVP: List → Enquire → Onboard → Bill → Collect (5–7 weeks)

**Goal:** the core loop works end to end for real tenants.

- **Public website (P1 set):** landing, search + filters, listing detail, property page,
  enquiry form, WhatsApp click-to-chat, SSR/SEO basics, sitemap. `/public/*` API.
- **Leads:** capture from website, pipeline stages, assign, activities, auto `enquiry_ack`
  WhatsApp, convert-to-onboarding.
- **Onboarding:** application + co-occupants, KYC upload + verify, terms capture, assign
  unit, activate tenancy → unit `occupied`, `onboarding_welcome` WhatsApp. (Agreement =
  upload signed scan for now; e-sign in P2.)
- **Tenancies:** list + detail, recurring charges, opening meter reading.
- **Billing:** charge types, recurring charges, **daily billing run** (rent + recurring +
  submeter/fixed electricity + water + carry-forward via ledger), invoice numbering,
  branded invoice PDF, tenant ledger + deposit ledger, ad-hoc invoice.
- **Payments:** Razorpay Payment Links per invoice, webhook reconciliation, receipt PDF,
  offline payment entry + approval, partial payment + allocation.
- **WhatsApp automation (P1 templates):** BSP adapter (+ `console` provider), template
  registry, scheduler, `invoice_issued` / itemized bill templates, reminder cadence
  (T-3, T0, T+1), `payment_received` with receipt, delivery tracking, `otp_login`.
- **Admin dashboard:** Home KPIs (occupancy, expected vs collected, overdue), Leads,
  Onboarding wizard, Tenancies, Invoices, Billing run, Collections list, basic reports
  (rent roll, occupancy, collections).
- **Tenant portal (P1):** OTP login, dues + Pay now, invoices + receipts, ledger/statement,
  raise + track tickets, contact manager.
- **Reports (P1):** rent roll, occupancy, collections — with export.

**Exit:** a prospect can find a room on the site, get onboarded, and thereafter receive an
automatic monthly WhatsApp bill with a working payment link that auto-reconciles and
triggers a receipt — with the owner seeing occupancy and collection numbers.

---

## Phase 2 — Depth: automation, agreements, maintenance, self-service (5–7 weeks)

- **Billing:** proration (move-in/out), late-fee engine, credit notes/waivers with limits +
  approvals, shared-meter split, full reminder cadence (T+3, T+7, T+15) with escalation +
  staff alert, aging report.
- **Payments:** UPI Autopay / e-mandate, promise-to-pay, deposit refund via Razorpay
  Payout, reconciliation view.
- **Agreements:** templates with merge fields, e-sign integration (Digio/Leegality),
  versioning, police-verification form generation, signed-copy WhatsApp.
- **Tenancy lifecycle:** rent escalation job, renewal workflow + expiry reminders (60/30/7),
  notice → computed vacate date, **move-out settlement** (inventory deductions, final
  readings, settlement statement, refund), transfer between units.
- **Move-in/out inspections** with condition photos.
- **Maintenance:** tickets (portal + WhatsApp `TICKET`), assignment to staff/vendors, SLA
  timers, tenant-visible thread, status WhatsApp updates, rating; vendor directory;
  preventive-maintenance schedules.
- **Two-way WhatsApp:** inbound webhook, keyword auto-replies (`BALANCE`/`PAY`/`RECEIPT`/
  `TICKET`/`STOP`), staff **Inbox**.
- **Broadcasts & announcements** to segments; channel fallback (SMS/email); opt-out + quiet
  hours + cost logging.
- **Tenant portal (P2):** agreement download, KYC status + re-upload, meter reading
  submission, announcements + ack, move-out request, profile edits, notification
  preferences.
- **Website (P2):** schedule-a-visit flow, **book now / token payment**, verified reviews,
  visit reminders.
- **Reports (P2):** aging, upcoming vacancies, expiring agreements, utility consumption,
  lead funnel, vacancy days; scheduled email digests.
- **Dashboard:** reminder cadence editor, template management, approvals queue,
  reconciliation screen.

**Exit:** the monthly cycle runs essentially untouched; onboarding is fully paperless;
tenants self-serve bills, complaints, and move-out; collections have a real dunning process.

---

## Phase 3 — Growth: finance, analytics, content (4–6 weeks)

- **Accounting:** expenses (category/vendor/property/receipt), owner payouts, **per-property
  P&L**, cash-flow, exports to Tally/Zoho, GST output report.
- **Asset register** (appliances, warranty, service history); common-area tickets.
- **Analytics:** churn/retention, average tenancy length, maintenance cost analysis,
  lead-source performance; richer dashboard charts; scheduled reports.
- **Public site CMS-lite** (hero/about/FAQ/testimonials/areas), locality SEO landing pages,
  multi-language (English/Hindi), blog.
- **Tenant portal (P3):** PG roommate + mess menu, refer-a-friend with rewards, PWA,
  push notifications.
- **Electricity slabs / tiered rates**; convenience-fee pass-through.
- Template management UI with BSP approval tracking; festival/greeting campaigns.

---

## Phase 4 — Advanced / optional (ongoing)

- **Mobile apps** (React Native): tenant + field-staff.
- **Channel manager:** push vacancies to NoBroker / MagicBricks / 99acres / Housing / OLX;
  status sync.
- **Smart access & IoT:** app/RFID/biometric locks, visitor management, digital gate pass;
  IoT smart-meter auto-reads.
- **AI:** enquiry chatbot / WhatsApp AI concierge, rent-default risk scoring, ticket
  auto-triage, OCR for KYC & meter photos, expense-bill OCR.
- **Aadhaar/DigiLocker KYC**, tenant verification API.
- **Mess & laundry management**, PG consumables procurement.
- **Short-stay mode:** nightly pricing + calendar + Airbnb-style booking.
- **Renter's insurance** add-on at onboarding.
- **BBPS**: pay the actual electricity board bill on the owner's behalf.
- **Multi-owner SaaS:** self-serve signup, workspace isolation, per-owner subscription
  billing, super-admin console (data model already namespaced by `organization`).
- Dynamic pricing suggestions; Google Business / WhatsApp catalogue sync; community feed.

---

## Cross-cutting (every phase)

- Tests (unit + contract + E2E smoke), CI gates, coverage on money paths.
- Security review before each release; dependency + secret scanning.
- Runbooks + ADRs updated.
- Backup restore drill each quarter.
- Performance budget checks on the public site.

## Suggested first 3 milestones to demo

1. **M1 (end P0):** manage properties/units with photos; see them.
2. **M2 (mid P1):** website search + listing detail + enquiry → lead in dashboard →
   `enquiry_ack` on WhatsApp.
3. **M3 (end P1):** onboard a tenant → billing run creates an invoice → WhatsApp bill with
   Razorpay link → pay → auto-reconcile → receipt on WhatsApp → dashboard shows collection.
