import { useState } from "react";
import type { ListingRow } from "../../data/listings";
import { formatINR } from "../../lib/format";
import { DropdownMenu } from "../ui/DropdownMenu";
import { Switch } from "../ui/Switch";

export function ListingsTable({
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
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected((prev) => (prev.size === rows.length ? new Set() : new Set(rows.map((r) => r.id))));
  }

  return (
    <div>
      {selected.size > 0 && (
        <div className="flex items-center justify-between border-b border-rule bg-accent-soft px-5 py-2.5 text-sm">
          <span className="font-medium text-accent-ink">{selected.size} selected</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                selected.forEach((id) => onToggleListed(id, true));
                setSelected(new Set());
              }}
              className="rounded-lg border border-accent/40 bg-surface px-3 py-1.5 text-xs font-medium text-accent-ink hover:bg-accent-soft"
            >
              Publish Selected
            </button>
            <button
              type="button"
              onClick={() => {
                selected.forEach((id) => onToggleListed(id, false));
                setSelected(new Set());
              }}
              className="rounded-lg border border-accent/40 bg-surface px-3 py-1.5 text-xs font-medium text-accent-ink hover:bg-accent-soft"
            >
              Unpublish Selected
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-rule bg-surface-sunken text-xs uppercase tracking-wide text-ink-faint">
              <th className="w-10 px-5 py-2.5">
                <input
                  type="checkbox"
                  checked={selected.size === rows.length && rows.length > 0}
                  onChange={toggleAll}
                  className="h-4 w-4 rounded border-rule-strong accent-[var(--color-accent)]"
                />
              </th>
              <th className="px-3 py-2.5 font-semibold">Unit</th>
              <th className="px-3 py-2.5 font-semibold">Property</th>
              <th className="px-3 py-2.5 font-semibold">Type</th>
              <th className="px-3 py-2.5 text-right font-semibold">Rent</th>
              <th className="px-3 py-2.5 font-semibold">Listed</th>
              <th className="px-3 py-2.5 text-right font-semibold">Views</th>
              <th className="px-3 py-2.5 text-right font-semibold">Enquiries</th>
              <th className="px-3 py-2.5 font-semibold">Listing Title</th>
              <th className="w-12 px-3 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-rule last:border-b-0 hover:bg-surface-sunken/60">
                <td className="px-5 py-3">
                  <input
                    type="checkbox"
                    checked={selected.has(row.id)}
                    onChange={() => toggleRow(row.id)}
                    className="h-4 w-4 rounded border-rule-strong accent-[var(--color-accent)]"
                  />
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2.5">
                    <span className="h-9 w-12 shrink-0 rounded-md" style={{ backgroundColor: row.coverColor }} />
                    <span className="font-medium text-ink">{row.unitCode}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-ink-muted">{row.propertyName}</td>
                <td className="px-3 py-3">
                  <span className="rounded-full border border-rule-strong px-2 py-0.5 text-xs font-medium text-ink-muted">
                    {row.type}
                  </span>
                </td>
                <td className="px-3 py-3 text-right font-medium tabular-nums text-ink">{formatINR(row.rent)}</td>
                <td className="px-3 py-3">
                  <Switch checked={row.listed} onChange={(next) => onToggleListed(row.id, next)} label={`Listed status for ${row.unitCode}`} />
                </td>
                <td className="px-3 py-3 text-right tabular-nums text-ink-muted">{row.views}</td>
                <td className="px-3 py-3 text-right tabular-nums text-ink-muted">{row.enquiries}</td>
                <td className="max-w-[220px] truncate px-3 py-3 text-ink-muted">{row.listingTitle}</td>
                <td className="px-3 py-3 text-right">
                  <DropdownMenu
                    actions={[
                      { label: "Edit Listing Copy", onSelect: () => onEdit(row) },
                      { label: "Preview on Website", onSelect: () => onPreview(row) },
                      { label: "Unlist", onSelect: () => onUnlist(row), tone: "danger" },
                    ]}
                  />
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={10} className="px-5 py-10 text-center text-sm text-ink-faint">
                  No listings match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
