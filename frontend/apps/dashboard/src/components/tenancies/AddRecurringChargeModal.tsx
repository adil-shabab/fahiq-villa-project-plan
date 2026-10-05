import { useState } from "react";
import { createPortal } from "react-dom";
import type { RecurringCharge } from "../../data/tenancies";

const chargeTypes = ["Wi-Fi", "Parking", "Maintenance", "Mess", "Housekeeping", "Custom"];

export function AddRecurringChargeModal({ onClose, onAdd }: { onClose: () => void; onAdd: (charge: RecurringCharge) => void }) {
  const [type, setType] = useState(chargeTypes[0]);
  const [amount, setAmount] = useState(0);
  const [startPeriod, setStartPeriod] = useState(() => new Date().toISOString().slice(0, 7));
  const [notes, setNotes] = useState("");

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl border border-rule bg-surface shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="px-5 pt-5">
          <h2 className="text-sm font-semibold text-ink">Add Recurring Charge</h2>
        </div>
        <div className="flex flex-col gap-4 px-5 py-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Charge Type</span>
            <select className="field" value={type} onChange={(e) => setType(e.target.value)}>
              {chargeTypes.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Amount (₹)</span>
            <input type="number" className="field" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Starts From</span>
            <input type="month" className="field" value={startPeriod} onChange={(e) => setStartPeriod(e.target.value)} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Notes</span>
            <input className="field" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </label>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-rule px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            disabled={amount <= 0}
            onClick={() => {
              onAdd({ id: `rc${Date.now()}`, type, amount, startPeriod, notes });
              onClose();
            }}
            className="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink disabled:opacity-50"
          >
            Add Charge
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
