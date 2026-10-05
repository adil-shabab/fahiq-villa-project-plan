import { CircleCheckBig, Quote, Zap } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import type { Conversation } from "../../data/messaging";
import { cn } from "../../lib/utils";

const categories = ["Plumbing / Electrical (Dual)", "Carpentry & Lock", "Appliance & White Goods", "Pest Control"];
const priorities = ["Low", "Med", "High", "Urgent"] as const;
const technicians = ["CoolCare HVAC & Plumbing (Mukesh)", "SpeedyElectro Tech", "In-house Handyman Team"];

export function CreateTicketModal({
  conversation,
  quotedMessage,
  onClose,
  onCreate,
}: {
  conversation: Conversation;
  quotedMessage: string;
  onClose: () => void;
  onCreate: () => void;
}) {
  const [title, setTitle] = useState(`Service Request - Unit ${conversation.unitLabel}`);
  const [category, setCategory] = useState(categories[0]);
  const [priority, setPriority] = useState<(typeof priorities)[number]>("Urgent");
  const [technician, setTechnician] = useState(technicians[0]);
  const [autoNotify, setAutoNotify] = useState(true);

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col gap-4 overflow-y-auto rounded-2xl border border-rule bg-surface p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between border-b border-rule pb-3">
          <div>
            <span className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-danger/15 px-2 py-0.5 text-[11px] font-bold text-danger">
              <Zap className="h-3.5 w-3.5" strokeWidth={2} />
              Fast Ops Dispatch
            </span>
            <h3 className="text-base font-bold text-ink">Create Ticket from WhatsApp Message</h3>
            <p className="text-xs text-ink-faint">Converts message context directly into an SLA-tracked facilities order.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-ink-muted hover:bg-surface-sunken">✕</button>
        </div>

        <div className="flex items-start gap-2 rounded-lg bg-surface-sunken p-2.5">
          <Quote className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" strokeWidth={2} />
          <p className="text-sm italic text-ink-muted">"{quotedMessage}"</p>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Ticket Subject / Title</span>
          <input className="field" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Category</span>
            <select className="field" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          <div>
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Priority Level</span>
            <div className="grid grid-cols-4 gap-1 rounded-lg bg-surface-sunken p-0.5">
              {priorities.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={cn(
                    "rounded py-1 text-xs font-semibold",
                    priority === p ? "bg-danger text-white shadow-sm" : "text-ink-muted",
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Unit &amp; Property</span>
            <input className="field cursor-not-allowed bg-surface-sunken" readOnly value={`${conversation.unitLabel} (${conversation.propertyName})`} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Assign Contractor / Technician</span>
            <select className="field" value={technician} onChange={(e) => setTechnician(e.target.value)}>
              {technicians.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="flex items-center gap-2 rounded-lg bg-surface-sunken p-2.5 text-sm text-ink">
          <input type="checkbox" checked={autoNotify} onChange={(e) => setAutoNotify(e.target.checked)} className="h-4 w-4 accent-[var(--color-accent)]" />
          Auto-notify tenant on WhatsApp with tracking link &amp; OTP
        </label>

        <div className="flex items-center justify-end gap-2 border-t border-rule pt-3">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onCreate();
              onClose();
            }}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-ink"
          >
            <CircleCheckBig className="h-4 w-4" strokeWidth={2} />
            Create Ticket &amp; Notify Tenant
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
