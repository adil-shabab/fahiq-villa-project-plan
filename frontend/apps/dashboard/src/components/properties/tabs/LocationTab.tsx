import { MapPin } from "lucide-react";
import type { Property } from "../../../data/properties";

export function LocationTab({ property }: { property: Property }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-xl border border-rule bg-[linear-gradient(135deg,var(--color-surface-sunken)_25%,transparent_25%),linear-gradient(225deg,var(--color-surface-sunken)_25%,transparent_25%),linear-gradient(45deg,var(--color-surface-sunken)_25%,transparent_25%),linear-gradient(315deg,var(--color-surface-sunken)_25%,var(--color-surface)_25%)] bg-surface [background-position:10px_0,10px_0,0_0,0_0] [background-size:20px_20px]">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-lg">
            <MapPin className="h-5 w-5" strokeWidth={2.5} />
          </span>
        </div>

        <div className="mt-4 rounded-xl border border-rule bg-surface p-4">
          <h3 className="text-sm font-semibold text-ink">Address</h3>
          <p className="mt-1.5 text-sm text-ink-muted">
            {property.addressLine1}
            {property.addressLine2 ? `, ${property.addressLine2}` : ""}
            <br />
            {property.locality}, {property.city}, {property.state}
          </p>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="rounded-xl border border-rule bg-surface p-4">
          <h3 className="text-sm font-semibold text-ink">What's Nearby</h3>
          <ul className="mt-3 flex flex-col gap-2.5">
            {property.nearby.map((place) => (
              <li key={place.label} className="flex items-center justify-between rounded-lg bg-surface-sunken px-3 py-2 text-sm">
                <div>
                  <p className="font-medium text-ink">{place.label}</p>
                  <p className="text-xs text-ink-faint">{place.category}</p>
                </div>
                <span className="shrink-0 rounded-full border border-rule-strong px-2 py-0.5 text-xs font-medium text-ink-muted">
                  {place.distanceKm} km
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
