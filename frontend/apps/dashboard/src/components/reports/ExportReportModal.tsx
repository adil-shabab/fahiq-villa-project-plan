import { CheckCircle2, Download, FileSpreadsheet, FileText, FileType } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { properties } from "../../data/properties";
import { cn } from "../../lib/utils";

const formats = [
  { id: "pdf", label: "PDF Document", icon: FileText },
  { id: "excel", label: "Excel (.xlsx)", icon: FileSpreadsheet },
  { id: "csv", label: "Raw CSV", icon: FileType },
] as const;

export function ExportReportModal({ onClose, onDownload }: { onClose: () => void; onDownload: () => void }) {
  const [format, setFormat] = useState<(typeof formats)[number]["id"]>("excel");
  const [scope, setScope] = useState("all");
  const [columns, setColumns] = useState({
    deposits: true,
    contacts: true,
    utilities: true,
    maintenance: false,
  });

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-rule bg-surface shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-rule px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <Download className="h-[18px] w-[18px]" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">Export Report</h3>
              <p className="text-xs text-ink-faint">Configure parameters and compiled file formats</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-ink-muted hover:bg-surface-sunken">✕</button>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto px-5 py-4">
          <div>
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">File Format</span>
            <div className="grid grid-cols-3 gap-2">
              {formats.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFormat(f.id)}
                  className={cn(
                    "flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold",
                    format === f.id ? "bg-accent text-white shadow-sm" : "bg-surface-sunken text-ink-muted hover:bg-rule",
                  )}
                >
                  <f.icon className="h-4 w-4" strokeWidth={2} />
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Date Range</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-surface-sunken p-2">
                <span className="block text-[10px] text-ink-faint">Start Date</span>
                <span className="font-mono text-xs font-semibold text-ink">01 Oct 2026</span>
              </div>
              <div className="rounded-lg bg-surface-sunken p-2">
                <span className="block text-[10px] text-ink-faint">End Date</span>
                <span className="font-mono text-xs font-semibold text-ink">31 Oct 2026</span>
              </div>
            </div>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Property Scope</span>
            <select className="field" value={scope} onChange={(e) => setScope(e.target.value)}>
              <option value="all">All Properties (5 Buildings)</option>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </label>

          <div>
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Include Granular Columns</span>
            <div className="flex flex-col gap-2 text-sm text-ink">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={columns.deposits} onChange={(e) => setColumns((c) => ({ ...c, deposits: e.target.checked }))} className="h-4 w-4 accent-[var(--color-accent)]" />
                Include Security Deposit Ledger &amp; Bank Escrow IDs
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={columns.contacts} onChange={(e) => setColumns((c) => ({ ...c, contacts: e.target.checked }))} className="h-4 w-4 accent-[var(--color-accent)]" />
                Include Tenant Contact Phone, Email &amp; Permanent Address
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={columns.utilities} onChange={(e) => setColumns((c) => ({ ...c, utilities: e.target.checked }))} className="h-4 w-4 accent-[var(--color-accent)]" />
                Include Utility Apportionments &amp; Sub-meter Arrears
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={columns.maintenance} onChange={(e) => setColumns((c) => ({ ...c, maintenance: e.target.checked }))} className="h-4 w-4 accent-[var(--color-accent)]" />
                Include Maintenance Ticket History for Unit
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-surface-sunken p-3">
            <div className="flex items-center gap-2.5">
              <FileText className="h-6 w-6 text-accent" strokeWidth={2} />
              <div>
                <div className="font-mono text-xs font-semibold text-ink">Fahiq_Rent_Roll_Oct2026.{format === "excel" ? "xlsx" : format}</div>
                <div className="text-[11px] text-ink-faint">Compiled 2 min ago · 242 KB</div>
              </div>
            </div>
            <CheckCircle2 className="h-[18px] w-[18px] text-accent" strokeWidth={2} />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onDownload();
              onClose();
            }}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-ink"
          >
            <Download className="h-4 w-4" strokeWidth={2} />
            Download File
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
