import { FileText } from "lucide-react";
import { taxStats } from "../../data/finance";
import { formatINR } from "../../lib/format";

export function TaxLedgerTab() {
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-rule bg-surface p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-2.5 md:flex-row md:items-center">
        <div>
          <h2 className="text-lg font-bold text-ink">Statutory Tax &amp; TDS Section 194-I Compliance</h2>
          <p className="text-sm text-ink-faint">Monthly TDS withholding certificate schedule, GST input tax credits (ITC), and Form 16A status.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-surface-sunken px-3 py-1 text-xs font-semibold text-accent">PAN Verified</span>
          <button type="button" className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold text-white hover:bg-accent-ink">
            <FileText className="h-4 w-4" strokeWidth={2} />
            Download Form 26AS Map
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col justify-between rounded-xl bg-surface-sunken p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Total TDS Deducted (Oct)</span>
          <div className="mt-2 font-mono text-xl font-bold text-accent">{formatINR(taxStats.tdsDeducted)}</div>
          <span className="mt-1 text-xs text-ink-muted">10% standard rate on Owner Payouts</span>
        </div>
        <div className="flex flex-col justify-between rounded-xl bg-surface-sunken p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">GST Input Tax Credit (ITC)</span>
          <div className="mt-2 font-mono text-xl font-bold text-ink">{formatINR(taxStats.itc)}</div>
          <span className="mt-1 text-xs text-ink-muted">From commercial vendors &amp; electricity</span>
        </div>
        <div className="flex flex-col justify-between rounded-xl bg-surface-sunken p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Challan 281 Deposit Due</span>
          <div className="mt-2 font-mono text-xl font-bold text-gold">{taxStats.challanDueDate}</div>
          <span className="mt-1 text-xs font-semibold text-accent">Scheduled via HDFC Corporate Tax</span>
        </div>
      </div>
    </section>
  );
}
