# 10 — Public Website

The prospective-tenant storefront. SEO matters here, so this app is **server-rendered /
statically generated** (Next.js App Router, or Vite + prerender) and talks to the same
Django API via the `/api/v1/public/*` endpoints.

## 10.1 Pages

| Route | Purpose |
|---|---|
| `/` | Landing: hero search, featured available units, how it works, amenities highlights, testimonials, areas served, CTA. |
| `/rooms` (a.k.a. `/search`) | Results grid + filters + map toggle. Query params drive state and are shareable. |
| `/rooms/[slug]` | Unit detail: gallery, rent breakdown, amenities, rules, location map, nearby, description, similar rooms, enquiry / schedule-visit / book. |
| `/properties/[slug]` | Property page: about, all units in this property, amenities, gallery, map, reviews. |
| `/areas/[locality]` | SEO landing per locality: intro copy + listings in that area. |
| `/how-it-works` | Process for tenants (browse → visit → apply → move in). |
| `/about`, `/contact` | Business info, map, contact form, WhatsApp button. |
| `/faq` | Common questions (deposit, notice period, documents needed, pets…). |
| `/shortlist` | Saved units (localStorage; synced if signed in). |
| `/terms`, `/privacy` | Legal. |
| `/reviews` | Aggregated verified tenant reviews. |
| `/blog`, `/blog/[slug]` | Area guides / tips (P3, organic traffic). |
| `/sitemap.xml`, `/robots.txt` | SEO. |

## 10.2 Search & filters

Filter panel (drives `/api/v1/public/listings`):

- **Locality / area** (multi-select, from `/public/localities` with counts)
- **City**
- **Budget** min–max slider (₹)
- **Room type**: 1RK, Studio, 1BHK, 2BHK, 3BHK, 4BHK+, PG bed, Commercial
- **Sharing** (PG): single / double / triple / dormitory
- **Furnishing**: unfurnished / semi / fully
- **Available from** (date)
- **Amenities** (chips): Wi-Fi, AC, parking (2W/4W), power backup, lift, CCTV, attached
  bathroom, food/mess, housekeeping, geyser, washing machine, fridge, RO water, gym…
- **Tenant type**: family / bachelor (M) / bachelor (F) / students / working professionals
- **Property** (dropdown)
- **Sort**: relevance, rent ↑, rent ↓, newest, available soonest

Results:
- Card: cover photo (lazy), title, locality, ₹ rent + "₹ deposit", type badge, top 3
  amenity icons, status badge (`Available` / `Available from DD MMM` / `Booked`), "View".
- Grid ↔ Map view toggle. Map: clustered pins; click pin → card popover.
- Pagination or infinite scroll; result count; "no results → relax filters" suggestions.
- "Save to shortlist" heart on each card.

Only units with `is_listed = true` and status in (`available`, `booked`, `notice`) are
returned; `notice` units show "Available from <computed vacate date>".

## 10.3 Listing detail page

- **Gallery**: photos + video + floor plan; full-screen lightbox; 360° tour embed (P4).
- **Header**: title, locality, status badge, share (copy link / WhatsApp).
- **Price card** (sticky on desktop): monthly rent, security deposit, maintenance,
  "Included: water / Wi-Fi …", lock-in, notice period → buttons: **Enquire**,
  **Schedule a visit**, **Book now** (P2).
- **Amenities**: full grid with icons, grouped (In-room / Building / Services).
- **Rules & preferences**: tenant type, food preference, pets, smoking, gate time,
  guests policy.
- **Location**: map, address (approx.), nearby landmarks with distances, "what's around".
- **Description**: free text.
- **About the property**: link to property page, building amenities, photos.
- **Reviews** (P2): verified tenant ratings for the property.
- **Similar rooms**: same locality / budget / type.
- **FAQ accordion**: documents required, move-in process, deposit refund policy.

## 10.4 Conversion flows

### Enquiry (P1)
Form: name, phone, email (optional), preferred move-in date, message. Submit →
`POST /public/enquiries` → **Lead** created (`source = website_enquiry`) → instant
`enquiry_ack` WhatsApp to the visitor → staff alert. Success screen: "We'll WhatsApp you
shortly" + WhatsApp deep link.

### Schedule a visit (P2)
Pick a date → `GET /public/visits/slots` → pick a time slot → contact details →
`POST /public/visits`. Creates lead (if new) + `VisitSchedule`. Confirmation +
`visit_confirmed` WhatsApp; `visit_reminder` 2 h before.

### Book now / pay token (P2)
"Reserve this room" → contact details → `POST /public/bookings` returns a Razorpay order for
the configured **token amount** → Razorpay Checkout → on success (webhook): unit →
`booked`, lead flagged `advance_paid`, hold timer starts (`Settings.booking_hold_days`),
staff alerted to begin onboarding. If not onboarded before the hold expires → unit auto-
reverts to `available`, token handled per refund policy.

### Shortlist
Guest: array of unit slugs in `localStorage`. Optional email magic-link account syncs it
server-side and lets staff see "hot" prospects (P3).

## 10.5 SEO

- SSR/SSG for `/`, `/rooms`, `/rooms/[slug]`, `/properties/[slug]`, `/areas/[locality]`,
  `/blog/*`.
- Per-page `<title>`, meta description, canonical.
- **JSON-LD**: `Accommodation` / `Apartment` / `Product` with `offers` (price, availability),
  `Organization`, `BreadcrumbList`, `Review`/`AggregateRating` where present.
- OpenGraph + Twitter cards with the cover image.
- `sitemap.xml` generated from listed units + property + locality + blog pages; `robots.txt`.
- Clean, stable slugs: `green-view-a-101-2bhk-koramangala`. Slug persists across status
  changes.
- Fast: image CDN + responsive `srcset` + AVIF/WebP, lazy-load, preconnect, minimal JS on
  content pages, Core Web Vitals budget (LCP < 2.5 s, CLS < 0.1, INP < 200 ms).
- Locality pages target "PG in <area>", "2BHK for rent in <area>" style queries.

## 10.6 Content management (P3)

`/api/v1/public/content/{key}` serves editable blocks (hero heading/subtext/image, about,
how-it-works steps, testimonials, FAQ items, contact details, areas-served list, footer
links). Edited from **Settings → Public-site content** in the dashboard, no deploy needed.

## 10.7 Trust & polish

- "Verified listings", "No brokerage" style trust badges (only if true).
- Real photos only; watermark option.
- WhatsApp click-to-chat floating button with a prefilled message including the unit title.
- Testimonials from real tenants (with consent).
- Clear deposit & notice-period info up front to reduce junk enquiries.
- Accessibility: semantic HTML, alt text on all images, keyboard-navigable filters, contrast
  AA, focus states.
- Analytics: privacy-friendly (Plausible/GA4) — track search filters used, listing views,
  enquiry conversion, top localities.
- i18n (P3): English / Hindi toggle, `hreflang`.
