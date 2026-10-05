import type { Lead } from "../../data/leads";
import { formatINR } from "../../lib/format";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";

const stageTone: Record<Lead["stage"], "neutral" | "info" | "accent" | "warn" | "ok" | "danger"> = {
  New: "neutral",
  Contacted: "info",
  "Visit Scheduled": "accent",
  Visited: "accent",
  Negotiating: "warn",
  Won: "ok",
  Lost: "danger",
};

export function LeadsTable({ leads, onOpenLead }: { leads: Lead[]; onOpenLead: (lead: Lead) => void }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-rule bg-surface">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-rule bg-surface-sunken text-xs uppercase tracking-wide text-ink-faint">
            <th className="px-5 py-2.5 font-semibold">Name</th>
            <th className="px-3 py-2.5 font-semibold">Phone</th>
            <th className="px-3 py-2.5 font-semibold">Source</th>
            <th className="px-3 py-2.5 font-semibold">Interested Unit</th>
            <th className="px-3 py-2.5 font-semibold">Budget</th>
            <th className="px-3 py-2.5 font-semibold">Stage</th>
            <th className="px-3 py-2.5 font-semibold">Assigned To</th>
            <th className="px-3 py-2.5 font-semibold">Follow-up</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              onClick={() => onOpenLead(lead)}
              className="cursor-pointer border-b border-rule last:border-b-0 hover:bg-surface-sunken/60"
            >
              <td className="px-5 py-3 font-medium text-ink">{lead.name}</td>
              <td className="px-3 py-3 text-ink-muted">{lead.phone}</td>
              <td className="px-3 py-3 text-ink-muted">{lead.source}</td>
              <td className="px-3 py-3 text-ink-muted">{lead.interestedUnit}</td>
              <td className="px-3 py-3 tabular-nums text-ink-muted">
                {formatINR(lead.budgetMin)}&ndash;{formatINR(lead.budgetMax)}
              </td>
              <td className="px-3 py-3">
                <Badge tone={stageTone[lead.stage]}>{lead.stage}</Badge>
              </td>
              <td className="px-3 py-3">
                <div className="flex items-center gap-2">
                  <Avatar initials={lead.assignedTo.initials} size="sm" />
                  <span className="text-ink-muted">{lead.assignedTo.name}</span>
                </div>
              </td>
              <td className="px-3 py-3 text-ink-muted">
                {lead.followUpDate ? new Date(lead.followUpDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
