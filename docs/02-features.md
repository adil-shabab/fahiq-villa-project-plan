# 02 — Feature Catalogue

The complete feature set, grouped by module. Each item is tagged with a target phase:

- **[P1]** MVP — first usable release
- **[P2]** Fast follow
- **[P3]** Growth
- **[P4]** Advanced / optional

See [14 — Roadmap](14-roadmap.md) for how these group into milestones.

---

## A. Property & Room Management

- **[P1]** Multiple properties/buildings: name, type (apartment block / independent house /
  PG / hostel / commercial), full address, geo-coordinates, map pin, cover photo, description.
- **[P1]** Optional hierarchy: Property → Block/Wing → Floor → Unit.
- **[P1]** Unit/room types: `1RK`, `Studio`, `1BHK`, `2BHK`, `3BHK`, `4BHK+`,
  `PG bed` (sharing: single / double / triple / dormitory), `Shop / Commercial`.
- **[P1]** Per-unit details: number/name, floor, carpet/built-up area, furnishing
  (unfurnished / semi-furnished / fully-furnished), facing, bathroom (attached/common),
  balcony.
- **[P1]** Commercials per unit: monthly rent, security deposit, maintenance charge,
  lock-in period, notice period, rent-escalation % (yearly), rent due day of month.
- **[P1]** Photo & video gallery per unit and per property; drag-to-reorder; set cover.
- **[P2]** Floor-plan image upload; **[P4]** 360° virtual tour embed.
- **[P1]** **Amenities** — master checklist, assignable at property level and unit level:
  AC, geyser/water heater, Wi-Fi, wardrobe, bed, mattress, study table, sofa, dining table,
  fridge, washing machine, microwave, TV, RO/water purifier, modular kitchen, gas pipeline,
  chimney, power backup / inverter, lift, 2-wheeler parking, 4-wheeler parking, CCTV,
  security guard, gated community, intercom, housekeeping, laundry, food/mess, gym,
  swimming pool, common area / lounge, terrace access, garden, children's play area,
  visitor parking, fire safety.
- **[P1]** **Status** per unit: `Available`, `Booked` (token/advance paid),
  `Occupied`, `Notice period` (with vacate date), `Under maintenance`, `Blocked / not listed`.
- **[P1]** `Available from` date + availability calendar view.
- **[P1]** Tenant preferences / rules per unit: allowed tenant type (family / bachelor male /
  bachelor female / students / working professionals / company lease / anyone), food
  preference (veg only / non-veg allowed), pets allowed, smoking allowed, gate closing time,
  guests policy.
- **[P2]** Nearby landmarks with distance: metro/bus, IT park, college, hospital, market.
- **[P2]** Rent revision history + price list per unit.
- **[P2]** Bulk import of properties/units/amenities via CSV/Excel; bulk edit.
- **[P3]** Duplicate/clone a unit to speed up data entry for identical rooms.
- **[P3]** PG bed-level management: beds as child records of a room, per-bed rent, per-bed
  occupant, roommate visibility.

---

## B. Public Website (prospective-tenant facing)

- **[P1]** Landing page: hero search (locality + budget + room type), featured/available
  units, trust section, how-it-works, testimonials, footer.
- **[P1]** Search results with **filters**: locality/area, budget min–max, room type / BHK,
  furnishing, availability date, amenities (multi-select), tenant type, property, sharing
  type (for PG), sort (rent ↑/↓, newest, availability).
- **[P1]** Listing card: cover photo, title, locality, rent, deposit, type, key amenities,
  status badge, "available from".
- **[P1]** Listing detail page: photo/video gallery, full amenity list, rent + deposit +
  maintenance breakdown, rules & preferences, map with location, nearby landmarks,
  description, similar rooms, share buttons (copy link / WhatsApp).
- **[P1]** **Enquiry form** ("Enquire" / "Schedule a visit") → creates a Lead; instant
  WhatsApp acknowledgement to the visitor.
- **[P1]** Floating "Chat on WhatsApp" button (click-to-chat with prefilled text).
- **[P2]** **Book this room online** — pay a token/advance via Razorpay → unit moves to
  `Booked`, lead flagged "advance paid".
- **[P2]** Shortlist / wishlist (guest via `localStorage`; synced if the visitor creates an
  account).
- **[P2]** Verified tenant **reviews & ratings** of a property shown on the detail page.
- **[P2]** Visit scheduler with time-slot picker; confirmation + reminder on WhatsApp.
- **[P2]** SEO: per-locality and per-property landing pages, clean URLs, meta tags,
  OpenGraph images, JSON-LD (`Accommodation` / `Product`), `sitemap.xml`, `robots.txt`.
