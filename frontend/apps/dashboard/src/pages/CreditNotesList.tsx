import { BillingSubNav } from "../components/billing/BillingSubNav";
import { creditNotes } from "../data/billing";
import { formatINR } from "../lib/format";
import { Badge } from "../components/ui/Badge";

const typeTone = { Discount: "info", Waiver: "ok", Adjustment: "warn", Correction: "neutral" } as const;

export function CreditNotesList() {
  return (
    <div className="mx-auto flex max-w-[1300px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Credit Notes</h1>
          <p className="mt-0.5 text-sm text-ink-faint">{creditNotes.length} issued this month</p>
        </div>
      </div>

      <BillingSubNav />

      <div className="overflow-x-auto rounded-xl border border-rule bg-surface">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-rule bg-surface-sunken text-xs uppercase tracking-wide text-ink-faint">
              <th className="px-5 py-2.5 font-semibold">Credit Note #</th>
              <th className="px-3 py-2.5 font-semibold">Invoice #</th>
              <th className="px-3 py-2.5 font-semibold">Tenant</th>
              <th className="px-3 py-2.5 font-semibold">Type</th>
              <th className="px-3 py-2.5 text-right font-semibold">Amount</th>
              <th className="px-3 py-2.5 font-semibold">Reason</th>
              <th className="px-3 py-2.5 font-semibold">Issued By</th>
              <th className="px-3 py-2.5 font-semibold">Approval</th>
              <th className="px-3 py-2.5 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {creditNotes.map((note) => (
              <tr key={note.id} className="border-b border-rule last:border-b-0 hover:bg-surface-sunken/60">
                <td className="px-5 py-3 font-mono text-xs font-medium text-ink">{note.number}</td>
                <td className="px-3 py-3 font-mono text-xs text-ink-muted">{note.invoiceNumber}</td>
                <td className="px-3 py-3 text-ink">{note.tenantName}</td>
                <td className="px-3 py-3">
                  <Badge tone={typeTone[note.type]}>{note.type}</Badge>
                </td>
                <td className="px-3 py-3 text-right font-medium tabular-nums text-ok">-{formatINR(note.amount)}</td>
                <td className="max-w-[220px] truncate px-3 py-3 text-ink-muted">{note.reason}</td>
                <td className="px-3 py-3 text-ink-muted">{note.issuedBy}</td>
                <td className="px-3 py-3">
                  <Badge tone={note.approvalStatus === "Approved" ? "ok" : "warn"}>{note.approvalStatus}</Badge>
                </td>
                <td className="px-3 py-3 text-ink-muted">{new Date(note.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
