import type { TicketStatus } from "../data/tickets";

export const ticketStatusMeta: Record<TicketStatus, { label: string; className: string }> = {
  open: { label: "Open", className: "bg-info/12 text-info" },
  assigned: { label: "Assigned", className: "bg-info/12 text-info" },
  in_progress: { label: "In Progress", className: "bg-warn/12 text-warn" },
  resolved: { label: "Resolved", className: "bg-ok/12 text-ok" },
  closed: { label: "Closed", className: "bg-surface-sunken text-ink-muted" },
};

export const isActiveTicket = (s: TicketStatus) => s === "open" || s === "assigned" || s === "in_progress";

/** Tenant-facing stages in the detail timeline (closed counts as resolved). */
export const ticketStages: { status: TicketStatus; label: string }[] = [
  { status: "open", label: "Open" },
  { status: "assigned", label: "Assigned" },
  { status: "in_progress", label: "In Progress" },
  { status: "resolved", label: "Resolved" },
];

export function stageIndex(s: TicketStatus): number {
  return s === "closed" ? 3 : ticketStages.findIndex((x) => x.status === s);
}