- **[P3]** Multi-language (English / Hindi) toggle.
- **[P3]** CMS-lite: admin edits hero text, about, FAQ, testimonials, contact info without a
  deploy.
- **[P3]** Blog / area guides for organic traffic.
- **[P4]** PWA install, offline browsing of shortlisted units.

---

## C. Lead / Enquiry Management (CRM-lite)

- **[P1]** Lead capture from: website enquiry, website booking, WhatsApp inbound, phone,
  walk-in, broker/referral, marketplace (manual).
- **[P1]** Lead fields: name, phone, email, interested unit(s)/property, budget, move-in
  date, tenant type, source, notes.
- **[P1]** Pipeline stages: `New → Contacted → Visit scheduled → Visited → Negotiating →
  Won (converted) → Lost` (with lost-reason).
- **[P1]** Assign lead to a staff member; follow-up date + reminder; activity timeline
  (calls, notes, status changes).
- **[P1]** Auto WhatsApp acknowledgement on new enquiry; manual "send details" action that
  pushes the listing link.
- **[P2]** Visit scheduling with calendar; reminders to prospect and assigned staff;
  mark visit outcome.
- **[P2]** One-click **Convert to tenant onboarding** (carries over name/phone/unit).
- **[P2]** Duplicate-lead detection by phone; merge.
- **[P3]** Lead-source performance report and conversion funnel.
- **[P3]** WhatsApp/email drip for cold leads.

---

## D. Tenant Onboarding

- **[P1]** Digital application form: personal details, DOB, gender, current address,
  permanent address, occupation (working professional / student / business), company/
  college name, monthly income band (optional), emergency contact, co-occupants / family
  members, vehicle details.
- **[P1]** **KYC upload**: Aadhaar, PAN, driving licence or passport, passport photo;
  per-document verification status (`pending / verified / rejected`) with note.
- **[P2]** **Rental agreement**: template with merge fields → generate PDF → e-sign via
  provider (Digio / Leegality / Aadhaar eSign) or upload a signed scan; stamp-paper /
  e-stamp details captured.
- **[P2]** **Police / tenant verification form** auto-generated in the standard format for
  the state.
- **[P1]** Agreement terms captured structurally: start date, end date, monthly rent,
  deposit, lock-in months, notice-period days, escalation %, due day, utilities included,
  parking included.
- **[P2]** **Move-in inventory / inspection**: list of furniture & appliances with
  condition and photos; tenant acknowledges. Snapshot stored for move-out comparison.
- **[P2]** **Opening meter readings** (electricity, water, gas) with photos at move-in.
- **[P1]** Assign unit / PG bed → status becomes `Occupied`; welcome WhatsApp with house
  rules, Wi-Fi password, manager contact, payment instructions.
- **[P2]** Guarantor / co-tenant records with their own KYC.
- **[P3]** House-rules acknowledgement with e-signature / OTP consent.
- **[P3]** Self-onboarding link: prospect fills the form and uploads KYC themselves before
  arriving; staff only reviews and approves.

---

## E. Tenancy / Lease Lifecycle

- **[P1]** Active tenancies list; per-tenancy profile (unit, tenant(s), terms, dates,
  ledger, documents, tickets, communication log).
- **[P1]** Automatic **rent schedule**: monthly invoice on the due day for the life of the
  tenancy.
- **[P2]** **Rent escalation** applied automatically on each tenancy anniversary.
- **[P2]** **Renewal workflow**: reminders at 60 and 30 days before expiry; capture new
  terms; regenerate & re-sign agreement; extend schedule.
- **[P1]** **Notice to vacate** (by tenant via portal/WhatsApp or by owner); records notice
  date and computed last-day based on notice period.
- **[P2]** **Move-out / final settlement**: inventory re-check with damage deductions, final
  meter readings & utility bill, unpaid dues, deposit refund calculation, generated
  settlement statement, refund payout (Razorpay Payout or manual), tenant sign-off.
- **[P1]** On move-out, unit returns to `Available` (or `Under maintenance`); optional
  auto-created turnover/cleaning task.
- **[P2]** **Transfer** a tenant to another unit/property (closes old schedule, opens new,
  carries deposit).
- **[P1]** Tenancy history / past-tenants archive.
- **[P3]** **Blacklist** a tenant (with reason) — flagged if they enquire again.
- **[P3]** Company / corporate lease: one billing contact, multiple occupants, consolidated
  invoice.

---

## F. Billing & Invoicing

