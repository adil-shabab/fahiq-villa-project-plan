import { Globe2, LayoutGrid, List } from "lucide-react";
import { useMemo, useState } from "react";
import { EditListingCopyModal } from "../components/listings/EditListingCopyModal";
import { ListingsFilterBar, type ListingsFilterState } from "../components/listings/ListingsFilterBar";
import { ListingsGrid } from "../components/listings/ListingsGrid";
import { ListingsSummaryCards } from "../components/listings/ListingsSummaryCards";
import { ListingsTable } from "../components/listings/ListingsTable";
import { LocalitySEOPanel } from "../components/listings/LocalitySEOPanel";
import { UnlistConfirmModal } from "../components/listings/UnlistConfirmModal";
import { WebsiteListingPreviewModal } from "../components/listings/WebsiteListingPreviewModal";
import { Card } from "../components/ui/Card";
import { ViewToggle } from "../components/ui/ViewToggle";
import { listings as initialListings, type ListingRow } from "../data/listings";

type ViewMode = "table" | "grid";
type ModalState =
  | { kind: "none" }
  | { kind: "edit"; row: ListingRow }
  | { kind: "preview"; row: ListingRow }
  | { kind: "unlist"; row: ListingRow }
  | { kind: "locality" };

export function WebsiteListings() {
  const [rows, setRows] = useState<ListingRow[]>(initialListings);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [modal, setModal] = useState<ModalState>({ kind: "none" });
  const [filters, setFilters] = useState<ListingsFilterState>({
    search: "",
    propertyId: "all",
    listedFilter: "all",
    unitType: "all",
  });

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      if (filters.search && !`${row.unitCode} ${row.listingTitle}`.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.propertyId !== "all" && row.propertyId !== filters.propertyId) return false;
      if (filters.listedFilter === "listed" && !row.listed) return false;
      if (filters.listedFilter === "unlisted" && row.listed) return false;
      if (filters.unitType !== "all" && row.type !== filters.unitType) return false;
      return true;
    });
  }, [rows, filters]);

  function setListed(id: string, next: boolean) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, listed: next } : r)));
  }

  function updateCopy(id: string, patch: { listingTitle: string; listingDescription: string }) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  const liveCount = rows.filter((r) => r.listed).length;

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Website Listings</h1>
          <p className="mt-0.5 text-sm text-ink-faint">
            {liveCount} of {rows.length} units currently live
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setModal({ kind: "locality" })}
            className="flex items-center gap-1.5 rounded-lg border border-rule bg-surface px-3.5 py-2 text-sm font-medium text-ink hover:border-rule-strong"
          >
            <Globe2 className="h-4 w-4" strokeWidth={2} />
            Manage Locality Pages
          </button>
          <ViewToggle
            value={viewMode}
            onChange={setViewMode}
            options={[
              { value: "table", icon: List, label: "Table view" },
              { value: "grid", icon: LayoutGrid, label: "Grid view" },
            ]}
          />
        </div>
      </div>

      <ListingsSummaryCards />

      <Card>
        <ListingsFilterBar filters={filters} onChange={setFilters} />
        {viewMode === "table" ? (
          <ListingsTable
            rows={filteredRows}
            onToggleListed={setListed}
            onEdit={(row) => setModal({ kind: "edit", row })}
            onPreview={(row) => setModal({ kind: "preview", row })}
            onUnlist={(row) => setModal({ kind: "unlist", row })}
          />
        ) : (
          <ListingsGrid
            rows={filteredRows}
            onToggleListed={setListed}
            onEdit={(row) => setModal({ kind: "edit", row })}
            onPreview={(row) => setModal({ kind: "preview", row })}
            onUnlist={(row) => setModal({ kind: "unlist", row })}
          />
        )}
      </Card>

      {modal.kind === "edit" && (
        <EditListingCopyModal
          row={modal.row}
          onClose={() => setModal({ kind: "none" })}
          onSave={(patch) => updateCopy(modal.row.id, patch)}
        />
      )}
      {modal.kind === "preview" && <WebsiteListingPreviewModal row={modal.row} onClose={() => setModal({ kind: "none" })} />}
      {modal.kind === "unlist" && (
        <UnlistConfirmModal
          row={modal.row}
          onClose={() => setModal({ kind: "none" })}
          onConfirm={() => setListed(modal.row.id, false)}
        />
      )}
      {modal.kind === "locality" && <LocalitySEOPanel onClose={() => setModal({ kind: "none" })} />}
    </div>
  );
}
