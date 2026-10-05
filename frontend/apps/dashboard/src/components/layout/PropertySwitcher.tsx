import { Building2, ChevronDown, Search } from "lucide-react";
import { useRef, useState } from "react";
import { properties } from "../../data/dashboard";
import { useClickOutside } from "../../lib/useClickOutside";
import { cn } from "../../lib/utils";

export function PropertySwitcher() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  const filtered = properties.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
  const totalUnits = properties.reduce((sum, p) => sum + p.unitCount, 0);
  const label = selected ?? "All Properties";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg border border-rule bg-surface px-3 py-2 text-sm font-medium text-ink hover:border-rule-strong"
      >
        <Building2 className="h-4 w-4 text-ink-muted" strokeWidth={2} />
        {label}
        <ChevronDown className="h-3.5 w-3.5 text-ink-faint" strokeWidth={2} />
      </button>

      {open && (
        <div className="absolute left-0 z-30 mt-2 w-72 rounded-xl border border-rule bg-surface p-2 shadow-lg">
          <div className="flex items-center gap-2 rounded-lg border border-rule bg-surface-sunken px-2.5 py-1.5">
            <Search className="h-3.5 w-3.5 text-ink-faint" strokeWidth={2} />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search properties"
              className="w-full bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
            />
          </div>

          <ul className="mt-2 max-h-64 overflow-y-auto">
            <li>
              <button
                type="button"
                onClick={() => {
                  setSelected(null);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm hover:bg-surface-sunken",
                  !selected && "bg-accent-soft text-accent-ink",
                )}
              >
                <span className="font-medium">All Properties</span>
                <span className="text-xs text-ink-faint">{totalUnits} units</span>
              </button>
            </li>
            {filtered.map((property) => (
              <li key={property.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(property.name);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm hover:bg-surface-sunken",
                    selected === property.name && "bg-accent-soft text-accent-ink",
                  )}
                >
                  <span>{property.name}</span>
                  <span className="text-xs text-ink-faint">{property.unitCount} units</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
