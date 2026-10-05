import { useState } from "react";
import { createPortal } from "react-dom";
import type { Lead } from "../../data/leads";
import { staffMembers } from "../../data/leads";
import { cn } from "../../lib/utils";

const timeSlots = ["10:00 AM", "11:30 AM", "2:00 PM", "4:00 PM"];

export function ScheduleVisitModal({ lead, onClose, onSchedule }: { lead: Lead; onClose: () => void; onSchedule: () => void }) {
  const [slot, setSlot] = useState(timeSlots[0]);
  const [today] = useState(() => new Date().toISOString().slice(0, 10));

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl border border-rule bg-surface shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="px-5 pt-5">
          <h2 className="text-sm font-semibold text-ink">Schedule a Visit</h2>
          <p className="mt-1 text-sm text-ink-muted">
            For <b className="text-ink">{lead.name}</b> &middot; {lead.interestedUnit}
          </p>
        </div>

        <div className="flex flex-col gap-4 px-5 py-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Date</span>
            <input type="date" className="field" defaultValue={today} />
          </label>

          <div>
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Time Slot</span>
            <div className="flex flex-wrap gap-2">
              {timeSlots.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSlot(t)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-xs font-medium",
                    slot === t ? "border-accent bg-accent-soft text-accent-ink" : "border-rule text-ink-muted hover:border-rule-strong",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Assigned Staff</span>
            <select className="field" defaultValue={lead.assignedTo.name}>
              {staffMembers.map((s) => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSchedule();
              onClose();
            }}
            className="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink"
          >
            Schedule Visit
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
