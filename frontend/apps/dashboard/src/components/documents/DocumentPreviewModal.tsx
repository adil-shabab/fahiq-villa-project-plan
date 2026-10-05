import { ChevronLeft, ChevronRight, Download, FileText, Printer, ShieldCheck, X, ZoomIn, ZoomOut } from "lucide-react";
import { createPortal } from "react-dom";
import type { VaultDocument } from "../../data/documents";

export function DocumentPreviewModal({ doc, onClose }: { doc: VaultDocument; onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[70] flex flex-col bg-ink/80" onClick={onClose}>
      <div className="flex h-14 shrink-0 items-center justify-between bg-[#1c2420] px-5 text-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex min-w-0 items-center gap-2">
          <FileText className="h-5 w-5 shrink-0 text-accent" strokeWidth={2} />
          <span className="truncate text-[13px] font-semibold">{doc.title.replace(/\s/g, "_")}.pdf</span>
          <span className="shrink-0 rounded bg-white/15 px-1.5 py-0.5 text-[10px] font-bold uppercase">{doc.signStatus === "Signed" ? "Signed" : doc.signStatusLabel}</span>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <button type="button" className="rounded p-1 text-white/70 hover:bg-white/10 hover:text-white" title="Previous Page">
            <ChevronLeft className="h-[18px] w-[18px]" strokeWidth={2} />
          </button>
          <span className="font-mono text-xs text-white/70">Page 1 of 1</span>
          <button type="button" className="rounded p-1 text-white/70 hover:bg-white/10 hover:text-white" title="Next Page">
            <ChevronRight className="h-[18px] w-[18px]" strokeWidth={2} />
          </button>
          <div className="mx-1 h-4 w-px bg-white/20" />
          <button type="button" className="rounded p-1 text-white/70 hover:bg-white/10 hover:text-white" title="Zoom Out">
            <ZoomOut className="h-[18px] w-[18px]" strokeWidth={2} />
          </button>
          <span className="font-mono text-xs text-white/70">100%</span>
          <button type="button" className="rounded p-1 text-white/70 hover:bg-white/10 hover:text-white" title="Zoom In">
            <ZoomIn className="h-[18px] w-[18px]" strokeWidth={2} />
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          <button type="button" className="hidden items-center gap-1 rounded bg-white/10 px-2.5 py-1 text-xs text-white hover:bg-white/20 md:flex">
            <Printer className="h-4 w-4" strokeWidth={2} />
            Print
          </button>
          <button type="button" className="flex items-center gap-1 rounded bg-accent px-2.5 py-1 text-xs font-semibold text-white hover:bg-accent-ink">
            <Download className="h-4 w-4" strokeWidth={2} />
            <span className="hidden sm:inline">Download</span>
          </button>
          <button type="button" onClick={onClose} title="Close Preview" className="ml-2 rounded p-1.5 text-white/60 hover:bg-white/10 hover:text-white">
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 justify-center overflow-y-auto bg-surface-sunken p-4 sm:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="relative flex w-full max-w-2xl flex-col rounded-sm bg-white p-8 text-[#1a231e] shadow-xl sm:p-12">
          <div className="mb-6 flex items-center justify-between border-2 border-[#546e7a] p-3 text-left">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#37474f]">Government of Karnataka — Department of Stamps and Registration</span>
              <span className="mt-0.5 text-sm font-extrabold text-[#102a43]">e-Stamp Certificate of Tenancy</span>
              <span className="font-mono text-[11px] text-[#475569]">Certificate No: IN-KA89210492104821V · Date: {doc.uploadDate}</span>
            </div>
            <div className="flex flex-col items-end text-right">
              <span className="text-[9px] uppercase tracking-wider text-[#64748b]">Stamp Duty Paid</span>
              <span className="font-mono text-base font-bold text-accent">₹500.00</span>
              <span className="rounded bg-surface-sunken px-1 text-[9px] font-bold text-accent">VERIFIED</span>
            </div>
          </div>

          <div className="mb-6 text-center">
            <h4 className="text-lg font-bold uppercase tracking-normal text-ink underline decoration-1 underline-offset-4">{doc.title}</h4>
            <span className="text-[11px] text-ink-faint">Document ID: {doc.code} · Related: {doc.relatedEntity}</span>
          </div>

          <div className="flex flex-col gap-4 text-justify text-[13px] leading-relaxed text-[#263238]">
            <p>
              This document is an on-file compliance record managed by <strong>Fahiq Enterprise Hospitality Ops LLP</strong>, represented herein by its authorized Property
              Manager, Ms. Priya Sharma.
            </p>
            <div className="rounded border border-surface-sunken bg-surface-sunken/60 p-3 text-[12px]">
              <p>
                <strong>Related Entity:</strong> {doc.relatedEntity}
              </p>
              <p className="mt-2">
                <strong>Category:</strong> {doc.category} &middot; <strong>Uploaded:</strong> {doc.uploadDate} by {doc.uploadedByName} ({doc.uploadedByRole})
              </p>
            </div>
            <p>
              <strong>Validity / Expiry:</strong> {doc.validityLabel}
            </p>
            <p>
              <strong>Sign Status:</strong> {doc.signStatusLabel}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t-2 border-dashed border-[#b0bec5] pt-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-accent">
                <ShieldCheck className="h-4 w-4" strokeWidth={2} />
                Aadhaar e-Sign Tamper-Proof Audit Certificate
              </span>
              <span className="font-mono text-[10px] text-ink-faint">Leegality Auth ID: LG-89104-E2</span>
            </div>
            {doc.signStatus === "Signed" ? (
              <div className="grid grid-cols-1 gap-3 rounded bg-surface-sunken/60 p-2.5 text-[11px] sm:grid-cols-2">
                <div className="flex flex-col">
                  <span className="font-bold text-ink">Tenant Signature:</span>
                  <span className="font-semibold text-accent">{doc.relatedEntity.split(" (")[0]}</span>
                  <span className="font-mono text-[10px] text-ink-faint">UIDAI Stamped: {doc.uploadDate} 10:14:22 IST</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-ink">Landlord Signature:</span>
                  <span className="font-semibold text-accent">Priya Sharma (POA Holder)</span>
                  <span className="font-mono text-[10px] text-ink-faint">UIDAI Stamped: {doc.uploadDate} 11:02:15 IST</span>
                </div>
              </div>
            ) : (
              <div className="rounded bg-surface-sunken/60 p-2.5 text-[11px] text-ink-faint">{doc.signStatusLabel}</div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
