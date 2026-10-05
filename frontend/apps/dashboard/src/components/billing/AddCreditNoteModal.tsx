import { useState } from "react";
import { createPortal } from "react-dom";
import type { BillingInvoice, CreditNote } from "../../data/billing";
import { formatINR } from "../../lib/format";
import { cn } from "../../lib/utils";

const types: CreditNote["type"][] = ["Discount", "Waiver", "Adjustment", "Correction"];
const APPROVAL_LIMIT = 1000;

export function AddCreditNoteModal({
  invoice,
  onClose,
  onAdd,
}: {
  invoice: BillingInvoice;
  onClose: () => void;
  onAdd: (note: Omit<CreditNote, "id" | "number" | "date" | "issuedBy">) => void;
}) {
  const [type, setType] = useState<CreditNote["type"]>("Waiver");
  const [amount, setAmount] = useState(0);
  const [reason, setReason] = useState("");
  const overLimit = amount > APPROVAL_LIMIT;
  const newBalance = Math.max(invoice.balance - amount, 0);

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl border border-rule bg-surface shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="px-5 pt-5">
          <h2 className="text-sm font-semibold text-ink">Add Credit Note</h2>
          <p className="mt-1 text-sm text-ink-muted">{invoice.number}</p>
        </div>

        <div className="flex flex-col gap-4 px-5 py-4">
          <div>
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Type</span>
            <div className="flex flex-wrap gap-1.5">
              {types.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={cn(
                    "rounded-lg border px-2.5 py-1.5 text-xs font-medium",
                    type === t ? "border-accent bg-accent-soft text-accent-ink" : "border-rule text-ink-muted hover:border-rule-strong",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Amount (₹)</span>
            <input type="number" className="field" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
            {amount > 0 && <p className="mt-1.5 text-xs text-ink-faint">New balance after credit: <span className="font-medium text-ink">{formatINR(newBalance)}</span></p>}
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Reason</span>
            <textarea className="field resize-none" rows={2} value={reason} onChange={(e) => setReason(e.target.value)} />
          </label>

          {overLimit && (
            <p className="rounded-lg bg-warn/10 px-3 py-2 text-xs font-medium text-warn">
              This exceeds your ₹{APPROVAL_LIMIT.toLocaleString("en-IN")} limit and will require Owner approval.
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            disabled={amount <= 0 || !reason.trim()}
            onClick={() => {
              onAdd({
                invoiceNumber: invoice.number,
                tenantName: invoice.tenantName,
                type,
                amount,
                reason,
                approvalStatus: overLimit ? "Pending Approval" : "Approved",
              });
              onClose();
            }}
            className="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink disabled:opacity-50"
          >
            {overLimit ? "Submit for Approval" : "Add Credit Note"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
