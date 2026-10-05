const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatINR(amount: number): string {
  return inrFormatter.format(amount);
}

const shortDate = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" });

/** "2026-10-05" → "5 Oct" */
export function formatShortDate(iso: string): string {
  return shortDate.format(new Date(`${iso}T00:00:00`));
}

const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

/** ISO timestamp → "3 days ago", "1 week ago", "just now" */
export function formatRelative(iso: string, now = Date.now()): string {
  const seconds = Math.round((new Date(iso).getTime() - now) / 1000);
  const abs = Math.abs(seconds);
  if (abs < 60) return "just now";
  if (abs < 3600) return relative.format(Math.round(seconds / 60), "minute");
  if (abs < 86400) return relative.format(Math.round(seconds / 3600), "hour");
  if (abs < 7 * 86400) return relative.format(Math.round(seconds / 86400), "day");
  if (abs < 30 * 86400) return relative.format(Math.round(seconds / (7 * 86400)), "week");
  return relative.format(Math.round(seconds / (30 * 86400)), "month");
}

export function greeting(date = new Date()): string {
  const h = date.getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
