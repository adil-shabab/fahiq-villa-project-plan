import { billingSummary } from "../../data/billing";
import { formatINR } from "../../lib/format";

export function BillingSummaryCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <Card label="Total Billed" value={formatINR(billingSummary.totalBilled)} />
      <Card label="Total Collected" value={formatINR(billingSummary.totalCollected)} tone="ok" />
      <Card label="Outstanding" value={formatINR(billingSummary.outstanding)} tone="danger" />
      <Card label="Overdue Count" value={String(billingSummary.overdueCount)} tone="danger" />
    </div>
  );
}

function Card({ label, value, tone }: { label: string; value: string; tone?: "ok" | "danger" }) {
  const toneClass = tone === "ok" ? "text-ok" : tone === "danger" ? "text-danger" : "text-ink";
  return (
    <div className="rounded-xl border border-rule bg-surface p-4 shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">{label}</p>
      <p className={`mt-1.5 text-xl font-bold tabular-nums tracking-tight ${toneClass}`}>{value}</p>
    </div>
  );
}
