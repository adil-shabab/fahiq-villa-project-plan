import { TriangleAlert } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import type { ListingRow } from "../../data/listings";

const reasons = ["Rented elsewhere", "Owner request", "Listing paused", "Other"];

export function UnlistConfirmModal({
  row,
  onClose,
  onConfirm,
}: {
  row: ListingRow;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [reason, setReason] = useState(reasons[0]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl border border-rule bg-surface shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start gap-3 px-5 pt-5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger">
            <TriangleAlert className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-ink">Remove from Website?</h2>
            <p className="mt-1 text-sm text-ink-muted">
              <b className="text-ink">{row.unitCode}</b> will no longer appear in search results or be bookable on the
              public site. You can re-list it anytime.
            </p>
          </div>
        </div>

        <div className="px-5 pb-5 pt-4">
          <label className="block text-xs font-semibold uppercase tracking-wide text-ink-faint">Reason (optional)</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-rule bg-surface-sunken px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
          >
            {reasons.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="rounded-lg bg-danger px-3.5 py-2 text-sm font-medium text-white hover:brightness-95"
          >
            Unlist Unit
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
