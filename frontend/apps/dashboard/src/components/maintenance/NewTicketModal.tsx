import { ImagePlus } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { properties } from "../../data/properties";
import { categories, type TicketCategory, type TicketPriority } from "../../data/maintenance";
import { cn } from "../../lib/utils";
import { categoryIcons } from "./categoryIcons";

const quickCategories: TicketCategory[] = ["Plumbing", "Electrical", "Appliance", "Carpentry"];
const priorities: TicketPriority[] = ["Low", "Medium", "High", "Urgent"];

export function NewTicketModal({ onClose, onCreate }: { onClose: () => void; onCreate: () => void }) {
  const [propertyId, setPropertyId] = useState(properties[0]?.id ?? "");
  const [unitLabel, setUnitLabel] = useState("");
  const [category, setCategory] = useState<TicketCategory>("Plumbing");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("Urgent");

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col gap-4 overflow-y-auto rounded-2xl border border-rule bg-surface p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-rule pb-2">
          <h3 className="text-base font-bold text-ink">Create Maintenance Ticket</h3>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-ink-muted hover:bg-surface-sunken">✕</button>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Property</span>
            <select className="field" value={propertyId} onChange={(e) => setPropertyId(e.target.value)}>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Unit / Room Number</span>
            <input className="field" placeholder="e.g. A-101 or Common Area" value={unitLabel} onChange={(e) => setUnitLabel(e.target.value)} />
          </label>
        </div>

        <div>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Category</span>
          <div className="grid grid-cols-4 gap-2">
            {quickCategories.map((c) => {
              const Icon = categoryIcons[c];
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 rounded-lg border-2 p-2 text-[11px] font-semibold",
                    category === c ? "border-accent bg-accent-soft text-accent" : "border-transparent bg-surface-sunken text-ink-muted hover:bg-rule",
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                  {c}
                </button>
              );
            })}
          </div>
          <select className="field mt-2" value={category} onChange={(e) => setCategory(e.target.value as TicketCategory)}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Issue Title</span>
          <input className="field" placeholder="Short description of the fault..." value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Detailed Description</span>
          <textarea
            className="field min-h-20 resize-none"
            placeholder="Include specifics, asset details, smell/noise, safety concerns..."
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div className="grid grid-cols-2 items-end gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Urgency / Priority</span>
            <select className="field" value={priority} onChange={(e) => setPriority(e.target.value as TicketPriority)}>
              {priorities.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>
          <div className="flex h-9 cursor-pointer items-center justify-between rounded-lg border border-rule bg-surface-sunken px-3 text-ink-faint hover:bg-rule">
            <span className="text-xs">Attach JPG/PNG...</span>
            <ImagePlus className="h-4 w-4" strokeWidth={2} />
          </div>
        </div>

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
            disabled={!title.trim() || !unitLabel.trim()}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            Publish Ticket
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
