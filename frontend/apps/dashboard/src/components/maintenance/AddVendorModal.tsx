import { useState } from "react";
import { createPortal } from "react-dom";

export function AddVendorModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [specialties, setSpecialties] = useState("");

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="flex w-full max-w-lg flex-col gap-4 rounded-2xl border border-rule bg-surface p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-rule pb-2">
          <h3 className="text-base font-bold text-ink">Onboard New Vendor Partner</h3>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-ink-muted hover:bg-surface-sunken">✕</button>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Firm / Agency Name</span>
          <input className="field" placeholder="e.g. Apex Elevators & Lift Care" value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Lead Contact Person</span>
            <input className="field" placeholder="Name" value={contact} onChange={(e) => setContact(e.target.value)} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">WhatsApp / Phone</span>
            <input className="field" placeholder="+91 ..." value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Specialties &amp; Services Covered</span>
          <input
            className="field"
            placeholder="Comma separated: AC Repair, Gas Charging, HVAC"
            value={specialties}
            onChange={(e) => setSpecialties(e.target.value)}
          />
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
            Save Partner
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
