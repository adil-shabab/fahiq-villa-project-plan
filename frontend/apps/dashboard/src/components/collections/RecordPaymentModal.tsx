import { useState } from "react";
import { createPortal } from "react-dom";
import { overdueTenants, type OverdueTenant } from "../../data/collections";
import { formatINR } from "../../lib/format";
import { cn } from "../../lib/utils";

const instruments = ["Cash", "Bank Transfer", "Cheque", "UPI"];

export function RecordPaymentModal({
  tenant,
  onClose,
  onSubmit,
}: {
  tenant: OverdueTenant;
  onClose: () => void;
  onSubmit: () => void;
}) {
  const [tenantId, setTenantId] = useState(tenant.id);
  const [amount, setAmount] = useState(tenant.amountDue);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [instrument, setInstrument] = useState("Bank Transfer");
  const [ref, setRef] = useState("");

  const selected = overdueTenants.find((t) => t.id === tenantId) ?? tenant;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="flex max-h-[90vh] w-full max-w-md flex-col gap-4 overflow-y-auto rounded-2xl border border-rule bg-surface p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-rule pb-2">
          <h3 className="text-base font-bold text-ink">Record Offline Payment</h3>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-ink-muted hover:bg-surface-sunken">✕</button>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Tenancy / Room</span>
          <select
            className="field"
            value={tenantId}
            onChange={(e) => {
              setTenantId(e.target.value);
              const t = overdueTenants.find((o) => o.id === e.target.value);
              if (t) setAmount(t.amountDue);
            }}
          >
            {overdueTenants.map((t) => (
              <option key={t.id} value={t.id}>
                {t.tenantName} — Unit {t.unitCode} ({formatINR(t.amountDue)} due)
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Amount (₹)</span>
            <input type="number" className="field" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Payment Date</span>
            <input type="date" className="field" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
        </div>

        <div>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Payment Instrument</span>
          <div className="grid grid-cols-4 gap-1.5">
            {instruments.map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setInstrument(i)}
                className={cn(
                  "rounded-lg py-1.5 text-xs font-semibold",
                  instrument === i ? "bg-accent text-white" : "bg-surface-sunken text-ink-muted hover:bg-rule",
                )}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Transaction Ref / UTR #</span>
          <input className="field" placeholder="e.g. UTR4991029148" value={ref} onChange={(e) => setRef(e.target.value)} />
        </label>

        <div className="rounded-lg bg-surface-sunken p-2.5 text-xs text-ink-muted">
          <span className="mb-1 block font-semibold text-ink">Invoice Allocation</span>
          <label className="flex items-center gap-2 py-0.5">
            <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-[var(--color-accent)]" />
            {selected.tenantName}'s September rent &amp; charges ({formatINR(selected.amountDue)})
          </label>
        </div>

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
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-ink"
          >
            Submit for Approval &amp; Issue Receipt
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
