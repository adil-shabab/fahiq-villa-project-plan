import type { Invoice } from "../data/invoices";
import { formatINR } from "./format";

export const paidAtFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });

/** Plain-text receipt used for share / download until the backend serves the PDF. */
export function receiptText(inv: Invoice, tenantLabel: string): string {
  const p = inv.payment!;
  return [
    `Fahiq — Payment Receipt ${p.receiptNo}`,
    `${tenantLabel}`,
    `For: ${inv.periodLabel} (${inv.number})`,
    `Amount: ${formatINR(p.amount)}`,
    `Paid on: ${paidAtFmt.format(new Date(p.paidAt))}`,
    `Method: ${p.method}`,
    `Reference: ${p.reference}`,
  ].join("\n");
}
