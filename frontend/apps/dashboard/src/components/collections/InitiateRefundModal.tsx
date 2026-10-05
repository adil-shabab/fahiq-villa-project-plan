import { useState } from "react";
import { createPortal } from "react-dom";
import { depositRefunds } from "../../data/collections";
import { formatINR } from "../../lib/format";

const channels = ["Instant UPI Payout (RazorpayX)", "IMPS Bank Transfer (Instant)", "Manual Cheque Handover"];

export function InitiateRefundModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) {
  const refund = depositRefunds[0];
  const [channel, setChannel] = useState(channels[0]);
  const [upiId, setUpiId] = useState(refund?.upiId ?? "");
  const [verified, setVerified] = useState(true);

  const deposit = 29100;
  const deductions = 1600 + 900;
  const net = deposit - deductions;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="flex max-h-[90vh] w-full max-w-md flex-col gap-4 overflow-y-auto rounded-2xl border border-rule bg-surface p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-rule pb-2">
          <h3 className="text-base font-bold text-ink">Initiate Deposit Refund</h3>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-ink-muted hover:bg-surface-sunken">✕</button>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Vacating Tenant</span>
          <input className="field cursor-not-allowed bg-surface-sunken" readOnly value={`${refund?.tenantName ?? "Karan Mehta"} (Unit ${refund?.unitCode ?? "A-308"} — Moved out)`} />
        </label>

        <div className="flex flex-col gap-1 rounded-lg bg-surface-sunken p-2.5 text-xs">
          <div className="flex justify-between text-ink-muted">
            <span>Original Security Deposit:</span>
            <span className="font-mono text-ink">{formatINR(deposit)}</span>
          </div>
          <div className="flex justify-between text-danger">
            <span>Painting &amp; Deep Clean Deductions:</span>
            <span className="font-mono">-{formatINR(1600)}</span>
          </div>
          <div className="flex justify-between text-danger">
            <span>Prorated Utility Balances:</span>
            <span className="font-mono">-{formatINR(900)}</span>
          </div>
          <div className="mt-1 flex justify-between border-t border-rule pt-1 font-semibold text-ink">
            <span>Net Payable Refund:</span>
            <span className="font-mono font-bold text-ok">{formatINR(net)}</span>
          </div>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Payout Channel</span>
          <select className="field" value={channel} onChange={(e) => setChannel(e.target.value)}>
            {channels.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Beneficiary UPI ID</span>
          <input className="field" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
        </label>

        <label className="flex items-start gap-2 text-xs text-ink-muted">
          <input type="checkbox" checked={verified} onChange={(e) => setVerified(e.target.checked)} className="mt-0.5 h-3.5 w-3.5 accent-[var(--color-accent)]" />
          <span>Inspection report verified by maintenance lead. Key handover complete.</span>
        </label>

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
            disabled={!verified}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            Disburse {formatINR(net)} via UPI Instantly
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
