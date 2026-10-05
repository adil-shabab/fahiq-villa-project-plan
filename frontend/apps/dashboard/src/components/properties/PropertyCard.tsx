import { Globe2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { Property } from "../../data/properties";
import { ProgressRing } from "../ui/ProgressRing";
import { PropertyPhoto } from "./PropertyPhoto";

export function PropertyCard({ property }: { property: Property }) {
  const occupancyPercent = (property.occupied / property.totalUnits) * 100;

  return (
    <Link
      to={`/properties/${property.id}`}
      className="group overflow-hidden rounded-xl border border-rule bg-surface shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative h-36 overflow-hidden">
        <PropertyPhoto seed={property.photoSeed} className="h-full w-full transition-transform duration-300 group-hover:scale-105" />
        {property.isListed && (
          <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-surface/90 px-2 py-0.5 text-[11px] font-medium text-ink shadow">
            <Globe2 className="h-3 w-3 text-accent" strokeWidth={2} />
            Listed
          </span>
        )}
        <span className="absolute right-2.5 top-2.5 rounded-full bg-surface/90 px-2 py-0.5 text-[11px] font-medium text-ink shadow">
          {property.type}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-ink">{property.name}</h3>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-faint">
              <MapPin className="h-3 w-3 shrink-0" strokeWidth={2} />
              <span className="truncate">
                {property.locality}, {property.city}
              </span>
            </p>
          </div>
          <ProgressRing percent={occupancyPercent} size={40} />
        </div>

        <p className="mt-2 text-xs text-ink-faint">{property.totalUnits} units</p>

        <div className="mt-3 flex items-center gap-2 border-t border-rule pt-3 text-xs">
          <StatChip label="Available" value={property.available} tone="ok" />
          <StatChip label="Occupied" value={property.occupied} tone="info" />
          {property.notice > 0 && <StatChip label="Notice" value={property.notice} tone="warn" />}
        </div>
      </div>
    </Link>
  );
}

function StatChip({ label, value, tone }: { label: string; value: number; tone: "ok" | "info" | "warn" }) {
  const toneClasses = {
    ok: "bg-ok/10 text-ok",
    info: "bg-info/10 text-info",
    warn: "bg-warn/10 text-warn",
  }[tone];
  return (
    <span className={`rounded-full px-2 py-0.5 font-medium ${toneClasses}`}>
      {value} {label}
    </span>
  );
}
