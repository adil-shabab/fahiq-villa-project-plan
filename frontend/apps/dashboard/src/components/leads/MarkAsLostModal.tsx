import { useState } from "react";
import { createPortal } from "react-dom";
import type { Lead } from "../../data/leads";

const reasons = ["Budget mismatch", "Chose another property", "Unresponsive", "Timing didn't work", "Other"];

export function MarkAsLostModal({ lead, onClose, onConfirm }: { lead: Lead; onClose: () => void; onConfirm: (reason: string) => void }) {
  const [reason, setReason] = useState(reasons[0]);

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl border border-rule bg-surface shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="px-5 pt-5">
          <h2 className="text-sm font-semibold text-ink">Mark as Lost</h2>
          <p className="mt-1 text-sm text-ink-muted">
            <b className="text-ink">{lead.name}</b> will move to the Lost column. You can still view their history later.
          </p>
        </div>
        <div className="px-5 py-4">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Reason</label>
          <select value={reason} onChange={(e) => setReason(e.target.value)} className="field">
            {reasons.map((r) => (
              <option key={r} value={r}>{r}</option>
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
              onConfirm(reason);
              onClose();
            }}
            className="rounded-lg bg-danger px-3.5 py-2 text-sm font-medium text-white hover:brightness-95"
          >
            Mark as Lost
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
