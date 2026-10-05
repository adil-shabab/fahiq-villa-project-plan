import { TriangleAlert } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import type { BillingInvoice } from "../../data/billing";

export function VoidInvoiceModal({ invoice, onClose, onConfirm }: { invoice: BillingInvoice; onClose: () => void; onConfirm: (reason: string) => void }) {
  const [reason, setReason] = useState("");

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl border border-rule bg-surface shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start gap-3 px-5 pt-5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger">
            <TriangleAlert className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-ink">Void Invoice?</h2>
            <p className="mt-1 text-sm text-ink-muted">
              <b className="text-ink">{invoice.number}</b> will be marked void and excluded from collections. This cannot be undone. Use a credit
              note instead if you just need to adjust the amount.
            </p>
          </div>
        </div>

        <div className="px-5 pb-5 pt-4">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Reason</label>
          <textarea className="field resize-none" rows={2} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Why is this being voided?" />
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            disabled={!reason.trim()}
            onClick={() => {
              onConfirm(reason);
              onClose();
            }}
            className="rounded-lg bg-danger px-3.5 py-2 text-sm font-medium text-white hover:brightness-95 disabled:opacity-50"
          >
            Void Invoice
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
