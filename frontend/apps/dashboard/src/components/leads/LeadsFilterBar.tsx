import { Search } from "lucide-react";
import type { LeadSource } from "../../data/leads";
import { staffMembers } from "../../data/leads";

export interface LeadsFilterState {
  search: string;
  source: LeadSource | "all";
  assignedTo: string;
  overdueOnly: boolean;
}

const sources: Array<LeadSource | "all"> = ["all", "Website", "WhatsApp", "Call", "Walk-in", "Broker", "Referral"];

export function LeadsFilterBar({ filters, onChange }: { filters: LeadsFilterState; onChange: (next: LeadsFilterState) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" strokeWidth={2} />
        <input
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search leads"
          className="w-48 rounded-lg border border-rule bg-surface py-1.5 pl-8 pr-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
        />
      </div>

      <select
        value={filters.source}
        onChange={(e) => onChange({ ...filters, source: e.target.value as LeadSource | "all" })}
        className="rounded-lg border border-rule bg-surface px-2.5 py-1.5 text-sm text-ink focus:border-accent focus:outline-none"
      >
        {sources.map((source) => (
          <option key={source} value={source}>
            {source === "all" ? "All Sources" : source}
          </option>
        ))}
      </select>

      <select
        value={filters.assignedTo}
        onChange={(e) => onChange({ ...filters, assignedTo: e.target.value })}
        className="rounded-lg border border-rule bg-surface px-2.5 py-1.5 text-sm text-ink focus:border-accent focus:outline-none"
      >
        <option value="all">Assigned to anyone</option>
        {staffMembers.map((staff) => (
          <option key={staff.name} value={staff.name}>
            {staff.name}
          </option>
        ))}
      </select>

      <label className="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
        <input
          type="checkbox"
          checked={filters.overdueOnly}
          onChange={(e) => onChange({ ...filters, overdueOnly: e.target.checked })}
          className="h-3.5 w-3.5 rounded border-rule-strong accent-[var(--color-accent)]"
        />
        Follow-up overdue
      </label>
    </div>
  );
}
