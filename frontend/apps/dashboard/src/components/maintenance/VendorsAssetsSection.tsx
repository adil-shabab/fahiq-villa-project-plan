import { Plus, Star } from "lucide-react";
import { useState } from "react";
import { assets, vendors } from "../../data/maintenance";
import { Badge } from "../ui/Badge";
import { cn } from "../../lib/utils";

const warrantyTextClass = { ok: "text-ok", warn: "text-warn", danger: "text-danger" } as const;
const statusTone = { ok: "ok", danger: "danger" } as const;

export function VendorsAssetsSection({ onAddVendor }: { onAddVendor: () => void }) {
  const [tab, setTab] = useState<"vendors" | "assets">("vendors");

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-rule bg-surface p-4 shadow-sm">
      <div className="flex flex-col justify-between gap-2.5 sm:flex-row sm:items-center">
        <div className="flex w-full items-center gap-2 border-b border-rule sm:w-auto">
          <button
            type="button"
            onClick={() => setTab("vendors")}
            className={cn("border-b-2 px-4 py-2 text-sm font-bold", tab === "vendors" ? "border-accent text-accent" : "border-transparent text-ink-muted hover:text-ink")}
          >
            Verified Vendors Directory ({vendors.length} Active Partners)
          </button>
          <button
            type="button"
            onClick={() => setTab("assets")}
            className={cn("border-b-2 px-4 py-2 text-sm font-bold", tab === "assets" ? "border-accent text-accent" : "border-transparent text-ink-muted hover:text-ink")}
          >
            Asset Inventory &amp; Warranty Register
          </button>
        </div>
        <button
          type="button"
          onClick={onAddVendor}
          className="flex items-center gap-1 self-start rounded-lg bg-surface-sunken px-3 py-1.5 text-sm font-semibold text-ink hover:bg-rule sm:self-auto"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
          Add Vendor
        </button>
      </div>

      {tab === "vendors" ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {vendors.map((v) => (
            <div key={v.id} className="flex flex-col justify-between rounded-xl bg-surface-sunken p-4 shadow-sm">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-accent-soft px-2 py-0.5 text-xs font-bold text-accent-ink">{v.tier}</span>
                  <span className="flex items-center gap-0.5 text-xs font-bold text-gold">
                    <Star className="h-3 w-3 fill-current" strokeWidth={0} />
                    {v.rating} ({v.jobCount} jobs)
                  </span>
                </div>
                <h4 className="text-sm font-bold text-ink">{v.name}</h4>
                <div className="flex flex-wrap gap-1">
                  {v.specialties.map((s) => (
                    <span key={s} className="rounded bg-surface px-1.5 py-0.5 text-[11px] text-ink-muted">{s}</span>
                  ))}
                </div>
                <p className="mt-1 font-mono text-[11px] text-ink-faint">Phone: {v.phone}</p>
              </div>
              <div className="mt-3 border-t border-rule pt-3">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-faint">Standard Rate Card:</span>
                <p className="mt-0.5 font-mono text-[11px] text-ink-muted">{v.rateCard}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-sunken text-xs uppercase tracking-wide text-ink-faint">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Asset Code</th>
                <th className="px-3 py-2.5 font-semibold">Asset Name &amp; Spec</th>
                <th className="px-3 py-2.5 font-semibold">Location</th>
                <th className="px-3 py-2.5 font-semibold">Category</th>
                <th className="px-3 py-2.5 font-semibold">Purchase Date</th>
                <th className="px-3 py-2.5 font-semibold">Warranty</th>
                <th className="px-3 py-2.5 font-semibold">Last Serviced</th>
                <th className="px-4 py-2.5 text-right font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {assets.map((a) => (
                <tr key={a.code} className="hover:bg-surface-sunken/60">
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-accent">#{a.code}</td>
                  <td className="px-3 py-3 font-semibold text-ink">{a.name}</td>
                  <td className="px-3 py-3 text-ink-muted">{a.location}</td>
                  <td className="px-3 py-3 text-ink-muted">{a.category}</td>
                  <td className="px-3 py-3 font-mono text-xs text-ink-faint">{a.purchaseDate}</td>
                  <td className={cn("px-3 py-3 font-mono text-xs font-semibold", warrantyTextClass[a.warrantyTone])}>{a.warrantyLabel}</td>
                  <td className="px-3 py-3 font-mono text-xs text-ink-faint">{a.lastServiced}</td>
                  <td className="px-4 py-3 text-right">
                    <Badge tone={statusTone[a.statusTone]}>{a.statusLabel}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
