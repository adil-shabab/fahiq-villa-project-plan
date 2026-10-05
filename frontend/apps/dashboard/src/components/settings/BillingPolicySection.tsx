import { Calculator, CalendarDays, Gavel, Receipt } from "lucide-react";
import { useState } from "react";
import { billingPolicyDefaults } from "../../data/settings";
import { cn } from "../../lib/utils";

const lateFeeFormulas = ["None", "Flat", "% Rate", "Per Day"];

export function BillingPolicySection() {
  const [formula, setFormula] = useState(billingPolicyDefaults.lateFeeFormula);
  const [delivery, setDelivery] = useState(billingPolicyDefaults.billDeliveryMode);
  const [proration, setProration] = useState(billingPolicyDefaults.prorationBasis);

  return (
    <section id="billing-policy" className="overflow-hidden rounded-xl border border-rule bg-surface shadow-sm">
      <div className="flex flex-col justify-between gap-2.5 bg-surface-sunken/50 p-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-ink">Billing Policy &amp; Rent Collection Rules</h2>
            <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[11px] font-semibold text-gold">Automated Engine</span>
          </div>
          <p className="mt-0.5 text-sm text-ink-faint">Governs automated monthly ledger generation, grace duration, penalty calculations, and proration standards.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-accent" />
          <span className="text-xs font-semibold text-accent">Engine Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-xl bg-surface-sunken p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-accent">
            <CalendarDays className="h-[18px] w-[18px]" strokeWidth={2} />
            Due &amp; Grace Window
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Default Rent Due Date</span>
            <select className="field" defaultValue={billingPolicyDefaults.dueDate}>
              {billingPolicyDefaults.dueDateOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <p className="text-[11px] text-ink-faint">Invoices automatically generate 5 days prior on the 26th.</p>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Grace Window Duration</span>
            <div className="flex items-center gap-2">
              <input type="number" className="field w-24 text-center" defaultValue={billingPolicyDefaults.graceDays} />
              <span className="text-sm text-ink">Days after due date</span>
            </div>
            <p className="text-[11px] text-ink-faint">Late fees begin accruing strictly on day 6 at 00:01 AM IST.</p>
          </label>
        </div>

        <div className="flex flex-col gap-4 rounded-xl bg-surface-sunken p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-accent">
            <Gavel className="h-[18px] w-[18px]" strokeWidth={2} />
            Late Fee Assessment
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Calculation Formula</span>
            <div className="grid grid-cols-4 gap-1 rounded-lg bg-surface p-1 text-center text-xs">
              {lateFeeFormulas.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormula(f)}
                  className={cn("rounded py-1", formula === f ? "bg-accent font-bold text-white shadow-sm" : "text-ink-muted hover:text-ink")}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Daily Accrual</span>
              <div className="relative flex items-center">
                <span className="absolute left-2.5 font-mono text-ink-faint">₹</span>
                <input className="field pl-6 font-mono" defaultValue={billingPolicyDefaults.dailyAccrual} />
              </div>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Max Invoice Cap</span>
              <div className="relative flex items-center">
                <span className="absolute left-2.5 font-mono text-ink-faint">₹</span>
                <input className="field pl-6 font-mono" defaultValue={billingPolicyDefaults.maxCap.toLocaleString("en-IN")} />
              </div>
            </label>
          </div>
          <p className="text-[11px] text-ink-faint">Auto-stops once late fine reaches ₹1,500 per month.</p>
        </div>

        <div className="flex flex-col gap-4 rounded-xl bg-surface-sunken p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-accent">
            <Receipt className="h-[18px] w-[18px]" strokeWidth={2} />
            Numbering &amp; Fiscal Standard
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Prefix Format</span>
              <input className="field font-mono" defaultValue={billingPolicyDefaults.invoicePrefix} />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Next Sequence</span>
              <div className="field flex items-center bg-surface font-mono font-bold text-accent">{billingPolicyDefaults.nextSequence}</div>
            </label>
          </div>
          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Fiscal Year Basis</span>
            <div className="flex items-center justify-between rounded-lg bg-surface px-3 py-2 text-sm font-medium text-ink shadow-sm">
              {billingPolicyDefaults.fiscalYear}
            </div>
          </label>
        </div>

        <div className="flex flex-col gap-4 rounded-xl bg-surface-sunken p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-accent">
            <Calculator className="h-[18px] w-[18px]" strokeWidth={2} />
            Billing Behavior &amp; Proration
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Bill Delivery Mode</span>
            <div className="grid grid-cols-2 gap-1 rounded-lg bg-surface p-1 text-center text-xs">
              {(["Consolidated", "Itemized Split"] as const).map((o) => (
                <button key={o} type="button" onClick={() => setDelivery(o)} className={cn("rounded py-1", delivery === o ? "bg-accent font-bold text-white shadow-sm" : "text-ink-muted")}>
                  {o}
                </button>
              ))}
            </div>
            <span className="text-[11px] text-ink-faint">Combines room rent, food plan, &amp; utility sub-meters on single voucher.</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Move-in / Move-out Proration Basis</span>
            <div className="grid grid-cols-2 gap-1 rounded-lg bg-surface p-1 text-center text-xs">
              {(["Actual Days (28-31)", "Fixed 30-Day Base"] as const).map((o) => (
                <button key={o} type="button" onClick={() => setProration(o)} className={cn("rounded py-1", proration === o ? "bg-accent font-bold text-white shadow-sm" : "text-ink-muted")}>
                  {o}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
