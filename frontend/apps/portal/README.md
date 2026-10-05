# Fahiq — Tenant Portal

Mobile-first tenant app (see [docs/11](../../../docs/11-tenant-portal.md) and the screen prompts in
[docs/19](../../../docs/19-stitch-tenant-portal-prompts.md)). Same stack and theme tokens as the
admin dashboard: React 19 + Vite + TypeScript + Tailwind 4.

```bash
npm install
npm run dev      # http://localhost:5174
npm run build
npm run lint
```

## Screens

| Route | Screen |
|---|---|
| `/login` | Login — +91 mobile number → Send OTP |
| `/login/verify` | Verify OTP — 6 auto-advancing boxes (paste + SMS autofill), 30 s resend countdown |
| `/` | **Home** (docs/19 Page 2): greeting, Amount Due card (paid-up state when nothing is due), quick actions, recent activity, manager help bar, bottom tab bar. Sheets: **Pay Now** (pick invoices, breakdown, total), **Announcement** (with "Got it" acknowledgement), **Raise a Ticket** (category chips, description, photos) |
| `/invoices` | **Invoices & Payments** (docs/19 Page 3) with a Dues / History / Statement switch (`?tab=history`, `?tab=statement`). Dues: total outstanding + Pay Now, invoice cards with Due Soon / Overdue pills, multi-select with a floating "Pay Selected". History: paid invoices grouped by payment month, year filter, receipt button. Statement: running ledger + **Download Statement** sheet (presets / custom range) |
| `/invoices/:id` | **Invoice detail**: branded invoice card, line items, total, status; Pay Now if unpaid, Download Receipt + Share if paid. **Receipt** sheet with Download and Share via WhatsApp |
| `/tickets` | **My Tickets** (docs/19 Page 4): Raise a Ticket button, All / Open / Resolved filter (`?filter=`), ticket cards with category icon, status pill (Open / Assigned / In Progress / Resolved / Closed), "Expected by" SLA chip, empty state |
| `/tickets/new` | **Raise a Ticket** (full screen): 9 categories, title, description, Normal / Urgent priority, photos; pinned Submit |
| `/tickets/:id` | **Ticket detail**: Open → Assigned → In Progress → Resolved stage strip, details + photos, tenant-visible updates thread, comment composer with photo attach, "Rate this resolution" card (rating closes the ticket) |
| `/documents` | **Documents** (docs/19 Page 5): My Agreement (Signed + View / Download, or Awaiting Signature + Sign Now), My KYC Documents (Verified / Pending / Rejected with reason and **Re-upload** sheet: take photo or pick from gallery, Submit for Review), Shared Documents (House Rules, Wi-Fi Details, Emergency Contacts, Society Guidelines) |
| `/documents/:docId` | **Document viewer**: back, title, share, zoom in/out (pinch-zoom on touch), pinned Download |
| `/account` | **Account** (docs/19 Page 6): profile card, menu (Announcements with unread badge, Refer a Friend, Help & Support via WhatsApp, Language, Log Out), app version. Request to Move Out is shown as "Soon" (not built yet); Roommates & Mess is hidden because the sample unit isn't a PG bed |
| `/account/profile` | **Edit Profile**: photo (camera overlay), name, phone (changing it requires OTP verification, dev code `123456`), email, emergency contact, repeatable vehicle rows; Save enabled only when something changed and is valid |
| `/account/notifications` | **Notification Preferences**: WhatsApp / SMS / Email switches per event (rent reminders, receipts, maintenance, announcements, promotions) and Quiet Hours with From / To; changes save automatically |
| `/account/announcements` | **Announcements** list: pinned first, 2-line previews, acknowledged check / pending dot; opens the announcement sheet |
| `/account/refer` | **Refer a Friend**: reward hero, friend's name + phone form (validates number, blocks your own and duplicates), Your Referrals with Invited / Visited / Moved In / Reward Credited |

Logged-in routes sit inside `PortalShell`, which redirects to `/login` without a session.

## Data

Home uses mock data from `src/data/home.ts` through a tiny shared store (`src/lib/store.ts`) so
the Home page, the sheets and the tab-bar badge stay in sync (paying clears the badge, a new
ticket appears in Recent Activity). Swap the store's actions for the `/me/*` API
(`/me/dues`, `/me/pay`, `/me/tickets`, `/me/announcements/{id}/ack`) once the backend exists.

Paying from anywhere (Home, Dues, Invoice detail) moves the invoice into History with a
receipt, and the Statement and balances update to match.

Tickets raised from Home's quick sheet or the full form appear in My Tickets and Recent Activity. Attached photos are kept as data URLs in the mock store (the backend will use presigned S3 uploads).

**Mock downloads:** statements export as CSV; receipts and documents as `.txt` until the backend renders
the PDFs (`GET /me/ledger/statement.pdf`, `GET /me/payments/{id}/receipt`, `GET /me/agreement/pdf`, `GET /me/documents`). Sign Now simulates the e-sign hand-off (Digio / Leegality in production).

## Auth

`src/lib/auth.ts` is a **mock** until the backend exists. In dev, the accepted code is `123456`
(shown under the Verify button). Replace `requestOtp` / `verifyOtp` with calls to
`POST /api/v1/auth/tenant/otp/request` and `/otp/verify` (docs/06 §6.2).

`VITE_SUPPORT_WHATSAPP` sets the number behind the "Message your property manager on
WhatsApp" link (digits with country code, e.g. `918049208800`).
