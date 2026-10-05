import { Search } from "lucide-react";
import { properties } from "../../data/properties";
import type { TenancyStatus } from "../../data/tenancies";
import { cn } from "../../lib/utils";

export interface TenanciesFilterState {
  search: string;
  status: TenancyStatus | "all";
  propertyId: string;
  expiringOnly: boolean;
}

const statuses: Array<TenancyStatus | "all"> = ["all", "Active", "Notice", "Ending Soon", "Ended"];

export function TenanciesFilterBar({ filters, onChange }: { filters: TenanciesFilterState; onChange: (next: TenanciesFilterState) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" strokeWidth={2} />
        <input
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search tenant or unit"
          className="w-52 rounded-lg border border-rule bg-surface py-1.5 pl-8 pr-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {statuses.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onChange({ ...filters, status: s })}
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs font-medium",
              filters.status === s ? "border-accent bg-accent-soft text-accent-ink" : "border-rule text-ink-muted hover:border-rule-strong",
            )}
          >
            {s === "all" ? "All Statuses" : s}
          </button>
        ))}
      </div>

      <select
        value={filters.propertyId}
        onChange={(e) => onChange({ ...filters, propertyId: e.target.value })}
        className="rounded-lg border border-rule bg-surface px-2.5 py-1.5 text-sm text-ink focus:border-accent focus:outline-none"
      >
        <option value="all">All Properties</option>
        {properties.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>

      <label className="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
        <input
          type="checkbox"
          checked={filters.expiringOnly}
          onChange={(e) => onChange({ ...filters, expiringOnly: e.target.checked })}
          className="h-3.5 w-3.5 rounded border-rule-strong accent-[var(--color-accent)]"
        />
        Expiring within 30 days
      </label>
    </div>
  );
}
