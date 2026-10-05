const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const inrCompactFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatINR(amount: number): string {
  return inrFormatter.format(amount);
}

export function formatINRCompact(amount: number): string {
  return inrCompactFormatter.format(amount);
}

export function formatRelativeTime(isoOrLabel: string): string {
  // Dummy-data screen: labels are already human-readable (e.g. "2 min ago").
  return isoOrLabel;
}
