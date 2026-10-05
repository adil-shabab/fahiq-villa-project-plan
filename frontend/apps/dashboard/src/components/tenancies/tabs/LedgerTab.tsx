import { Download } from "lucide-react";
import { useState } from "react";
import type { Tenancy } from "../../../data/tenancies";
import { formatINR } from "../../../lib/format";

export function LedgerTab({ tenancy }: { tenancy: Tenancy }) {
  const [downloading, setDownloading] = useState(false);
  const totalBilled = tenancy.ledger.reduce((sum, e) => sum + e.debit, 0);
  const totalPaid = tenancy.ledger.reduce((sum, e) => sum + e.credit, 0);
  const currentBalance = tenancy.ledger.at(-1)?.balance ?? 0;

  return (
    <div className="rounded-xl border border-rule bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-5 py-3.5">
        <div className="flex flex-wrap gap-5 text-sm">
          <span>
            <span className="text-ink-faint">Total Billed </span>
            <span className="font-semibold tabular-nums text-ink">{formatINR(totalBilled)}</span>
          </span>
          <span>
            <span className="text-ink-faint">Total Paid </span>
            <span className="font-semibold tabular-nums text-ok">{formatINR(totalPaid)}</span>
          </span>
          <span>
            <span className="text-ink-faint">Current Balance </span>
            <span className={`font-semibold tabular-nums ${currentBalance > 0 ? "text-danger" : "text-ok"}`}>{formatINR(currentBalance)}</span>
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            setDownloading(true);
            setTimeout(() => setDownloading(false), 900);
          }}
          className="flex items-center gap-1.5 rounded-lg border border-rule px-3 py-1.5 text-xs font-medium text-ink hover:border-rule-strong"
        >
          <Download className="h-3.5 w-3.5" strokeWidth={2} />
          {downloading ? "Preparing..." : "Download Statement"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-rule bg-surface-sunken text-xs uppercase tracking-wide text-ink-faint">
              <th className="px-5 py-2.5 font-semibold">Date</th>
              <th className="px-3 py-2.5 font-semibold">Description</th>
              <th className="px-3 py-2.5 text-right font-semibold">Debit</th>
              <th className="px-3 py-2.5 text-right font-semibold">Credit</th>
              <th className="px-3 py-2.5 text-right font-semibold">Balance</th>
            </tr>
          </thead>
          <tbody>
            {tenancy.ledger.map((entry, i) => (
              <tr key={i} className="border-b border-rule last:border-b-0">
                <td className="px-5 py-3 text-ink-muted">{new Date(entry.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                <td className="px-3 py-3 text-ink">{entry.description}</td>
                <td className="px-3 py-3 text-right tabular-nums text-ink">{entry.debit > 0 ? formatINR(entry.debit) : "—"}</td>
                <td className="px-3 py-3 text-right tabular-nums text-ok">{entry.credit > 0 ? formatINR(entry.credit) : "—"}</td>
                <td className="px-3 py-3 text-right font-medium tabular-nums text-ink">{formatINR(entry.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
