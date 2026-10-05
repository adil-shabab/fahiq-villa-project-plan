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
| `/invoices`, `/tickets`, `/documents` | Placeholders ("Coming soon") until docs/19 pages 3+ are built |
| `/account` | Minimal: signed-in number + log out |

Logged-in routes sit inside `PortalShell`, which redirects to `/login` without a session.

## Data

Home uses mock data from `src/data/home.ts` through a tiny shared store (`src/lib/store.ts`) so
the Home page, the sheets and the tab-bar badge stay in sync (paying clears the badge, a new
ticket appears in Recent Activity). Swap the store's actions for the `/me/*` API
(`/me/dues`, `/me/pay`, `/me/tickets`, `/me/announcements/{id}/ack`) once the backend exists.

## Auth

`src/lib/auth.ts` is a **mock** until the backend exists. In dev, the accepted code is `123456`
(shown under the Verify button). Replace `requestOtp` / `verifyOtp` with calls to
`POST /api/v1/auth/tenant/otp/request` and `/otp/verify` (docs/06 §6.2).

`VITE_SUPPORT_WHATSAPP` sets the number behind the "Message your property manager on
WhatsApp" link (digits with country code, e.g. `918049208800`).
