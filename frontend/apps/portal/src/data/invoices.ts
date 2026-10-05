/**
 * Mock invoices & payments for the tenant portal. Replaced by GET /me/invoices, /me/payments
 * and /me/ledger once the backend exists (docs/06 §6.3, tenant portal).
 */

export interface InvoiceLine {
  label: string;
  amount: number;
}

export interface PaymentRecord {
  receiptNo: string;
  method: string; // "UPI", "Card", "Bank transfer"…
  reference: string; // gateway / UTR reference
  amount: number;
  paidAt: string; // ISO timestamp
}

export interface Invoice {
  id: string;
  number: string;
  period: string; // YYYY-MM
  periodLabel: string; // "October 2026"
  issueDate: string; // ISO date
  dueDate: string; // ISO date
  lines: InvoiceLine[];
  total: number;
  /** Outstanding amount; 0 once paid. */
  balance: number;
  payment?: PaymentRecord;
}

function inv(
  id: string,
  period: string,
  periodLabel: string,
  lines: InvoiceLine[],
  payment?: Omit<PaymentRecord, "amount">,
): Invoice {
  const total = lines.reduce((s, l) => s + l.amount, 0);
  const [y, m] = period.split("-");
  return {
    id,
    number: `INV-${y}-${id.slice(4)}`,
    period,
    periodLabel,
    issueDate: `${y}-${m}-01`,
    dueDate: `${y}-${m}-05`,
    lines,
    total,
    balance: payment ? 0 : total,
    payment: payment && { ...payment, amount: total },
  };
}

const rent = { label: "Rent", amount: 15000 };
const wifi = { label: "Wi-Fi", amount: 500 };
const elec = (units: number) => ({ label: `Electricity · ${units} units`, amount: Math.round(units * 8.5) });

export const unpaidInvoices: Invoice[] = [
  inv("inv-0582", "2026-10", "October 2026", [rent, elec(112), wifi]),
  inv("inv-0547", "2026-09", "September 2026 · Water", [{ label: "Water (Aug–Sep)", amount: 300 }]),
];

export const paidInvoices: Invoice[] = [
  inv("inv-0517", "2026-09", "September 2026", [rent, elec(172), wifi], {
    receiptNo: "RCPT-2026-0391", method: "UPI", reference: "pay_Nx8a21KqT", paidAt: "2026-09-04T09:12:00+05:30",
  }),
  inv("inv-0466", "2026-08", "August 2026", [rent, elec(158), wifi], {
    receiptNo: "RCPT-2026-0338", method: "UPI", reference: "pay_NdQ71pLm2", paidAt: "2026-08-05T18:40:00+05:30",
  }),
  inv("inv-0412", "2026-07", "July 2026", [rent, elec(141), wifi], {
    receiptNo: "RCPT-2026-0281", method: "Card", reference: "pay_NJt0c9Xa1", paidAt: "2026-07-03T11:05:00+05:30",
  }),
  inv("inv-0360", "2026-06", "June 2026", [rent, elec(120), wifi], {
    receiptNo: "RCPT-2026-0229", method: "UPI", reference: "pay_MzK4e2Hq8", paidAt: "2026-06-05T08:22:00+05:30",
  }),
  inv("inv-0012", "2025-12", "December 2025", [{ label: "Rent", amount: 14500 }, elec(98), wifi], {
    receiptNo: "RCPT-2025-0870", method: "Bank transfer", reference: "UTR 4410 2271 9932", paidAt: "2025-12-06T16:10:00+05:30",
  }),
];
