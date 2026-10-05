import { useState } from "react";
import { createPortal } from "react-dom";
import type { OverdueTenant } from "../../data/collections";
import { formatINR } from "../../lib/format";

export function LogPromiseModal({
  tenant,
  onClose,
  onSubmit,
}: {
  tenant: OverdueTenant;
  onClose: () => void;
  onSubmit: () => void;
}) {
  const [promisedDate, setPromisedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [amount, setAmount] = useState(tenant.amountDue);
  const [channel, setChannel] = useState<"whatsapp" | "call">("whatsapp");
  const [notes, setNotes] = useState("");

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="flex max-h-[90vh] w-full max-w-md flex-col gap-4 overflow-y-auto rounded-2xl border border-rule bg-surface p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-rule pb-2">
          <h3 className="text-base font-bold text-ink">Log Promise to Pay</h3>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-ink-muted hover:bg-surface-sunken">✕</button>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Target Tenant</span>
          <input className="field cursor-not-allowed bg-surface-sunken" readOnly value={`${tenant.tenantName} — Unit ${tenant.unitCode}`} />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Promised Date</span>
            <input type="date" className="field" value={promisedDate} onChange={(e) => setPromisedDate(e.target.value)} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Promised Amount</span>
            <input type="number" className="field" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
          </label>
        </div>

        <div>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Follow-up Channel</span>
          <div className="flex gap-2">
            <label className="flex items-center gap-1.5 rounded-lg bg-surface-sunken px-3 py-1.5 text-xs font-medium text-ink">
              <input type="radio" name="channel" checked={channel === "whatsapp"} onChange={() => setChannel("whatsapp")} className="accent-[var(--color-accent)]" />
              WhatsApp Reminder
            </label>
            <label className="flex items-center gap-1.5 rounded-lg bg-surface-sunken px-3 py-1.5 text-xs font-medium text-ink">
              <input type="radio" name="channel" checked={channel === "call"} onChange={() => setChannel("call")} className="accent-[var(--color-accent)]" />
              Manager Phone Call
            </label>
          </div>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Conversation Notes / Reason</span>
          <textarea
            className="field min-h-24 resize-none"
            placeholder="Add verified reason given by tenant..."
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>

        <p className="text-[11px] text-ink-faint">Amount due today: {formatINR(tenant.amountDue)}</p>

        <div className="flex items-center justify-end gap-2 border-t border-rule pt-3">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSubmit();
              onClose();
            }}
            className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Save &amp; Schedule Auto-Ping
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
