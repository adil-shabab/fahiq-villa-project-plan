import { LayoutGrid, List, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { ConvertToOnboardingModal } from "../components/leads/ConvertToOnboardingModal";
import { LeadDetailPanel } from "../components/leads/LeadDetailPanel";
import { LeadsFilterBar, type LeadsFilterState } from "../components/leads/LeadsFilterBar";
import { LeadsKanbanBoard } from "../components/leads/LeadsKanbanBoard";
import { LeadsTable } from "../components/leads/LeadsTable";
import { MarkAsLostModal } from "../components/leads/MarkAsLostModal";
import { NewLeadModal } from "../components/leads/NewLeadModal";
import { ScheduleVisitModal } from "../components/leads/ScheduleVisitModal";
import { ViewToggle } from "../components/ui/ViewToggle";
import { leads as initialLeads, type Lead, type LeadStage } from "../data/leads";

type ViewMode = "kanban" | "list";
type ModalKind = "none" | "new-lead" | "schedule-visit" | "mark-lost" | "convert";

export function Leads() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [viewMode, setViewMode] = useState<ViewMode>("kanban");
  const [openLeadId, setOpenLeadId] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalKind>("none");
  const [filters, setFilters] = useState<LeadsFilterState>({ search: "", source: "all", assignedTo: "all", overdueOnly: false });

  const filtered = useMemo(() => {
    return leads.filter((lead) => {
      if (filters.search && !`${lead.name} ${lead.interestedUnit}`.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.source !== "all" && lead.source !== filters.source) return false;
      if (filters.assignedTo !== "all" && lead.assignedTo.name !== filters.assignedTo) return false;
      if (filters.overdueOnly && lead.followUpStatus !== "overdue") return false;
      return true;
    });
  }, [leads, filters]);

  const openLead = leads.find((l) => l.id === openLeadId) ?? null;
  const activeCount = leads.filter((l) => l.stage !== "Won" && l.stage !== "Lost").length;

  function updateLead(id: string, patch: Partial<Lead>) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }

  function handleStageChange(id: string, stage: LeadStage) {
    updateLead(id, { stage });
  }

  return (
    <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Leads</h1>
          <p className="mt-0.5 text-sm text-ink-faint">{activeCount} active leads</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setModal("new-lead")}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            New Lead
          </button>
          <ViewToggle
            value={viewMode}
            onChange={setViewMode}
            options={[
              { value: "kanban", icon: LayoutGrid, label: "Kanban view" },
              { value: "list", icon: List, label: "List view" },
            ]}
          />
        </div>
      </div>

      <div className="rounded-xl border border-rule bg-surface p-4">
        <LeadsFilterBar filters={filters} onChange={setFilters} />
      </div>

      {viewMode === "kanban" ? (
        <LeadsKanbanBoard leads={filtered} onOpenLead={(lead) => setOpenLeadId(lead.id)} onMoveStage={handleStageChange} />
      ) : (
        <LeadsTable leads={filtered} onOpenLead={(lead) => setOpenLeadId(lead.id)} />
      )}

      {openLead && (
        <LeadDetailPanel
          lead={openLead}
          onClose={() => setOpenLeadId(null)}
          onStageChange={(stage) => updateLead(openLead.id, { stage })}
          onScheduleVisit={() => setModal("schedule-visit")}
          onMarkLost={() => setModal("mark-lost")}
          onConvert={() => setModal("convert")}
        />
      )}

      {modal === "new-lead" && <NewLeadModal onClose={() => setModal("none")} />}

      {modal === "schedule-visit" && openLead && (
        <ScheduleVisitModal
          lead={openLead}
          onClose={() => setModal("none")}
          onSchedule={() => updateLead(openLead.id, { stage: "Visit Scheduled" })}
        />
      )}

      {modal === "mark-lost" && openLead && (
        <MarkAsLostModal
          lead={openLead}
          onClose={() => setModal("none")}
          onConfirm={(reason) => {
            updateLead(openLead.id, { stage: "Lost", lostReason: reason });
            setOpenLeadId(null);
          }}
        />
      )}

      {modal === "convert" && openLead && (
        <ConvertToOnboardingModal
          lead={openLead}
          onClose={() => setModal("none")}
          onConfirm={() => {
            updateLead(openLead.id, { stage: "Won" });
            setOpenLeadId(null);
          }}
        />
      )}
    </div>
  );
}
