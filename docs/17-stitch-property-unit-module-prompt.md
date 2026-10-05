# 17 — Stitch Prompt: Property & Unit Module

A ready-to-paste prompt set for [Google Stitch](https://stitch.withgoogle.com) covering the
**Property** (building/PG house) and **Unit/Room** (1BHK/2BHK/PG-bed) module in depth:
listing, the full "add new" wizard, and the detail page for each — every field from
[02 — Feature Catalogue §A](02-features.md) and [05 — Data Model](05-data-model.md)
included. Companion to [16 — Stitch Dashboard Prompt](16-stitch-dashboard-prompt.md), which
covers the rest of the admin dashboard.

## Why two modules, not one

In the data model, a **Property** is the building/PG house (address, common amenities,
photos of the building). A **Unit** (room) lives inside it — rent, deposit, in-room
amenities, photos, and the available/booked/occupied status all belong to the *Unit*, not
the Property. "Add a new room with rent and photos" is really "create/edit a Unit inside a
Property." Both are covered below since both matter to get right.

## How to use this

1. If starting a fresh Stitch project just for this module, paste the **style anchor**
   first (or skip it if you're continuing inside the project started from doc 16 — the
   style is already established there).
2. Paste each screen prompt one at a time, in order, into the same project.
3. Wizard steps are grouped a few at a time per prompt (Stitch renders the active step); if
   you want each step as its own separate screen, split them further.

---

## Style anchor (new Stitch project only)

```
Continue in the Fahiq admin dashboard visual system: off-white background (#F4F6F2), white
cards with 1px soft borders and 10-12px rounded corners, subtle shadows. Primary accent deep
pine/teal (#0F5C4D), secondary brass/gold (#8A6A17) used sparingly for highlights. Semantic
status colors: green = available/paid/resolved, blue = occupied/info, amber = pending/
maintenance/due-soon, red = overdue/blocked/critical. Typography: modern geometric sans
(Plus Jakarta Sans or Inter) for UI text, monospace for money amounts, unit codes and IDs so
figures align. Left sidebar navigation, top bar with property switcher + search +
notifications + user avatar. 8px spacing grid, clean outline icons, no gradients, no
glassmorphism. Keep this exact system across every screen below.
```

---

## Part A — Property (the building)

### A1. Properties list
```
Design a "Properties" list screen. Header: title "Properties", subtitle "12 properties ·
163 units", a Grid/Table view toggle, and a primary "+ Add Property" button top right.

Filter bar below the header: a search box ("Search by name or locality"), Property Type
filter chips (Apartment Building, Independent House, PG / Hostel, Commercial — multi-
select), a City dropdown, and a "Listed on website only" toggle switch.

Grid view (default): property cards in a 3-column grid. Each card shows a cover photo,
property name, type badge, locality + city as a subtitle with a map-pin icon, an occupancy
progress ring (e.g. "87%") in the corner, a unit-count line ("18 units"), a compact stats
row of three small counters (Available 4 · Occupied 13 · Notice 1, each with its status
color), a small "Listed" badge with a globe icon if published to the website, and a
three-dot menu (Edit / View / Unlist / Archive).

Include a secondary table view (reachable via the toggle) with columns: thumbnail, Name,
Type, City, Units, Occupancy %, Status, Listed (yes/no icon), Actions.
```

### A2. Add New Property — wizard, step 1 (Basic info)
```
Design an "Add New Property" screen as a multi-step wizard. Show a horizontal stepper at
the top with 5 steps: 1. Basic Info · 2. Location · 3. Amenities & Rules · 4. Photos ·
5. Review — step 1 active/highlighted in teal, the rest greyed out.

Render step 1, "Basic Info", as the visible form:
- Property Name (required text field, placeholder "e.g. Green View Residency")
- Property Type (required — a row of 4 large selectable cards with icons: Apartment
  Building, Independent House, PG / Hostel, Commercial)
- Short Description (multi-line textarea, optional, "Tell prospective tenants about this
  property")

Footer with a "Cancel" text button on the left and a primary "Next: Location →" button on
the right, disabled until required fields are filled.
```

### A3. Add New Property — wizard, step 2 (Location)
```
Same "Add New Property" wizard, same stepper, now with step 2 "Location" active. Fields:
- Address Line 1 (required), Address Line 2 (optional)
- Locality / Area (required), City (required, dropdown), State (required, dropdown),
  Pincode (required, 6-digit)
- An interactive map panel on the right half of the screen with a draggable pin to set the
  exact location (latitude/longitude captured silently behind it)
- A repeatable "Nearby Landmarks" section below: rows with a Label field (e.g. "MG Road
  Metro"), a Category dropdown (Metro/Bus Stop, College, Hospital, Market, IT Park), a
  Distance field (km), and a "+ Add Landmark" link to add more rows, each row removable
  with an X icon.

Footer: "← Back" and "Next: Amenities →" buttons.
```

### A4. Add New Property — wizard, step 3 (Amenities & rules)
```
Same wizard, step 3 "Amenities & Rules" active. Show a checklist of building/common
amenities grouped under four subheadings with icon + label checkbox chips:
- Structure: Lift, Power Backup, Gated Community, Visitor Parking, Fire Safety
- Security: CCTV, Security Guard, Intercom
- Services: Housekeeping
- Recreation: Garden, Children's Play Area, Swimming Pool, Gym, Common Lounge, Terrace
  Access

Below the checklist, a "House Rules" card with a Gate Closing Time field (time picker) and
a Guest Policy text field (short text, e.g. "Guests allowed till 9 PM with prior notice").

Footer: "← Back" and "Next: Photos →" buttons.
```

### A5. Add New Property — wizard, step 4 + 5 (Photos & Review)
```
Same wizard. Show step 4 "Photos": a large drag-and-drop upload dropzone labeled "Upload
cover photo", and below it a gallery grid of uploaded thumbnails with drag-to-reorder
handles and a star icon on each to mark it as the cover image, plus an "Add more photos"
tile.

Then, in the same prompt, also design step 5 "Review": a read-only summary of everything
entered across the previous steps as collapsible sections (Basic Info, Location, Amenities
& Rules, Photos as a thumbnail strip), a "List this property on the public website" toggle
switch at the bottom, and two buttons: secondary "Save as Draft" and primary "Create
Property".
```

### A6. Property detail page
```
Design a "Property Detail" page for a single property. Header area: a wide cover-photo
banner with the property name overlaid, a type badge (e.g. "PG / Hostel"), the address
with a map-pin icon underneath, an occupancy ring, a "Listed" globe badge, and Edit +
three-dot menu buttons top right.

Below the header, a row of 6 stat cards: Total Units, Occupied, Available, Under Notice,
Monthly Rent Roll (₹), Occupancy %.

Tabbed navigation: Overview | Units | Amenities | Media | Location | Documents.

Render the "Overview" tab: a short description block, a "Key Facts" list (property type,
gate closing time, guest policy), and a small recent-activity feed (e.g. "Unit A-101
marked occupied", "New enquiry received").

Render the "Units" tab in the same screenshot as a secondary panel: a compact table of all
units in this property — Unit Code, Type badge, Floor, Rent, Status pill, Current Tenant
(name or "—") — with a "+ Add Unit" button top right of that panel.
```

---

## Part B — Unit / Room (where rent, photos, amenities & status live)

### B1. Units / Rooms list
```
Design a "Rooms & Units" list screen — the full inventory across all properties. Header:
title "Rooms & Units", subtitle "163 units across 12 properties", a primary "+ Add Unit"
button top right.

Filter bar: search box, a Property dropdown, Status filter chips with color dots
(Available=green, Booked=teal, Occupied=blue, Notice=amber, Under Maintenance=amber,
Blocked=grey — multi-select), Unit Type filter chips (1RK, Studio, 1BHK, 2BHK, 3BHK,
4BHK+, PG Bed, Commercial), a Furnishing dropdown (Unfurnished/Semi/Fully), and a "Listed
only" toggle.

Table with row checkboxes for bulk selection, columns: thumbnail photo, Unit Code (e.g.
"A-101"), Property name, Type badge, Floor, Rent (₹, right-aligned tabular numerals),
Deposit (₹), Status pill, Current Tenant (avatar + name, or "—" if vacant), Available From
date, and a row action menu (View / Edit / Clone / Change Status).

When rows are selected, show a bulk-action bar above the table: "Publish", "Unpublish",
"Change Status", "Export".
```

### B2. Add New Unit — wizard, step 1 (Basic & type)
```
Design an "Add New Unit" screen as a multi-step wizard with a 6-step horizontal stepper:
1. Basic & Type · 2. Commercials & Billing · 3. Amenities · 4. Photos & Media · 5. Rules &
Listing · 6. Review — step 1 active.

Step 1 fields:
- Property (required dropdown, searchable)
- Block (optional dropdown) and Floor (optional dropdown) side by side
- Unit Code / Number (required text field, e.g. "A-101")
- Unit Name (optional, e.g. "Sunrise Room")
- Unit Type (required — a grid of selectable cards with small icons: 1RK, Studio, 1BHK,
  2BHK, 3BHK, 4BHK+, PG Bed, Commercial)
- Sharing Type (only visible/enabled when "PG Bed" is selected — segmented control: Single,
  Double, Triple, Dormitory)
- Furnishing (required, segmented control: Unfurnished, Semi-Furnished, Fully-Furnished)
- Carpet Area in sqft (number field), Facing (dropdown: North/South/East/West/North-East/
  etc.), Bathroom (segmented: Attached/Common), Balcony (yes/no toggle)

Footer: "Cancel" and "Next: Commercials →".
```

### B3. Add New Unit — wizard, step 2 (Commercials & billing)
```
Same wizard, step 2 "Commercials & Billing" active. Two cards stacked:

Card 1 "Commercials": Monthly Rent (₹, required), Security Deposit (₹, required),
Maintenance Charge (₹, optional), Lock-in Period in months, Notice Period in days, Annual
Rent Escalation (%), Rent Due Day of Month (a 1-31 dropdown selector).

Card 2 "Utility Billing": an "Electricity Billing" subsection with a mode selector
(segmented control: Sub-meter Reading / Fixed Monthly Amount / Shared Split) that reveals
different fields depending on the choice — for Sub-meter show "Rate per Unit (₹)" and
"Fixed Charge (₹)"; for Fixed show "Fixed Monthly Amount (₹)"; for Shared Split show a
"Split Basis" dropdown (Equal / By Headcount / By Custom Ratio) and a ratio input. Below
it, a "Water Billing" subsection with the same style mode selector (Fixed / Per Head /
Metered) and its matching amount field. Show the Sub-meter variant expanded in this
screenshot.

Footer: "← Back" and "Next: Amenities →".
```

### B4. Add New Unit — wizard, step 3 (Amenities)
```
Same wizard, step 3 "Amenities" active. A checklist of in-room amenities as icon + label
toggle chips, grouped under four subheadings in a 2-column layout:
- Comfort: Air Conditioning, Geyser / Water Heater, Wi-Fi
- Furniture: Wardrobe, Bed, Mattress, Study Table, Sofa, Dining Table
- Appliances: Refrigerator, Washing Machine, Microwave, TV, RO Water Purifier
- Kitchen: Modular Kitchen, Gas Pipeline, Chimney

Footer: "← Back" and "Next: Photos →".
```

### B5. Add New Unit — wizard, step 4 (Photos & media)
```
Same wizard, step 4 "Photos & Media" active. A large drag-and-drop dropzone for the cover
photo, then a gallery grid of uploaded photo thumbnails with drag handles to reorder and a
star icon to mark the cover image, an "Add more photos" tile, a separate small upload slot
labeled "Floor Plan (optional)", and a text field "360° Virtual Tour URL (optional)".

Footer: "← Back" and "Next: Rules & Listing →".
```

### B6. Add New Unit — wizard, step 5 + 6 (Rules, listing, review)
```
Same wizard. Step 5 "Rules & Listing":
- "Tenant Preferences" card: Allowed Tenant Types (multi-select chips: Family, Bachelor
  Male, Bachelor Female, Students, Working Professionals, Company Lease, Anyone), Food
  Preference (segmented: Veg Only / Non-veg Allowed / Any), Pets Allowed (toggle), Smoking
  Allowed (toggle)
- "Public Listing" card: "List this unit on the website" toggle, Listing Title (text field,
  pre-filled suggestion like "Spacious 2BHK in Koramangala"), Listing Description
  (textarea), and a read-only auto-generated URL Slug field with a copy icon.

In the same prompt, also design step 6 "Review": a collapsible summary of every section
(Basic & Type, Commercials & Billing, Amenities, Photos as thumbnails, Rules & Listing), an
initial Status dropdown (Available / Under Maintenance / Blocked — Occupied/Booked/Notice
get set automatically later by the system), an Available From date picker, and two
buttons: secondary "Save as Draft" and primary "Create Unit".
```

### B7. Unit detail page (the core screen)
```
Design a "Unit Detail" page for a single room — this is the most detailed screen in the
app. Header: Unit Code and Name (e.g. "A-101 · Sunrise Room"), a Type badge ("2BHK"), a
Status pill (color-coded per state: Available=green, Booked=teal, Occupied=blue,
Notice=amber, Under Maintenance=amber, Blocked=grey), a breadcrumb link back to the parent
property, the monthly rent shown prominently in large text ("₹15,000/mo"), and Edit +
"View on Website" + three-dot menu buttons top right.

Directly under the header, a horizontal photo gallery carousel with a caption "12 photos ·
1 video · floor plan available".

Tabbed navigation: Overview | Photos & Media | Amenities | Pricing & Billing | Meters &
Readings | Current Tenancy | Public Listing | History | Documents.

Render the "Overview" tab: a "Key Facts" grid (Type, Sharing, Furnishing, Carpet Area,
Facing, Bathroom, Balcony, Floor, Block), a "Rules & Preferences" card showing Allowed
Tenant Types as tags, Food Preference, Pets Allowed and Smoking Allowed as small icon
labels, and a compact status-history timeline widget.

In the same screenshot, also render the "Pricing & Billing" tab as a secondary panel below:
stat cards for Rent, Security Deposit, Maintenance Charge; a row showing Lock-in Period,
Notice Period, Escalation %, Due Day; an "Electricity Billing" card showing the configured
mode and rate; a "Water Billing" card; and a small "Rent Revision History" table (date, old
rent, new rent).
```

### B8. Unit detail — Meters & Current Tenancy tabs
```
Same Unit Detail page and header as before, now showing the "Meters & Readings" tab: a
table of electricity meter readings (Date, Previous Reading, Current Reading, Units
Consumed, Amount ₹, a small photo-proof thumbnail), a "+ Add Reading" button, and a small
line chart above the table showing consumption trend over the last 6 months.

Below it in the same prompt, render the "Current Tenancy" tab in its occupied state: a
tenant profile card with photo, name, phone number (click-to-call/WhatsApp icons), lease
start–end dates, monthly rent, and an outstanding balance figure (in red if non-zero, green
"All paid up" if zero), plus quick links to "View Full Tenancy" and "View Ledger".
```

---

## Field reference (source of truth)

If Stitch drops a field or you need to double-check one while reviewing the generated
screens, the authoritative field lists are in [05 — Data Model](05-data-model.md) under
`Property`, `Unit`, `Bed`, `Amenity`, `MediaAsset`, and `Meter` / `MeterReading`.
