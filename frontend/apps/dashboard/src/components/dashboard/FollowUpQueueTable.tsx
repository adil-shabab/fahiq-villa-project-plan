import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { followUpQueue, type FollowUpRow } from "../../data/dashboard";
import { formatINR } from "../../lib/format";
import { cn } from "../../lib/utils";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { SendReminderModal } from "./SendReminderModal";

function overdueTone(days: number): "warn" | "danger" {
  return days >= 7 ? "danger" : "warn";
}

export function FollowUpQueueTable() {
  const [activeRow, setActiveRow] = useState<FollowUpRow | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-rule bg-surface-sunken text-xs uppercase tracking-wide text-ink-faint">
            <th className="px-5 py-2.5 font-semibold">Tenant</th>
            <th className="px-5 py-2.5 font-semibold">Unit</th>
            <th className="px-5 py-2.5 font-semibold">Property</th>
            <th className="px-5 py-2.5 text-right font-semibold">Amount Due</th>
            <th className="px-5 py-2.5 font-semibold">Days Overdue</th>
            <th className="px-5 py-2.5 font-semibold" />
          </tr>
        </thead>
        <tbody>
          {followUpQueue.map((row) => (
            <tr key={row.id} className="border-b border-rule last:border-b-0 hover:bg-surface-sunken/60">
              <td className="px-5 py-3">
                <div className="flex items-center gap-2.5">
                  <Avatar initials={row.avatarInitials} size="sm" />
                  <span className="font-medium text-ink">{row.tenantName}</span>
                </div>
              </td>
              <td className="px-5 py-3 text-ink-muted">{row.unitCode}</td>
              <td className="px-5 py-3 text-ink-muted">{row.propertyName}</td>
              <td className="px-5 py-3 text-right font-semibold tabular-nums text-ink">{formatINR(row.amountDue)}</td>
              <td className="px-5 py-3">
                <Badge tone={overdueTone(row.daysOverdue)}>
                  {row.daysOverdue} day{row.daysOverdue === 1 ? "" : "s"}
                </Badge>
              </td>
              <td className="px-5 py-3 text-right">
                <button
                  type="button"
                  onClick={() => setActiveRow(row)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg border border-rule px-2.5 py-1.5 text-xs font-medium text-ink-muted hover:border-accent hover:text-accent",
                  )}
                >
                  <MessageCircle className="h-3.5 w-3.5" strokeWidth={2} />
                  Remind
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {activeRow && <SendReminderModal row={activeRow} onClose={() => setActiveRow(null)} />}
    </div>
  );
}
