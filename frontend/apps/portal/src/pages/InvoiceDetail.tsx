import { ArrowLeft, ReceiptText, Share2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PrimaryButton } from "../components/auth/PrimaryButton";
import { ReceiptSheet } from "../components/invoices/ReceiptSheet";
import { PaySheet } from "../components/payments/PaySheet";
import { StatusPill } from "../components/payments/StatusPill";
import { displayStatus } from "../lib/invoiceStatus";
import { Toast } from "../components/ui/Toast";
import { tenantProfile } from "../data/home";
import { shareText } from "../lib/download";
import { formatINR } from "../lib/format";
import { receiptText } from "../lib/receipt";
import { findInvoice, usePortalState } from "../lib/store";
import { useToday } from "../lib/today";

const fullDate = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" });
const fmt = (iso: string) => fullDate.format(new Date(`${iso}T00:00:00`));

export function InvoiceDetail() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const state = usePortalState();
  const today = useToday();
  const invoice = findInvoice(state, id);
  const [sheet, setSheet] = useState<"pay" | "receipt" | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const tenantLabel = `${tenantProfile.fullName} · ${tenantProfile.propertyName} ${tenantProfile.unitCode}`;

  const back = (
    <button
      type="button"
      onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/invoices"))}
      aria-label="Back"
      className="-ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-muted transition hover:bg-surface-sunken hover:text-ink focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none"
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  );

  if (!invoice) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-1">{back}</div>
        <div className="rounded-2xl border border-rule bg-surface px-6 py-10 text-center">
          <p className="text-lg font-bold text-ink">Invoice not found</p>
          <Link to="/invoices" className="mt-2 inline-block text-sm font-semibold text-accent hover:underline">
            Back to invoices
          </Link>
        </div>
      </div>
    );
  }

  const status = displayStatus(invoice, today);
  const paid = status === "paid";

  return (
    <div className="flex flex-col gap-4 pb-20">
      <header className="flex items-center gap-1">
        {back}
        <h1 className="truncate text-lg font-bold tracking-tight text-ink">Invoice · {invoice.periodLabel}</h1>
      </header>

      <article className="overflow-hidden rounded-2xl border border-rule bg-surface shadow-[0_1px_2px_rgba(23,33,29,0.05),0_14px_34px_-18px_rgba(23,33,29,0.18)]">
        <div className="flex items-center justify-between gap-3 bg-accent px-5 py-4 text-on-accent">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6" strokeWidth={2.25} />
            <span className="text-lg font-extrabold tracking-tight">Fahiq</span>
          </div>
          <span className="font-mono text-xs opacity-90">{invoice.number}</span>
        </div>

        <div className="px-5 pt-4 pb-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-base font-semibold text-ink">{tenantProfile.fullName}</p>
              <p className="text-sm text-ink-muted">
                {tenantProfile.propertyName} · <span className="whitespace-nowrap">{tenantProfile.unitCode}</span>
              </p>
            </div>
            <StatusPill status={status} />
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-surface-sunken p-3 text-sm">
            <div>
              <dt className="text-xs text-ink-faint">Issued</dt>
              <dd className="font-semibold text-ink">{fmt(invoice.issueDate)}</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-faint">{paid ? "Paid on" : "Due"}</dt>
              <dd className="font-semibold text-ink">{paid ? fullDate.format(new Date(invoice.payment!.paidAt)) : fmt(invoice.dueDate)}</dd>
            </div>
          </dl>

          <dl className="mt-4 flex flex-col gap-2.5 text-[0.9375rem]">
            {invoice.lines.map((l) => (
              <div key={l.label} className="flex justify-between gap-3">
                <dt className="text-ink-muted">{l.label}</dt>
                <dd className="font-medium text-ink tabular-nums">{formatINR(l.amount)}</dd>
              </div>
            ))}
            <div className="mt-1 flex justify-between gap-3 border-t border-rule pt-3 text-lg">
              <dt className="font-bold text-ink">Total</dt>
              <dd className="font-extrabold text-ink tabular-nums">{formatINR(invoice.total)}</dd>
            </div>
            {!paid && invoice.balance !== invoice.total && (
              <div className="flex justify-between gap-3 text-sm">
                <dt className="text-ink-muted">Balance due</dt>
                <dd className="font-bold text-danger tabular-nums">{formatINR(invoice.balance)}</dd>
              </div>
            )}
          </dl>
        </div>
      </article>

      <div className="fixed inset-x-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-30 mx-auto flex max-w-[448px] gap-2">
        {paid ? (
          <>
            <PrimaryButton type="button" className="flex-1" onClick={() => setSheet("receipt")}>
              <ReceiptText className="h-5 w-5" />
              Download Receipt
            </PrimaryButton>
            <button
              type="button"
              onClick={() => shareText(`Receipt ${invoice.payment!.receiptNo}`, receiptText(invoice, tenantLabel))}
              aria-label="Share receipt"
              className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border-2 border-accent bg-surface text-accent transition hover:bg-accent-soft focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </>
        ) : (
          <PrimaryButton type="button" onClick={() => setSheet("pay")}>
            Pay Now · {formatINR(invoice.balance)}
          </PrimaryButton>
        )}
      </div>

      {sheet === "pay" && (
        <PaySheet
          open
          dues={state.dues}
          initialSelected={[invoice.id]}
          onClose={() => setSheet(null)}
          onPaid={(amount) => {
            setSheet(null);
            setToast(`Payment of ${formatINR(amount)} received. Receipt sent on WhatsApp.`);
          }}
        />
      )}
      <ReceiptSheet invoice={sheet === "receipt" ? invoice : null} tenantLabel={tenantLabel} onClose={() => setSheet(null)} />
      <Toast message={toast} onDone={() => setToast(null)} />
    </div>
  );
}
