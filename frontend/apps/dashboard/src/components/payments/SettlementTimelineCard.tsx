import { ArrowRight, Landmark } from "lucide-react";
import { nodalAccount, settlementBatches } from "../../data/payments";
import { formatINR } from "../../lib/format";

export function SettlementTimelineCard() {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl border border-rule bg-surface p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Landmark className="h-5 w-5 text-accent" strokeWidth={2} />
          <span className="text-sm font-bold text-ink">Bank Settlement Schedule</span>
        </div>
        <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-[11px] font-semibold text-accent">T+1 Cycle</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {settlementBatches.map((b) => (
          <div key={b.label} className="flex items-center justify-between rounded-lg bg-surface-sunken p-2.5">
            <div className="flex flex-col">
              <span className="text-xs text-ink-muted">{b.label}</span>
              <span className="font-mono text-sm font-bold text-ink">{formatINR(b.amount)}</span>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${b.status === "Credited" ? "bg-ok/10 text-ok" : "bg-gold-soft text-gold"}`}>
              {b.status}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-1 text-xs text-ink-muted">
        <span>Nodal Account: {nodalAccount}</span>
        <button type="button" className="flex items-center gap-0.5 font-semibold text-accent hover:underline">
          View Batch Logs
          <ArrowRight className="h-3 w-3" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
