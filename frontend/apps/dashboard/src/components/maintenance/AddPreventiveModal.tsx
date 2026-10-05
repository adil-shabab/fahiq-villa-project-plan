import { useState } from "react";
import { createPortal } from "react-dom";
import { vendors } from "../../data/maintenance";

const frequencies = ["Monthly", "Quarterly", "Half-Yearly", "Annual"];

export function AddPreventiveModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState(frequencies[0]);
  const [dueDate, setDueDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [vendorId, setVendorId] = useState(vendors[0]?.id ?? "");

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="flex w-full max-w-lg flex-col gap-4 rounded-2xl border border-rule bg-surface p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-rule pb-2">
          <h3 className="text-base font-bold text-ink">New Preventive Maintenance Schedule</h3>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-ink-muted hover:bg-surface-sunken">✕</button>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Schedule Name</span>
          <input className="field" placeholder="e.g. Overhead Tank Cleaning & Chlorination" value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Recurrence Frequency</span>
            <select className="field" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
              {frequencies.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">First Due Date</span>
            <input type="date" className="field" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </label>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Assigned Vendor / In-house Lead</span>
          <select className="field" value={vendorId} onChange={(e) => setVendorId(e.target.value)}>
            {vendors.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
            <option value="in-house">In-house Facility Supervisor</option>
          </select>
        </label>

        <div className="flex items-center justify-end gap-2 border-t border-rule pt-3">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSave();
              onClose();
            }}
            disabled={!name.trim()}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            Activate Schedule
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
