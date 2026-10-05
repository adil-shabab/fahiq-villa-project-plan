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
| `/` | Placeholder home (redirects to `/login` without a session) |

## Auth

`src/lib/auth.ts` is a **mock** until the backend exists. In dev, the accepted code is `123456`
(shown under the Verify button). Replace `requestOtp` / `verifyOtp` with calls to
`POST /api/v1/auth/tenant/otp/request` and `/otp/verify` (docs/06 §6.2).

`VITE_SUPPORT_WHATSAPP` sets the number behind the "Message your property manager on
WhatsApp" link (digits with country code, e.g. `918049208800`).
