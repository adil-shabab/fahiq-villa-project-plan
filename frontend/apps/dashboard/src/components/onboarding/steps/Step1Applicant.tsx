import { Plus, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import type { CoOccupant, OnboardingDraft } from "../../../data/onboarding";
import { AddPersonModal } from "../AddPersonModal";

export function Step1Applicant({
  draft,
  onChange,
}: {
  draft: OnboardingDraft;
  onChange: (patch: Partial<OnboardingDraft>) => void;
}) {
  const [addKind, setAddKind] = useState<"Co-occupant" | "Guarantor" | null>(null);

  function removePerson(id: string) {
    onChange({ coOccupants: draft.coOccupants.filter((p) => p.id !== id) });
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full Name" required>
          <input className="field" value={draft.fullName} onChange={(e) => onChange({ fullName: e.target.value })} placeholder="Applicant's full name" />
        </Field>
        <Field label="Phone" required>
          <input className="field" value={draft.phone} onChange={(e) => onChange({ phone: e.target.value })} placeholder="+91 98765 43210" />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Email">
          <input className="field" value={draft.email} onChange={(e) => onChange({ email: e.target.value })} placeholder="name@example.com" />
        </Field>
        <Field label="Date of Birth">
          <input type="date" className="field" value={draft.dob} onChange={(e) => onChange({ dob: e.target.value })} />
        </Field>
      </div>

      <Field label="Gender">
        <div className="flex gap-2">
          {["Male", "Female", "Other"].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => onChange({ gender: g })}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                draft.gender === g ? "border-accent bg-accent-soft text-accent-ink" : "border-rule text-ink-muted hover:border-rule-strong"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Current Address">
        <textarea className="field resize-none" rows={2} value={draft.currentAddress} onChange={(e) => onChange({ currentAddress: e.target.value })} />
      </Field>

      <div>
        <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-ink-muted">
          <input
            type="checkbox"
            checked={draft.sameAsCurrent}
            onChange={(e) => onChange({ sameAsCurrent: e.target.checked, permanentAddress: e.target.checked ? draft.currentAddress : draft.permanentAddress })}
            className="h-3.5 w-3.5 rounded border-rule-strong accent-[var(--color-accent)]"
          />
          Permanent address same as current
        </label>
        {!draft.sameAsCurrent && (
          <textarea
            className="field resize-none"
            rows={2}
            value={draft.permanentAddress}
            onChange={(e) => onChange({ permanentAddress: e.target.value })}
            placeholder="Permanent address"
          />
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Occupation">
          <div className="flex gap-2">
            {(["Working Professional", "Student", "Business"] as const).map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => onChange({ occupation: o })}
                className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium ${
                  draft.occupation === o ? "border-accent bg-accent-soft text-accent-ink" : "border-rule text-ink-muted hover:border-rule-strong"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Company / College Name">
          <input className="field" value={draft.companyOrCollege} onChange={(e) => onChange({ companyOrCollege: e.target.value })} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Emergency Contact Name">
          <input className="field" value={draft.emergencyContactName} onChange={(e) => onChange({ emergencyContactName: e.target.value })} />
        </Field>
        <Field label="Emergency Contact Phone">
          <input className="field" value={draft.emergencyContactPhone} onChange={(e) => onChange({ emergencyContactPhone: e.target.value })} />
        </Field>
      </div>

      <div className="rounded-xl border border-rule bg-surface p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-ink">Co-occupants &amp; Guarantor</h3>
        </div>
        {draft.coOccupants.length > 0 && (
          <ul className="mt-3 flex flex-col gap-2">
            {draft.coOccupants.map((p) => (
              <li key={p.id} className="flex items-center justify-between rounded-lg bg-surface-sunken px-3 py-2 text-sm">
                <span>
                  <span className="font-medium text-ink">{p.name}</span>
                  <span className="text-ink-faint"> &middot; {p.relation} &middot; {p.kind}</span>
                </span>
                <button type="button" onClick={() => removePerson(p.id)} className="text-ink-faint hover:text-danger">
                  <X className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => setAddKind("Co-occupant")}
            className="flex items-center gap-1 rounded-lg border border-rule px-2.5 py-1.5 text-xs font-medium text-ink hover:border-rule-strong"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            Add Co-occupant
          </button>
          <button
            type="button"
            onClick={() => setAddKind("Guarantor")}
            className="flex items-center gap-1 rounded-lg border border-rule px-2.5 py-1.5 text-xs font-medium text-ink hover:border-rule-strong"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            Add Guarantor
          </button>
        </div>
      </div>

      {addKind && (
        <AddPersonModal
          kind={addKind}
          onClose={() => setAddKind(null)}
          onAdd={(person: CoOccupant) => onChange({ coOccupants: [...draft.coOccupants, person] })}
        />
      )}
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">
        {label}
        {required && <span className="text-danger"> *</span>}
      </span>
      {children}
    </label>
  );
}
