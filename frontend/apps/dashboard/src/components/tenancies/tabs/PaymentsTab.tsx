import { Download } from "lucide-react";
import type { Tenancy } from "../../../data/tenancies";
import { formatINR } from "../../../lib/format";

export function PaymentsTab({ tenancy }: { tenancy: Tenancy }) {
  if (tenancy.payments.length === 0) {
    return <p className="rounded-xl border border-rule bg-surface py-10 text-center text-sm text-ink-faint">No payments recorded yet.</p>;
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-rule bg-surface">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-rule bg-surface-sunken text-xs uppercase tracking-wide text-ink-faint">
            <th className="px-5 py-2.5 font-semibold">Date</th>
            <th className="px-3 py-2.5 text-right font-semibold">Amount</th>
            <th className="px-3 py-2.5 font-semibold">Method</th>
            <th className="px-3 py-2.5 font-semibold">Receipt</th>
            <th className="w-12 px-3 py-2.5" />
          </tr>
        </thead>
        <tbody>
          {tenancy.payments.map((p) => (
            <tr key={p.id} className="border-b border-rule last:border-b-0 hover:bg-surface-sunken/60">
              <td className="px-5 py-3 text-ink-muted">{new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
              <td className="px-3 py-3 text-right font-medium tabular-nums text-ok">{formatINR(p.amount)}</td>
              <td className="px-3 py-3 text-ink-muted">{p.method}</td>
              <td className="px-3 py-3 font-mono text-xs text-ink-muted">{p.receiptNo}</td>
              <td className="px-3 py-3 text-right">
                <button type="button" className="text-ink-faint hover:text-accent" aria-label="Download receipt">
                  <Download className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
