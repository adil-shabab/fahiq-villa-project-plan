import { Building2, Download, MoreVertical, RefreshCw, Search, User } from "lucide-react";
import { useMemo, useState } from "react";
import { docCategories, vaultDocuments, type VaultDocument } from "../../data/documents";
import { cn } from "../../lib/utils";
import { docIcons } from "./docIcons";

const categoryIconClasses: Record<VaultDocument["category"], string> = {
  Agreement: "bg-accent-soft text-accent-ink",
  "KYC Verification": "bg-info/10 text-info",
  "Police Intimation": "bg-gold-soft text-gold",
  Inspection: "bg-surface-sunken text-ink-muted",
  Settlement: "bg-accent-soft text-accent-ink",
  Invoice: "bg-surface-sunken text-ink-muted",
};

const signStatusClasses: Record<VaultDocument["signStatus"], string> = {
  Signed: "bg-accent-soft text-accent-ink",
  Pending: "bg-gold-soft text-gold",
  NA: "bg-surface-sunken text-ink-muted",
  Unsigned: "bg-danger/15 text-danger",
};

export function DocumentsTable({ onPreview }: { onPreview: (doc: VaultDocument) => void }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<(typeof docCategories)[number]>("All Categories");

  const filtered = useMemo(() => {
    return vaultDocuments.filter((d) => {
      if (search && !`${d.title} ${d.code} ${d.relatedEntity}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== "All Categories") {
        const map: Record<string, VaultDocument["category"]> = {
          "Agreement (Tenancy & Lease)": "Agreement",
          "KYC & Government ID": "KYC Verification",
          "Police Verification": "Police Intimation",
          "Tax Invoice & Bills": "Invoice",
          "Move-in Inspection Photos": "Inspection",
          "Settlement Deed": "Settlement",
        };
        if (d.category !== map[category]) return false;
      }
      return true;
    });
  }, [search, category]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-rule bg-surface p-3 shadow-sm">
        <div className="flex flex-1 flex-wrap items-center gap-2" style={{ minWidth: 280 }}>
          <div className="relative max-w-sm flex-1" style={{ minWidth: 240 }}>
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" strokeWidth={2} />
            <input className="field pl-8" placeholder="Search title, ID, tenant name, room..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select className="field w-auto" value={category} onChange={(e) => setCategory(e.target.value as (typeof docCategories)[number])}>
            {docCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <button type="button" title="Refresh Table" className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted hover:bg-surface-sunken">
          <RefreshCw className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-rule bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-sunken text-[11px] uppercase tracking-wide text-ink-faint">
              <tr>
                <th className="w-10 px-4 py-3">
                  <input type="checkbox" className="h-4 w-4 accent-[var(--color-accent)]" />
                </th>
                <th className="px-4 py-3 font-semibold">Document Title &amp; ID</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Related Entity</th>
                <th className="px-4 py-3 font-semibold">Uploaded By</th>
                <th className="px-4 py-3 font-semibold">Upload Date</th>
                <th className="px-4 py-3 font-semibold">Validity / Expiry</th>
                <th className="px-4 py-3 font-semibold">Sign Status</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => {
                const Icon = docIcons[d.icon];
                const RelatedIcon = d.relatedIcon === "person" ? User : Building2;
                return (
                  <tr key={d.id} className="border-b border-rule last:border-b-0 hover:bg-surface-sunken/60">
                    <td className="px-4 py-3.5">
                      <input type="checkbox" className="h-4 w-4 accent-[var(--color-accent)]" />
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", categoryIconClasses[d.category])}>
                          <Icon className="h-5 w-5" strokeWidth={2} />
                        </div>
                        <div className="flex min-w-0 flex-col">
                          <button type="button" onClick={() => onPreview(d)} className="truncate text-left font-semibold text-ink hover:text-accent">
                            {d.title}
                          </button>
                          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-ink-faint">
                            <span className="font-mono">{d.code}</span>
                            <span>•</span>
                            <span>{d.sizeLabel}</span>
                            {d.tagLabel && <span className="rounded bg-surface-sunken px-1 text-[10px] font-semibold text-accent">{d.tagLabel}</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", categoryIconClasses[d.category])}>{d.category}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="flex items-center gap-1 font-medium text-ink">
                        <RelatedIcon className="h-3.5 w-3.5 text-ink-faint" strokeWidth={2} />
                        <span className="max-w-[180px] truncate">{d.relatedEntity}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-sunken text-[10px] font-bold text-ink">{d.uploadedByInitials}</span>
                        <div className="flex flex-col text-left leading-none">
                          <span className="text-[12px] font-medium text-ink">{d.uploadedByName}</span>
                          <span className="mt-0.5 text-[10px] text-ink-faint">{d.uploadedByRole}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[13px] text-ink">{d.uploadDate}</td>
                    <td className={cn("px-4 py-3.5 font-mono text-xs", d.expired ? "text-danger font-semibold" : d.expiringSoon ? "text-gold font-semibold" : "text-ink")}>
                      {d.validityLabel}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold", signStatusClasses[d.signStatus])}>
                        {d.signStatusLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button type="button" onClick={() => onPreview(d)} title="Quick Preview" className="rounded p-1 text-ink-muted hover:bg-surface-sunken hover:text-accent">
                          <Search className="h-[18px] w-[18px]" strokeWidth={2} />
                        </button>
                        <button type="button" title="Download" className="rounded p-1 text-ink-muted hover:bg-surface-sunken hover:text-ink">
                          <Download className="h-[18px] w-[18px]" strokeWidth={2} />
                        </button>
                        <button type="button" title="More Options" className="rounded p-1 text-ink-muted hover:bg-surface-sunken hover:text-ink">
                          <MoreVertical className="h-[18px] w-[18px]" strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center text-sm text-ink-faint">No documents match these filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between bg-surface-sunken/50 p-4 text-xs text-ink-muted">
          <span>
            Showing <strong className="text-ink">{filtered.length}</strong> of <strong className="text-ink">{vaultDocuments.length}</strong> documents
          </span>
        </div>
      </div>
    </div>
  );
}
