import { TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { BillingInvoice } from "../../data/billing";
import { formatINR } from "../../lib/format";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { DropdownMenu } from "../ui/DropdownMenu";

const statusTone = {
  Draft: "neutral",
  Issued: "info",
  "Partially Paid": "warn",
  Paid: "ok",
  Overdue: "danger",
  Void: "neutral",
} as const;

export function InvoicesTable({
  invoices,
  onSend,
  onAddCreditNote,
  onVoid,
}: {
  invoices: BillingInvoice[];
  onSend: (inv: BillingInvoice) => void;
  onAddCreditNote: (inv: BillingInvoice) => void;
  onVoid: (inv: BillingInvoice) => void;
}) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected((prev) => (prev.size === invoices.length ? new Set() : new Set(invoices.map((i) => i.id))));
  }

  return (
    <div className="rounded-xl border border-rule bg-surface">
      {selected.size > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule bg-accent-soft px-5 py-2.5 text-sm">
          <span className="font-medium text-accent-ink">{selected.size} selected</span>
          <div className="flex gap-2">
            {["Issue Selected", "Send Selected", "Apply Late Fees", "Export"].map((action) => (
              <button
                key={action}
                type="button"
                onClick={() => setSelected(new Set())}
                className="rounded-lg border border-accent/40 bg-surface px-3 py-1.5 text-xs font-medium text-accent-ink hover:bg-accent-soft"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-rule bg-surface-sunken text-xs uppercase tracking-wide text-ink-faint">
              <th className="w-10 px-5 py-2.5">
                <input
                  type="checkbox"
                  checked={selected.size === invoices.length && invoices.length > 0}
                  onChange={toggleAll}
                  className="h-4 w-4 rounded border-rule-strong accent-[var(--color-accent)]"
                />
              </th>
              <th className="px-3 py-2.5 font-semibold">Invoice #</th>
              <th className="px-3 py-2.5 font-semibold">Tenant</th>
              <th className="px-3 py-2.5 font-semibold">Unit</th>
              <th className="px-3 py-2.5 font-semibold">Period</th>
              <th className="px-3 py-2.5 text-right font-semibold">Amount</th>
              <th className="px-3 py-2.5 font-semibold">Status</th>
              <th className="px-3 py-2.5 font-semibold">Due Date</th>
              <th className="w-12 px-3 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-rule last:border-b-0 hover:bg-surface-sunken/60">
                <td className="px-5 py-3">
                  <input
                    type="checkbox"
                    checked={selected.has(inv.id)}
                    onChange={() => toggleRow(inv.id)}
                    className="h-4 w-4 rounded border-rule-strong accent-[var(--color-accent)]"
                  />
                </td>
                <td className="cursor-pointer px-3 py-3" onClick={() => navigate(`/billing/${inv.id}`)}>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-medium text-ink">{inv.number}</span>
                    {inv.electricityPending && <TriangleAlert className="h-3.5 w-3.5 text-warn" strokeWidth={2} />}
                  </div>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar initials={inv.avatarInitials} size="sm" />
                    <span className="text-ink">{inv.tenantName}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-ink-muted">{inv.unitCode}</td>
                <td className="px-3 py-3 text-ink-muted">{inv.periodLabel}</td>
                <td className="px-3 py-3 text-right tabular-nums text-ink">{formatINR(inv.total)}</td>
                <td className="px-3 py-3">
                  <Badge tone={statusTone[inv.status]}>{inv.status}</Badge>
                </td>
                <td className="px-3 py-3">
                  <span className="text-ink-muted">{new Date(inv.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                  {inv.daysOverdue > 0 && <span className="ml-1.5 rounded-full bg-danger/10 px-1.5 py-0.5 text-[11px] font-medium text-danger">{inv.daysOverdue}d</span>}
                </td>
                <td className="px-3 py-3 text-right">
                  <DropdownMenu
                    actions={[
                      { label: "View", onSelect: () => navigate(`/billing/${inv.id}`) },
                      { label: "Send", onSelect: () => onSend(inv) },
                      { label: "Download PDF", onSelect: () => {} },
                      { label: "Add Credit Note", onSelect: () => onAddCreditNote(inv) },
                      { label: "Void", onSelect: () => onVoid(inv), tone: "danger" },
                    ]}
                  />
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr>
                <td colSpan={9} className="px-5 py-10 text-center text-sm text-ink-faint">
                  No invoices match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
