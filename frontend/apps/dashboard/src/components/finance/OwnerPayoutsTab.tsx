import { CirclePlus } from "lucide-react";
import { ownerPayouts, quarterPayoutTotal } from "../../data/finance";
import { formatINR } from "../../lib/format";
import { Avatar } from "../ui/Avatar";

export function OwnerPayoutsTab({ onRecordDisbursal }: { onRecordDisbursal: () => void }) {
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-rule bg-surface p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-2.5 md:flex-row md:items-center">
        <div>
          <h2 className="text-lg font-bold text-ink">Owner Payouts & Capital Distributions</h2>
          <p className="text-sm text-ink-faint">
            {formatINR(quarterPayoutTotal)} transferred this quarter · 100% tax deducted at source (TDS 194-I compliant ledger).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-surface-sunken px-3 py-1 text-xs font-semibold text-accent">Q4 Payout Run Complete</span>
          <button type="button" onClick={onRecordDisbursal} className="flex items-center gap-1.5 rounded-lg bg-gold px-3.5 py-2 text-sm font-semibold text-white hover:opacity-90">
            <CirclePlus className="h-4 w-4" strokeWidth={2} />
            Record Disbursal
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-sunken text-[11px] uppercase tracking-wide text-ink-faint">
            <tr>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Property Entity</th>
              <th className="px-4 py-3 font-semibold">Beneficiary / Owner Entity</th>
              <th className="px-4 py-3 text-right font-semibold">Net Payout</th>
              <th className="px-4 py-3 font-semibold">Method</th>
              <th className="px-4 py-3 font-semibold">Reference / UTR</th>
              <th className="px-4 py-3 font-semibold">Disbursal Memo</th>
              <th className="px-4 py-3 font-semibold">Recorded By</th>
            </tr>
          </thead>
          <tbody>
            {ownerPayouts.map((p) => (
              <tr key={p.id} className="border-b border-rule last:border-b-0 hover:bg-surface-sunken/60">
                <td className="px-4 py-3.5 font-mono text-xs text-ink">{p.date}</td>
                <td className="px-4 py-3.5 font-medium text-ink">{p.propertyName}</td>
                <td className="px-4 py-3.5">
                  <div className="font-bold text-ink">{p.beneficiaryName}</div>
                  <span className="text-xs text-ink-faint">{p.beneficiarySubtitle}</span>
                </td>
                <td className="px-4 py-3.5 text-right font-mono font-bold text-ink">{formatINR(p.amount)}</td>
                <td className="px-4 py-3.5">
                  <span className="rounded bg-surface-sunken px-2 py-0.5 text-[11px] font-semibold text-accent">{p.method}</span>
                </td>
                <td className="px-4 py-3.5 font-mono text-xs text-ink-faint">{p.reference}</td>
                <td className="max-w-[220px] px-4 py-3.5 text-xs text-ink-muted">{p.memo}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <Avatar initials="PS" size="sm" />
                    <span className="text-xs font-medium text-ink">{p.recordedBy}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
