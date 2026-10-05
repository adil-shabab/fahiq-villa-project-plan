import { Search } from "lucide-react";
import { properties } from "../../data/properties";
import type { InvoiceStatus } from "../../data/billing";
import { cn } from "../../lib/utils";

export interface InvoicesFilterState {
  search: string;
  status: InvoiceStatus | "all";
  period: string;
  propertyId: string;
  overdueOnly: boolean;
  electricityPendingOnly: boolean;
}

const statuses: Array<InvoiceStatus | "all"> = ["all", "Draft", "Issued", "Partially Paid", "Paid", "Overdue", "Void"];
const statusToneBorder: Partial<Record<InvoiceStatus, string>> = {
  Draft: "text-ink-faint",
  Issued: "text-info",
  "Partially Paid": "text-warn",
  Paid: "text-ok",
  Overdue: "text-danger",
  Void: "text-ink-faint line-through",
};

export function InvoicesFilterBar({ filters, onChange }: { filters: InvoicesFilterState; onChange: (next: InvoicesFilterState) => void }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" strokeWidth={2} />
          <input
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Search invoice # or tenant"
            className="w-52 rounded-lg border border-rule bg-surface py-1.5 pl-8 pr-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
          />
        </div>

        <select
          value={filters.period}
          onChange={(e) => onChange({ ...filters, period: e.target.value })}
          className="rounded-lg border border-rule bg-surface px-2.5 py-1.5 text-sm text-ink focus:border-accent focus:outline-none"
        >
          <option value="2026-09">September 2026</option>
          <option value="2026-08">August 2026</option>
        </select>

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
            checked={filters.overdueOnly}
            onChange={(e) => onChange({ ...filters, overdueOnly: e.target.checked })}
            className="h-3.5 w-3.5 rounded border-rule-strong accent-[var(--color-accent)]"
          />
          Overdue only
        </label>

        <label className="flex items-center gap-1.5 text-xs font-medium text-warn">
          <input
            type="checkbox"
            checked={filters.electricityPendingOnly}
            onChange={(e) => onChange({ ...filters, electricityPendingOnly: e.target.checked })}
            className="h-3.5 w-3.5 rounded border-rule-strong accent-[var(--color-warn)]"
          />
          Electricity pending
        </label>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {statuses.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onChange({ ...filters, status: s })}
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs font-medium",
              filters.status === s
                ? "border-accent bg-accent-soft text-accent-ink"
                : cn("border-rule hover:border-rule-strong", s !== "all" && statusToneBorder[s]),
            )}
          >
            {s === "all" ? "All Statuses" : s}
          </button>
        ))}
      </div>
    </div>
  );
}
