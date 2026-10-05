/**
 * Tenant phone-OTP auth.
 *
 * Mock implementation until the backend lands. The real calls are
 *   POST /api/v1/auth/tenant/otp/request  { phone }
 *   POST /api/v1/auth/tenant/otp/verify   { phone, code } → tokens
 * (docs/06-api-design.md §6.2). Swap the bodies of requestOtp / verifyOtp for fetch calls.
 */

export const OTP_LENGTH = 6;
export const RESEND_SECONDS = 30;

/** Code accepted by the mock backend. Shown as a hint in dev builds only. */
export const DEMO_OTP = "123456";

const SESSION_KEY = "fahiq.portal.session";

export class AuthError extends Error {}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function requestOtp(phoneE164: string): Promise<void> {
  await delay(700);
  if (!phoneE164.startsWith("+91")) throw new AuthError("Only Indian mobile numbers are supported.");
}

export async function verifyOtp(phoneE164: string, code: string): Promise<void> {
  await delay(800);
  if (code !== DEMO_OTP) throw new AuthError("That code doesn't match. Check the message and try again.");
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ phone: phoneE164, at: Date.now() }));
  } catch {
    // Storage can be unavailable (private mode); the session just won't survive a reload.
  }
}

/** Mock check for verifying a *new* number from Edit Profile (doesn't touch the session). */
export async function verifyPhoneChange(_phoneE164: string, code: string): Promise<void> {
  await delay(700);
  if (code !== DEMO_OTP) throw new AuthError("That code doesn't match. Check the message and try again.");
}

export function getSessionPhone(): string | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as { phone: string }).phone : null;
  } catch {
    return null;
  }
}

export function logout(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

/** Property manager's WhatsApp for the "Having trouble?" link. */
export const SUPPORT_WHATSAPP = import.meta.env.VITE_SUPPORT_WHATSAPP ?? "918049208800";
