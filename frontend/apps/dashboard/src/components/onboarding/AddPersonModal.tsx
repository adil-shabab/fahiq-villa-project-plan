import { X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import type { CoOccupant } from "../../data/onboarding";

const relations = ["Spouse", "Parent", "Sibling", "Friend", "Colleague", "Other"];

export function AddPersonModal({
  kind,
  onClose,
  onAdd,
}: {
  kind: "Co-occupant" | "Guarantor";
  onClose: () => void;
  onAdd: (person: CoOccupant) => void;
}) {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState(relations[0]);
  const [phone, setPhone] = useState("");

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl border border-rule bg-surface shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-rule px-5 py-4">
          <h2 className="text-sm font-semibold text-ink">Add {kind}</h2>
          <button type="button" onClick={onClose} className="text-ink-faint hover:text-ink" aria-label="Close">
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-5 py-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Full Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className="field" placeholder="Full name" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Relation to Applicant</span>
            <select value={relation} onChange={(e) => setRelation(e.target.value)} className="field">
              {relations.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Phone Number</span>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="field" placeholder="+91 98765 43210" />
          </label>
          {kind === "Guarantor" && <p className="text-xs text-ink-faint">ID proof upload will be requested in a future step.</p>}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            disabled={!name.trim() || !phone.trim()}
            onClick={() => {
              onAdd({ id: `p${Date.now()}`, name, relation, phone, kind });
              onClose();
            }}
            className="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
