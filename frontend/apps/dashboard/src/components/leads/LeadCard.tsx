import { MessageCircle, Phone } from "lucide-react";
import type { DragEvent } from "react";
import type { Lead } from "../../data/leads";
import { formatINR } from "../../lib/format";
import { cn } from "../../lib/utils";
import { Avatar } from "../ui/Avatar";

const followUpToneClasses = {
  overdue: "bg-danger/10 text-danger",
  today: "bg-warn/10 text-warn",
  upcoming: "bg-surface-sunken text-ink-faint",
};

export function LeadCard({
  lead,
  onClick,
  draggable,
  onDragStart,
}: {
  lead: Lead;
  onClick: () => void;
  draggable?: boolean;
  onDragStart?: (e: DragEvent) => void;
}) {
  const isLost = lead.stage === "Lost";

  return (
    <div
      role="button"
      tabIndex={0}
      draggable={draggable}
      onDragStart={onDragStart}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className={cn(
        "cursor-pointer rounded-lg border border-rule bg-surface p-3 shadow-sm transition-shadow hover:shadow-md",
        isLost && "opacity-60",
        draggable && "cursor-grab active:cursor-grabbing",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-ink">{lead.name}</p>
        <div className="flex shrink-0 gap-1">
          <a
            href={`tel:${lead.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="flex h-6 w-6 items-center justify-center rounded-full text-ink-faint hover:bg-surface-sunken hover:text-ink"
          >
            <Phone className="h-3 w-3" strokeWidth={2} />
          </a>
          <a
            href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
            onClick={(e) => e.stopPropagation()}
            className="flex h-6 w-6 items-center justify-center rounded-full text-ok hover:bg-ok/10"
          >
            <MessageCircle className="h-3 w-3" strokeWidth={2} />
          </a>
        </div>
      </div>

      <span className="mt-1.5 inline-block rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent-ink">
        {lead.interestedUnit}
      </span>

      <p className="mt-1.5 text-xs text-ink-muted">
        {formatINR(lead.budgetMin)} &ndash; {formatINR(lead.budgetMax)}
      </p>

      {isLost && lead.lostReason && (
        <span className="mt-2 inline-block rounded-full bg-surface-sunken px-2 py-0.5 text-[11px] font-medium text-ink-faint">
          {lead.lostReason}
        </span>
      )}

      <div className="mt-2.5 flex items-center justify-between">
        <Avatar initials={lead.assignedTo.initials} size="sm" />
        {lead.followUpDate && lead.followUpStatus && (
          <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium", followUpToneClasses[lead.followUpStatus])}>
            {new Date(lead.followUpDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
          </span>
        )}
      </div>
    </div>
  );
}
