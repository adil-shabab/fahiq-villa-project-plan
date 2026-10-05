import type { Invoice } from "../data/invoices";

export interface LedgerRow {
  id: string;
  date: string; // ISO date
  description: string;
  /** Positive = charge (debit), negative = payment (credit). */
  amount: number;
  balance: number;
}

/**
 * Builds the running statement of account from invoices and their payments.
 * The backend will serve this directly from LedgerEntry (GET /me/ledger); this mirrors it.
 */
export function buildLedger(invoices: Invoice[]): LedgerRow[] {
  const events: Omit<LedgerRow, "balance">[] = [];
  for (const inv of invoices) {
    events.push({ id: `${inv.id}-c`, date: inv.issueDate, description: `Invoice · ${inv.periodLabel}`, amount: inv.total });
    if (inv.payment) {
      events.push({
        id: `${inv.id}-p`,
        date: inv.payment.paidAt.slice(0, 10),
        description: `Payment · ${inv.payment.method}`,
        amount: -inv.payment.amount,
      });
    }
  }
  // Oldest first to accumulate, charges before payments on the same day; returned newest first.
  events.sort((a, b) => a.date.localeCompare(b.date) || b.amount - a.amount);
  let balance = 0;
  const rows = events.map((e) => ({ ...e, balance: (balance += e.amount) }));
  return rows.reverse();
}
