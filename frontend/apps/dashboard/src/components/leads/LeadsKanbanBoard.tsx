import { useState, type DragEvent } from "react";
import { stages, type Lead, type LeadStage } from "../../data/leads";
import { cn } from "../../lib/utils";
import { LeadCard } from "./LeadCard";

export function LeadsKanbanBoard({
  leads,
  onOpenLead,
  onMoveStage,
}: {
  leads: Lead[];
  onOpenLead: (lead: Lead) => void;
  onMoveStage: (leadId: string, stage: LeadStage) => void;
}) {
  const [dragOverStage, setDragOverStage] = useState<LeadStage | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  function handleDrop(stage: LeadStage) {
    if (draggingId) onMoveStage(draggingId, stage);
    setDragOverStage(null);
    setDraggingId(null);
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {stages.map((stage) => {
        const stageLeads = leads.filter((l) => l.stage === stage);
        return (
          <div
            key={stage}
            onDragOver={(e: DragEvent) => {
              e.preventDefault();
              setDragOverStage(stage);
            }}
            onDragLeave={() => setDragOverStage((prev) => (prev === stage ? null : prev))}
            onDrop={() => handleDrop(stage)}
            className={cn(
              "flex w-72 shrink-0 flex-col rounded-xl border border-rule bg-surface-sunken/60 transition-colors",
              dragOverStage === stage && "border-accent bg-accent-soft/40",
            )}
          >
            <div className="flex items-center justify-between border-b border-rule px-3.5 py-2.5">
              <h3 className="text-sm font-semibold text-ink">{stage}</h3>
              <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-semibold tabular-nums text-ink-muted">
                {stageLeads.length}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-2.5 p-2.5">
              {stageLeads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onClick={() => onOpenLead(lead)}
                  draggable
                  onDragStart={() => setDraggingId(lead.id)}
                />
              ))}
              {stageLeads.length === 0 && <p className="px-1 py-3 text-center text-xs text-ink-faint">No leads</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
