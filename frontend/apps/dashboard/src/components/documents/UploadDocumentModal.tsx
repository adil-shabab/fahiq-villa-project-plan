import { CloudUpload, Lock, PenLine, ScanText } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";

const categories = ["Agreement (Tenancy / Lease)", "KYC Identification", "Police Verification", "Invoice / Receipt", "Settlement Deed", "Other Operational Document"];
const relTypes = ["Tenant", "Tenancy", "Unit", "Property"] as const;

export function UploadDocumentModal({ onClose, onUpload }: { onClose: () => void; onUpload: () => void }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [expiry, setExpiry] = useState("");
  const [relType, setRelType] = useState<(typeof relTypes)[number]>("Tenant");
  const [entity, setEntity] = useState("");
  const [eSign, setESign] = useState(true);

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-rule bg-surface shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-rule px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <CloudUpload className="h-5 w-5" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">Upload Document to Vault</h3>
              <p className="text-xs text-ink-faint">Encrypted with AES-256 at rest</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-ink-muted hover:bg-surface-sunken">✕</button>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto px-5 py-4">
          <div className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-rule-strong p-5 text-center transition-colors hover:bg-surface-sunken">
            <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-surface-sunken text-accent transition-transform group-hover:scale-105">
              <CloudUpload className="h-6 w-6" strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold text-ink">Drag &amp; drop document files here</span>
            <span className="mt-0.5 text-xs text-ink-faint">Supports PDF, PNG, JPG, or ZIP up to 25MB</span>
            <span className="mt-2 text-xs font-medium text-accent hover:underline">or Browse Files from device</span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-surface-sunken p-2.5">
            <div className="flex items-center gap-2.5">
              <ScanText className="h-5 w-5 text-accent" strokeWidth={2} />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-ink">aadhaar_card_scan.pdf</span>
                <span className="text-xs text-ink-faint">2.4 MB · Ready to index</span>
              </div>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-surface px-2 py-0.5 text-[11px] font-semibold text-accent">
              <ScanText className="h-3.5 w-3.5" strokeWidth={2} />
              OCR Auto-Detect
            </span>
          </div>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Document Title</span>
            <input className="field" placeholder="e.g. Residential Tenancy Agreement — Unit A-101" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Category</span>
              <select className="field" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Document Expiry Date</span>
              <input type="date" className="field" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
            </label>
          </div>

          <div>
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Relate Document To</span>
            <div className="grid grid-cols-4 gap-2">
              {relTypes.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRelType(r)}
                  className={cn(
                    "rounded-lg p-2 text-xs font-semibold",
                    relType === r ? "bg-accent-soft text-accent-ink" : "bg-surface-sunken text-ink-muted hover:bg-rule",
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Select Entity</span>
            <input className="field" placeholder="Search tenant, unit, or property..." value={entity} onChange={(e) => setEntity(e.target.value)} />
          </label>

          <div className="flex items-center justify-between rounded-xl bg-surface-sunken p-3">
            <div className="flex items-center gap-2">
              <PenLine className="h-5 w-5 text-accent" strokeWidth={2} />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-ink">Initiate Aadhaar e-Signature</span>
                <span className="text-xs text-ink-faint">Send Leegality link directly via tenant WhatsApp</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setESign((v) => !v)}
              className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", eSign ? "bg-accent" : "bg-rule-strong")}
            >
              <span className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform" style={{ transform: eSign ? "translateX(20px)" : "translateX(0)" }} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onUpload();
              onClose();
            }}
            disabled={!title.trim()}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Lock className="h-4 w-4" strokeWidth={2} />
            Upload &amp; Index Document
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
