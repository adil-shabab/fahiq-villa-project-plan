import { RefreshCw, Search } from "lucide-react";
import { properties } from "../../data/properties";

export function CollectionsFilterBar({
  search,
  onSearchChange,
  property,
  onPropertyChange,
  riskLevel,
  onRiskLevelChange,
  shownCount,
  totalCount,
  onReset,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  property: string;
  onPropertyChange: (v: string) => void;
  riskLevel: string;
  onRiskLevelChange: (v: string) => void;
  shownCount: number;
  totalCount: number;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-between gap-2.5 sm:flex-row">
      <div className="flex w-full flex-wrap items-center gap-2.5 sm:w-auto">
        <div className="relative flex w-full items-center sm:w-72">
          <Search className="pointer-events-none absolute left-2.5 h-4 w-4 text-ink-faint" strokeWidth={2} />
          <input className="field pl-9" placeholder="Search tenant, unit, phone or invoice..." value={search} onChange={(e) => onSearchChange(e.target.value)} />
        </div>
        <select className="field w-auto" value={property} onChange={(e) => onPropertyChange(e.target.value)}>
          <option value="all">All Properties ({properties.length} Buildings)</option>
          {properties.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <select className="field w-auto" value={riskLevel} onChange={(e) => onRiskLevelChange(e.target.value)}>
          <option value="all">All Risk Levels</option>
          <option value="high">High Overdue (&gt;15 days)</option>
          <option value="legal">Legal Notice Issued</option>
        </select>
      </div>
      <div className="flex items-center gap-2 self-end text-xs text-ink-faint sm:self-center">
        <span>
          Showing {shownCount} of {totalCount} overdue entries
        </span>
        <button type="button" onClick={onReset} className="rounded p-1 text-ink-muted hover:bg-surface-sunken">
          <RefreshCw className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
