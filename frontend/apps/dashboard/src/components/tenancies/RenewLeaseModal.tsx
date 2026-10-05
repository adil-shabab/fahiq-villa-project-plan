import { useState } from "react";
import { createPortal } from "react-dom";
import type { Tenancy } from "../../data/tenancies";
import { formatINR } from "../../lib/format";

export function RenewLeaseModal({
  tenancy,
  onClose,
  onConfirm,
}: {
  tenancy: Tenancy;
  onClose: () => void;
  onConfirm: (newRent: number, newEndDate: string) => void;
}) {
  const [newRent, setNewRent] = useState(Math.round(tenancy.rent * (1 + tenancy.escalationPercent / 100)));
  const [resend, setResend] = useState(true);
  const increasePercent = (((newRent - tenancy.rent) / tenancy.rent) * 100).toFixed(1);

  const currentEnd = new Date(tenancy.endDate);
  const defaultNewEnd = new Date(currentEnd);
  defaultNewEnd.setFullYear(defaultNewEnd.getFullYear() + 1);
  const [newEndDate, setNewEndDate] = useState(defaultNewEnd.toISOString().slice(0, 10));

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl border border-rule bg-surface shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="px-5 pt-5">
          <h2 className="text-sm font-semibold text-ink">Renew Lease</h2>
          <p className="mt-1 text-sm text-ink-muted">
            For <b className="text-ink">{tenancy.tenantName}</b> &middot; {tenancy.unitCode}
          </p>
        </div>

        <div className="mx-5 my-4 rounded-lg bg-surface-sunken px-3.5 py-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-ink-faint">Current Rent</span>
            <span className="font-medium text-ink">{formatINR(tenancy.rent)}</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-ink-faint">Current End Date</span>
            <span className="font-medium text-ink">{new Date(tenancy.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-5">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">
              New Rent (₹) &middot; <span className="text-ok">+{increasePercent}%</span>
            </span>
            <input type="number" className="field" value={newRent} onChange={(e) => setNewRent(Number(e.target.value))} />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">New End Date</span>
            <input type="date" className="field" value={newEndDate} onChange={(e) => setNewEndDate(e.target.value)} />
          </label>

          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              checked={resend}
              onChange={(e) => setResend(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-rule-strong accent-[var(--color-accent)]"
            />
            Re-generate and send agreement for e-signature
          </label>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule px-5 py-4 mt-4">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(newRent, newEndDate);
              onClose();
            }}
            className="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink"
          >
            Send Renewal Offer
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
