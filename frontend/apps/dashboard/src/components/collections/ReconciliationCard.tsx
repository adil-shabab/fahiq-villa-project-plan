import { Check, RefreshCw, TriangleAlert } from "lucide-react";
import { reconciliationAnomaly, reconciliationEvents } from "../../data/collections";
import { formatINR } from "../../lib/format";

export function ReconciliationCard() {
  return (
    <div id="reconciliation-section" className="flex flex-col justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
      <div>
        <div className="flex items-center justify-between pb-2.5">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-info/10 p-1.5 text-info">
              <RefreshCw className="h-5 w-5" strokeWidth={2} />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-ink">Live Razorpay Reconciliation</h3>
              <p className="text-xs text-ink-faint">Webhook stream ⇄ internal rental ledger matching</p>
            </div>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-ok/10 px-2 py-0.5 text-[11px] font-semibold text-ok">
            <span className="h-1.5 w-1.5 rounded-full bg-ok" />
            Webhook Active
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {reconciliationEvents.map((e) => (
            <div key={e.id} className="flex flex-col gap-1.5 rounded-lg bg-surface-sunken p-2.5 leading-tight">
              <div className="flex items-center justify-between font-mono text-[11px] text-ink-faint">
                <span>{e.eventId}</span>
                <span>{e.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-ink">{formatINR(e.amount)}</span>
                <span className="inline-flex items-center gap-0.5 rounded bg-ok/15 px-1.5 py-0.5 text-[11px] font-semibold text-ok">
                  <Check className="h-3 w-3" strokeWidth={2} />
                  Auto-matched
                </span>
              </div>
              <span className="truncate text-xs text-ink-muted">
                Matched: {e.tenantName} (Unit {e.unitCode})
              </span>
            </div>
          ))}
        </div>

        <div className="mt-2.5 flex flex-col items-start justify-between gap-2.5 rounded-lg bg-warn/10 p-3 sm:flex-row sm:items-center">
          <div className="flex items-start gap-2.5">
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-warn" strokeWidth={2} />
            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-warn">Unmatched Anomaly Event</span>
                <span className="text-[11px] text-warn/80">{reconciliationAnomaly.minutesAgo} mins ago</span>
              </div>
              <span className="font-mono text-xs text-ink">
                {formatINR(reconciliationAnomaly.amount)} received from unknown UPI ID {reconciliationAnomaly.upiRef}
              </span>
              <span className="text-xs text-ink-muted">{reconciliationAnomaly.note}</span>
            </div>
          </div>
          <button type="button" className="shrink-0 rounded-lg bg-gold px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-90">
            Match Manually
          </button>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-rule pt-3 text-xs text-ink-muted">
        <span>
          Unreconciled today: <strong className="font-semibold text-ink">1 event ({formatINR(reconciliationAnomaly.amount)})</strong>
        </span>
        <button type="button" className="font-medium text-accent hover:underline">
          Reconciliation Logs →
        </button>
      </div>
    </div>
  );
}
