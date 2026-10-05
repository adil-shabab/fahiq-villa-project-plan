import type { Tenancy } from "../../../data/tenancies";
import { formatINR } from "../../../lib/format";
import { Badge } from "../../ui/Badge";

const statusTone = { Paid: "ok", "Partially Paid": "warn", Overdue: "danger", Draft: "neutral" } as const;

export function InvoicesTab({ tenancy }: { tenancy: Tenancy }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-rule bg-surface">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-rule bg-surface-sunken text-xs uppercase tracking-wide text-ink-faint">
            <th className="px-5 py-2.5 font-semibold">Invoice #</th>
            <th className="px-3 py-2.5 font-semibold">Period</th>
            <th className="px-3 py-2.5 text-right font-semibold">Amount</th>
            <th className="px-3 py-2.5 font-semibold">Status</th>
            <th className="px-3 py-2.5 font-semibold">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {tenancy.invoices.map((inv) => (
            <tr key={inv.id} className="border-b border-rule last:border-b-0 hover:bg-surface-sunken/60">
              <td className="px-5 py-3 font-mono text-xs font-medium text-ink">{inv.number}</td>
              <td className="px-3 py-3 text-ink-muted">{inv.period}</td>
              <td className="px-3 py-3 text-right tabular-nums text-ink">{formatINR(inv.amount)}</td>
              <td className="px-3 py-3">
                <Badge tone={statusTone[inv.status]}>{inv.status}</Badge>
              </td>
              <td className="px-3 py-3 text-ink-muted">{new Date(inv.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
