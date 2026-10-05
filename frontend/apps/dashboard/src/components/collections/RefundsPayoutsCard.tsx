import { Banknote } from "lucide-react";
import { depositRefunds, ownerPayout } from "../../data/collections";
import { formatINR } from "../../lib/format";

export function RefundsPayoutsCard({ onInitiateRefund }: { onInitiateRefund: () => void }) {
  return (
    <div id="refunds-section" className="rounded-xl border border-rule bg-surface p-4 shadow-sm">
      <div className="mb-3 flex flex-col gap-2.5 pb-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-surface-sunken p-1.5 text-accent">
            <Banknote className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-ink">Refunds &amp; Owner Payouts</h3>
            <p className="text-xs text-ink-faint">Move-out security deposit settlements &amp; landlord disbursals</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onInitiateRefund} className="rounded-lg bg-surface-sunken px-3 py-1.5 text-xs font-semibold text-accent hover:bg-rule">
            + Initiate Move-out Refund
          </button>
          <button type="button" className="rounded-lg bg-gold px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90">
            + Record Owner Payout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {depositRefunds.map((r) => (
          <div key={r.id} className="flex flex-col justify-between rounded-lg bg-surface-sunken p-3">
            <div className="flex items-start justify-between">
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Deposit Settlement</span>
                <span className="font-semibold text-ink">
                  {r.tenantName} · Unit {r.unitCode}
                </span>
                <span className="text-xs text-ink-muted">Razorpay Payout to UPI ({r.upiId})</span>
              </div>
              <span className="rounded-full bg-gold-soft px-2 py-0.5 text-xs font-semibold text-gold">{r.status}</span>
            </div>
            <div className="mt-3 flex items-end justify-between pt-2">
              <span className="text-[11px] text-ink-faint">Ref #{r.refNo}</span>
              <span className="font-mono font-bold text-ink">{formatINR(r.amount)}</span>
            </div>
          </div>
        ))}

        <div className="flex flex-col justify-between rounded-lg bg-surface-sunken p-3">
          <div className="flex items-start justify-between">
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Owner Disbursal</span>
              <span className="font-semibold text-ink">{ownerPayout.entity}</span>
              <span className="text-xs text-ink-muted">{ownerPayout.periodLabel} · {ownerPayout.channel}</span>
            </div>
            <span className="rounded-full bg-ok/15 px-2 py-0.5 text-xs font-semibold text-ok">{ownerPayout.status}</span>
          </div>
          <div className="mt-3 flex items-end justify-between pt-2">
            <span className="text-[11px] text-ink-faint">UTR #{ownerPayout.utr}</span>
            <span className="font-mono font-bold text-accent">{formatINR(ownerPayout.amount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
