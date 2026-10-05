import { Search } from "lucide-react";
import type { PropertyType } from "../../data/properties";
import { cn } from "../../lib/utils";

export interface PropertiesFilterState {
  search: string;
  type: PropertyType | "all";
  city: string;
  listedOnly: boolean;
}

const types: Array<PropertyType | "all"> = ["all", "Apartment Building", "Independent House", "PG / Hostel", "Commercial"];

export function PropertiesFilterBar({
  filters,
  onChange,
  cities,
}: {
  filters: PropertiesFilterState;
  onChange: (next: PropertiesFilterState) => void;
  cities: string[];
}) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" strokeWidth={2} />
        <input
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search by name or locality"
          className="w-full rounded-lg border border-rule bg-surface py-1.5 pl-8 pr-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none lg:w-64"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {types.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange({ ...filters, type })}
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs font-medium",
              filters.type === type
                ? "border-accent bg-accent-soft text-accent-ink"
                : "border-rule text-ink-muted hover:border-rule-strong hover:text-ink",
            )}
          >
            {type === "all" ? "All Types" : type}
          </button>
        ))}

        <select
          value={filters.city}
          onChange={(e) => onChange({ ...filters, city: e.target.value })}
          className="rounded-lg border border-rule bg-surface px-2.5 py-1.5 text-sm text-ink focus:border-accent focus:outline-none"
        >
          <option value="all">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
          <input
            type="checkbox"
            checked={filters.listedOnly}
            onChange={(e) => onChange({ ...filters, listedOnly: e.target.checked })}
            className="h-3.5 w-3.5 rounded border-rule-strong accent-[var(--color-accent)]"
          />
          Listed on website only
        </label>
      </div>
    </div>
  );
}