- **[P1]** Charge types: Rent, Security deposit, Electricity, Water, Maintenance/society,
  Wi-Fi/internet, Mess/food, Housekeeping, Parking, Gas/cylinder, Late fee/penalty,
  Damage/repair recovery, One-time (key deposit, painting, registration), Custom.
- **[P1]** **Recurring charges** configured per tenancy (e.g. rent ₹X, Wi-Fi ₹Y, parking ₹Z).
- **[P1]** **Electricity billing modes** per unit/tenancy:
  - *Sub-meter reading*: previous reading, current reading, units consumed, rate/unit,
    fixed charge → amount auto-computed; meter photo attached.
  - *Fixed monthly amount*.
  - *Shared/split*: total bill split across units by equal share, by headcount, or by a
    custom ratio.
- **[P1]** **Water billing**: fixed, per head, or metered.
- **[P1]** **Invoice generation**: automatic monthly batch per due day + manual ad-hoc
  invoice.
- **[P1]** Invoice contents: line items, subtotal, discount, tax/GST (configurable, off by
  default), previous-balance carry-forward, total due, due date, notes.
- **[P2]** **Proration** for mid-month move-in / move-out.
- **[P2]** **Late fee** auto-applied after a grace period: flat, % of due, or per-day, with
  a cap.
- **[P1]** **Branded invoice PDF** (logo, business details) — downloadable, attached to
  WhatsApp + email.
- **[P2]** **Credit notes / adjustments / waivers** with reason and audit trail.
- **[P2]** **Partial payments** and payment allocation rules (oldest-first / by charge type).
- **[P1]** **Tenant ledger / statement of account**: every charge, payment, adjustment;
  running balance; downloadable PDF.
- **[P2]** **Outstanding aging** buckets: 0–30 / 31–60 / 61–90 / 90+ days.
- **[P1]** **Deposit ledger** kept separate from rent ledger.
- **[P2]** Bulk actions: generate all invoices for a month, send all reminders, apply late
  fees.
- **[P1]** Invoice numbering series per financial year; sequential, gap-free.
- **[P3]** GST tax invoice format + HSN/SAC when the owner is GST-registered.
- **[P3]** TDS-on-rent note on invoices for corporate tenants.

---

## G. Payments & Collections

- **[P1]** **Razorpay** integration: Payment Links per invoice (UPI, cards, netbanking,
  wallets); unique link embedded in every WhatsApp/email reminder.
- **[P1]** **Auto-reconciliation** via Razorpay webhook → invoice marked paid → receipt
  generated and sent → reminders stop for that invoice.
- **[P1]** **Offline payment entry**: cash / cheque / bank transfer with proof upload;
  optional approval step; receipt generated.
- **[P1]** **Receipts** auto-generated (branded PDF), sent on WhatsApp + email, downloadable
  from the portal.
- **[P2]** **UPI Autopay / e-mandate** for rent (Razorpay recurring) — tenant approves once,
  rent auto-debits monthly on the due day.
- **[P2]** **Reminder cadence engine**: configurable schedule (e.g. T-3, T-1, T0, T+1, T+3,
  T+7, T+15) with escalating message tone; auto-stop on payment; quiet hours respected.
- **[P2]** **Collection dashboard**: expected vs collected this month, overdue list sorted
  by amount/age, today's follow-up queue.
- **[P2]** **Promise-to-pay** capture — tenant/staff logs a promised date; follow-up
  re-scheduled to that date.
- **[P2]** **Deposit refund** via Razorpay Payout or manual, tracked against the deposit
  ledger.
- **[P3]** **Owner payout / settlement** tracking — how much of collected money has been
  transferred to the owner, per property.
- **[P3]** Convenience-fee pass-through option (charge the payment-gateway fee to tenant).
- **[P4]** BBPS integration to pay the actual electricity board bill on the owner's behalf.

---

## H. WhatsApp Automation

Detailed in [07 — WhatsApp Automation](07-whatsapp-automation.md). Summary:

- **[P1]** BSP adapter (AiSensy / Gupshup / Twilio / Interakt) behind one internal interface
  so the provider can be swapped via config.
- **[P1]** Approved **template messages** for: enquiry acknowledgement, visit reminder,
  welcome/onboarding, rent invoice, rent reminder (multi-stage), payment received/receipt,
  electricity bill, water bill, generic bill, due-today, overdue, late-fee applied.
- **[P2]** Templates for: agreement ready to sign, signed-agreement copy, agreement-expiry
  reminder, renewal offer, notice acknowledgement, move-out settlement, deposit-refund
  initiated, maintenance ticket updates, planned outage / maintenance notice, festival
  greetings, general announcement/broadcast.
