import { CheckCircle2, Download, MessageCircle } from "lucide-react";
import type { Invoice } from "../../data/invoices";
import { downloadText } from "../../lib/download";
import { paidAtFmt, receiptText } from "../../lib/receipt";
import { formatINR } from "../../lib/format";
import { PrimaryButton } from "../auth/PrimaryButton";
import { BottomSheet } from "../ui/BottomSheet";

interface Props {
  invoice: Invoice | null;
  tenantLabel: string;
  onClose: () => void;
}


export function ReceiptSheet({ invoice, tenantLabel, onClose }: Props) {
  if (!invoice?.payment) return null;
  const p = invoice.payment;
  const text = receiptText(invoice, tenantLabel);

  return (
    <BottomSheet
      open
      onClose={onClose}
      title="Receipt"
      footer={
        <div className="flex flex-col gap-2.5">
          {/* Mock: saves a text receipt until the backend serves GET /me/payments/{id}/receipt (PDF). */}
          <PrimaryButton type="button" onClick={() => downloadText(`${p.receiptNo}.txt`, text)}>
            <Download className="h-5 w-5" />
            Download PDF
          </PrimaryButton>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(text)}`}
            target="_blank"
            rel="noreferrer"
            className="flex h-13 w-full items-center justify-center gap-2 rounded-xl border-2 border-accent text-base font-semibold text-accent transition hover:bg-accent-soft focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none"
          >
            <MessageCircle className="h-5 w-5" />
            Share via WhatsApp
          </a>
        </div>
      }
    >
      <div className="rounded-2xl border border-rule bg-surface-sunken p-5">
        <div className="flex flex-col items-center text-center">
          <CheckCircle2 className="h-12 w-12 text-ok" />
          <p className="mt-2 text-sm font-semibold text-ink-muted">Payment successful</p>
          <p className="text-3xl font-extrabold tracking-tight text-ink tabular-nums">{formatINR(p.amount)}</p>
        </div>
        <dl className="mt-5 flex flex-col gap-2 border-t border-dashed border-rule-strong pt-4 text-sm">
          {[
            ["Receipt no.", p.receiptNo],
            ["For", invoice.periodLabel],
            ["Paid on", paidAtFmt.format(new Date(p.paidAt))],
            ["Method", p.method],
            ["Reference", p.reference],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3">
              <dt className="text-ink-muted">{k}</dt>
              <dd className="text-right font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </BottomSheet>
  );
}
