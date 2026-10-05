import type { Invoice } from "../data/invoices";

export type InvoiceDisplayStatus = "paid" | "overdue" | "due_soon" | "due";

/** Overdue / due soon are derived from the due date, never stored (backend ADR-007). */
export function displayStatus(inv: Invoice, today: string): InvoiceDisplayStatus {
  if (inv.balance === 0) return "paid";
  if (inv.dueDate < today) return "overdue";
  const days = (new Date(inv.dueDate).getTime() - new Date(today).getTime()) / 86_400_000;
  return days <= 7 ? "due_soon" : "due";
}