- **[P1]** Variable merge (tenant name, amount, month, due date, payment link, property,
  unit).
- **[P1]** **Scheduler** (Celery Beat): a daily job computes and queues all messages due
  that day.
- **[P2]** **Two-way**: inbound webhook logs replies against the tenant; keyword
  auto-replies — `BALANCE` → outstanding, `PAY` → payment link, `RECEIPT` → last receipt;
  anything else routed to staff inbox.
- **[P2]** **Broadcast** to segments: all tenants, overdue tenants, a specific property,
  tenants on notice, prospects.
- **[P1]** **Delivery tracking** (sent / delivered / read / failed) with retry; **[P2]**
  fallback to SMS or email on failure.
- **[P2]** Opt-out handling, per-tenant channel preference, quiet hours.
- **[P2]** Per-message / per-conversation **cost log**.
- **[P3]** Template management UI (create, submit for approval, track status).
- **[P4]** AI WhatsApp agent that answers enquiry questions and books visits.

---

## I. Maintenance / Complaints / Tickets

- **[P1]** Tenant raises a ticket (portal or WhatsApp): category (plumbing / electrical /
  appliance / carpentry / pest control / internet / cleaning / security / structural /
  other), description, photos, priority.
- **[P1]** Ticket workflow: `Open → Assigned → In progress → On hold → Resolved → Closed`;
  assignee (staff or vendor); internal notes vs tenant-visible comments.
- **[P2]** **SLA timers** per priority; breach highlighting; escalation to manager.
- **[P2]** **Vendor directory**: trades, contact, rate card; cost recorded per ticket;
  recharge to tenant when it's tenant-caused damage (auto-creates a charge on next invoice).
- **[P2]** WhatsApp status updates to the tenant at each stage; tenant rates the resolution.
- **[P2]** **Preventive maintenance schedules**: AC service, water-tank cleaning, pest
  control, DG/inverter service, fire-extinguisher refill — recurring, with reminders and
  completion logging.
- **[P3]** **Asset register**: appliances per unit with model, purchase date, warranty
  expiry, service history.
- **[P3]** Common-area / building-level tickets (not tied to a unit).

---

## J. Staff / Team Management

- **[P1]** Staff accounts with roles: Owner/Admin, Property Manager, Accountant,
  Field/Maintenance, Front desk, Read-only. (Full matrix in
  [03 — Roles & Permissions](03-user-roles-and-permissions.md).)
- **[P1]** Assign staff to specific properties; they only see their properties.
- **[P1]** **Audit log** — who changed what, when (money, status, agreement, tenant data).
- **[P2]** Task management: assign tasks/checklists (turnover cleaning, visit, meter round),
  due dates, completion.
- **[P3]** Field-staff check-in / geo-tagged task completion.
- **[P3]** Internal notes / @mentions on tenants, units, tickets.

---

## K. Accounting & Finance

- **[P2]** **Income** auto-captured from invoices/payments (rent, utilities, fees, other).
- **[P2]** **Expenses**: society maintenance, electricity/water bills paid by owner,
  salaries, repairs, brokerage, marketing, supplies, misc — category, vendor, date, amount,
  receipt upload, tagged to a property.
- **[P3]** **Per-property P&L**: income − expenses, with occupancy and gross-yield /
  ROI figures.
- **[P3]** Cash-flow statement, monthly summary, year-to-date.
- **[P3]** **Owner drawings / payouts** ledger.
- **[P3]** **Exports**: Tally XML, Zoho Books CSV, generic CSV/Excel.
- **[P3]** GST output report; **[P4]** e-invoicing.
- **[P4]** Expense capture by photographing a bill (OCR → draft expense).

---

## L. Reports & Analytics

Detailed widgets in [09 — Admin Dashboard](09-admin-dashboard.md). Reports available:

- **[P1]** **Rent roll** — every unit: tenant, rent, status, agreement start/end, deposit.
- **[P1]** **Occupancy** — % by property and overall; occupied / vacant / notice counts.
- **[P1]** **Collections** — billed vs collected vs outstanding, per month, per property.
- **[P2]** **Aging report** — outstanding by 0–30 / 31–60 / 61–90 / 90+.
- **[P2]** **Upcoming vacancies** — units vacating in the next 30 / 60 / 90 days.
- **[P2]** **Agreements expiring soon** — next 30 / 60 / 90 days.
- **[P2]** **Utility consumption trends** — units/₹ per unit and per property over time.
- **[P2]** **Lead funnel & source performance** — enquiries → visits → conversions.
- **[P2]** **Vacancy days** — average turnaround per unit.
- **[P3]** **Tenant churn / retention** and average tenancy length.
- **[P3]** **Maintenance cost** — by category, by property, recharged vs absorbed.
- **[P1]** Every report: custom date range, filter by property, export PDF/Excel.
- **[P3]** Scheduled email reports (weekly collections, monthly P&L) to the owner.

