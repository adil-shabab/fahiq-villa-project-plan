import { Search, Users } from "lucide-react";
import { properties } from "../../data/properties";
import { categories, categoryCount, slaBreachedCount, tickets, type TicketCategory } from "../../data/maintenance";
import { cn } from "../../lib/utils";

const priorityLegend: { label: string; dot: string; textClass: string }[] = [
  { label: "Low", dot: "bg-ink-faint", textClass: "text-ink-muted" },
  { label: "Med", dot: "bg-gold", textClass: "text-gold" },
  { label: "High", dot: "bg-warn", textClass: "text-warn" },
  { label: "Urgent", dot: "bg-danger", textClass: "text-danger" },
];

export function MaintenanceFilterBar({
  search,
  onSearchChange,
  property,
  onPropertyChange,
  category,
  onCategoryChange,
  slaOnly,
  onSlaOnlyChange,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  property: string;
  onPropertyChange: (v: string) => void;
  category: TicketCategory | "All";
  onCategoryChange: (v: TicketCategory | "All") => void;
  slaOnly: boolean;
  onSlaOnlyChange: (v: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-rule bg-surface p-4 shadow-sm">
      <div className="grid grid-cols-1 items-center gap-2.5 md:grid-cols-12">
        <div className="relative md:col-span-5">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" strokeWidth={2} />
          <input
            className="field pl-9"
            placeholder="Search tickets, units, equipment, vendors..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="md:col-span-4">
          <select className="field" value={property} onChange={(e) => onPropertyChange(e.target.value)}>
            <option value="all">All Properties ({properties.length} Buildings)</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-end gap-2 md:col-span-3">
          <label
            className={cn(
              "flex cursor-pointer select-none items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-semibold transition-colors",
              slaOnly ? "bg-danger/15 text-danger" : "bg-surface-sunken text-ink-muted hover:bg-danger/10 hover:text-danger",
            )}
          >
            <input type="checkbox" checked={slaOnly} onChange={(e) => onSlaOnlyChange(e.target.checked)} className="h-4 w-4 accent-[var(--color-danger)]" />
            <span className="flex items-center gap-1">
              SLA Breached
              <span className="rounded-full bg-danger px-1.5 py-0.2 text-[10px] text-white">{slaBreachedCount}</span>
            </span>
          </label>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="mr-1 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Category:</span>
          <button
            type="button"
            onClick={() => onCategoryChange("All")}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-semibold",
              category === "All" ? "bg-accent text-white" : "bg-surface-sunken text-ink-muted hover:bg-surface-sunken/70",
            )}
          >
            All ({tickets.length})
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onCategoryChange(c)}
              className={cn(
                "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
                category === c ? "bg-accent text-white" : "bg-surface-sunken text-ink-muted hover:bg-surface-sunken/70",
              )}
            >
              {c} ({categoryCount(c)})
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="hidden h-3.5 w-3.5 text-ink-faint sm:block" strokeWidth={2} />
          <span className="mr-1 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Priority:</span>
          {priorityLegend.map((p) => (
            <span key={p.label} className={cn("flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium", p.textClass)}>
              <span className={cn("h-1.5 w-1.5 rounded-full", p.dot)} />
              {p.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
