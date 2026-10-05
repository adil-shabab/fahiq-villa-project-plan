# 18 — Stitch Prompts: Page by Page

A running collection of granular [Stitch](https://stitch.withgoogle.com) prompts for the
admin dashboard, one page at a time — each page's main screen plus every modal/dropdown/
function that belongs to it. Companion to [16](16-stitch-dashboard-prompt.md) (whole-app
overview prompts) and [17](17-stitch-property-unit-module-prompt.md) (Property & Unit
module in depth). Paste into the same Stitch project as those for a consistent system.

## Full sidebar (all pages)

```
Home
Properties
 ├─ Units / Rooms
 ├─ Beds (PG)
 ├─ Amenities
 └─ Meter Readings
Listings (public site)
Leads / Enquiries
 └─ Visits Calendar
Onboarding
Tenancies
 ├─ Renewals
 └─ Notices & Move-outs
Billing
 ├─ Invoices
 ├─ Billing Run
 └─ Credit Notes
Payments
 ├─ Collections
 ├─ Autopay Mandates
 └─ Refunds / Payouts
Maintenance
 ├─ Tickets
 ├─ Preventive Maintenance
 └─ Vendors / Assets
Messaging
 ├─ Inbox (WhatsApp 2-way)
 ├─ Broadcasts
 ├─ Announcements
 └─ Templates
Finance
 ├─ Expenses
 ├─ Owner Payouts
 └─ P&L
Reports
Documents
Settings
Users & Roles
Audit Log
```

Properties and Units already have their own dedicated deep-dive in
[17 — Stitch Property & Unit Module](17-stitch-property-unit-module-prompt.md); this file
covers the rest of the sidebar, page by page, on request.

---

## Page 1 — Dashboard Home

### Main page prompt
```
Design the "Dashboard Home" screen — the first page a staff member sees after logging in.
Top of the content area: a greeting header "Good morning, Priya" with today's date
underneath in muted text, and a row of 4 quick-action buttons on the right: "+ Add
Property", "+ Add Unit", "+ New Lead", "Run Billing".

KPI row: 8 stat cards in a responsive grid. Each card has a small uppercase label, a large
bold number, and a small trend indicator (up/down arrow + percentage, green for good/red
for bad) or a tiny sparkline. Cards: "Occupancy Rate" (87%, ↑2%), "Units Occupied"
(142 / 163), "Total Properties" (12), "Expected Rent This Month" (₹18,42,000), "Collected
So Far" (₹14,20,500), "Outstanding" (₹4,21,500, red), "Overdue Tenants" (12, red), "New
Leads This Week" (9, ↑).

Below the KPI row, a two-column analytics section:
- Left column (wider): a "Collection Trend" combo chart — bars for Billed and Collected
  side by side per month, over the last 6 months, with a legend; below it an "Occupancy
  Trend" smooth area chart over the last 12 months with the occupied-units line and a
  faint fill.
- Right column (narrower): an "Outstanding Aging" donut chart with 4 segments (0-30,
  31-60, 61-90, 90+ days) color-coded from amber to red, with a legend showing amount per
  bucket; below it a "Revenue by Property" horizontal bar chart, top 5 properties by
  monthly rent roll.

Below the charts, a two-column panel row:
- "Action Required" card: a vertical list of clickable rows, each with an icon, a short
  label, and a count badge — "5 leases expiring in 30 days", "8 KYC documents pending
  verification", "3 units missing this month's meter reading", "6 unread WhatsApp
  messages", "2 offline payments awaiting approval".
- "Today's Move-ins & Move-outs" card: two small lists side by side — "Moving in today"
  and "Moving out today" — each row showing tenant name, unit code, and a small avatar.

Below that, a full-width "Today's Follow-up Queue" table: columns Tenant (avatar + name),
Unit, Property, Amount Due (₹, tabular numerals), Days Overdue (colored badge), and a
"Remind" button per row that opens a WhatsApp icon action.

At the very bottom, a compact "Recent Activity" feed as a vertical timeline with small
icons: "Payment received from Rahul Sharma · ₹15,000 · 2 min ago", "New enquiry from
website · Green View Residency · 14 min ago", "Ticket #204 marked resolved · 1 hour ago".
```

### Modal / function 1 — Notifications panel
```
Design a "Notifications" slide-in panel that opens from the bell icon in the top bar,
sliding in from the right over the dashboard (with a dimmed overlay behind it). Header:
"Notifications" title, "Mark all as read" link, and a close (X) button. Below it, tabs
"All / Unread". A list of notification rows grouped under date headers ("Today",
"Yesterday"), each row with a category icon (payment/lead/ticket/agreement), a short
message, a relative timestamp, and an unread indicator dot on unread items. Footer link
"View all activity →".
```

### Modal / function 2 — Portfolio / property switcher
```
Design a "Property Switcher" dropdown that opens from the property selector in the top
bar. A small search input at the top ("Search properties"), then a list: "All Properties"
pinned at the top with a portfolio icon and total unit count, followed by each individual
property as a row with a small thumbnail, name, and unit count, with the currently
selected one highlighted in teal.
```

### Modal / function 3 — Global search (command palette)
```
Design a "Global Search" command-palette modal, centered overlay on a dimmed background,
opened via the search bar or a Cmd+K shortcut. A large search input at the top with a
search icon and a small "ESC to close" hint. Below it, when empty, show a "Recent" section
with a few recently viewed items (tenant, invoice, unit) as clickable rows with icons. When
typing, show grouped results under category headers — Tenants, Units, Invoices, Properties
— each result row with an icon, primary text, and secondary muted detail (e.g. unit code
under a tenant name).
```

### Modal / function 4 — Send reminder confirmation
```
Design a small confirmation modal titled "Send Payment Reminder", triggered by the
"Remind" button in the follow-up queue table. Shows the tenant's name and avatar, the
invoice amount and days overdue, a preview card styled like a WhatsApp message bubble
showing the actual reminder text that will be sent (with the tenant's name and a payment
link placeholder), a channel indicator ("via WhatsApp"), and two buttons: secondary
"Cancel" and primary "Send Reminder".
```

### Modal / function 5 — User account menu
```
Design a small dropdown menu that opens from the user avatar in the top-right of the top
bar. Shows the user's name, email, and role badge at the top, then menu items with icons:
"My Profile", "Settings", "Help & Support", a "Dark Mode" toggle switch inline, and a
"Sign Out" item in red at the bottom, separated by a divider.
```

---

## Page 2 — Listings (public site)

### Main page prompt
```
Design the "Website Listings" screen — where staff manage which units are published to
the public marketing site. Header: title "Website Listings", subtitle "42 of 163 units
currently live", a Grid/Table toggle, and a "Manage Locality Pages" secondary button top
right.

Summary strip below the header: 4 small stat cards — "Live Listings" (42), "Views This
Month" (3,214, with a sparkline), "Enquiries This Month" (58), "Conversion Rate" (1.8%).

Filter bar: search box, Property dropdown, a segmented Listed/Unlisted/All filter, and a
Unit Type filter (1RK/Studio/1BHK/2BHK/3BHK/PG Bed/Commercial).

Table with row checkboxes for bulk selection, columns: thumbnail photo, Unit Code,
Property, Type badge, Rent (₹), a "Listed" toggle switch inline in the row (on = teal,
off = grey), Views (number), Enquiries (number), Listing Title (truncated text), and a
row action menu (Edit Listing Copy / Preview on Website / Unlist).

Bulk-action bar appears when rows are selected: "Publish Selected", "Unpublish Selected".
```

### Modal / function 1 — Edit listing copy
```
Design an "Edit Listing Copy" modal for a single unit. Shows a small thumbnail + unit code
at the top for context. Fields: Listing Title (text input, pre-filled with a suggestion
like "Spacious 2BHK near MG Road Metro"), Listing Description (textarea), SEO Meta
Description (smaller textarea with a character counter, max 160), and a read-only auto-
generated URL Slug field with a copy icon. Below the fields, a live "Preview" card on the
right half of the modal showing how the title/description/photo will look as a listing
card on the website. Footer: "Cancel" and primary "Save Changes" buttons.
```

### Modal / function 2 — Website preview
```
Design a "Preview on Website" modal styled like a browser window frame (address bar
showing the public URL, e.g. fahiq.in/rooms/green-view-a-101-2bhk). Inside the frame, show
the actual public listing detail page as it would appear to a visitor: photo gallery, rent
and deposit, amenities icons, description, location map — matching an editorial, SEO-
focused site style (distinct from the dashboard's utility style). Footer: "Open in New
Tab" and "Close" buttons.
```

### Modal / function 3 — Unlist confirmation
```
Design a small confirmation dialog titled "Remove from Website?", triggered by "Unlist" in
the row menu. Body text: "This unit will no longer appear in search results or be
bookable on the public site. You can re-list it anytime." An optional reason dropdown
(Rented elsewhere / Owner request / Listing paused / Other). Footer: secondary "Cancel"
and a red/destructive "Unlist Unit" button.
```

### Modal / function 4 — Locality SEO pages
```
Design a "Manage Locality Pages" panel (slide-over from the right or full modal). Header
"Locality Pages" with a "+ Add Locality Page" button. A list of existing pages as rows:
locality name (e.g. "Koramangala"), number of listings shown on that page, monthly views,
and an edit icon. Each row expandable/clickable to a small inline editor with fields:
Locality Name, Intro Copy (textarea), Meta Title, Meta Description, and a "Featured
Listings" reorderable list of units pinned to that page.
```

---

## Page 3 — Leads / Enquiries

### Main page prompt
```
Design the "Leads" screen — a sales-pipeline view of prospective tenants. Header: title
"Leads", subtitle "34 active leads", a Kanban/List view toggle, and a primary "+ New Lead"
button top right.

Filter bar: search box, Source dropdown (Website, WhatsApp, Call, Walk-in, Broker,
Referral), Assigned To dropdown (staff avatars), and a "Follow-up overdue" toggle.

Default Kanban view: 7 columns — New, Contacted, Visit Scheduled, Visited, Negotiating,
Won, Lost — each column header shows a count badge. Each lead card: prospect name, phone
number with small call and WhatsApp icons, interested unit/property as a chip (e.g. "2BHK
· Green View"), budget range (₹12,000–₹15,000), a small assignee avatar bottom-left, and a
follow-up date bottom-right shown as a red badge if overdue, amber if due today, grey if
upcoming. Cards are draggable between columns (show a card mid-drag with a drop-shadow as
a visual cue). "Lost" column cards appear slightly faded with a small lost-reason tag.

Include a secondary List view (reachable via the toggle): a table with columns Name,
Phone, Source, Interested Unit, Budget, Stage (colored pill), Assigned To, Follow-up Date,
Actions.
```

### Modal / function 1 — New lead
```
Design a "New Lead" modal/side-panel form. Fields: Name (required), Phone (required),
Email (optional), Source (dropdown: Website, WhatsApp, Call, Walk-in, Broker, Referral,
Marketplace), Interested Property (dropdown) and Interested Unit (dependent dropdown,
optional), Budget Min – Budget Max (two ₹ fields side by side), Move-in Date (date picker),
Tenant Type (dropdown: Family, Bachelor Male, Bachelor Female, Student, Working
Professional), Notes (textarea). Footer: "Cancel" and primary "Create Lead" buttons.
```

### Modal / function 2 — Lead detail panel
```
Design a "Lead Detail" slide-over panel that opens from the right when a lead card is
clicked, over a dimmed background. Header: prospect name, phone/WhatsApp/call icon
buttons, a stage dropdown pill (editable inline), and a close (X) button. Below it, a
compact info card: source, interested unit, budget, move-in date, tenant type, assigned
staff with a reassign icon.

Action row: buttons "Schedule Visit", "Send Listing Details" (WhatsApp icon), "Convert to
Onboarding" (primary, teal), and a "Mark as Lost" text link.

Below that, an "Activity Timeline" — a vertical feed of notes, calls, and status changes
each with a small icon, timestamp, and the staff member who logged it, with a text input
+ "Add Note" button pinned at the bottom to log a new activity.
```

### Modal / function 3 — Mark as lost
```
Design a small "Mark as Lost" confirmation modal. A required "Reason" dropdown (Budget
mismatch, Chose another property, Unresponsive, Timing didn't work, Other), an optional
notes textarea. Footer: "Cancel" and a red "Mark as Lost" button.
```

### Modal / function 4 — Schedule visit
```
Design a "Schedule a Visit" modal. Fields: Unit (dropdown, pre-filled if opened from a
lead already tied to one), Date (date picker), Time Slot (a row of selectable time chips
like 10:00 AM, 11:30 AM, 2:00 PM, 4:00 PM), Assigned Staff (dropdown with avatars), Notes
(optional). Footer: "Cancel" and primary "Schedule Visit" buttons.
```

### Modal / function 5 — Convert to onboarding
```
Design a "Convert to Onboarding" confirmation modal. Shows a summary card of the
information that will carry over: prospect name, phone, interested unit. Body text: "This
will start a new tenant onboarding using this lead's details. The lead will be marked
Won." Footer: "Cancel" and a primary "Start Onboarding →" button.
```

---

## Page 3b — Visits Calendar

### Main page prompt
```
Design the "Visits Calendar" screen, reached from the Leads section. Header: title "Visits
Calendar", a Day/Week view toggle, date navigation arrows with "Today" button, and a
primary "+ Schedule Visit" button.

Main area: a weekly calendar grid, days as columns (Mon–Sun) and hourly time slots as
rows. Scheduled visits appear as colored blocks within the grid showing prospect name and
unit code, color-coded by outcome status (upcoming = teal, done = green, no-show = red,
cancelled = grey/strikethrough). Staff members with visits today are shown as small
swimlane avatars at the top of each day column when in a staff-grouped view.

Right sidebar panel: "Today's Visits" — a vertical list of today's scheduled visits as
compact cards (time, prospect name, unit, staff avatar), each clickable.
```

### Modal / function 1 — Visit detail / log outcome
```
Design a "Visit Detail" popover/modal, opened by clicking a calendar block. Shows
prospect name, phone, unit, date/time, and assigned staff at the top. Below, an "Outcome"
section with a segmented control (Visited / No-show / Cancelled / Rescheduled) and a notes
textarea for what happened. Footer: "Reschedule" secondary button and a primary "Save
Outcome" button.
```

---

## Page 4 — Onboarding

### Main page prompt — Onboarding list
```
Design an "Onboarding" list screen — tracks every tenant currently being onboarded.
Header: title "Onboarding", subtitle "6 in progress", a primary "+ Start Onboarding"
button top right (opens a small picker: choose a vacant unit, or convert from a won lead).

Table/card list, one row per in-progress onboarding: applicant name + avatar, target unit
(code + property), a 6-segment progress indicator (Applicant · KYC · Terms · Agreement ·
Inspection · Review) with completed segments filled teal, current segment pulsing, and
future segments grey, a "Started on" date, the assigned staff avatar, and a "Continue"
button. Completed onboardings (converted to active tenancies) appear in a collapsed
"Recently Completed" section below with a green check and a "View Tenancy" link.
```

### Wizard step 1 — Applicant & co-occupants
```
Design the "Add New Onboarding" screen as a 6-step wizard with a horizontal stepper:
1. Applicant · 2. KYC · 3. Terms · 4. Agreement · 5. Inspection · 6. Review — step 1
active. Show the target unit as a small locked summary chip at the top ("A-101 · 2BHK ·
Green View Residency").

Step 1 "Applicant" fields, in a form:
- Full Name (required), Phone (required), Email, Date of Birth, Gender (dropdown)
- Current Address (textarea), Permanent Address (textarea, with a "Same as current"
  checkbox)
- Occupation (segmented: Working Professional / Student / Business), Company or College
  Name, Monthly Income Band (dropdown, optional)
- Emergency Contact Name and Emergency Contact Phone (two fields side by side)
- Vehicle Details (optional repeatable rows: type, registration number)

Below the form, a "Co-occupants & Guarantor" card: a list of added co-occupants/guarantors
as compact rows (name, relation, phone) with a "+ Add Co-occupant" and "+ Add Guarantor"
button, each opening a small inline form (name, relation, phone, ID type).

Footer: "Cancel" and "Next: KYC Documents →".
```

### Wizard step 2 — KYC documents
```
Same wizard, step 2 "KYC" active. Four upload cards in a grid, one per document: Aadhaar
Card, PAN Card, Photo, and an optional "Other (Driving Licence / Passport)". Each card has
a dropzone or a preview thumbnail once uploaded, a status pill (Pending Review / Verified /
Rejected), and — visible to staff only — small "Verify" and "Reject" icon buttons that
appear on hover over an uploaded document.

A summary bar at the top of this step shows overall KYC progress: "2 of 4 documents
verified".

Footer: "← Back" and "Next: Lease Terms →" (disabled until all required documents are at
least uploaded).
```

### Wizard step 3 — Lease terms
```
Same wizard, step 3 "Terms" active. A form in two cards:

Card 1 "Lease Period & Rent": Start Date and End Date (date pickers side by side), Monthly
Rent (₹, pre-filled from the unit but editable), Security Deposit (₹), Maintenance Charge
(₹), Lock-in Period (months), Notice Period (days), Annual Escalation (%), Rent Due Day of
Month (1–31 selector).

Card 2 "Inclusions": checkboxes for "Water included in rent", "Wi-Fi included", "Parking
included" (with a Parking Spot dropdown if checked), plus a small repeatable "Additional
Recurring Charges" list (charge name + amount) with a "+ Add Charge" link.

Footer: "← Back" and "Next: Agreement →".
```

### Wizard step 4 — Agreement
```
Same wizard, step 4 "Agreement" active. A template preview panel on the left showing a
scrollable rendered rental-agreement document with the applicant's details already merged
in (name, unit, rent, dates highlighted in the text). On the right, an actions panel with
three options as selectable cards: "Send for e-Signature" (shows a provider badge like
Digio, and an "Send to [phone]" button), "Upload Signed Copy" (a dropzone for a scanned
PDF), or "Skip for now". Below, a small "Stamp / e-Stamp Details" collapsible section with
Stamp Duty Amount and Stamp Reference Number fields.

Once sent for e-sign, show a status chip "Awaiting Signature" with a "Resend" link and a
timestamp.

Footer: "← Back" and "Next: Move-in Inspection →".
```

### Wizard step 5 — Move-in inspection & opening readings
```
Same wizard, step 5 "Inspection" active. Two sections:

"Move-in Inventory": a table of furniture/appliance items (Item, Condition dropdown:
New/Good/Fair/Damaged, Photo thumbnail upload, Notes) with rows for common items (Bed,
Wardrobe, Fan, Geyser, Wi-Fi Router) pre-listed and a "+ Add Item" button to add more.

"Opening Meter Readings": a small card per utility (Electricity, Water) with a Reading
Value field and a photo-upload slot for the meter photo.

Footer: "← Back" and "Next: Review →".
```

### Wizard step 6 — Review & activate
```
Same wizard, step 6 "Review" active. A read-only collapsible summary of every prior step
(Applicant, KYC status, Terms, Agreement status, Inspection). A final checklist card at the
bottom showing green checks or amber warnings per requirement ("✓ KYC verified", "✓
Agreement signed", "⚠ Opening electricity reading missing"). A primary "Activate Tenancy"
button (disabled if any required item is missing) and a secondary "Save & Exit" button to
resume later.
```

### Modal / function 1 — Add co-occupant / guarantor
```
Design a small "Add Co-occupant" modal (reusable for Guarantor with a title change). Fields:
Full Name, Relation to Applicant (dropdown: Spouse, Parent, Sibling, Friend, Colleague,
Other), Phone Number, ID Type + ID Upload (optional for co-occupant, required for
guarantor). Footer: "Cancel" and "Add" buttons.
```

### Modal / function 2 — KYC document review
```
Design a "Review Document" modal, opened when staff clicks a KYC document thumbnail. Shows
a large preview of the uploaded document image/PDF on the left, and on the right: document
type label, upload date, a masked ID number field, and two large buttons "Verify
Document" (green) and "Reject Document" (red) — selecting Reject reveals a required reason
text field before confirming.
```

### Modal / function 3 — Activate tenancy confirmation
```
Design a final "Activate Tenancy?" confirmation modal. Body text: "This will mark unit
A-101 as Occupied, start the rent schedule from [date], and send a welcome message to the
tenant on WhatsApp." A small checklist recap (KYC verified, Agreement signed, Inspection
recorded). Footer: "Go Back" and a primary "Activate Tenancy" button.
```

---

## Page 5 — Tenancies

### Main page prompt — Tenancies list
```
Design a "Tenancies" list screen — every active lease. Header: title "Tenancies", subtitle
"142 active leases", a primary "+ New Tenancy" button (opens the Onboarding flow).

Filter bar: search box, Status filter chips (Active=blue, Notice=amber, Ending Soon=amber,
Ended=grey — multi-select), Property dropdown, and an "Expiring within 30 days" toggle.

Table: Tenant (avatar + name), Unit (code + property), Monthly Rent (₹), Lease Period
(start–end dates), Status pill, Outstanding Balance (₹, red if non-zero, else "Paid up" in
green), Agreement status icon (signed/pending/expired), and a row action menu (View /
Record Payment / Send Reminder / Renew / Record Notice).
```

### Tenancy detail — Overview tab
```
Design a "Tenancy Detail" page. Header: tenant name + avatar, unit code and property as a
breadcrumb, a status pill (Active/Notice/Ending Soon/Ended), monthly rent shown
prominently, and buttons "Record Payment", "Send Reminder", and a three-dot menu (Edit
Terms, Renew, Record Notice, Transfer Unit).

Tabbed navigation: Overview | Ledger | Invoices | Payments | Deposit | Recurring Charges |
Agreement & Documents | Inspections | Tickets | Communication Log.

Render the "Overview" tab: a "Tenant" card (photo, phone/WhatsApp/call icons, email,
emergency contact, KYC status badge), a "Lease Terms" card (start–end dates, deposit,
maintenance charge, lock-in, notice period, escalation %, due day, co-occupants list), and
a right-side "At a Glance" panel with 4 stat tiles: Outstanding Balance, Next Due Date,
Deposit Held, Days Until Lease End — plus a small "Recent Activity" feed below it (payment
received, ticket raised, reminder sent).
```

### Tenancy detail — Ledger tab
```
Same Tenancy Detail page and header. Render the "Ledger" tab: a running-balance table with
columns Date, Description, Debit (₹), Credit (₹), Balance (₹) — tabular numerals, debit
rows in default text, credit rows in green. A summary strip above the table shows Total
Billed, Total Paid, Current Balance. A "Download Statement" button top-right of the panel,
with a date-range picker beside it.
```

### Modal / function 1 — Edit lease terms
```
Design an "Edit Lease Terms" modal (or side-panel). Same fields as the onboarding Terms
step (Rent, Deposit, Maintenance Charge, Lock-in, Notice Period, Escalation %, Due Day),
pre-filled with current values, changed fields visually highlighted. A note at the bottom:
"Changes above ₹500 require Owner approval and will be submitted as a change request."
Footer: "Cancel" and a primary "Submit Changes" button (label changes to "Submit for
Approval" when a change requires it).
```

### Modal / function 2 — Add recurring charge
```
Design a small "Add Recurring Charge" modal. Fields: Charge Type (dropdown: Wi-Fi,
Parking, Maintenance, Mess, Housekeeping, Custom), Amount (₹), Starts From (month picker),
Ends On (optional, "No end date" checkbox), Notes. Footer: "Cancel" and "Add Charge".
```

### Modal / function 3 — Record notice to vacate
```
Design a "Record Notice to Vacate" modal. Fields: Notice Given By (segmented: Tenant /
Owner), Notice Date (date picker, defaults to today), and a read-only computed field
"Earliest Vacate Date" shown once the date is picked, calculated from the notice period
("22 Nov 2026 — based on 30-day notice period"). A notes textarea. Footer: "Cancel" and
primary "Record Notice" — confirming shows a small toast-style note "Notice acknowledgement
will be sent on WhatsApp."
```

### Modal / function 4 — Transfer tenant
```
Design a "Transfer to Another Unit" modal. Fields: New Unit (searchable dropdown, showing
only Available units), Effective Date (date picker), and a summary box explaining what
happens: "The current tenancy will end on this date and a new tenancy will start in the
new unit, carrying over the deposit of ₹30,000." Footer: "Cancel" and primary "Confirm
Transfer".
```

---

## Page 5b — Renewals

### Main page prompt
```
Design a "Renewals" screen — leases approaching their end date. Header: title "Renewals",
subtitle "5 leases expiring in the next 60 days". A table: Tenant, Unit, Current Rent,
Lease End Date, Days Remaining (colored: red under 15 days, amber under 30, grey beyond),
Renewal Status (Not Started / Offer Sent / Accepted / Declined as a pill), and a "Start
Renewal" action button per row.
```

### Modal / function 1 — Start renewal
```
Design a "Renew Lease" modal/wizard. Shows the current terms as a read-only reference
card, then editable fields for the new term: New Rent (₹, with the % increase shown live
next to it), New End Date, and a "Re-generate and send agreement for e-signature" checkbox
(checked by default). Footer: "Cancel" and primary "Send Renewal Offer" — once sent, the
row status updates to "Offer Sent" with a small WhatsApp icon confirming it was shared with
the tenant.
```

---

## Page 5c — Notices & Move-outs

### Main page prompt
```
Design a "Notices & Move-outs" screen. Header: title "Notices & Move-outs", subtitle "3
tenants on notice". A table: Tenant, Unit, Notice Given By (Tenant/Owner icon), Notice
Date, Vacate Date, Days Remaining, Settlement Status (Not Started / In Progress /
Completed as a pill), and a "Process Settlement" action button.
```

### Modal / function 1 — Move-out settlement
```
Design a "Move-out Settlement" full-page panel or large modal for a tenant vacating. Shows
a calculation summary card at the top: Deposit Held (₹30,000) minus Outstanding Dues
(₹2,400) minus Damage Deductions (₹1,000) minus Other Deductions (₹500) equals Refund
Amount (₹26,100), shown as a clear stacked subtraction list ending in a bold total. Below
it: a "Final Meter Readings" section (electricity/water reading inputs with photo upload),
a "Damage Deductions" repeatable line-item list (description + amount, sourced from the
inspection), and a "Refund Method" selector (Razorpay Payout to UPI / Bank Transfer /
Manual). Footer: "Save Draft" and a primary "Finalize Settlement & Initiate Refund" button.
```

---

## Page 6 — Billing

### Main page prompt — Invoices list
```
Design an "Invoices" screen. Header: title "Invoices", subtitle "48 invoices this period",
a "Generate Ad-hoc Invoice" secondary button and a primary "Run Billing" button top right.

Summary strip: 4 stat cards — "Total Billed" (₹18,42,000), "Total Collected" (₹14,20,500),
"Outstanding" (₹4,21,500), "Overdue Count" (12, red).

Filter bar: search box, Status filter chips (Draft=grey, Issued=blue, Partially Paid=amber,
Paid=green, Overdue=red, Void=grey-strikethrough — multi-select), Billing Period dropdown
(month picker), Property dropdown, an "Overdue only" toggle, and an "Electricity Pending"
warning filter for invoices missing a meter reading.

Table with row checkboxes for bulk actions, columns: Invoice # (monospace), Tenant, Unit,
Period, Amount (₹), Status pill, Due Date, Days Overdue (if applicable, red badge), and a
row action menu (View / Send / Download PDF / Add Credit Note / Void). A small warning
icon appears next to rows flagged "electricity_pending".

Bulk-action bar when rows selected: "Issue Selected", "Send Selected", "Apply Late Fees",
"Export".
```

### Invoice detail page
```
Design an "Invoice Detail" page. Header: Invoice number (large, monospace, e.g.
"INV-2026-0043"), a status pill, tenant name + unit as a subtitle, and buttons "Send",
"Download PDF", "Add Credit Note", and a three-dot menu (Void, Duplicate).

Main content, two columns: left column shows the invoice itself as a styled document
preview — business logo/name header, bill-to (tenant + unit), issue/due dates, an itemized
line-items table (Description, Quantity, Rate, Amount — e.g. "Rent · Sep 2026 · —·
₹15,000", "Electricity · 172 units · ₹8.50 · ₹1,462", "Wi-Fi · — · ₹500"), subtotal, tax
(if any), carry-forward balance, and a bold Total Due line. Right column: a "Payment
Status" card (Amount Paid, Balance Due, a "Generate Payment Link" button), and a "Payment
History" list below it showing each payment received against this invoice with date,
amount, and method icon.
```

### Billing run page
```
Design a "Billing Run" screen, reached via the "Run Billing" button. Step 1 "Setup": a
card with a Billing Period picker (month/year), a Scope selector (All Properties / Specific
Property dropdown / Specific Tenancy), and a large "Run Preview" button.

Step 2 "Preview" (shown after running): a results table, one row per tenancy — Tenant,
Unit, Rent, Electricity, Water, Other Charges, Total — with warning-icon rows highlighted
in a soft amber background for tenancies missing a meter reading, and a checkbox to
exclude a row from this run. A summary strip above the table: "142 tenancies · ₹18,42,000
total · 3 warnings". A large primary "Confirm & Issue Invoices" button and a secondary
"Cancel" button.

Step 3 "Results" (shown after confirming): a progress bar that completes, then a summary
card — "139 invoices issued successfully, 3 skipped (missing meter reading)" — with a
"View Issued Invoices" button and a "Retry Skipped" button.
```

### Credit notes list
```
Design a "Credit Notes" screen. Header: title "Credit Notes", subtitle "18 issued this
month", a "+ Add Credit Note" button. Table: Credit Note # (monospace), Related Invoice #,
Tenant, Type (pill: Discount/Waiver/Adjustment/Correction), Amount (₹, in green with a
minus sign), Reason (truncated text), Issued By, Approval Status (Approved / Pending
Approval pill), Date.
```

### Modal / function 1 — Generate ad-hoc invoice
```
Design a "Generate Ad-hoc Invoice" modal. Fields: Tenancy (searchable dropdown), Due Date
(date picker), and a repeatable line-items builder — each row has Charge Type (dropdown),
Description, Quantity, Unit Price (₹), with the row Amount auto-calculated and a running
Total shown at the bottom. A "+ Add Line" link to add more rows. Footer: "Save as Draft"
and primary "Create & Issue Invoice".
```

### Modal / function 2 — Send invoice
```
Design a "Send Invoice" modal. Shows the invoice number and tenant for context. Channel
checkboxes: WhatsApp (checked by default, shows a small message preview bubble with the
template text and payment link placeholder), Email, SMS. A "Send Now" vs "Schedule for
later" toggle with a date/time picker if scheduled. Footer: "Cancel" and primary "Send
Invoice".
```

### Modal / function 3 — Add credit note / waiver
```
Design an "Add Credit Note" modal. Fields: Type (segmented: Discount / Waiver / Adjustment
/ Correction), Amount (₹, with a live "New balance after credit: ₹X" preview shown below
as it's typed), Reason (required textarea). If the amount exceeds the current user's
approval limit, show an amber notice: "This exceeds your ₹1,000 limit and will require
Owner approval." Footer: "Cancel" and primary "Add Credit Note" (label becomes "Submit for
Approval" when over-limit).
```

### Modal / function 4 — Void invoice
```
Design a small "Void Invoice?" confirmation modal. Warning icon, body text: "This invoice
will be marked void and excluded from collections. This cannot be undone. Use a credit
note instead if you just need to adjust the amount." A required reason textarea. Footer:
"Cancel" and a red "Void Invoice" button.
```

---

## Page 7 — Payments

### Main page prompt — Collections dashboard
```
Design a "Collections" dashboard screen. Header strip: 4 large stat cards — "Expected This
Month" (₹18,42,000), "Collected" (₹14,20,500, green), "Outstanding" (₹4,21,500, red),
"Collection Efficiency" (77%, shown as a circular progress ring).

Below it, a tabbed area: "Overdue Tenants" (default), "Promise to Pay", "Reconciliation".

"Overdue Tenants" tab: a table sorted by days overdue descending — Tenant (avatar+name),
Unit, Amount Due (₹), Days Overdue (color-graduated badge: amber under 7, red 7-30, dark
red 30+), Last Reminder Sent (relative time), and inline action buttons per row: "Remind"
(WhatsApp icon), "Call" (phone icon), "Log Promise", "Record Payment". Aging summary chips
above the table: 0-30 / 31-60 / 61-90 / 90+ with amounts.
```

### Collections — Promise to Pay tab
```
Same Collections page, "Promise to Pay" tab active: a table of tenants who've committed to
a payment date — Tenant, Unit, Amount, Promised Date, Days Until Promised Date, Logged By,
and a Status pill (Upcoming / Due Today / Broken — red if the promised date has passed
without payment).
```

### Collections — Reconciliation tab
```
Same Collections page, "Reconciliation" tab active: a two-column comparison — left column
"Razorpay Events" (a feed of incoming webhook events with amount, timestamp, and a raw
event-id in monospace), right column "Recorded Payments" (matched entries with a green
checkmark connector line between matched pairs). Any Razorpay event without a matching
recorded payment is highlighted in amber with a "Match Manually" button.
```

### Main page prompt — Autopay mandates
```
Design an "Autopay Mandates" screen. Header: title "Autopay Mandates", subtitle "34
tenants on UPI Autopay". Table: Tenant, Unit, Monthly Amount (₹), Debit Day, Status pill
(Active=green, Failed=red, Not Set Up=grey), Next Debit Date, Last Debit Result (Success/
Failed icon), and a row action menu (View Mandate / Cancel Mandate / Retry Debit).
```

### Main page prompt — Refunds & payouts
```
Design a "Refunds & Payouts" screen. Header: title "Refunds & Payouts", subtitle showing
combined pending amount. Two sections stacked:

"Deposit Refunds" table: Tenant, Unit, Refund Amount (₹), Method (UPI/Bank/Manual), Status
pill (Initiated / Processing / Completed / Failed), Initiated Date, Reference Number.

"Owner Payouts" table below it: Property, Amount (₹), Period, Method, Status pill, Date,
Reference Number — with a "+ Record Payout" button above this table.
```

### Modal / function 1 — Record offline payment
```
Design a "Record Offline Payment" modal. Fields: Tenancy (searchable dropdown), Amount
(₹), Method (segmented: Cash / Cheque / Bank Transfer), Payment Date (date picker),
Reference / Cheque Number (optional text), Proof Upload (dropzone for a photo/scan), and
an "Allocation" section showing the tenant's unpaid invoices as checkable rows with amounts
so the payment can be split across them. Footer: "Cancel" and primary "Record Payment"
(label becomes "Submit for Approval" if the current user isn't authorized to self-approve).
```

### Modal / function 2 — Approve offline payment
```
Design an "Approve Payment" modal for a pending offline payment. Shows the payment details
(amount, method, recorded by, proof thumbnail — clickable to enlarge) and the tenancy it's
for. Footer: a red "Reject" button (reveals a reason field) and a primary green "Approve &
Record" button.
```

### Modal / function 3 — Log promise to pay
```
Design a small "Log Promise to Pay" modal. Fields: Promised Date (date picker), Promised
Amount (₹, pre-filled with the outstanding balance but editable), Notes (optional, e.g.
"Says salary comes on the 5th"). Footer: "Cancel" and "Log Promise".
```

### Modal / function 4 — Initiate refund
```
Design an "Initiate Refund" modal. Shows the tenant and refund amount (read-only,
calculated from the move-out settlement) at the top. Fields: Refund Method (segmented:
Razorpay Payout to UPI / Bank Transfer / Manual), UPI ID or Bank Account fields depending
on method chosen, and a confirmation checkbox "I confirm this refund amount is correct."
Footer: "Cancel" and primary "Initiate Refund".
```

---

## Page 8 — Maintenance

### Main page prompt — Tickets board
```
Design a "Maintenance Tickets" screen. Header: title "Maintenance Tickets", subtitle "23
open tickets", a Board/List view toggle, and a primary "+ New Ticket" button.

Filter bar: search box, Property dropdown, Category filter chips (Plumbing, Electrical,
Appliance, Carpentry, Pest Control, Internet, Cleaning, Security, Structural, Other),
Priority filter chips (Low/Medium/High/Urgent, color-coded grey→amber→red), Assignee
dropdown, and an "SLA Breached" toggle.

Default Kanban view: 6 columns — Open, Assigned, In Progress, On Hold, Resolved, Closed.
Each ticket card: a category icon, ticket number (monospace, e.g. "#T-204"), short title,
unit code chip, a priority flag in the corner (colored triangle/dot), an SLA countdown
chip ("4h left" in amber, "Overdue" in red if breached), and an assignee avatar
(staff or vendor logo) bottom-right.
```

### Ticket detail page
```
Design a "Ticket Detail" panel/page. Header: ticket number and title, category icon,
priority badge, status pill, unit + tenant as a subtitle, and an "Assign" button plus a
status-change dropdown top right.

Left column: the original report (description text, a photo gallery of the issue,
reported-by and reported-date), below it a "Conversation" thread showing a toggle between
internal staff notes (grey bubbles) and tenant-visible updates (teal bubbles), with a
composer at the bottom that has a "Visible to tenant" switch.

Right column: an "Assignment" card (assignee — staff or vendor — with contact info, SLA
due time), a "Cost" card (Cost incurred ₹ field, a "Bill to Tenant" toggle that adds the
amount as a charge on the next invoice when on), and — once resolved — a "Resolution"
card showing the tenant's star rating and comment.
```

### Main page prompt — Preventive maintenance
```
Design a "Preventive Maintenance" screen. Header: title "Preventive Maintenance", subtitle
"8 schedules active", a "+ Add Schedule" button. Table: Schedule Name (e.g. "AC Service —
Block A"), Property/Unit, Frequency (Monthly/Quarterly/Half-Yearly/Yearly/Custom pill),
Next Due Date, Assigned Vendor, Last Completed Date, and a "Generate Task Now" action per
row. Below the table, a "Recent Completions" log list with date, schedule name, cost, and a
small completion photo thumbnail.
```

### Main page prompt — Vendors & assets
```
Design a "Vendors & Assets" screen with two tabs: "Vendors" and "Assets".

"Vendors" tab: a card grid, one per vendor — name, trade specialties as tags (Plumbing,
Electrical), phone number, a star rating, and a small "Jobs completed" count. A "+ Add
Vendor" button top right.

"Assets" tab: a table — Asset Name (e.g. "Split AC — 1.5 Ton"), Unit, Category, Purchase
Date, Warranty Expiry (a red badge if expired or expiring soon), Last Serviced Date. A
"+ Add Asset" button top right.
```

### Modal / function 1 — New ticket
```
Design a "New Ticket" modal. Fields: Property (dropdown) and Unit (dependent dropdown,
optional for common-area issues), Category (icon grid: Plumbing, Electrical, Appliance,
Carpentry, Pest Control, Internet, Cleaning, Security, Structural, Other), Title (text),
Description (textarea), Priority (segmented: Low/Medium/High/Urgent), and a photo upload
dropzone. Footer: "Cancel" and primary "Create Ticket".
```

### Modal / function 2 — Assign ticket
```
Design an "Assign Ticket" modal. A toggle to assign to "Staff Member" or "Vendor", each
revealing a searchable dropdown with avatars/logos and a "Due By" date/time picker that
auto-suggests based on the ticket's priority SLA. Footer: "Cancel" and "Assign".
```

### Modal / function 3 — Add vendor
```
Design an "Add Vendor" modal. Fields: Vendor/Business Name, Trade Specialties
(multi-select chips), Phone, Email (optional), a simple Rate Card repeatable list (Service
Name + Rate ₹), and Notes. Footer: "Cancel" and "Add Vendor".
```

### Modal / function 4 — Add preventive schedule
```
Design an "Add Preventive Schedule" modal. Fields: Schedule Name, Property and Unit
(optional — leave blank for property-wide), Frequency (segmented: Monthly/Quarterly/
Half-Yearly/Yearly/Custom Days, with a number input appearing for Custom), Next Due Date,
Assigned Vendor (dropdown), and a repeatable "Checklist Items" list (short text rows) for
what the vendor should check each visit. Footer: "Cancel" and "Create Schedule".
```

---

## Page 9 — Messaging

### Main page prompt — Inbox
```
Design a "WhatsApp Inbox" screen as a two-pane chat layout. Left pane: a conversation list
with a search box above it and filter tabs "All / Unread / Unassigned". Each row shows a
tenant/lead avatar, name, a muted last-message preview, a relative timestamp, and an
unread-count dot. Right pane: the open conversation — a header bar with the contact's
name, phone, a link to their Tenant/Lead profile, and quick-action buttons "Send Payment
Link", "Send Statement", "Create Ticket". Below it, the message thread as WhatsApp-style
bubbles (sent = teal, right-aligned; received = white, left-aligned) with timestamps and
delivery ticks (sent/delivered/read). At the bottom, a message composer with a text input,
an attachment icon, and a send button — if the contact's 24-hour session window has
expired, the composer is replaced by a "Choose a template to re-engage" picker instead of
free text.
```

### Modal / function 1 — Send template (outside session window)
```
Design a "Send a Template Message" modal/panel shown when replying outside the 24-hour
window. A searchable list of approved templates (Rent Reminder, Payment Received, Ticket
Update, Announcement, etc.), each row showing a small preview of the message body with
its variable placeholders highlighted. Selecting one reveals fields to fill each variable
(e.g. "Amount", "Due Date"), with a live preview bubble updating as you type. Footer:
"Cancel" and primary "Send Template".
```

### Modal / function 2 — Create ticket from message
```
Design a small "Create Ticket from Message" modal, pre-filled from the conversation. Shows
the originating message text as a quoted reference. Fields: Category (dropdown), Priority
(segmented), and an editable Title/Description pre-filled from the message text. Footer:
"Cancel" and "Create Ticket".
```

### Main page prompt — Broadcasts
```
Design a "Broadcasts" screen. Header: title "Broadcasts", subtitle "6 sent this month", a
primary "+ New Broadcast" button. Table: Broadcast Name, Segment (pill: All Tenants /
Overdue / Specific Property / On Notice / Prospects / Custom), Template Used, Recipients
(count), Status (Draft/Scheduled/Sent pill), Sent Date, and a "View Report" action.
```

### Modal / function 3 — New broadcast
```
Design a "New Broadcast" modal/wizard with 3 inline sections: 1) "Audience" — a segment
selector (radio cards: All Tenants, Overdue Tenants, Specific Property, Tenants on Notice,
Prospects, Custom Filter) showing a live "≈ 142 recipients" count that updates as you
choose; 2) "Message" — a template dropdown with a live preview bubble and variable-mapping
fields; 3) "Schedule" — a toggle between "Send Now" and "Schedule for" with a date/time
picker. Footer: "Save as Draft" and primary "Send Broadcast" (shows a confirmation sub-step
with the final recipient count before actually sending).
```

### Modal / function 4 — Broadcast delivery report
```
Design a "Broadcast Report" screen/panel for a sent broadcast. Header stats: Sent, 
Delivered, Read, Failed (4 stat cards with percentages). Below, a table of individual
recipients — Name, Phone, Status (Sent/Delivered/Read/Failed, color pill), Timestamp — with
a "Retry Failed" button above the table if any failures exist.
```

### Main page prompt — Announcements
```
Design an "Announcements" screen. Header: title "Announcements", a primary "+ New
Announcement" button. A feed of announcement cards, most recent first — each shows a pin
icon if pinned, the title, a truncated body, the target property (or "All Properties"),
published date, and an "Acknowledged by X of Y tenants" progress bar if acknowledgement
was required.
```

### Modal / function 5 — New announcement
```
Design a "New Announcement" modal. Fields: Title, Body (rich textarea), Target (dropdown:
All Properties or a specific property), a "Pin to top" toggle, and a "Require tenant
acknowledgement" toggle. Footer: "Save as Draft" and primary "Publish Announcement".
```

### Main page prompt — Templates
```
Design a "Message Templates" screen. Header: title "Message Templates", subtitle "28
templates across WhatsApp, SMS and Email". Filter chips by channel (WhatsApp/SMS/Email) and
category (Billing, Collections, Onboarding, Maintenance, Marketing). Table: Event Name
(e.g. "rent_reminder_pre"), Channel icon, Category pill, Approval Status (Approved/Pending/
Rejected pill — WhatsApp only), Last Edited, and a "Preview" / "Edit" action.
```

### Modal / function 6 — Edit template
```
Design an "Edit Template" modal. Shows the template's event name and channel as read-only
context. A body textarea with variable tokens shown as highlighted pills inline (e.g.
"{{tenant_name}}", "{{amount}}", "{{due_date}}") that can be inserted via an "Insert
Variable" dropdown. A live preview panel on the right rendered as a WhatsApp bubble (or
email layout if channel is Email) with sample values substituted. Footer: "Cancel" and
primary "Save & Submit for Approval" (WhatsApp templates) or "Save Template" (SMS/Email).
```

---

## Page 10 — Finance

### Main page prompt — Expenses
```
Design an "Expenses" screen. Header: title "Expenses", subtitle "₹2,84,500 spent this
month", a primary "+ Add Expense" button. Summary strip: 4 small cards by top category
(Maintenance, Utilities, Salaries, Other) with amounts.

Filter bar: search box, Category dropdown (Society Maintenance, Utilities, Salaries,
Repairs, Brokerage, Marketing, Supplies, Misc), Property dropdown, and a date-range picker.

Table: Date, Description, Category pill, Property (or "Portfolio-wide"), Vendor, Amount
(₹), Payment Method icon, Receipt (small thumbnail/paperclip icon if attached), and a row
action menu (Edit/Delete).
```

### Modal / function 1 — Add expense
```
Design an "Add Expense" modal. Fields: Date (date picker, defaults today), Category
(dropdown), Property (dropdown, with a "Portfolio-wide" option), Vendor (searchable
dropdown with a "+ New Vendor" inline option), Amount (₹), Payment Method (segmented:
Cash/Card/Bank Transfer/UPI), Description (text), and a Receipt Upload dropzone. Footer:
"Cancel" and primary "Add Expense".
```

### Main page prompt — Owner payouts
```
Design an "Owner Payouts" screen. Header: title "Owner Payouts", subtitle "₹12,40,000
transferred this quarter", a primary "+ Record Payout" button. Table: Date, Property (or
"Portfolio-wide"), Amount (₹), Method (Bank Transfer/UPI/Cheque), Reference Number, Note,
recorded by.
```

### Modal / function 2 — Record payout
```
Design a "Record Owner Payout" modal. Fields: Property (dropdown, optional — blank for a
combined payout), Amount (₹), Date, Method (segmented), Reference Number, Note. Footer:
"Cancel" and "Record Payout".
```

### Main page prompt — Profit & Loss
```
Design a "Profit & Loss" screen — the most chart-heavy page in the app. Header: title
"Profit & Loss", a Property selector (All Properties or one specific), a Period picker
(month/quarter/year/custom range), and an "Export" button.

Top row: 4 large stat cards — "Total Income" (₹18,42,000, green), "Total Expenses"
(₹2,84,500, red), "Net Income" (₹15,57,500, bold), "Occupancy-Adjusted Yield" (9.2%).

Below that, a two-column chart section: left, a "Net Income Trend" area chart over the
last 12 months; right, an "Income vs Expenses" stacked bar chart per month.

Below the charts, a two-column breakdown: "Income by Charge Type" donut chart (Rent,
Electricity, Water, Maintenance, Other) with a legend of amounts, and "Expenses by
Category" donut chart (Maintenance, Utilities, Salaries, Repairs, Marketing, Other) with
its legend.

At the bottom, a detailed P&L statement table in traditional accounting format: Income
section (line items with amounts, subtotal), Expenses section (line items, subtotal), and
a bold "Net Income" total row.
```

---

## Page 11 — Reports

### Main page prompt — Reports hub
```
Design a "Reports" hub screen. Header: title "Reports", subtitle "Standard reports across
your portfolio". A responsive grid of report cards, each with an icon, a title, a one-line
description, and a small preview chart thumbnail: "Rent Roll" (table icon), "Occupancy"
(ring chart), "Collections" (bar chart), "Aging" (donut chart), "Upcoming Vacancies"
(calendar icon), "Expiring Agreements" (calendar icon), "Utility Consumption" (line chart),
"Lead Funnel" (funnel chart), "Vacancy Days" (bar chart), "Tenant Churn & Retention" (line
chart), "Maintenance Cost" (bar chart). Each card is clickable and shows a small "Last
viewed 2 days ago" caption.
```

### Report detail page (generic template — shown as "Rent Roll")
```
Design a "Rent Roll" report screen — the generic pattern every report detail page follows.
Header: breadcrumb "Reports / Rent Roll", report title, and a toolbar with a Property
filter dropdown, a date/"as of" picker, an "Export" button, and a "Schedule Email" button.

Below, a summary strip of relevant stat cards for this report (e.g. "Total Units" 163,
"Total Monthly Rent" ₹18,42,000, "Avg Rent per Unit" ₹11,300). Main content: a full-width
data table — Unit, Property, Tenant, Rent, Status, Lease Start–End, Deposit — sortable
columns, with pagination at the bottom.
```

### Modal / function 1 — Export report
```
Design an "Export Report" modal. Fields: Format (segmented: PDF / Excel / CSV), a date
range picker, and a Property filter (defaults to current selection). Footer: "Cancel" and
primary "Export" — on click, show a brief loading state then a "Download Ready" state with
a download link/button.
```

### Modal / function 2 — Schedule email report
```
Design a "Schedule This Report" modal. Fields: Frequency (segmented: Weekly / Monthly),
Day/Date selector depending on frequency, Recipients (a multi-select of staff emails with
a "+ Add external email" option), and Format (PDF/Excel). Footer: "Cancel" and primary
"Schedule Report" — a small list below the form shows any already-scheduled recurring
reports with a "Remove" action per row.
```

---

## Page 12 — Documents

### Main page prompt
```
Design a "Documents" screen — the central document vault. Header: title "Documents",
subtitle "1,204 documents stored", tabs "All Documents" and "Templates", a primary
"+ Upload Document" button.

"All Documents" tab: filter bar with search, Category dropdown (Agreement, KYC, Police
Verification, Invoice, Receipt, Inspection Photos, Settlement, Other), a "Related To" type
filter (Tenant/Tenancy/Unit/Property), and a Property dropdown. Table: a small file-type
icon, Title, Category pill, Related To (a chip showing tenant name or unit code, clickable
to that record), Uploaded By, Upload Date, Expiry Date (shown with a red badge if expired
or expiring within 30 days, blank otherwise), a "Signed" checkmark icon if applicable, and
a row action menu (View / Download / Replace / Delete).
```

### Templates tab
```
Same Documents screen, "Templates" tab active. A card grid, one per template type: Rental
Agreement, Police Verification Form, Rent Receipt, Notice Letter, Move-out Settlement
Statement, NOC. Each card shows the template name, current version number, last-edited
date, and "Edit Template" / "View History" actions.
```

### Modal / function 1 — Upload document
```
Design an "Upload Document" modal. Fields: a drag-and-drop file dropzone (supports PDF/
image), Title, Category (dropdown), Related To — a type selector (Tenant / Tenancy / Unit /
Property) that reveals a dependent searchable dropdown to pick the specific record, and an
optional Expiry Date field. Footer: "Cancel" and primary "Upload".
```

### Modal / function 2 — Document preview
```
Design a "Document Preview" modal/full-screen viewer. A toolbar at top with the document
title, a page-navigation control for multi-page PDFs, zoom controls, and "Download" /
"Replace" / "Close" buttons. The main area shows the rendered document page large and
centered on a neutral grey background, like a standard PDF viewer.
```

### Modal / function 3 — Edit template
```
Design an "Edit Template" screen for a document template (e.g. Rental Agreement). Left
side: a rich-text editor showing the template body with merge-field tokens highlighted
inline (e.g. "{{tenant_name}}", "{{rent_amount}}", "{{start_date}}"), and an "Insert Field"
dropdown above the editor. Right side: a live preview of the rendered document with sample
data substituted, scrollable like a document page. Footer: "Cancel", "Save as New Version",
and primary "Save & Set Active".
```

---

## Page 13 — Settings

### Main page prompt — shell + Business Profile tab
```
Design a "Settings" screen with a left sub-navigation list (within the main content area,
separate from the main app sidebar): Business Profile, Billing Policy, Utility Rates,
Invoice Numbering, Reminder Cadence, Charge Types, Amenities, Integrations, Notification
Rules, Localization, Users & Roles, Public Site Content. "Business Profile" is selected by
default.

Business Profile panel fields: Legal Business Name, Display Name, Logo upload (small
square dropzone with a preview), Brand Color (a small color swatch picker), Address
(textarea), GSTIN (optional), PAN (optional), Contact Email, Contact Phone. A "Save
Changes" button bottom-right of the panel, which becomes active only once a field changes.
```

### Billing Policy tab
```
Same Settings screen, "Billing Policy" tab active. Fields grouped in cards: "Due & Grace"
(Default Due Day 1–31 selector, Grace Period in days), "Late Fee" (Type segmented: None/
Flat/Percent/Per Day, an Amount field that relabels based on type, a Cap amount), "Invoice
Numbering" (Prefix text e.g. "INV-", Next Number read-only counter, Financial Year Start
Month dropdown), "Billing Behavior" (Bill Delivery Mode segmented: Consolidated/Itemized,
Proration Basis segmented: Actual Days/30-Day Month). "Save Changes" button bottom-right.
```

### Reminder Cadence tab (interactive builder)
```
Same Settings screen, "Reminder Cadence" tab active. An explanation line: "Configure when
WhatsApp reminders go out relative to an invoice's due date." Below it, a visual timeline
showing a horizontal axis from "Due Date −5" to "+20 days" with markers placed at each
configured offset, each marker showing its template name below it. Beneath the timeline, an
editable table: Offset (e.g. "−3 days", "Due day", "+7 days"), Template (dropdown),
Channel (WhatsApp/SMS/Email icon toggle), and a delete icon per row, plus a "+ Add Reminder
Step" button. Below the table, a "Quiet Hours" card with From/To time pickers.
```

### Integrations tab
```
Same Settings screen, "Integrations" tab active. A card grid: "WhatsApp Business" (BSP
logo, connection status pill Connected/Not Connected, masked API key, "Test Connection" and
"Disconnect" buttons), "Razorpay" (logo, status pill, masked key, Test/Disconnect), "Email
/ SMTP" (status pill, Test/Disconnect), "SMS Gateway" (status pill, Test/Disconnect),
"Maps" (status pill), "e-Signature Provider" (status pill). Each card has a "Configure"
button if not yet connected.
```

### Modal / function 1 — Connect / configure integration
```
Design a "Configure WhatsApp Business" modal (reusable pattern for any integration).
Fields specific to this one: Provider (dropdown: AiSensy/Gupshup/Twilio/Interakt), API Key
(password-masked field with a show/hide toggle), Sender/Phone ID, Webhook URL (read-only,
with a copy icon, to paste into the provider's dashboard). A "Test Connection" button that
shows a small inline success/failure result. Footer: "Cancel" and primary "Save &
Connect".
```

### Modal / function 2 — Add / edit charge type
```
Design an "Add Charge Type" modal. Fields: Name, Code (auto-generated from name, editable),
Is Recurring by Default (toggle), Default Amount (₹, optional), Taxable (toggle). Footer:
"Cancel" and "Save".
```

### Modal / function 3 — Add / edit amenity
```
Design a small "Add Amenity" modal. Fields: Name, Category (dropdown: Comfort, Furniture,
Appliances, Kitchen, Structure, Security, Services, Recreation), Icon picker (a small grid
of selectable icons). Footer: "Cancel" and "Save".
```

---

## Page 14 — Users & Roles

### Main page prompt
```
Design a "Users & Roles" screen. Header: title "Users & Roles", subtitle "9 staff
members", a primary "+ Invite User" button.

Table: Avatar + Name, Email, Role badge (color-coded: Owner=teal, Property Manager=blue,
Accountant=gold, Field Staff=grey, Front Desk=grey, Read-only=light grey), Assigned
Properties (shown as 1-2 small tags plus a "+3 more" overflow chip, or "All Properties"
for Owner), 2FA Status (small shield icon, filled if enabled), Status toggle (Active/
Inactive), Last Active (relative time), and a row action menu (Edit / Reset 2FA /
Deactivate).
```

### Modal / function 1 — Invite user
```
Design an "Invite User" modal. Fields: Full Name, Email, Role (dropdown: Owner/Admin,
Property Manager, Accountant, Field Staff, Front Desk, Read-only — each option showing a
one-line description underneath when selected, e.g. "Can manage leads, onboarding and
tickets for assigned properties"), Assigned Properties (multi-select chips, disabled/
greyed with "All Properties" implied when role is Owner/Admin), and — only shown for roles
that can approve money (Property Manager/Accountant) — a "Waiver/Discount Limit (₹)"
field. Footer: "Cancel" and primary "Send Invite".
```

### Modal / function 2 — Edit user & permissions
```
Design an "Edit User" side-panel. Top section: avatar, name, email, role dropdown,
assigned-properties multi-select. Below it, a read-only "Permissions Preview" — a compact
checklist grouped by module (Properties, Leads, Tenancies, Billing, Payments, Maintenance,
Messaging, Finance, Settings) showing green checks or grey dashes for what this role can
do, so an admin can sanity-check access before saving. Footer: "Cancel" and "Save Changes".
```

### Modal / function 3 — Reset 2FA / deactivate confirmation
```
Design a small confirmation modal (reusable for both actions, shown here as "Deactivate
User?"). Warning icon, body text: "Priya Sharma will lose access immediately and any
pending change requests assigned to her will need reassigning." Footer: "Cancel" and a red
"Deactivate User" button. (For "Reset 2FA", swap the body text to explain the user will be
prompted to set up 2FA again on next login, with a neutral — not red — confirm button.)
```

---

## Page 15 — Audit Log

### Main page prompt
```
Design an "Audit Log" screen. Header: title "Audit Log", subtitle "Immutable record of
every sensitive change". Filter bar: a date-range picker, Actor dropdown (staff member),
Action Type dropdown (Created/Updated/Deleted/Approved/Rejected/Voided/Refunded), Target
Type dropdown (Tenancy/Invoice/Payment/Agreement/User/Settings), and a search box.

Table: Timestamp (monospace, most recent first), Actor (avatar + name), Action (a small
colored verb chip — Created=blue, Updated=grey, Deleted=red, Approved=green), Target (a
clickable chip showing the record type + identifier, e.g. "Invoice · INV-2026-0043"), a
one-line plain-English Summary ("Changed rent from ₹14,000 to ₹15,000"), and a "View
Details" action per row. IP address and device shown in smaller muted text under the
actor's name.
```

### Modal / function 1 — Change diff viewer
```
Design a "Change Details" modal, opened via "View Details". Header shows actor, action,
target, and exact timestamp. Below it, a side-by-side "Before" / "After" comparison panel
— each field that changed shown as a row with the field label, the old value struck
through in red on the left, and the new value in green on the right; unchanged fields are
omitted for clarity. Footer: a "Close" button and, where applicable, a "View Record"
button that navigates to the affected tenancy/invoice/etc.
```

---

## Admin dashboard prompt set complete

All 15 sidebar pages are covered across this file and [17](17-stitch-property-unit-module-prompt.md)
(Properties & Units). See [19 — Tenant Portal Prompts](19-stitch-tenant-portal-prompts.md)
for the tenant-facing app.
