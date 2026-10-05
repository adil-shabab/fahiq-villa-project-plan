import { Camera, CheckCircle2, History, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { businessProfile } from "../../data/settings";
import { cn } from "../../lib/utils";

export function BusinessProfileSection() {
  const [activeTheme, setActiveTheme] = useState(businessProfile.brandThemes[0].hex);

  return (
    <section id="business-profile" className="overflow-hidden rounded-xl border border-rule bg-surface shadow-sm">
      <div className="flex flex-col justify-between gap-2.5 bg-surface-sunken/50 p-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-ink">Business Profile &amp; Legal Entity</h2>
            <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-[11px] font-medium text-accent">Primary Master</span>
          </div>
          <p className="mt-0.5 text-sm text-ink-faint">Public-facing details and legal corporate credentials used across tenancy agreements, receipts, and e-invoices.</p>
        </div>
        <span className="shrink-0 font-mono text-xs text-ink-faint">Org ID: {businessProfile.orgId}</span>
      </div>

      <div className="flex flex-col gap-5 p-5">
        <div className="grid grid-cols-1 items-center gap-5 pb-5 md:grid-cols-12">
          <div className="flex items-center gap-4 md:col-span-4">
            <div className="group relative flex h-24 w-24 shrink-0 flex-col items-center justify-center overflow-hidden rounded-xl bg-accent text-white shadow-sm">
              <span className="text-2xl font-bold tracking-tight">FQ</span>
              <span className="text-[9px] uppercase tracking-widest opacity-80">Living</span>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/80 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <Camera className="h-5 w-5" strokeWidth={2} />
                <span className="mt-0.5 text-[10px]">Replace</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-ink">Brand Monogram</span>
              <span className="text-xs text-ink-faint">SVG, PNG, min 400x400px. Appears on stamp PDFs &amp; receipts.</span>
              <div className="mt-1 flex items-center gap-2 text-xs">
                <button type="button" className="font-semibold text-accent hover:underline">Change Logo</button>
                <span className="text-ink-faint">·</span>
                <button type="button" className="font-semibold text-danger hover:underline">Remove</button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-xl bg-surface-sunken p-4 md:col-span-8">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">Primary Brand Theme</span>
              <span className="text-xs text-ink-faint">Hex Sync Active</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-surface px-3 py-1.5 shadow-sm">
                <div className="h-6 w-6 rounded-md shadow-inner" style={{ backgroundColor: activeTheme }} />
                <span className="font-mono text-sm font-semibold text-ink">{activeTheme}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {businessProfile.brandThemes.map((t) => (
                  <button
                    key={t.hex}
                    type="button"
                    title={t.label}
                    onClick={() => setActiveTheme(t.hex)}
                    className={cn("h-7 w-7 rounded-full transition-transform hover:scale-105", activeTheme === t.hex && "ring-2 ring-accent ring-offset-2 ring-offset-surface-sunken")}
                    style={{ backgroundColor: t.hex }}
                  />
                ))}
              </div>
              <span className="ml-auto text-xs text-ink-faint">Used in receipts, tenant app header &amp; invoices</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="flex items-center justify-between text-sm font-semibold text-ink">
              Legal Business Entity Name
              <span className="text-[11px] font-normal text-ink-faint">Registered MCA Name</span>
            </span>
            <input className="field" defaultValue={businessProfile.legalName} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="flex items-center justify-between text-sm font-semibold text-ink">
              Brand / Display Name
              <span className="text-[11px] font-normal text-ink-faint">Tenant Facing</span>
            </span>
            <input className="field" defaultValue={businessProfile.brandName} />
          </label>
          <label className="flex flex-col gap-1.5 md:col-span-2">
            <span className="text-sm font-semibold text-ink">Registered Headquarters Address</span>
            <textarea className="field min-h-16 resize-none leading-relaxed" rows={2} defaultValue={businessProfile.address} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="flex items-center justify-between text-sm font-semibold text-ink">
              GSTIN (Goods &amp; Services Tax)
              <span className="flex items-center gap-1 text-[11px] font-semibold text-accent">
                <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
                Verified 29-KA
              </span>
            </span>
            <div className="relative flex items-center">
              <input className="field pr-24 font-mono tracking-wide" defaultValue={businessProfile.gstin} />
              <span className="absolute right-2 rounded bg-surface-sunken px-2 py-0.5 text-[10px] font-mono text-ink-muted">KARNATAKA</span>
            </div>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="flex items-center justify-between text-sm font-semibold text-ink">
              PAN (Permanent Account Number)
              <span className="text-[11px] font-normal text-ink-faint">Entity: Domestic Company</span>
            </span>
            <input className="field font-mono tracking-wide" defaultValue={businessProfile.pan} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-ink">Primary Operations Email</span>
            <div className="relative flex items-center">
              <Mail className="pointer-events-none absolute left-3 h-4 w-4 text-ink-faint" strokeWidth={2} />
              <input className="field pl-9" defaultValue={businessProfile.email} />
            </div>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-ink">Official WhatsApp / Desk Phone</span>
            <div className="relative flex items-center">
              <Phone className="pointer-events-none absolute left-3 h-4 w-4 text-ink-faint" strokeWidth={2} />
              <input className="field pl-9 font-mono" defaultValue={businessProfile.phone} />
            </div>
          </label>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-2.5 bg-surface-sunken/50 px-5 py-3 text-xs sm:flex-row">
        <div className="flex items-center gap-1.5 text-ink-muted">
          <History className="h-4 w-4 text-ink-faint" strokeWidth={2} />
          <span>
            Last saved on <strong className="text-ink">{businessProfile.lastSaved}</strong> by <strong className="text-ink">{businessProfile.lastSavedBy}</strong>
          </span>
        </div>
        <button type="button" className="rounded-lg bg-accent px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-accent-ink">
          Save Entity Details
        </button>
      </div>
    </section>
  );
}
