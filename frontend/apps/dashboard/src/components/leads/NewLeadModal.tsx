import { X } from "lucide-react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { properties } from "../../data/dashboard";
import type { LeadSource, TenantTypePref } from "../../data/leads";

const sources: LeadSource[] = ["Website", "WhatsApp", "Call", "Walk-in", "Broker", "Referral"];
const tenantTypes: TenantTypePref[] = ["Family", "Bachelor Male", "Bachelor Female", "Student", "Working Professional"];

export function NewLeadModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-rule bg-surface shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-rule px-5 py-4">
          <h2 className="text-sm font-semibold text-ink">New Lead</h2>
          <button type="button" onClick={onClose} className="text-ink-faint hover:text-ink" aria-label="Close">
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto px-5 py-5">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name"><input className="field" placeholder="Prospect's full name" /></Field>
            <Field label="Phone"><input className="field" placeholder="+91 98765 43210" /></Field>
          </div>
          <Field label="Email (optional)"><input className="field" placeholder="prospect@example.com" /></Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Source">
              <select className="field" defaultValue="Website">
                {sources.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field label="Interested Property">
              <select className="field" defaultValue={properties[0]?.id}>
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Budget Min (₹)"><input type="number" className="field" placeholder="10000" /></Field>
            <Field label="Budget Max (₹)"><input type="number" className="field" placeholder="15000" /></Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Move-in Date"><input type="date" className="field" /></Field>
            <Field label="Tenant Type">
              <select className="field" defaultValue={tenantTypes[0]}>
                {tenantTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Notes"><textarea className="field resize-none" rows={3} placeholder="Anything else worth noting" /></Field>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button type="button" onClick={onClose} className="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink">
            Create Lead
          </button>
        </div>
      </div>
    </div>,
    document.body,
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
