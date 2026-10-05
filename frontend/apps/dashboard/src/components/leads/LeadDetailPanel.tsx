import { MessageCircle, Phone, PhoneCall, StickyNote, UserCheck, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { stages, type Lead, type LeadActivity, type LeadStage } from "../../data/leads";
import { formatINR } from "../../lib/format";
import { Avatar } from "../ui/Avatar";

const activityIcon: Record<LeadActivity["type"], typeof StickyNote> = {
  note: StickyNote,
  call: PhoneCall,
  status_change: UserCheck,
  message: MessageCircle,
  visit: UserCheck,
};

export function LeadDetailPanel({
  lead,
  onClose,
  onStageChange,
  onScheduleVisit,
  onMarkLost,
  onConvert,
}: {
  lead: Lead;
  onClose: () => void;
  onStageChange: (stage: LeadStage) => void;
  onScheduleVisit: () => void;
  onMarkLost: () => void;
  onConvert: () => void;
}) {
  const [note, setNote] = useState("");

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/40" onClick={onClose}>
      <div
        className="flex h-full w-full max-w-md flex-col overflow-hidden border-l border-rule bg-surface shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-rule px-5 py-4">
          <div className="flex items-center gap-3">
            <Avatar initials={lead.name.split(" ").map((p) => p[0]).join("").slice(0, 2)} />
            <div>
              <h2 className="text-sm font-semibold text-ink">{lead.name}</h2>
              <div className="flex items-center gap-2 text-xs text-ink-faint">
                <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-ink">
                  <Phone className="h-3 w-3" strokeWidth={2} />
                  {lead.phone}
                </a>
                <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} className="flex items-center gap-1 text-ok hover:text-ok">
                  <MessageCircle className="h-3 w-3" strokeWidth={2} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
          <button type="button" onClick={onClose} className="text-ink-faint hover:text-ink" aria-label="Close">
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <div className="overflow-y-auto">
          <div className="border-b border-rule px-5 py-4">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Stage</label>
            <select
              value={lead.stage}
              onChange={(e) => onStageChange(e.target.value as LeadStage)}
              className="field font-medium"
            >
              {stages.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <dl className="mt-4 grid grid-cols-2 gap-y-3 text-sm">
              <Fact label="Source" value={lead.source} />
              <Fact label="Interested Unit" value={lead.interestedUnit} />
              <Fact label="Budget" value={`${formatINR(lead.budgetMin)} – ${formatINR(lead.budgetMax)}`} />
              <Fact label="Move-in Date" value={new Date(lead.moveInDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} />
              <Fact label="Tenant Type" value={lead.tenantType} />
              <Fact label="Assigned To" value={lead.assignedTo.name} />
            </dl>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-rule px-5 py-4">
            <button
              type="button"
              onClick={onScheduleVisit}
              className="rounded-lg border border-rule px-3 py-1.5 text-xs font-medium text-ink hover:border-rule-strong"
            >
              Schedule Visit
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg border border-rule px-3 py-1.5 text-xs font-medium text-ink hover:border-rule-strong"
            >
              <MessageCircle className="h-3.5 w-3.5 text-ok" strokeWidth={2} />
              Send Listing Details
            </button>
            <button
              type="button"
              onClick={onConvert}
              className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white hover:bg-accent-ink"
            >
              Convert to Onboarding
            </button>
            {lead.stage !== "Lost" && lead.stage !== "Won" && (
              <button type="button" onClick={onMarkLost} className="ml-auto text-xs font-medium text-danger hover:underline">
                Mark as Lost
              </button>
            )}
          </div>

          <div className="px-5 py-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-faint">Activity Timeline</h3>
            <ul className="flex flex-col gap-3">
              {[...lead.activities].reverse().map((activity) => {
                const Icon = activityIcon[activity.type];
                return (
                  <li key={activity.id} className="flex gap-2.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-ink">
                      <Icon className="h-3 w-3" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-sm text-ink">{activity.text}</p>
                      <p className="text-xs text-ink-faint">
                        {activity.by} &middot; {activity.at}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-rule px-5 py-3">
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note..."
            className="field"
          />
          <button
            type="button"
            onClick={() => setNote("")}
            disabled={!note.trim()}
            className="shrink-0 rounded-lg bg-accent px-3 py-2 text-xs font-medium text-white hover:bg-accent-ink disabled:opacity-50"
          >
            Add Note
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">{label}</dt>
      <dd className="mt-0.5 font-medium text-ink">{value}</dd>
    </div>
  );
}
