import { CheckCheck, TriangleAlert } from "lucide-react";
import { formatINR } from "../../lib/format";
import { unreconciledAlert } from "../../data/payments";

export function UnreconciledAlertCard() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-rule bg-surface-sunken p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-soft text-gold">
          <TriangleAlert className="h-5 w-5" strokeWidth={2} />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-ink">
              Unreconciled Bank Credits Detected ({unreconciledAlert.count} entries · {formatINR(unreconciledAlert.amount)})
            </span>
            <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[11px] font-semibold text-gold">Immediate Action</span>
          </div>
          <p className="text-xs text-ink-muted">{unreconciledAlert.note}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <div className="hidden text-right sm:block">
          <span className="block text-[11px] text-ink-faint">Next Batch Payout</span>
          <span className="font-mono text-xs font-semibold text-ink">{unreconciledAlert.nextBatchLabel}</span>
        </div>
        <button type="button" className="flex items-center gap-1.5 rounded-lg bg-surface px-3.5 py-2 text-sm font-semibold text-accent shadow-sm hover:bg-rule/40">
          <CheckCheck className="h-4 w-4" strokeWidth={2} />
          Auto-Match Ledgers
        </button>
      </div>
    </div>
  );
}
