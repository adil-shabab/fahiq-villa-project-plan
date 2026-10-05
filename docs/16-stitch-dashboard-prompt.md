# 16 — Stitch Prompt: Admin Dashboard UI

A ready-to-paste prompt set for [Google Stitch](https://stitch.withgoogle.com) to generate
the Fahiq **admin dashboard** UI (staff/owner side — not the public website, see
[10 — Public Website](10-public-website.md) for that). Screens match
[09 — Admin Dashboard](09-admin-dashboard.md) and [03 — Roles & Permissions](03-user-roles-and-permissions.md).

## How to use this

1. Start a new Stitch project and paste the **Master prompt** first — it sets the whole
   visual system and generates the core screens (login → 2FA → dashboard home → properties
   → unit detail → tenancies).
2. Paste each entry under **Follow-up screens** one at a time into the same project chat,
   so Stitch keeps the established style consistent screen to screen.
3. If a generated screen drifts off-style, append: *"keep the exact same sidebar, colors
   and typography as the previous screens."*
4. Export to Figma / code once you're happy with the set, then hand off to the frontend
   build (see [12 — Tech Stack](12-tech-stack.md) for the React + Tailwind + shadcn/ui
   target).

---

## Master prompt

```
Design a modern admin dashboard web app called "Fahiq" — an internal property-management
control panel for a business that rents out rooms across multiple buildings and PG
(paying-guest) hostels in India. This is the STAFF/OWNER dashboard, not a public website —
it should feel like a serious SaaS product: part fintech (billing, collections), part
property-ops tool.

VISUAL STYLE
- Clean, confident, modern SaaS aesthetic — trustworthy and data-dense but not cluttered.
- Light theme as primary. Background: soft off-white (#F4F6F2). Cards: white, 1px soft
  border, 10-12px rounded corners, subtle drop shadow.
- Primary accent: deep pine/teal green (#0F5C4D) — used for primary buttons, active nav
  state, links, key charts.
- Secondary accent: warm brass/gold (#8A6A17) — used sparingly for highlights, numbering,
  and "attention" badges.
- Semantic status colors: green = available / paid / resolved, blue = occupied / info,
  amber = pending / due-soon / under maintenance, red = overdue / critical.
- Typography: a modern geometric sans-serif (Plus Jakarta Sans or Inter) for all UI text;
  a monospace font for money amounts, invoice numbers, and IDs so figures align in columns.
- 8px spacing grid, generous whitespace, no visual clutter, no gradients, no glassmorphism.
- Icons: simple outline style (like Lucide/Feather), consistent stroke width.

LAYOUT SYSTEM
- Persistent left sidebar, ~260px, white background with a thin right border. Fahiq
  wordmark + logo mark at top. Nav items with icon + label, grouped into: Home,
  Properties, Leads, Onboarding, Tenancies, Billing, Payments, Maintenance, Messaging,
  Finance, Reports, Documents, Settings. Active item has a teal left-accent bar and soft
  teal background tint.
- Top bar: property/portfolio switcher dropdown (e.g. "All Properties ▾"), a global search
  bar (search tenants, units, invoices), a notification bell with a small red count badge,
  and a user avatar + name + role label (e.g. "Priya Sharma · Property Manager") on the
  right.
- Main content area has a page title, a short description line, and primary action button
  top-right (e.g. "+ Add Property").
- Data tables: clean rows, sortable column headers, filter chips above the table, status
  shown as small colored pill badges, money right-aligned in tabular numerals, row hover
  state, pagination footer.
- KPI cards: large bold number, small label above it in uppercase letter-spaced text, a
  trend arrow + percentage, optional small sparkline.

GENERATE THESE SCREENS FIRST:

1. LOGIN — Centered card on a soft teal-tinted background with a subtle abstract pattern
   of building/room outlines. Fahiq logo, "Welcome back" heading, email field, password
   field with show/hide toggle, "Forgot password?" link, primary teal "Sign in" button,
   and small text "Protected with two-factor authentication" with a shield icon below.

2. TWO-FACTOR VERIFICATION — Same centered-card style. Shows "Enter the 6-digit code from
   your authenticator app", six separate OTP input boxes, a countdown/resend link, and a
   "Verify" button. Small back-to-login link.

3. DASHBOARD HOME — The main landing page after login. Top row of 6 KPI cards: Occupancy
   Rate (e.g. "87%"), Units Occupied ("142 / 163"), Expected Rent This Month ("₹18,42,000"),
   Collected So Far ("₹14,20,500"), Outstanding ("₹4,21,500"), Overdue Tenants ("12"). Below
   that, a two-column layout: left side has a "Collection Trend" line/bar chart (billed vs
   collected, last 6 months) and an "Occupancy Trend" chart; right side has an "Action
   Required" panel listing items like "5 leases expiring in 30 days", "8 KYC pending
   verification", "3 units missing meter readings" — each as a clickable row with an icon
   and count. Below, a "Today's Follow-up Queue" table of overdue invoices with tenant name,
   unit, amount due, days overdue, and a "Remind" button per row.

4. PROPERTIES LIST — Grid/table toggle view. Filter chips for property type (Apartment, PG,
   Hostel, Commercial) and city. Each property card shows a cover photo, property name,
   locality, unit count, occupancy percentage as a small progress ring, and a status
   badge. "+ Add Property" button top right.

5. UNIT / ROOM DETAIL — A detailed page for a single room. Header with unit code (e.g.
   "A-101"), type badge ("2BHK"), status badge ("Occupied" in blue), and edit button.
   Photo gallery strip at top. Tabbed sections: Overview (rent ₹15,000, deposit ₹30,000,
   furnishing, amenities as icon chips like Wi-Fi/AC/Parking/Geyser), Meters & Readings
   (a small table of electricity readings), Tenancy (current tenant card with contact and
   lease dates), History (past tenants timeline).

6. TENANCIES LIST — A table of all active leases: tenant name + avatar, unit, monthly
   rent, lease start–end dates, status pill (Active/Notice/Ending Soon), outstanding
   balance in red if non-zero, and a "View" action. Filter chips for status and property.
```

---

## Follow-up screens

Paste one at a time, after the master prompt, into the same Stitch project.

### Onboarding & leads

```
Add a "Tenant Onboarding" screen: a multi-step wizard with a horizontal stepper at top
(1. Applicant details → 2. KYC documents → 3. Lease terms → 4. Agreement → 5. Move-in
inspection → 6. Review). Show step 2 (KYC): upload cards for Aadhaar, PAN, and Photo, each
with a status pill (Pending/Verified/Rejected) and a small preview thumbnail. Keep the same
sidebar, colors and typography as the previous screens.
```

```
Add a "Leads" screen: a Kanban board with columns New, Contacted, Visit Scheduled, Visited,
Negotiating, Won, Lost. Each card shows lead name, phone number, interested unit, budget
range, a small WhatsApp icon, and an assignee avatar. Include a top filter bar and a
"+ New Lead" button. Same visual system as before.
```

```
Add a "Visit Calendar" screen: a weekly calendar grid showing scheduled property visits as
colored blocks with prospect name and unit, a sidebar list of "Today's visits", and a
button to schedule a new visit. Keep consistent with the established style.
```

### Billing & payments

```
Add an "Invoices" screen: a table with columns Invoice #, Tenant, Property/Unit, Period,
Amount, Status (Paid/Partially Paid/Overdue/Draft as colored pills), Due Date, and Actions.
Filter chips for status, property, and "Overdue only". A summary strip above the table
shows Total Billed, Total Collected, Total Outstanding this month. Same style as before.
```

```
Add an "Invoice Detail" screen: header with invoice number and status pill, tenant + unit
info card, an itemized line-items table (Rent ₹15,000, Electricity ₹1,240, Water ₹300,
Wi-Fi ₹500, Total ₹17,040), a right-side panel showing payment history and a "Send Payment
Link via WhatsApp" primary button with a small WhatsApp icon, plus "Download PDF" and
"Add Credit Note" secondary buttons.
```

```
Add a "Billing Run" screen: a setup panel to pick a billing period and property scope, a
"Run Preview" button, and below it a results table showing each tenancy's computed rent,
electricity, water, and total with warning icons on rows missing a meter reading. A large
"Confirm & Issue Invoices" button at the bottom.
```

```
Add a "Collections Dashboard" screen: a header strip with Expected vs Collected vs
Outstanding numbers, then an "Overdue Tenants" table sorted by days overdue, with inline
action buttons "Remind on WhatsApp", "Call", and "Log Promise to Pay" per row, and aging
badges (0-30 / 31-60 / 61-90 / 90+ days) shown as small colored tags.
```

### Maintenance & messaging

```
Add a "Maintenance Tickets" screen: a Kanban board with columns Open, Assigned, In
Progress, Resolved, Closed. Each ticket card shows a category icon (plumbing, electrical,
pest control), a priority flag (color-coded), unit number, and an SLA countdown chip. Same
visual system.
```

```
Add a "WhatsApp Inbox" screen: a two-pane chat layout like a messaging app. Left pane is a
list of conversations with tenant name, avatar, last message preview, unread dot, and a
timestamp. Right pane shows the open conversation as WhatsApp-style message bubbles (green
for sent, white for received) with a message composer at the bottom and quick-action chips
above it: "Send Payment Link", "Send Statement", "Create Ticket".
```

### Finance & admin

```
Add a "Reports" screen: a grid of report cards (Rent Roll, Occupancy, Collections, Aging,
Upcoming Vacancies, Expiring Agreements, Utility Consumption, Lead Funnel) — each card has
an icon, title, one-line description, and a small preview chart thumbnail. Same style.
```

```
Add a "Settings" screen: a left sub-navigation (Business Profile, Billing Policy,
Integrations, Users & Roles, Notifications) and a main panel showing the "Integrations"
tab: cards for WhatsApp Business, Razorpay, Email/SMTP, and Maps — each card has a logo,
connection status pill (Connected/Not Connected), and a "Test Connection" button.
```

```
Add a "Users & Roles" screen: a table of staff members with avatar, name, email, role
badge (Owner, Property Manager, Accountant, Field Staff, Front Desk, Read-only), assigned
properties as small tags, and a status toggle. "+ Invite User" button top right.
```

---

## Not covered here

The **tenant self-service portal** (see [11 — Tenant Portal](11-tenant-portal.md)) and the
**public marketing website** (see [10 — Public Website](10-public-website.md)) are separate
apps with their own visual treatment — the portal should feel lighter/mobile-first, the
website should feel editorial/SEO-led. Generate those as separate Stitch projects if needed,
reusing the same accent colors for brand consistency but a different layout system (no
admin sidebar).
