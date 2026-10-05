import { CheckCircle2, Repeat, XCircle } from "lucide-react";
import { autopayMandates, autopaySuccessRate } from "../../data/collections";
import { formatINR } from "../../lib/format";
import { cn } from "../../lib/utils";

export function AutopayMandatesCard() {
  return (
    <div id="autopay-section" className="rounded-xl border border-rule bg-surface p-4 shadow-sm">
      <div className="mb-3 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-surface-sunken p-1.5 text-accent">
            <Repeat className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-ink">Autopay Mandates (UPI / e-NACH)</h3>
            <p className="text-xs text-ink-faint">{autopayMandates.length} active recurring debit subscriptions</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-ok/10 px-2.5 py-1 text-xs font-semibold text-ok">{autopaySuccessRate}% Success Rate</span>
          <button type="button" className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white hover:bg-accent-ink">
            + Register Mandate
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="h-9 bg-surface-sunken text-[11px] uppercase tracking-wide text-ink-faint">
              <th className="px-3 py-1 font-semibold">Tenant</th>
              <th className="px-3 py-1 font-semibold">Unit</th>
              <th className="px-3 py-1 text-right font-semibold">Debit Amount</th>
              <th className="px-3 py-1 text-center font-semibold">Debit Day</th>
              <th className="px-3 py-1 text-center font-semibold">Status</th>
              <th className="px-3 py-1 font-semibold">Next Debit</th>
              <th className="px-3 py-1 font-semibold">Last Run</th>
              <th className="px-3 py-1 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {autopayMandates.map((m) => (
              <tr key={m.id} className="h-12 border-b border-rule last:border-b-0 hover:bg-surface-sunken/60">
                <td className="px-3 py-1 font-semibold text-ink">{m.tenantName}</td>
                <td className="px-3 py-1 text-xs text-ink-muted">
                  {m.unitCode} ({m.propertyName})
                </td>
                <td className="px-3 py-1 text-right font-mono font-bold text-ink">{formatINR(m.amount)}</td>
                <td className="px-3 py-1 text-center font-mono text-xs">{m.debitDay === 1 ? "1st" : `${m.debitDay}th`} of month</td>
                <td className="px-3 py-1 text-center">
                  <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", m.status === "Active" ? "bg-ok/15 text-ok" : "bg-danger/15 text-danger")}>
                    {m.status}
                  </span>
                </td>
                <td className={cn("px-3 py-1 font-mono text-xs", m.lastRunOk ? "text-ink-faint" : "font-semibold text-danger")}>{m.nextDebitLabel}</td>
                <td className="px-3 py-1">
                  <span className={cn("inline-flex items-center gap-1 text-xs font-medium", m.lastRunOk ? "text-ok" : "text-danger")}>
                    {m.lastRunOk ? <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} /> : <XCircle className="h-3.5 w-3.5" strokeWidth={2} />}
                    {m.lastRunLabel}
                  </span>
                </td>
                <td className="px-3 py-1 text-right">
                  {m.status === "Active" ? (
                    <>
                      <button type="button" className="mr-1 rounded bg-surface-sunken px-2 py-1 text-xs font-medium text-ink hover:bg-rule">
                        View
                      </button>
                      <button type="button" className="rounded bg-surface-sunken px-2 py-1 text-xs font-medium text-danger hover:bg-rule">
                        Pause
                      </button>
                    </>
                  ) : (
                    <button type="button" className="rounded bg-accent px-2.5 py-1 text-xs font-semibold text-white hover:bg-accent-ink">
                      Retry Debit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
