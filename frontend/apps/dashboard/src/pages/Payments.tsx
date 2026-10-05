import { Download, Plus, QrCode } from "lucide-react";
import { ChannelMixCard } from "../components/payments/ChannelMixCard";
import { PaymentLinkCard } from "../components/payments/PaymentLinkCard";
import { PaymentsStatCards } from "../components/payments/PaymentsStatCards";
import { SettlementTimelineCard } from "../components/payments/SettlementTimelineCard";
import { TransactionsTable } from "../components/payments/TransactionsTable";
import { UnreconciledAlertCard } from "../components/payments/UnreconciledAlertCard";

export function Payments() {
  return (
    <div className="mx-auto flex max-w-[1700px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-ink">Payments &amp; Transactions</h1>
            <span className="flex items-center gap-1.5 rounded-full bg-surface-sunken px-2.5 py-1 text-[11px] font-semibold text-accent">
              <span className="h-2 w-2 animate-pulse rounded-full bg-ok" />
              Gateway Connected: Razorpay / Cashfree Live
            </span>
          </div>
          <p className="text-sm text-ink-faint">
            Real-time payment gateway collection, UPI &amp; bank auto-reconciliation, refund settlements, and transaction ledgers.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="flex items-center gap-1.5 rounded-lg border border-rule bg-surface px-3.5 py-2 text-sm font-semibold text-ink hover:bg-surface-sunken">
            <Download className="h-4 w-4 text-ink-muted" strokeWidth={2} />
            Export Reconciliation
          </button>
          <button type="button" className="flex items-center gap-1.5 rounded-lg border border-rule bg-surface px-3.5 py-2 text-sm font-semibold text-ink hover:bg-surface-sunken">
            <Plus className="h-4 w-4 text-ink-muted" strokeWidth={2} />
            Manual Entry
          </button>
          <button type="button" className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-ink">
            <QrCode className="h-4 w-4" strokeWidth={2} />
            Collect Payment
          </button>
        </div>
      </div>

      <PaymentsStatCards />

      <UnreconciledAlertCard />

      <TransactionsTable />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SettlementTimelineCard />
        <ChannelMixCard />
        <PaymentLinkCard />
      </div>
    </div>
  );
}
