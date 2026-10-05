import { Plus } from "lucide-react";
import type { Property, UnitSummary } from "../../../data/properties";
import { formatINR } from "../../../lib/format";
import { Badge } from "../../ui/Badge";

const statusTone: Record<UnitSummary["status"], "ok" | "info" | "warn" | "neutral"> = {
  Available: "ok",
  Occupied: "info",
  Notice: "warn",
  "Under Maintenance": "warn",
  Booked: "neutral",
};

export function UnitsTab({ property }: { property: Property }) {
  return (
    <div className="rounded-xl border border-rule bg-surface">
      <div className="flex items-center justify-between border-b border-rule px-5 py-3.5">
        <h3 className="text-sm font-semibold text-ink">{property.units.length} units shown</h3>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white hover:bg-accent-ink"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
          Add Unit
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-rule bg-surface-sunken text-xs uppercase tracking-wide text-ink-faint">
              <th className="px-5 py-2.5 font-semibold">Unit</th>
              <th className="px-3 py-2.5 font-semibold">Floor</th>
              <th className="px-3 py-2.5 font-semibold">Type</th>
              <th className="px-3 py-2.5 text-right font-semibold">Rent</th>
              <th className="px-3 py-2.5 font-semibold">Status</th>
              <th className="px-3 py-2.5 font-semibold">Tenant</th>
            </tr>
          </thead>
          <tbody>
            {property.units.map((unit) => (
              <tr key={unit.id} className="border-b border-rule last:border-b-0 hover:bg-surface-sunken/60">
                <td className="px-5 py-3 font-medium text-ink">{unit.code}</td>
                <td className="px-3 py-3 text-ink-muted">{unit.floor}</td>
                <td className="px-3 py-3 text-ink-muted">{unit.type}</td>
                <td className="px-3 py-3 text-right tabular-nums text-ink">{formatINR(unit.rent)}</td>
                <td className="px-3 py-3">
                  <Badge tone={statusTone[unit.status]}>{unit.status}</Badge>
                </td>
                <td className="px-3 py-3 text-ink-muted">{unit.tenantName ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
