import type { Tenancy } from "../../../data/tenancies";
import { formatINR } from "../../../lib/format";
import { Badge } from "../../ui/Badge";

const typeTone = { Collected: "ok", Deduction: "danger", Refund: "info" } as const;

export function DepositTab({ tenancy }: { tenancy: Tenancy }) {
  const held = tenancy.deposit.reduce((sum, e) => (e.type === "Collected" ? sum + e.amount : sum - e.amount), 0);

  return (
    <div>
      <div className="mb-4 rounded-xl border border-rule bg-surface p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Deposit Currently Held</p>
        <p className="mt-1 text-xl font-bold tabular-nums text-ink">{formatINR(held)}</p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-rule bg-surface">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-rule bg-surface-sunken text-xs uppercase tracking-wide text-ink-faint">
              <th className="px-5 py-2.5 font-semibold">Date</th>
              <th className="px-3 py-2.5 font-semibold">Type</th>
              <th className="px-3 py-2.5 text-right font-semibold">Amount</th>
              <th className="px-3 py-2.5 font-semibold">Note</th>
            </tr>
          </thead>
          <tbody>
            {tenancy.deposit.map((entry, i) => (
              <tr key={i} className="border-b border-rule last:border-b-0">
                <td className="px-5 py-3 text-ink-muted">{new Date(entry.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                <td className="px-3 py-3">
                  <Badge tone={typeTone[entry.type]}>{entry.type}</Badge>
                </td>
                <td className="px-3 py-3 text-right tabular-nums text-ink">{formatINR(entry.amount)}</td>
                <td className="px-3 py-3 text-ink-muted">{entry.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
