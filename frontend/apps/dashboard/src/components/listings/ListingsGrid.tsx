import { Eye, MessageSquare, MoreHorizontal } from "lucide-react";
import type { ListingRow } from "../../data/listings";
import { formatINR } from "../../lib/format";
import { Badge } from "../ui/Badge";
import { DropdownMenu } from "../ui/DropdownMenu";

export function ListingsGrid({
  rows,
  onToggleListed,
  onEdit,
  onPreview,
  onUnlist,
}: {
  rows: ListingRow[];
  onToggleListed: (id: string, next: boolean) => void;
  onEdit: (row: ListingRow) => void;
  onPreview: (row: ListingRow) => void;
  onUnlist: (row: ListingRow) => void;
}) {
  if (rows.length === 0) {
    return <p className="px-5 py-10 text-center text-sm text-ink-faint">No listings match these filters.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 xl:grid-cols-3">
      {rows.map((row) => (
        <div key={row.id} className="overflow-hidden rounded-xl border border-rule bg-surface shadow-sm">
          <div className="relative h-28" style={{ backgroundColor: row.coverColor }}>
            <div className="absolute right-2 top-2">
              <Badge tone={row.listed ? "ok" : "neutral"}>{row.listed ? "Listed" : "Unlisted"}</Badge>
            </div>
            <div className="absolute left-2 top-2">
              <DropdownMenu
                trigger={
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface/90 text-ink shadow">
                    <MoreHorizontal className="h-4 w-4" strokeWidth={2} />
                  </span>
                }
                actions={[
                  { label: "Edit Listing Copy", onSelect: () => onEdit(row) },
                  { label: "Preview on Website", onSelect: () => onPreview(row) },
                  { label: row.listed ? "Unlist" : "Publish", onSelect: () => (row.listed ? onUnlist(row) : onToggleListed(row.id, true)), tone: row.listed ? "danger" : "default" },
                ]}
              />
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">{row.unitCode}</span>
              <span className="rounded-full border border-rule-strong px-2 py-0.5 text-[11px] font-medium text-ink-muted">{row.type}</span>
            </div>
            <p className="mt-0.5 text-xs text-ink-faint">{row.propertyName}</p>
            <p className="mt-2 truncate text-sm font-medium text-ink" title={row.listingTitle}>
              {row.listingTitle}
            </p>
            <p className="mt-1 text-base font-bold tabular-nums text-ink">{formatINR(row.rent)}<span className="text-xs font-normal text-ink-faint">/mo</span></p>

            <div className="mt-3 flex items-center justify-between border-t border-rule pt-3 text-xs text-ink-muted">
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" strokeWidth={2} />
                {row.views} views
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" strokeWidth={2} />
                {row.enquiries} enquiries
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
