import { useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { Tenancy } from "../../data/tenancies";

export function EditTermsModal({
  tenancy,
  onClose,
  onSave,
}: {
  tenancy: Tenancy;
  onClose: () => void;
  onSave: (patch: Partial<Tenancy>) => void;
}) {
  const [rent, setRent] = useState(tenancy.rent);
  const [deposit, setDeposit] = useState(tenancy.depositHeld);
  const [maintenance, setMaintenance] = useState(tenancy.maintenanceCharge);
  const [lockIn, setLockIn] = useState(tenancy.lockInMonths);
  const [notice, setNotice] = useState(tenancy.noticePeriodDays);
  const [escalation, setEscalation] = useState(tenancy.escalationPercent);
  const [dueDay, setDueDay] = useState(tenancy.dueDay);

  const changed = rent !== tenancy.rent || deposit !== tenancy.depositHeld || maintenance !== tenancy.maintenanceCharge;
  const needsApproval = Math.abs(rent - tenancy.rent) > 500;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl border border-rule bg-surface shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="px-5 pt-5">
          <h2 className="text-sm font-semibold text-ink">Edit Lease Terms</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 px-5 py-4">
          <Field label="Rent (₹)" changed={rent !== tenancy.rent}>
            <input type="number" className="field" value={rent} onChange={(e) => setRent(Number(e.target.value))} />
          </Field>
          <Field label="Deposit (₹)" changed={deposit !== tenancy.depositHeld}>
            <input type="number" className="field" value={deposit} onChange={(e) => setDeposit(Number(e.target.value))} />
          </Field>
          <Field label="Maintenance (₹)" changed={maintenance !== tenancy.maintenanceCharge}>
            <input type="number" className="field" value={maintenance} onChange={(e) => setMaintenance(Number(e.target.value))} />
          </Field>
          <Field label="Due Day" changed={dueDay !== tenancy.dueDay}>
            <input type="number" min={1} max={31} className="field" value={dueDay} onChange={(e) => setDueDay(Number(e.target.value))} />
          </Field>
          <Field label="Lock-in (months)" changed={lockIn !== tenancy.lockInMonths}>
            <input type="number" className="field" value={lockIn} onChange={(e) => setLockIn(Number(e.target.value))} />
          </Field>
          <Field label="Notice (days)" changed={notice !== tenancy.noticePeriodDays}>
            <input type="number" className="field" value={notice} onChange={(e) => setNotice(Number(e.target.value))} />
          </Field>
          <Field label="Escalation (%)" changed={escalation !== tenancy.escalationPercent}>
            <input type="number" className="field" value={escalation} onChange={(e) => setEscalation(Number(e.target.value))} />
          </Field>
        </div>

        {changed && (
          <p className="mx-5 mb-2 text-xs text-ink-faint">
            Changes above ₹500 require Owner approval and will be submitted as a change request.
          </p>
        )}

        <div className="flex items-center justify-end gap-2 border-t border-rule px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSave({ rent, depositHeld: deposit, maintenanceCharge: maintenance, lockInMonths: lockIn, noticePeriodDays: notice, escalationPercent: escalation, dueDay });
              onClose();
            }}
            className="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink"
          >
            {needsApproval ? "Submit for Approval" : "Submit Changes"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Field({ label, changed, children }: { label: string; changed: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className={`mb-1.5 block text-xs font-semibold uppercase tracking-wide ${changed ? "text-accent-ink" : "text-ink-faint"}`}>{label}</span>
      {children}
    </label>
  );
}
