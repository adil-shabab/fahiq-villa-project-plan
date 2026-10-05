import { Search } from "lucide-react";
import { properties } from "../../data/dashboard";
import type { UnitType } from "../../data/listings";
import { cn } from "../../lib/utils";

export type ListedFilter = "all" | "listed" | "unlisted";

export interface ListingsFilterState {
  search: string;
  propertyId: string;
  listedFilter: ListedFilter;
  unitType: UnitType | "all";
}

const unitTypes: Array<UnitType | "all"> = ["all", "1RK", "Studio", "1BHK", "2BHK", "3BHK", "PG Bed", "Commercial"];

export function ListingsFilterBar({
  filters,
  onChange,
}: {
  filters: ListingsFilterState;
  onChange: (next: ListingsFilterState) => void;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-rule px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" strokeWidth={2} />
          <input
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Search listings"
            className="w-48 rounded-lg border border-rule bg-surface-sunken py-1.5 pl-8 pr-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
          />
        </div>

        <select
          value={filters.propertyId}
          onChange={(e) => onChange({ ...filters, propertyId: e.target.value })}
          className="rounded-lg border border-rule bg-surface px-2.5 py-1.5 text-sm text-ink focus:border-accent focus:outline-none"
        >
          <option value="all">All Properties</option>
          {properties.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <div className="flex rounded-lg border border-rule p-0.5">
          {(["all", "listed", "unlisted"] as ListedFilter[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onChange({ ...filters, listedFilter: option })}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium capitalize",
                filters.listedFilter === option ? "bg-accent text-white" : "text-ink-muted hover:text-ink",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {unitTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange({ ...filters, unitType: type })}
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs font-medium",
              filters.unitType === type
                ? "border-accent bg-accent-soft text-accent-ink"
                : "border-rule text-ink-muted hover:border-rule-strong hover:text-ink",
            )}
          >
            {type === "all" ? "All Types" : type}
          </button>
        ))}
      </div>
    </div>
  );
}
