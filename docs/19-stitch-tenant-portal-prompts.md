# 19 — Stitch Prompts: Tenant Portal

A running collection of granular [Stitch](https://stitch.withgoogle.com) prompts for the
**Tenant Portal** — a separate, mobile-first app from the admin dashboard (see
[11 — Tenant Portal](11-tenant-portal.md)). Same brand accent colors as the admin dashboard
prompts ([16](16-stitch-dashboard-prompt.md)–[18](18-stitch-page-by-page-prompts.md)) but a
different layout system entirely: no sidebar, a bottom tab bar, larger touch targets, and a
warmer, friendlier tone since tenants — not trained staff — use this day to day.

**Start a new Stitch project for this** (don't mix it into the admin dashboard project) —
paste the style anchor first, then each page in order.

## How to use this

Same pattern as [doc 18](18-stitch-page-by-page-prompts.md): each page gets its main screen
prompt plus every modal/bottom-sheet/function that belongs to it. Ask for the next page and
I'll append it here.

## Portal navigation (bottom tab bar)

```
Home
Invoices & Payments
 ├─ Dues & Pay
 ├─ Payment History & Receipts
 └─ Ledger / Statement
Maintenance
 └─ My Tickets
Documents
 ├─ Rental Agreement
 └─ Shared Documents (Wi-Fi password, house rules)
Account
 ├─ Profile
 ├─ Notification Preferences
 ├─ Announcements
 ├─ Move-out Request
 ├─ PG: Roommates & Mess (if applicable)
 └─ Refer a Friend
```

Four bottom tabs carry the weight: **Home · Invoices · Tickets · Account**. Documents and
Announcements are reachable from Home shortcuts as well as from Account.

---

## Style anchor (paste first, new Stitch project)

```
Design a mobile-first tenant portal app called "Fahiq" for people renting a room/flat — the
tenant-facing companion to the Fahiq admin dashboard. Design every screen for a phone
viewport (390px wide), as if shown inside a phone frame.

VISUAL STYLE — same brand as the admin product, warmer execution:
- Background: soft off-white (#F4F6F2). Cards: white, 14-16px rounded corners (larger than
  the admin app's), soft shadow — friendlier and less dense than an admin tool.
- Primary accent: deep pine/teal (#0F5C4D) for primary buttons and active states.
  Secondary: warm brass/gold (#8A6A17) used sparingly for small highlights.
- Semantic colors: green = paid/resolved, amber = due soon/in progress, red = overdue/
  urgent.
- Typography: the same modern geometric sans (Plus Jakarta Sans or Inter), but sized up
  for mobile — larger body text, generous line height, bigger tap targets (min 44px).
- Icons: simple outline style, slightly larger than the admin app's.
- Bottom tab bar: 4 items — Home, Invoices, Tickets, Account — with icon + label, active
  tab in teal, a small red dot badge for unread items.
- Top of each screen: a simple header with the page title and, where relevant, a back
  arrow — no sidebar, no dense data tables; this app is scanned and tapped, not managed.
- Primary actions use large, full-width or prominent rounded buttons, not small toolbar
  buttons — this is a consumer app, not an admin tool.

Keep this exact system across every screen below.
```

---

## Page 1 — Login & verification

### Main page prompt
```
Design the tenant "Login" screen for a phone viewport. Centered content on a soft
teal-tinted background: the Fahiq logo, a friendly heading "Welcome back 👋" (or omit the
emoji if you prefer — a warm, simple "Welcome back"), subtext "Log in with your mobile
number", a phone number input with a "+91" prefix chip, and a large full-width primary
button "Send OTP". Below it, small text: "Having trouble? Message your property manager on
WhatsApp" with a WhatsApp icon link.
```

### Modal / function — OTP verification
```
Design the "Verify OTP" screen, shown after requesting a code. Heading "Enter the code we
sent to +91 98765 43210" with a small "Change number" link. Six individual OTP digit boxes,
large and easy to tap, auto-advancing. Below them, a countdown text "Resend code in 0:28"
that becomes a tappable "Resend OTP" link once it reaches zero. A large full-width primary
"Verify & Continue" button at the bottom, disabled until all 6 digits are entered.
```

---

## Page 2 — Home

### Main page prompt
```
Design the tenant "Home" screen — the first thing a tenant sees after logging in. Top
header: a friendly greeting "Good morning, Rahul" with the property name and unit code
underneath in muted text ("Green View Residency · A-101").

Hero card right below the header: a large, prominent "Amount Due" card in white with a
teal top accent — shows the due amount in large bold text (₹15,930), the due date
("Due 5 Oct"), and a full-width primary "Pay Now" button. If nothing is due, this card
instead shows a green checkmark illustration and "You're all paid up! 🎉" with the next
due date shown in smaller muted text below.

Below the hero card, a row of 4 quick-action tiles (icon + short label, tappable):
"Invoices", "Raise Ticket", "Agreement", "Announcements" — each with a small badge if
there's something new (e.g. a red dot on Announcements if unread).

Below that, a "Recent Activity" list: compact rows with an icon, short description, and
relative time — "Payment received · ₹15,000 · 3 days ago", "Ticket #204 marked resolved ·
1 week ago", "New announcement: Water supply maintenance · 2 weeks ago".

At the very bottom, a muted "Need help?" bar with the property manager's name, a call
icon, and a WhatsApp icon.

Bottom tab bar visible throughout: Home (active), Invoices, Tickets, Account.
```

### Modal / function 1 — Pay now (bottom sheet)
```
Design a "Pay Now" bottom sheet that slides up from the bottom of the screen (mobile
pattern, not a centered modal), triggered by the hero card's Pay button. Shows a summary:
"You're paying" with a breakdown of selected invoice(s) — Rent ₹15,000, Electricity
₹930 — and a bold Total. If more than one invoice is unpaid, show them as checkable rows
above the summary so the tenant can choose to pay one, several, or all. A full-width
primary button "Pay ₹15,930 via UPI / Card" at the bottom, with small payment-method icons
(UPI, Visa/Mastercard, Netbanking) shown beneath it for reassurance.
```

### Modal / function 2 — Announcement detail
```
Design an "Announcement" detail sheet/modal, opened by tapping an announcement from Home
or the Announcements list. Shows the announcement title, the property it applies to, the
published date, and the full body text. If it requires acknowledgement, a full-width
primary button "Got it" at the bottom which, once tapped, shows a small green checkmark
confirmation inline.
```

### Modal / function 3 — Quick raise ticket (bottom sheet)
```
Design a quick "Raise a Ticket" bottom sheet, reachable from the Home quick-action tile.
Fields: Category (a row of large tappable icon chips: Plumbing, Electrical, Appliance,
Pest Control, Internet, Other), a Description text area, and a photo-attach button showing
small thumbnail previews once added. A full-width primary "Submit Ticket" button at the
bottom.
```

---

## Page 3 — Invoices & Payments

### Main page prompt
```
Design the "Invoices" tab screen (phone viewport). Header: title "Invoices & Payments".
Below it, a 3-way segmented control: "Dues" (default), "History", "Statement".

"Dues" segment: a summary card at top — "Total Outstanding ₹15,930" with a full-width
"Pay Now" button. Below it, a list of unpaid/partially-paid invoice cards, each showing
the month ("September 2026"), amount (₹), due date, and a status pill (Due Soon=amber,
Overdue=red), tappable to open the invoice detail screen. Each card has a small checkbox
so multiple can be selected for one combined payment, with a floating "Pay Selected
(₹X)" button appearing at the bottom once 2+ are checked.
```

### History segment
```
Same Invoices screen, "History" segment active. A list of past invoices, newest first,
grouped under month headers. Each row: invoice period, amount, a green "Paid" pill, payment
date, and a small receipt icon that opens the receipt directly. A year filter dropdown at
the top of the list.
```

### Statement segment
```
Same Invoices screen, "Statement" segment active. A running-ledger list: each row shows a
date, a short description ("Invoice · Sep 2026" or "Payment · UPI"), an amount (red for
charges, green for payments), and a running balance shown in smaller text to the right. A
"Download Statement" full-width button pinned above the list, which opens a small date-
range picker sheet before generating the PDF.
```

### Invoice detail screen
```
Design an "Invoice Detail" screen (full screen, not a modal, since this is mobile),
opened by tapping any invoice card. Header with a back arrow and "Invoice · September
2026". Below it, a styled invoice card: Fahiq branding, tenant name and unit, issue/due
dates, an itemized list (Rent ₹15,000, Electricity · 172 units ₹1,462, Wi-Fi ₹500 —
each as a simple two-column row: description left, amount right), a divider, and a bold
Total line. Status pill (Paid/Due/Overdue) near the top. If unpaid, a full-width "Pay Now"
button pinned at the bottom; if paid, a full-width "Download Receipt" button instead, plus
a "Share" icon button next to it.
```

### Modal / function 1 — Download statement (date range)
```
Design a small bottom sheet "Download Statement". Two date fields (From / To, with quick
preset chips: This Month, Last 3 Months, This Year, Custom), and a full-width "Generate
PDF" button. On completion, show a brief success state with "Share" and "Download" icon
buttons.
```

### Modal / function 2 — Receipt share sheet
```
Design a "Receipt" bottom sheet/screen showing a receipt preview (payment amount, date,
method, reference number, a green checkmark icon) with two full-width buttons stacked:
"Download PDF" and "Share via WhatsApp" (with a WhatsApp icon).
```

---

## Page 4 — Tickets

### Main page prompt
```
Design the "My Tickets" tab screen (phone viewport). Header: title "My Tickets", a
full-width "+ Raise a Ticket" button below it, and a segmented filter "All / Open /
Resolved".

A list of ticket cards, each showing a category icon, the ticket title, a status pill
(Open=blue, In Progress=amber, Resolved=green, Closed=grey), the unit/date, and — if
still open — a small "Expected by" chip if an SLA is set. Tapping a card opens the ticket
detail screen. Empty state (when no tickets): a friendly illustration with "No tickets
yet — tap below if something needs fixing" and the raise-ticket button.
```

### Raise a ticket screen
```
Design a "Raise a Ticket" screen (full screen). Header with back arrow, title "Raise a
Ticket". Fields, stacked for mobile: Category (a 2-column grid of large tappable icon
cards: Plumbing, Electrical, Appliance, Carpentry, Pest Control, Internet, Cleaning,
Security, Other), Title (text input), Description (textarea), Priority (segmented: Normal/
Urgent — kept simple for tenants, no "Low" option), and a photo-attach row showing added
thumbnails with a "+" tile to add more. A full-width primary "Submit Ticket" button pinned
at the bottom.
```

### Ticket detail screen
```
Design a "Ticket Detail" screen (full screen). Header with back arrow and the ticket
title. Below it, a status timeline strip showing the stages (Open → Assigned → In
Progress → Resolved) with the current stage highlighted in teal and completed stages
checked. A details card: category, description, the original photos, date raised, and an
"Expected by" chip if set.

Below that, a "Updates" thread — only tenant-visible messages and status-change notes
appear here (no internal staff notes), shown as simple timeline entries with icons and
timestamps, e.g. "Assigned to Ramesh (Plumber) · 2 days ago", "Status changed to In
Progress · 1 day ago". A comment composer pinned at the bottom with a text field, a
photo-attach icon, and a send button.

If the ticket is Resolved, show a "Rate this resolution" card above the composer: 5 tap-
able stars and an optional comment field, with a "Submit Rating" button.
```

---

## Page 5 — Documents

### Main page prompt
```
Design the "Documents" tab screen (phone viewport). Header: title "Documents".

Section 1 "My Agreement": a card showing the rental agreement status (a green "Signed"
pill with the signed date), and two buttons side by side — "View" and "Download". If not
yet signed, the card instead shows an amber "Awaiting Signature" pill with a "Sign Now"
full-width button.

Section 2 "My KYC Documents": a list of 3 rows — Aadhaar, PAN, Photo — each with a status
pill (Verified=green, Pending=amber, Rejected=red) and a small thumbnail; a Rejected row
shows a red "Re-upload" link with the rejection reason in small red text underneath.

Section 3 "Shared Documents": a simple list with file icons — "House Rules.pdf", "Wi-Fi
Details.pdf", "Emergency Contacts.pdf", "Society Guidelines.pdf" — each row tappable to
view/download, with a file-size caption underneath the name.
```

### Modal / function 1 — Document viewer
```
Design a full-screen "Document Viewer" for a PDF/image, opened by tapping any document row.
A minimal top bar with a back arrow, the document title, and a share icon. The document
rendered large and centered, with pinch-to-zoom implied by a subtle zoom-hint icon. A
"Download" full-width button pinned at the bottom.
```

### Modal / function 2 — Re-upload KYC document
```
Design a "Re-upload Document" bottom sheet, triggered by tapping "Re-upload" on a rejected
KYC item. Shows the rejection reason at the top in a small amber notice box (e.g. "Photo
is blurry, please re-upload a clearer image"), then a camera/gallery upload dropzone, and
a full-width "Submit for Review" button.
```

---

## Page 6 — Account

### Main page prompt
```
Design the "Account" tab screen (phone viewport). Header: a profile summary card at top —
large avatar, tenant name, phone number, and "Green View Residency · A-101" as a subtitle,
with a small edit-pencil icon.

Below it, a menu list with icon + label + chevron rows: "Edit Profile", "Notification
Preferences", "Announcements" (with an unread-count badge), "Roommates & Mess" (only shown
for PG units), "Refer a Friend", "Request to Move Out", a divider, then "Help & Support",
"Language" (showing current selection "English"), and a red "Log Out" row at the bottom.
App version number shown faintly at the very bottom.
```

### Edit profile screen
```
Design an "Edit Profile" screen (full screen). Header with back arrow, title "Edit
Profile". Avatar at top with a small camera icon overlay to change the photo. Editable
fields: Full Name, Phone Number (with a "Verify" step required if changed), Email,
Emergency Contact Name, Emergency Contact Phone, Vehicle Details (optional, repeatable
rows). Below the editable fields, a muted "KYC documents can be updated from the Documents
tab" note. A full-width "Save Changes" button pinned at the bottom.
```

### Notification preferences screen
```
Design a "Notification Preferences" screen. Header with back arrow. A list of event types
— "Rent Reminders", "Payment Receipts", "Maintenance Updates", "Announcements",
"Promotions & Offers" — each row showing the event name and small channel toggle switches
for WhatsApp / SMS / Email inline. Below the list, a "Quiet Hours" card with a toggle and
From/To time pickers that appear once enabled.
```

### Announcements list screen
```
Design an "Announcements" screen (the full list, vs. the Home snippet). Header with back
arrow, title "Announcements". A list of announcement cards, most recent first, pinned ones
at the top with a small pin icon — each card shows title, a 2-line preview, property
scope, date, and an "Acknowledged" checkmark or a pending amber dot if acknowledgement is
required and not yet given. Tapping opens the announcement detail sheet (reuse from Page
2).
```

### Move-out request flow
```
Design a "Request to Move Out" screen (full screen, simple step flow). Step 1: an
explanation card showing the lease's notice period ("30 days") and lock-in status, then
a date picker for "When would you like to move out?" with a live-updating note below it:
"Your notice period requires 30 days — earliest possible date is 15 Nov 2026." if they pick
an earlier date. A Reason dropdown (optional) and Notes field. A full-width "Submit
Request" button. Step 2 (confirmation): a success illustration, "Your notice has been
recorded" with the confirmed vacate date, and a note that the property manager will be in
touch regarding the move-out inspection.
```

### PG — Roommates & Mess screen
```
Design a "Roommates & Mess" screen (PG units only). Section 1 "Your Roommates": a list of
roommate cards — avatar, name, a small "since [month]" caption. Section 2 "This Week's
Mess Menu": a 7-day horizontal scroll of day cards, each showing Breakfast/Lunch/Dinner
items in small text. Below it, a "Mess On/Off" toggle for tomorrow with a cutoff-time note
("Toggle before 9 PM to apply for tomorrow").
```

### Refer a friend screen
```
Design a "Refer a Friend" screen. A friendly hero section with an illustration and heading
"Know someone looking for a room?", explanatory text about the referral reward (e.g. "Get
₹1,000 credited to your account when they move in and stay 3 months"). A simple form:
Friend's Name, Friend's Phone Number, and a full-width "Send Referral" button. Below it, a
"Your Referrals" list showing past referrals with a status pill (Invited / Visited /
Moved In / Reward Credited).
```

---

## Tenant portal prompt set complete

All 6 pages are covered: Login & Verification, Home, Invoices & Payments, Tickets,
Documents, Account. Cross-reference [11 — Tenant Portal](11-tenant-portal.md) if any field
needs double-checking, and see
[16](16-stitch-dashboard-prompt.md)/[17](17-stitch-property-unit-module-prompt.md)/
[18](18-stitch-page-by-page-prompts.md) for the admin dashboard side.
