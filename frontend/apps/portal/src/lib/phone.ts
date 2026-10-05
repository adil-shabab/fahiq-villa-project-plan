/** Strip everything but digits and keep at most 10 (Indian mobile, without +91). */
export function sanitizeMobile(value: string): string {
  return value.replace(/\D/g, "").slice(0, 10);
}

/** Indian mobile numbers are 10 digits starting with 6–9. */
export function isValidMobile(digits: string): boolean {
  return /^[6-9]\d{9}$/.test(digits);
}

/** "9876543210" → "98765 43210" */
export function formatMobile(digits: string): string {
  return digits.length > 5 ? `${digits.slice(0, 5)} ${digits.slice(5)}` : digits;
}

export function toE164(digits: string): string {
  return `+91${digits}`;
}
