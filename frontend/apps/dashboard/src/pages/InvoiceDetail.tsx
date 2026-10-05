import { ArrowLeft, Copy, Download, Link2, MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AddCreditNoteModal } from "../components/billing/AddCreditNoteModal";
import { SendInvoiceModal } from "../components/billing/SendInvoiceModal";
import { VoidInvoiceModal } from "../components/billing/VoidInvoiceModal";
import { getInvoiceById, type BillingInvoice, type CreditNote } from "../data/billing";
import { formatINR } from "../lib/format";
import { Badge } from "../components/ui/Badge";
import { DropdownMenu } from "../components/ui/DropdownMenu";

const statusTone = { Draft: "neutral", Issued: "info", "Partially Paid": "warn", Paid: "ok", Overdue: "danger", Void: "neutral" } as const;

type ModalKind = "none" | "send" | "credit" | "void";

export function InvoiceDetail() {
  const { id } = useParams<{ id: string }>();
  const initial = id ? getInvoiceById(id) : undefined;
  const [invoice, setInvoice] = useState<BillingInvoice | undefined>(initial);
  const [modal, setModal] = useState<ModalKind>("none");
  const [linkGenerated, setLinkGenerated] = useState(false);

  if (!invoice) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <p className="text-sm text-ink-faint">Invoice not found.</p>
        <Link to="/billing" className="text-sm font-medium text-accent hover:text-accent-ink">
          &larr; Back to Invoices
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <Link to="/billing" className="flex w-fit items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        Invoices
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-mono text-xl font-bold tracking-tight text-ink">{invoice.number}</h1>
            <Badge tone={statusTone[invoice.status]}>{invoice.status}</Badge>
          </div>
          <p className="mt-0.5 text-sm text-ink-faint">
            {invoice.tenantName} &middot; {invoice.unitCode} &middot; {invoice.propertyName}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setModal("send")}
            className="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink"
          >
            Send
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-rule bg-surface px-3.5 py-2 text-sm font-medium text-ink hover:border-rule-strong"
          >
            <Download className="h-3.5 w-3.5" strokeWidth={2} />
            Download PDF
          </button>
          <button
            type="button"
            onClick={() => setModal("credit")}
            className="flex items-center gap-1.5 rounded-lg border border-rule bg-surface px-3.5 py-2 text-sm font-medium text-ink hover:border-rule-strong"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            Add Credit Note
          </button>
          <DropdownMenu
            trigger={
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-rule">
                <MoreHorizontal className="h-4 w-4" strokeWidth={2} />
              </span>
            }
            actions={[
              { label: "Duplicate", onSelect: () => {} },
              { label: "Void", onSelect: () => setModal("void"), tone: "danger" },
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Invoice document preview */}
        <div className="rounded-2xl border border-rule bg-surface p-6 lg:col-span-3">
          <div className="flex items-start justify-between border-b border-rule pb-4">
            <div>
              <p className="text-lg font-bold text-ink">Fahiq</p>
              <p className="text-xs text-ink-faint">{invoice.propertyName}</p>
            </div>
            <div className="text-right text-xs text-ink-faint">
              <p>
                Issue Date: <span className="font-medium text-ink">{new Date(invoice.issueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
              </p>
              <p>
                Due Date: <span className="font-medium text-ink">{new Date(invoice.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
              </p>
            </div>
          </div>

          <div className="mt-4 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Bill To</p>
            <p className="mt-0.5 font-medium text-ink">{invoice.tenantName}</p>
            <p className="text-ink-muted">
              {invoice.unitCode}, {invoice.propertyName}
            </p>
          </div>

          <table className="mt-5 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-rule text-xs uppercase tracking-wide text-ink-faint">
                <th className="py-2 font-semibold">Description</th>
                <th className="py-2 text-right font-semibold">Qty</th>
                <th className="py-2 text-right font-semibold">Rate</th>
                <th className="py-2 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.lineItems.map((li, i) => (
                <tr key={i} className="border-b border-rule">
                  <td className="py-2 text-ink">{li.description}</td>
                  <td className="py-2 text-right tabular-nums text-ink-muted">{li.quantity}</td>
                  <td className="py-2 text-right tabular-nums text-ink-muted">{formatINR(li.unitPrice)}</td>
                  <td className="py-2 text-right tabular-nums text-ink">{formatINR(li.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-3 flex flex-col items-end gap-1 text-sm">
            <Row label="Subtotal" value={formatINR(invoice.subtotal)} />
            {invoice.tax > 0 && <Row label="Tax" value={formatINR(invoice.tax)} />}
            {invoice.carryForward > 0 && <Row label="Carry Forward" value={formatINR(invoice.carryForward)} />}
            <div className="mt-1 flex w-48 items-center justify-between border-t border-rule pt-2 text-base font-bold text-ink">
              <span>Total</span>
              <span className="tabular-nums">{formatINR(invoice.total)}</span>
            </div>
          </div>
        </div>

        {/* Payment status + history */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="rounded-xl border border-rule bg-surface p-4">
            <h3 className="mb-3 text-sm font-semibold text-ink">Payment Status</h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-faint">Amount Paid</span>
                <span className="font-medium tabular-nums text-ok">{formatINR(invoice.amountPaid)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-faint">Balance Due</span>
                <span className={`font-medium tabular-nums ${invoice.balance > 0 ? "text-danger" : "text-ok"}`}>{formatINR(invoice.balance)}</span>
              </div>
            </div>
            {invoice.balance > 0 && (
              <button
                type="button"
                onClick={() => setLinkGenerated(true)}
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-accent py-2 text-sm font-medium text-white hover:bg-accent-ink"
              >
                <Link2 className="h-3.5 w-3.5" strokeWidth={2} />
                Generate Payment Link
              </button>
            )}
            {linkGenerated && (
              <div className="mt-2 flex items-center gap-2 rounded-lg bg-surface-sunken px-2.5 py-2 text-xs text-ink-muted">
                <span className="flex-1 truncate font-mono">rzp.io/i/{invoice.number.toLowerCase()}</span>
                <Copy className="h-3.5 w-3.5 shrink-0 cursor-pointer hover:text-ink" strokeWidth={2} />
              </div>
            )}
          </div>

          <div className="rounded-xl border border-rule bg-surface p-4">
            <h3 className="mb-3 text-sm font-semibold text-ink">Payment History</h3>
            {invoice.paymentHistory.length === 0 ? (
              <p className="text-sm text-ink-faint">No payments received yet.</p>
            ) : (
              <ul className="flex flex-col gap-2.5">
                {invoice.paymentHistory.map((p, i) => (
                  <li key={i} className="flex items-center justify-between text-sm">
                    <span className="text-ink-muted">{new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} &middot; {p.method}</span>
                    <span className="font-medium tabular-nums text-ok">{formatINR(p.amount)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {modal === "send" && (
        <SendInvoiceModal invoice={invoice} onClose={() => setModal("none")} onSend={() => setInvoice((prev) => (prev ? { ...prev, sentChannels: ["WhatsApp"] } : prev))} />
      )}
      {modal === "credit" && (
        <AddCreditNoteModal
          invoice={invoice}
          onClose={() => setModal("none")}
          onAdd={(note: Omit<CreditNote, "id" | "number" | "date" | "issuedBy">) =>
            setInvoice((prev) => (prev ? { ...prev, total: prev.total - note.amount, balance: Math.max(prev.balance - note.amount, 0) } : prev))
          }
        />
      )}
      {modal === "void" && (
        <VoidInvoiceModal invoice={invoice} onClose={() => setModal("none")} onConfirm={() => setInvoice((prev) => (prev ? { ...prev, status: "Void" } : prev))} />
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-48 items-center justify-between text-ink-muted">
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
