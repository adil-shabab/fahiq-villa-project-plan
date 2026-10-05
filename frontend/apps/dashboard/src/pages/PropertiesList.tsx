import { LayoutGrid, List, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { PropertiesFilterBar, type PropertiesFilterState } from "../components/properties/PropertiesFilterBar";
import { PropertiesTable } from "../components/properties/PropertiesTable";
import { PropertyCard } from "../components/properties/PropertyCard";
import { ViewToggle } from "../components/ui/ViewToggle";
import { properties } from "../data/properties";

type ViewMode = "grid" | "table";

export function PropertiesList() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filters, setFilters] = useState<PropertiesFilterState>({ search: "", type: "all", city: "all", listedOnly: false });

  const cities = useMemo(() => Array.from(new Set(properties.map((p) => p.city))), []);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.search && !`${p.name} ${p.locality}`.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.type !== "all" && p.type !== filters.type) return false;
      if (filters.city !== "all" && p.city !== filters.city) return false;
      if (filters.listedOnly && !p.isListed) return false;
      return true;
    });
  }, [filters]);

  const totalUnits = properties.reduce((sum, p) => sum + p.totalUnits, 0);

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Properties</h1>
          <p className="mt-0.5 text-sm text-ink-faint">
            {properties.length} properties &middot; {totalUnits} units
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            Add Property
          </button>
          <ViewToggle
            value={viewMode}
            onChange={setViewMode}
            options={[
              { value: "grid", icon: LayoutGrid, label: "Grid view" },
              { value: "table", icon: List, label: "Table view" },
            ]}
          />
        </div>
      </div>

      <div className="rounded-xl border border-rule bg-surface p-4">
        <PropertiesFilterBar filters={filters} onChange={setFilters} cities={cities} />
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
          {filtered.length === 0 && <p className="col-span-full py-10 text-center text-sm text-ink-faint">No properties match these filters.</p>}
        </div>
      ) : (
        <PropertiesTable properties={filtered} />
      )}
    </div>
  );
}
