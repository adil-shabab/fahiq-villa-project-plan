# 15 — Glossary

| Term | Meaning |
|---|---|
| **Property** | A building / house / PG / hostel / commercial premises owned or operated by the business. Has many units. |
| **Unit / Room** | A lettable space inside a property — an apartment (1RK/1BHK/2BHK…), an independent room, a PG bed's parent room, or a commercial space. Has a rent, deposit, status and amenities. |
| **Bed** | An individual sleeping slot in a shared PG room; billed and occupied independently. |
| **BHK** | "Bedroom, Hall, Kitchen" — Indian shorthand for flat size. 2BHK = 2 bedrooms + living room + kitchen. |
| **1RK** | "1 Room Kitchen" — a single room with an attached kitchen, no separate bedroom. |
| **PG** | "Paying Guest" accommodation — shared lodging, usually per bed, often with food and housekeeping included. |
| **Amenity** | A feature/facility of a unit or property (AC, Wi-Fi, parking, lift, CCTV, mess…). |
| **Furnishing** | `unfurnished` (bare), `semi-furnished` (basics — fans, lights, wardrobes), `fully-furnished` (beds, appliances, sofa…). |
| **Status (unit)** | `available`, `booked` (token paid), `occupied`, `notice` (tenant vacating on a date), `maintenance`, `blocked` (not listed). |
| **Listed** | The unit is published on the public website (`is_listed = true`). |
| **Lead / Enquiry** | A prospective tenant who has shown interest (website form, WhatsApp, call, walk-in). Moves through a pipeline to conversion. |
| **Visit** | A scheduled property viewing for a lead. |
| **Onboarding** | The process of turning a lead/applicant into an active tenant: application, KYC, agreement, inspection, unit assignment. |
| **KYC** | "Know Your Customer" — identity verification via Aadhaar / PAN / driving licence / passport + photo. |
| **Aadhaar** | India's 12-digit national identity number. |
| **PAN** | India's Permanent Account Number (tax ID). |
| **Police / tenant verification** | Statutory form landlords submit to local police with tenant details. |
| **Tenant** | A person living in (or contracted to) a unit. |
| **Co-tenant** | An additional adult on the same tenancy (shares liability / occupancy). |
| **Guarantor** | A third party who guarantees the tenant's obligations. |
| **Tenancy / Lease** | The contractual occupation of a unit by a tenant: terms (rent, deposit, dates, escalation, notice period), status, and all associated billing. |
| **Rental agreement** | The signed legal document for a tenancy; generated from a template, e-signed or uploaded. |
| **Lock-in period** | Minimum months the tenant must stay (or pay) before leaving without penalty. |
| **Notice period** | Days of advance notice either party must give before ending the tenancy. |
| **Escalation** | Automatic annual rent increase by a set percentage on the tenancy anniversary. |
| **Move-in inspection / inventory** | A recorded condition check (with photos) of furniture and fittings at the start of a tenancy; compared at move-out. |
| **Meter reading** | Recorded electricity/water/gas meter value (previous + current) used to compute a utility charge. |
| **Sub-meter** | A per-unit meter downstream of the main property meter, enabling per-room utility billing. |
| **Shared / split billing** | Dividing one meter's bill across several units by equal share, headcount, or a custom ratio. |
| **Charge type** | A category of money owed: rent, electricity, water, maintenance, Wi-Fi, mess, parking, gas, late fee, damage, one-time, custom. |
| **Recurring charge** | A charge type + fixed amount billed every period for a tenancy. |
| **Billing period** | A calendar month (`YYYY-MM`) an invoice covers. |
| **Billing run** | The scheduled job that generates invoices for all due tenancies on a given day. |
| **Invoice** | The itemized bill for one tenancy for one period (or ad-hoc). Immutable once issued. |
| **Line item** | One row on an invoice (a charge, with quantity, rate, amount, optional period for proration). |
| **Proration** | Charging a partial amount when a tenant occupies a unit for only part of a period. |
| **Carry-forward** | Prior unpaid balance reflected on / alongside a new invoice. |
| **Grace period** | Days after the due date before a late fee applies. |
| **Late fee** | A penalty charge added when an invoice is unpaid past the grace period (flat / % / per-day, capped). |
| **Credit note** | A document that reduces what a tenant owes — a discount, waiver, adjustment, or correction. |
| **Ledger** | The append-only running account for a tenancy: charges (debit) vs payments (credit) → balance. |
| **Deposit ledger** | A separate account tracking the security deposit: collected, deducted, refunded, forfeited. |
| **Statement of account** | A date-ranged export of the ledger; doubles as itemized rent receipts (e.g. for HRA claims). |
| **Aging** | Bucketing overdue amounts by how long they've been outstanding (0–30 / 31–60 / 61–90 / 90+ days). |
| **HRA** | "House Rent Allowance" — an Indian salary component; tenants need rent receipts to claim tax exemption. |
| **Payment** | Money received against a tenancy, online (Razorpay) or offline (cash/cheque/transfer). |
| **Allocation** | Assigning a payment (or part of it) to specific invoices. |
| **Reconciliation** | Matching gateway/bank records to recorded payments and invoice balances. |
| **Payment Link** | A Razorpay-hosted URL for paying a specific invoice; embedded in WhatsApp/email reminders. |
| **UPI** | "Unified Payments Interface" — India's instant bank-to-bank payment system. |
| **UPI Autopay / e-mandate** | A one-time tenant authorization letting rent auto-debit each month. |
| **Payout** | An outbound transfer from the business to a tenant (deposit refund) or to the owner. |
| **Razorpay** | The payment gateway used for links, checkout, autopay, and payouts. |
| **BSP** | "Business Solution Provider" — a WhatsApp partner (AiSensy, Gupshup, Twilio, Interakt) that provides API access to the WhatsApp Business Platform. |
| **WABA** | "WhatsApp Business Account" — the Meta account a business messages from. |
| **Template message** | A pre-approved WhatsApp message format required for business-initiated messages; supports variables. |
| **Session / 24-hour window** | The period after a user messages the business during which free-form (non-template) replies are allowed. |
| **Utility vs marketing (template category)** | WhatsApp classification: transactional (bills, reminders) vs promotional (offers, greetings); marketing must strictly honour opt-out. |
| **Opt-in / opt-out** | A tenant's consent (or withdrawal) to receive messages on a channel. |
| **Quiet hours** | A daily window during which non-critical messages are not sent. |
| **Reminder cadence** | The configured schedule of reminder messages relative to an invoice's due date. |
| **Dunning** | The overall process of communicating with tenants to collect overdue payments. |
| **Promise-to-pay** | A logged commitment from a tenant to pay by a specific date; pauses reminders until then. |
| **Broadcast** | A one-to-many message to a segment of tenants/leads. |
| **Announcement** | A notice posted to the tenant portal for a property or all tenants, optionally requiring acknowledgement. |
| **Maintenance ticket** | A logged repair/complaint request with category, priority, assignee, status, and cost. |
| **SLA** | "Service Level Agreement" — the target time to respond to / resolve a ticket by priority. |
| **Preventive maintenance** | Scheduled recurring upkeep (AC service, tank cleaning, pest control) done before something breaks. |
| **Vendor** | An external service provider (plumber, electrician, pest control) used for maintenance. |
| **Asset register** | A record of appliances/equipment per unit with make, warranty, and service history. |
| **Owner payout** | A recorded transfer of collected funds to the property owner. |
| **P&L** | "Profit and Loss" — income minus expenses, here reported per property and consolidated. |
| **RBAC** | "Role-Based Access Control" — permissions granted via named roles. |
| **Object scoping / property scoping** | Restricting a staff user's data access to their assigned properties. |
| **Change request** | A pending, approval-gated action (e.g. editing tenancy terms, large waiver) awaiting an admin's sign-off. |
| **Audit log** | An immutable record of who changed what, when (before/after values). |
| **Webhook** | An inbound HTTP callback from a provider (Razorpay, BSP, e-sign) notifying us of an event. |
| **Idempotency** | Designing an operation so running it twice has the same effect as running it once (critical for billing, payments, sends). |
| **Signed URL** | A time-limited URL granting temporary access to a private file. |
| **DPDP Act** | India's Digital Personal Data Protection Act, 2023 — the applicable data-privacy law. |
| **GST** | India's Goods and Services Tax; relevant if the owner is registered and must issue tax invoices. |
| **TDS on rent** | Tax Deducted at Source — some (usually corporate) tenants deduct tax before paying rent. |
| **e-sign** | Legally valid electronic signing of the rental agreement (Aadhaar eSign / Digio / Leegality). |
| **Token / advance** | A small upfront payment a prospect makes on the website to reserve a unit (moves it to `booked`). |
| **Booking hold** | The number of days a `booked` unit is held before it auto-reverts to `available` if onboarding doesn't start. |
| **Turnover** | The work between one tenant leaving and the next arriving (cleaning, repairs, re-listing). |
| **Celery / Celery Beat** | The background task queue and its scheduler that run billing, reminders, PDFs, and notifications. |
| **Organization** | The top-level account container; a single business in v1, but namespaced so a future multi-owner SaaS is possible. |
