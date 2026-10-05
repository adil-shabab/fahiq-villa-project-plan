import { ArrowUpRight, Hourglass, RefreshCw, Undo2 } from "lucide-react";
import { paymentStats } from "../../data/payments";
import { formatINR } from "../../lib/format";

export function PaymentsStatCards() {
  const s = paymentStats;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div className="flex flex-col justify-between gap-2.5 rounded-xl border border-rule bg-surface p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Total Collected (MTD)</span>
          <span className="rounded-lg bg-surface-sunken p-1.5 text-accent">
            <ArrowUpRight className="h-[18px] w-[18px]" strokeWidth={2} />
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-ink">{formatINR(s.totalCollected)}</span>
            <span className="flex items-center rounded bg-surface-sunken px-1.5 py-0.5 font-mono text-[11px] font-semibold text-ok">
              <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
              8.4%
            </span>
          </div>
          <span className="mt-0.5 text-xs text-ink-muted">{s.successCount} Successful Transactions</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken">
          <div className="h-full rounded-full bg-accent" style={{ width: "86%" }} />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-2.5 rounded-xl border border-rule bg-surface p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Pending &amp; In-Transit</span>
          <span className="rounded-lg bg-gold-soft p-1.5 text-gold">
            <Hourglass className="h-[18px] w-[18px]" strokeWidth={2} />
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-ink">{formatINR(s.pendingAmount)}</span>
            <span className="rounded bg-gold-soft px-1.5 py-0.5 font-mono text-[11px] font-semibold text-gold">{s.pendingCount} txns</span>
          </div>
          <span className="mt-0.5 text-xs text-ink-muted">Pending settlement / NEFT clearing</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken">
          <div className="h-full rounded-full bg-gold" style={{ width: "24%" }} />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-2.5 rounded-xl border border-rule bg-surface p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Auto-Debit Success Rate</span>
          <span className="rounded-lg bg-surface-sunken p-1.5 text-accent">
            <RefreshCw className="h-[18px] w-[18px]" strokeWidth={2} />
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-accent">{s.autoDebitSuccessRate}%</span>
            <span className="text-xs text-ink-faint">Target &gt;95%</span>
          </div>
          <span className="mt-0.5 text-xs text-ink-muted">
            {s.autoDebitSuccessCount} / {s.autoDebitTotalCount} e-Mandates on 1st of month
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken">
          <div className="h-full rounded-full bg-accent" style={{ width: `${s.autoDebitSuccessRate}%` }} />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-2.5 rounded-xl border border-rule bg-surface p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Refunds &amp; Adjustments</span>
          <span className="rounded-lg bg-surface-sunken p-1.5 text-ink-muted">
            <Undo2 className="h-[18px] w-[18px]" strokeWidth={2} />
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-ink">{formatINR(s.refundsAmount)}</span>
            <span className="text-xs text-ink-faint">Deposit returns</span>
          </div>
          <span className="mt-0.5 text-xs text-ink-muted">{s.refundsCount} security deposit settlements settled</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken">
          <div className="h-full rounded-full bg-ink-faint" style={{ width: "12%" }} />
        </div>
      </div>
    </div>
  );
}
