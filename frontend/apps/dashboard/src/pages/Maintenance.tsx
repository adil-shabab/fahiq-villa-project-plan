import { LayoutGrid, List, Plus, CalendarClock, TriangleAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { AddPreventiveModal } from "../components/maintenance/AddPreventiveModal";
import { AddVendorModal } from "../components/maintenance/AddVendorModal";
import { AssignTicketModal } from "../components/maintenance/AssignTicketModal";
import { MaintenanceFilterBar } from "../components/maintenance/MaintenanceFilterBar";
import { MaintenanceKanbanBoard } from "../components/maintenance/MaintenanceKanbanBoard";
import { NewTicketModal } from "../components/maintenance/NewTicketModal";
import { PreventiveMaintenanceSection } from "../components/maintenance/PreventiveMaintenanceSection";
import { TicketCard } from "../components/maintenance/TicketCard";
import { TicketDetailPanel } from "../components/maintenance/TicketDetailPanel";
import { VendorsAssetsSection } from "../components/maintenance/VendorsAssetsSection";
import { ViewToggle } from "../components/ui/ViewToggle";
import {
  openTicketCount,
  slaBreachedCount,
  statusColumns,
  tickets as initialTickets,
  type MaintenanceTicket,
  type TicketCategory,
  type TicketStatus,
} from "../data/maintenance";

type ViewMode = "board" | "list";
type ModalKind = "none" | "new-ticket" | "assign" | "add-vendor" | "add-preventive";

export function Maintenance() {
  const [tickets, setTickets] = useState<MaintenanceTicket[]>(initialTickets);
  const [viewMode, setViewMode] = useState<ViewMode>("board");
  const [activeTicketId, setActiveTicketId] = useState<string | null>("T-204");
  const [modal, setModal] = useState<ModalKind>("none");
  const [search, setSearch] = useState("");
  const [property, setProperty] = useState("all");
  const [category, setCategory] = useState<TicketCategory | "All">("All");
  const [slaOnly, setSlaOnly] = useState(false);

  const filtered = useMemo(() => {
    return tickets.filter((t) => {
      if (search && !`${t.title} ${t.unitLabel} ${t.propertyName}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (property !== "all" && t.propertyName !== property) return false;
      if (category !== "All" && t.category !== category) return false;
      if (slaOnly && !t.overdue) return false;
      return true;
    });
  }, [tickets, search, property, category, slaOnly]);

  const activeTicket = tickets.find((t) => t.id === activeTicketId) ?? null;

  function updateTicket(id: string, patch: Partial<MaintenanceTicket>) {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  function handleMoveStatus(id: string, status: TicketStatus) {
    updateTicket(id, { status });
  }

  return (
    <div className="mx-auto flex max-w-[1700px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">
            <span>Operations / Facilities</span>
            <span className="h-1 w-1 rounded-full bg-ink-faint" />
            <span className="text-accent">Ticketing &amp; Dispatch Cockpit</span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-ink">Maintenance &amp; Facility Ops</h1>
            {slaBreachedCount > 0 && (
              <span className="flex items-center gap-1.5 rounded-full bg-danger/10 px-2.5 py-1 text-xs font-semibold text-danger">
                <TriangleAlert className="h-3.5 w-3.5" strokeWidth={2} />
                {slaBreachedCount} SLA Breached
              </span>
            )}
            <span className="rounded-full bg-surface-sunken px-2.5 py-1 text-xs text-ink-muted">
              {openTicketCount} open tickets · {tickets.length - openTicketCount} resolved/closed
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ViewToggle
            value={viewMode}
            onChange={setViewMode}
            options={[
              { value: "board", icon: LayoutGrid, label: "Board view" },
              { value: "list", icon: List, label: "List view" },
            ]}
          />
          <button
            type="button"
            onClick={() => setModal("add-preventive")}
            className="flex items-center gap-1.5 rounded-lg border border-rule bg-surface px-3.5 py-2 text-sm font-semibold text-ink hover:bg-surface-sunken"
          >
            <CalendarClock className="h-4 w-4 text-accent" strokeWidth={2} />
            Add Preventive
          </button>
          <button
            type="button"
            onClick={() => setModal("new-ticket")}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold text-white hover:bg-accent-ink"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            New Ticket
          </button>
        </div>
      </div>

      <MaintenanceFilterBar
        search={search}
        onSearchChange={setSearch}
        property={property}
        onPropertyChange={setProperty}
        category={category}
        onCategoryChange={setCategory}
        slaOnly={slaOnly}
        onSlaOnlyChange={setSlaOnly}
      />

      {viewMode === "board" ? (
        <MaintenanceKanbanBoard
          tickets={filtered}
          activeTicketId={activeTicketId}
          onOpenTicket={(t) => setActiveTicketId(t.id)}
          onMoveStatus={handleMoveStatus}
        />
      ) : (
        <div className="flex flex-col gap-2.5">
          {statusColumns.map((status) => {
            const rows = filtered.filter((t) => t.status === status);
            if (rows.length === 0) return null;
            return (
              <div key={status} className="flex flex-col gap-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-faint">{status} ({rows.length})</h3>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {rows.map((t) => (
                    <TicketCard key={t.id} ticket={t} active={t.id === activeTicketId} onClick={() => setActiveTicketId(t.id)} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTicket && (
        <TicketDetailPanel
          ticket={activeTicket}
          onStatusChange={(status) => updateTicket(activeTicket.id, { status })}
          onAssignClick={() => setModal("assign")}
        />
      )}

      <PreventiveMaintenanceSection onAddSchedule={() => setModal("add-preventive")} />

      <VendorsAssetsSection onAddVendor={() => setModal("add-vendor")} />

      {modal === "new-ticket" && (
        <NewTicketModal
          onClose={() => setModal("none")}
          onCreate={() => {}}
        />
      )}

      {modal === "assign" && activeTicket && (
        <AssignTicketModal
          ticket={activeTicket}
          onClose={() => setModal("none")}
          onAssign={(vendorName) => updateTicket(activeTicket.id, { assigneeName: vendorName, assigneeKind: "vendor", status: "Assigned" })}
        />
      )}

      {modal === "add-vendor" && <AddVendorModal onClose={() => setModal("none")} onSave={() => {}} />}

      {modal === "add-preventive" && <AddPreventiveModal onClose={() => setModal("none")} onSave={() => {}} />}
    </div>
  );
}
