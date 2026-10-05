import type { TicketStatus } from "../../data/tickets";
import { ticketStatusMeta } from "../../lib/ticketStatus";
import { cn } from "../../lib/utils";

export function TicketStatusPill({ status }: { status: TicketStatus }) {
  const m = ticketStatusMeta[status];
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap", m.className)}>{m.label}</span>;
}