---

## M. Tenant Self-Service Portal

Detailed in [11 — Tenant Portal](11-tenant-portal.md). Summary:

- **[P1]** Phone-OTP login.
- **[P1]** Dashboard: current dues, next due date, one-tap **Pay now**.
- **[P1]** Invoices & receipts list; download PDFs; full payment history; ledger/statement.
- **[P2]** Rental agreement copy download; KYC document status.
- **[P1]** Raise & track maintenance tickets with photos.
- **[P2]** Submit a meter reading + photo (if the owner allows tenant-submitted readings).
- **[P2]** Notices & announcements feed; house rules & shared documents (Wi-Fi password,
  guidelines).
- **[P2]** Request to vacate / start move-out.
- **[P2]** Update profile, emergency contact, vehicle.
- **[P3]** PG: roommate info, mess menu, mess on/off.
- **[P3]** Refer a friend (referral reward tracking).
- **[P1]** Contact manager / open WhatsApp.

---

## N. Notifications (multi-channel)

- **[P1]** Channels: WhatsApp (primary), Email, SMS, in-app.
- **[P1]** Per-event templates; **[P2]** per-user channel preferences and opt-out.
- **[P1]** **Admin/staff alerts**: new lead, payment received, ticket raised, invoice failed
  to send, tenant gave notice, agreement expiring, KYC pending too long, low-occupancy
  alert, meter reading missing before billing.
- **[P2]** Digest option (daily summary instead of per-event).

---

## O. Documents & Templates

- **[P1]** Central **document vault** per tenant / unit / property: agreements, KYC, police
  verification, invoices, receipts, inventory photos, meter photos, settlement statements.
- **[P1]** Generated PDFs: invoice, receipt, tenant ledger.
- **[P2]** Templates with merge fields: rental agreement, police verification form, rent
  receipt (for tenant's HRA), notice letter, move-out settlement statement, NOC.
- **[P2]** Template versioning; which version a given agreement used is recorded.
- **[P2]** Signed-URL access, expiry tracking on agreements & KYC.
- **[P3]** Watermarking on shared copies.

---

## P. Configuration / Settings

- **[P1]** Business profile: legal name, address, GSTIN (optional), logo, brand colour,
  contact — used on invoices, receipts and the public site.
- **[P1]** Master data: properties, units, amenity list, charge types & default rates.
- **[P1]** Billing policy: grace period, late-fee rule, invoice number series, financial
  year start, default due day.
- **[P1]** Electricity rate(s) / slabs, fixed charges; water charge defaults.
- **[P1]** Integration credentials: BSP (WhatsApp), Razorpay keys, SMS, SMTP/email, Sentry,
  Maps, e-sign, storage.
- **[P2]** Notification rules & reminder cadence editor.
- **[P1]** Users, roles, permissions, property assignments.
- **[P2]** Localization: currency (INR), timezone (Asia/Kolkata), date format, language.
- **[P3]** Public-site CMS content.
- **[P2]** Agreement clause library.

---

## Q. Advanced / Future (P4 unless noted)

- Mobile apps (React Native) — tenant app + field-staff app.
- Smart access: app/RFID/biometric door locks, visitor management, digital gate pass.
- IoT smart electricity meters — automatic reading ingestion.
- Aadhaar-based tenant verification API; DigiLocker KYC fetch.
- **Channel manager** — push vacant listings to NoBroker / MagicBricks / 99acres / Housing /
  OLX; sync status back.
- Google Business Profile / Maps listing sync; WhatsApp product catalogue of rooms.
- Dynamic pricing suggestions based on occupancy and season.
- **Mess / food management** — menu planner, attendance, vendor billing, feedback.
- **Laundry management** — pickup schedule, counts, billing.
- Procurement / inventory for PG consumables.
- Referral & loyalty programme with reward wallet.
- **AI**: enquiry chatbot, rent-default risk scoring, auto-triage of tickets, OCR for KYC &
  meter photos, WhatsApp AI concierge, expense-bill OCR.
- Renter's insurance add-on at onboarding.
- Community feed / events board with read-acknowledgement.
- **Short-stay mode** — nightly pricing, availability calendar, Airbnb-style booking.
- **Multi-owner SaaS** — self-serve signup, workspace isolation, per-owner subscription
  billing, super-admin console. (Data model already namespaces by `organization`.)
