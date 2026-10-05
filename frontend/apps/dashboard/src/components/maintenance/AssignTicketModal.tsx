import { useState } from "react";
import { createPortal } from "react-dom";
import { vendors, type MaintenanceTicket } from "../../data/maintenance";
import { cn } from "../../lib/utils";

export function AssignTicketModal({
  ticket,
  onClose,
  onAssign,
}: {
  ticket: MaintenanceTicket;
  onClose: () => void;
  onAssign: (vendorName: string) => void;
}) {
  const [kind, setKind] = useState<"vendor" | "staff">("vendor");
  const [vendorId, setVendorId] = useState(vendors[0]?.id ?? "");

  const selectedVendor = vendors.find((v) => v.id === vendorId);

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="flex w-full max-w-lg flex-col gap-4 rounded-2xl border border-rule bg-surface p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-rule pb-2">
          <h3 className="text-base font-bold text-ink">Assign Ticket #{ticket.id}</h3>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-ink-muted hover:bg-surface-sunken">✕</button>
        </div>

        <div className="flex items-center rounded-lg bg-surface-sunken p-1">
          <button
            type="button"
            onClick={() => setKind("vendor")}
            className={cn("flex-1 rounded-md py-1.5 text-sm font-bold", kind === "vendor" ? "bg-surface text-accent shadow-sm" : "text-ink-muted")}
          >
            Verified Vendor
          </button>
          <button
            type="button"
            onClick={() => setKind("staff")}
            className={cn("flex-1 rounded-md py-1.5 text-sm font-medium", kind === "staff" ? "bg-surface text-accent shadow-sm" : "text-ink-muted")}
          >
            In-House Staff Tech
          </button>
        </div>

        {kind === "vendor" ? (
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Select Service Partner</span>
            <select className="field" value={vendorId} onChange={(e) => setVendorId(e.target.value)}>
              {vendors.map((v) => (
                <option key={v.id} value={v.id}>{v.name} ({v.rating} ★)</option>
              ))}
            </select>
          </label>
        ) : (
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Select Staff</span>
            <select className="field">
              <option>Rajesh Kumar (Facility Supervisor)</option>
              <option>Ankit Verma (Maintenance)</option>
            </select>
          </label>
        )}

        <div className="rounded-lg bg-surface-sunken p-3 text-xs text-ink-muted">
          <div className="mb-1 flex items-center justify-between">
            <span className="font-semibold text-ink">Auto SLA Calculation:</span>
            <span className={cn("font-bold", ticket.priority === "Urgent" ? "text-danger" : "text-ink")}>
              {ticket.slaTargetHours} Hour{ticket.slaTargetHours === 1 ? "" : "s"} {ticket.priority === "Urgent" ? "Emergency" : ticket.priority}
            </span>
          </div>
          <span>Dispatches instant SMS &amp; WhatsApp job link with unit address, tenant phone and safety warning to the vendor.</span>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule pt-3">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onAssign(kind === "vendor" ? (selectedVendor?.name ?? "") : "Ankit Verma (Maintenance)");
              onClose();
            }}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-ink"
          >
            Dispatch Partner
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
