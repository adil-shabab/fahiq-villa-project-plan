import { Download, Landmark, Plus } from "lucide-react";
import { useState } from "react";
import { AddExpenseModal } from "../components/finance/AddExpenseModal";
import { ExpensesTab } from "../components/finance/ExpensesTab";
import { OwnerPayoutsTab } from "../components/finance/OwnerPayoutsTab";
import { ProfitLossTab } from "../components/finance/ProfitLossTab";
import { RecordPayoutModal } from "../components/finance/RecordPayoutModal";
import { TaxLedgerTab } from "../components/finance/TaxLedgerTab";
import { pnlStats, quarterPayoutTotal } from "../data/finance";
import { formatINR } from "../lib/format";
import { cn } from "../lib/utils";

type FinanceTab = "expenses" | "payouts" | "pnl" | "tax";
type ModalKind = "none" | "expense" | "payout";

export function Finance() {
  const [tab, setTab] = useState<FinanceTab>("expenses");
  const [modal, setModal] = useState<ModalKind>("none");

  const tabs: { id: FinanceTab; label: string; badge: string; highlight?: boolean }[] = [
    { id: "expenses", label: "Expenses Tracker", badge: formatINR(pnlStats.totalExpenses) },
    { id: "payouts", label: "Owner Payouts", badge: `${formatINR(quarterPayoutTotal)} Q4` },
    { id: "pnl", label: "Profit & Loss Statement", badge: "Live" },
    { id: "tax", label: "Tax & GST Ledger", badge: "TDS 194-I" },
  ];

  return (
    <div className="mx-auto flex max-w-[1700px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex flex-col gap-4 rounded-xl border border-rule bg-surface p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-3 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-ink">Finance &amp; Operations</h1>
              <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent-ink">GAAP Accrual Mode</span>
            </div>
            <p className="mt-1 text-sm text-ink-faint">
              Real-time expense disbursement tracking, owner equity distributions, and GAAP-compliant Profit &amp; Loss analytics across 5 properties.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => setModal("expense")} className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold text-white hover:bg-accent-ink">
              <Plus className="h-4 w-4" strokeWidth={2} />
              Add Expense
            </button>
            <button type="button" onClick={() => setModal("payout")} className="flex items-center gap-1.5 rounded-lg bg-gold px-3.5 py-2 text-sm font-semibold text-white hover:opacity-90">
              <Landmark className="h-4 w-4" strokeWidth={2} />
              Record Payout
            </button>
            <button type="button" className="flex items-center gap-1.5 rounded-lg border border-rule bg-surface px-3 py-2 text-sm font-medium text-ink hover:bg-surface-sunken">
              <Download className="h-4 w-4 text-ink-muted" strokeWidth={2} />
              Export P&amp;L
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pt-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors",
                tab === t.id ? "bg-accent text-white shadow-sm" : "text-ink-muted hover:bg-surface-sunken",
              )}
            >
              <span>{t.label}</span>
              <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-mono", tab === t.id ? "bg-white/20" : "bg-surface-sunken text-ink-faint")}>{t.badge}</span>
            </button>
          ))}
        </div>
      </div>

      {tab === "expenses" && <ExpensesTab />}
      {tab === "payouts" && <OwnerPayoutsTab onRecordDisbursal={() => setModal("payout")} />}
      {tab === "pnl" && <ProfitLossTab />}
      {tab === "tax" && <TaxLedgerTab />}

      {modal === "expense" && <AddExpenseModal onClose={() => setModal("none")} onSave={() => {}} />}
      {modal === "payout" && <RecordPayoutModal onClose={() => setModal("none")} onSave={() => {}} />}
    </div>
  );
}
