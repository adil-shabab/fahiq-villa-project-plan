import { Globe2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Property } from "../../data/properties";
import { PropertyPhoto } from "./PropertyPhoto";

export function PropertiesTable({ properties }: { properties: Property[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-rule bg-surface">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-rule bg-surface-sunken text-xs uppercase tracking-wide text-ink-faint">
            <th className="px-5 py-2.5 font-semibold">Property</th>
            <th className="px-3 py-2.5 font-semibold">Type</th>
            <th className="px-3 py-2.5 font-semibold">City</th>
            <th className="px-3 py-2.5 text-right font-semibold">Units</th>
            <th className="px-3 py-2.5 text-right font-semibold">Occupancy</th>
            <th className="px-3 py-2.5 font-semibold">Listed</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => {
            const occupancy = Math.round((property.occupied / property.totalUnits) * 100);
            return (
              <tr key={property.id} className="border-b border-rule last:border-b-0 hover:bg-surface-sunken/60">
                <td className="px-5 py-3">
                  <Link to={`/properties/${property.id}`} className="flex items-center gap-3">
                    <PropertyPhoto seed={property.photoSeed} className="h-10 w-14 shrink-0 rounded-md" iconSize="sm" />
                    <div>
                      <p className="font-medium text-ink">{property.name}</p>
                      <p className="text-xs text-ink-faint">{property.locality}</p>
                    </div>
                  </Link>
                </td>
                <td className="px-3 py-3 text-ink-muted">{property.type}</td>
                <td className="px-3 py-3 text-ink-muted">{property.city}</td>
                <td className="px-3 py-3 text-right tabular-nums text-ink">{property.totalUnits}</td>
                <td className="px-3 py-3 text-right tabular-nums text-ink">{occupancy}%</td>
                <td className="px-3 py-3">
                  {property.isListed ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-accent-ink">
                      <Globe2 className="h-3.5 w-3.5" strokeWidth={2} />
                      Listed
                    </span>
                  ) : (
                    <span className="text-xs text-ink-faint">&mdash;</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
