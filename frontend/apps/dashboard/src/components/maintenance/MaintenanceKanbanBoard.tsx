import { useState, type DragEvent } from "react";
import { statusColumns, type MaintenanceTicket, type TicketStatus } from "../../data/maintenance";
import { cn } from "../../lib/utils";
import { TicketCard } from "./TicketCard";

const columnDotClasses: Record<TicketStatus, string> = {
  Open: "bg-warn",
  Assigned: "bg-info",
  "In Progress": "bg-accent",
  "On Hold": "bg-ink-faint",
  Resolved: "bg-ok",
  Closed: "bg-ink-muted",
};

export function MaintenanceKanbanBoard({
  tickets,
  activeTicketId,
  onOpenTicket,
  onMoveStatus,
}: {
  tickets: MaintenanceTicket[];
  activeTicketId: string | null;
  onOpenTicket: (ticket: MaintenanceTicket) => void;
  onMoveStatus: (ticketId: string, status: TicketStatus) => void;
}) {
  const [dragOverStatus, setDragOverStatus] = useState<TicketStatus | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  function handleDrop(status: TicketStatus) {
    if (draggingId) onMoveStatus(draggingId, status);
    setDragOverStatus(null);
    setDraggingId(null);
  }

  return (
    <div className="grid grid-cols-6 gap-3 overflow-x-auto pb-2" style={{ minWidth: 1400 }}>
      {statusColumns.map((status) => {
        const columnTickets = tickets.filter((t) => t.status === status);
        return (
          <div
            key={status}
            onDragOver={(e: DragEvent) => {
              e.preventDefault();
              setDragOverStatus(status);
            }}
            onDragLeave={() => setDragOverStatus((prev) => (prev === status ? null : prev))}
            onDrop={() => handleDrop(status)}
            className={cn(
              "flex flex-col gap-2.5 rounded-xl bg-surface-sunken/70 p-3 transition-colors",
              dragOverStatus === status && "bg-accent-soft/50 ring-1 ring-accent",
            )}
          >
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className={cn("h-2.5 w-2.5 rounded-full", columnDotClasses[status])} />
                <span className="text-sm font-bold text-ink">{status}</span>
                <span className="rounded-full bg-surface px-1.5 py-0.5 text-[11px] font-semibold text-ink-muted">{columnTickets.length}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              {columnTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  active={ticket.id === activeTicketId}
                  onClick={() => onOpenTicket(ticket)}
                  draggable
                  onDragStart={() => setDraggingId(ticket.id)}
                />
              ))}
              {columnTickets.length === 0 && <p className="px-1 py-3 text-center text-xs text-ink-faint">No tickets</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
