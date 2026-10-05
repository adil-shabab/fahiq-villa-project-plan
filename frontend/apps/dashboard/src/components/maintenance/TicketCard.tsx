import { TimerOff } from "lucide-react";
import type { DragEvent } from "react";
import type { MaintenanceTicket } from "../../data/maintenance";
import { cn } from "../../lib/utils";
import { Avatar } from "../ui/Avatar";
import { categoryIcons } from "./categoryIcons";

const priorityClasses: Record<MaintenanceTicket["priority"], string> = {
  Low: "bg-surface-sunken text-ink-faint",
  Medium: "bg-gold-soft text-gold",
  High: "bg-warn/15 text-warn",
  Urgent: "bg-danger/15 text-danger",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TicketCard({
  ticket,
  onClick,
  active,
  draggable,
  onDragStart,
}: {
  ticket: MaintenanceTicket;
  onClick: () => void;
  active?: boolean;
  draggable?: boolean;
  onDragStart?: (e: DragEvent) => void;
}) {
  const Icon = categoryIcons[ticket.category];

  return (
    <div
      role="button"
      tabIndex={0}
      draggable={draggable}
      onDragStart={onDragStart}
      onClick={onClick}
      className={cn(
        "flex cursor-pointer flex-col gap-2 rounded-lg border bg-surface p-3 shadow-sm transition-all hover:shadow-md",
        active ? "border-accent ring-1 ring-accent" : "border-rule",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="flex items-center gap-1 font-mono text-[11px] font-semibold text-ink-muted">
          <Icon className="h-3.5 w-3.5 text-accent" strokeWidth={2} />#{ticket.id}
        </span>
        <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide", priorityClasses[ticket.priority])}>
          {ticket.priority}
        </span>
      </div>
      <h4 className="text-[13px] font-semibold leading-tight text-ink">{ticket.title}</h4>
      <span className="self-start rounded bg-surface-sunken px-2 py-0.5 text-[11px] text-ink-muted">
        {ticket.unitLabel} · {ticket.propertyName}
      </span>
      {ticket.note && <div className="rounded bg-surface-sunken p-1.5 text-[10px] text-ink-muted">{ticket.note}</div>}
      <div className="flex items-center justify-between pt-1">
        {ticket.overdue ? (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-danger">
            <TimerOff className="h-3 w-3" strokeWidth={2} />
            {ticket.slaRemainingLabel}
          </span>
        ) : (
          <span className="text-[11px] text-ink-faint">{ticket.slaRemainingLabel}</span>
        )}
        {ticket.assigneeName ? (
          <span className="flex items-center gap-1">
            <Avatar initials={initials(ticket.assigneeName)} size="sm" />
            <span className="text-[11px] text-ink-muted">{ticket.assigneeName.split(" ")[0]}</span>
          </span>
        ) : (
          <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-[11px] text-ink-faint">Unassigned</span>
        )}
      </div>
    </div>
  );
}
