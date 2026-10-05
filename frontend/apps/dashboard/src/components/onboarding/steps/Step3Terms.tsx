import type { ReactNode } from "react";
import type { OnboardingDraft } from "../../../data/onboarding";

export function Step3Terms({ draft, onChange }: { draft: OnboardingDraft; onChange: (patch: Partial<OnboardingDraft>) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl border border-rule bg-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-ink">Lease Period &amp; Rent</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Start Date">
            <input type="date" className="field" value={draft.startDate} onChange={(e) => onChange({ startDate: e.target.value })} />
          </Field>
          <Field label="End Date">
            <input type="date" className="field" value={draft.endDate} onChange={(e) => onChange({ endDate: e.target.value })} />
          </Field>
          <Field label="Monthly Rent (₹)">
            <input type="number" className="field" value={draft.rent} onChange={(e) => onChange({ rent: Number(e.target.value) })} />
          </Field>
          <Field label="Security Deposit (₹)">
            <input type="number" className="field" value={draft.deposit} onChange={(e) => onChange({ deposit: Number(e.target.value) })} />
          </Field>
          <Field label="Maintenance Charge (₹)">
            <input type="number" className="field" value={draft.maintenanceCharge} onChange={(e) => onChange({ maintenanceCharge: Number(e.target.value) })} />
          </Field>
          <Field label="Rent Due Day">
            <input
              type="number"
              min={1}
              max={31}
              className="field"
              value={draft.dueDay}
              onChange={(e) => onChange({ dueDay: Number(e.target.value) })}
            />
          </Field>
          <Field label="Lock-in Period (months)">
            <input type="number" className="field" value={draft.lockInMonths} onChange={(e) => onChange({ lockInMonths: Number(e.target.value) })} />
          </Field>
          <Field label="Notice Period (days)">
            <input type="number" className="field" value={draft.noticePeriodDays} onChange={(e) => onChange({ noticePeriodDays: Number(e.target.value) })} />
          </Field>
          <Field label="Annual Escalation (%)">
            <input type="number" className="field" value={draft.escalationPercent} onChange={(e) => onChange({ escalationPercent: Number(e.target.value) })} />
          </Field>
        </div>
      </div>

      <div className="rounded-xl border border-rule bg-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-ink">Inclusions</h3>
        <div className="flex flex-wrap gap-4">
          <Checkbox label="Water included in rent" checked={draft.waterIncluded} onChange={(v) => onChange({ waterIncluded: v })} />
          <Checkbox label="Wi-Fi included" checked={draft.wifiIncluded} onChange={(v) => onChange({ wifiIncluded: v })} />
          <Checkbox label="Parking included" checked={draft.parkingIncluded} onChange={(v) => onChange({ parkingIncluded: v })} />
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">{label}</span>
      {children}
    </label>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-rule-strong accent-[var(--color-accent)]"
      />
      {label}
    </label>
  );
}
