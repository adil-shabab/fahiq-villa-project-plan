import { useSyncExternalStore } from "react";
import { announcements, recentActivity, type ActivityItem, type Announcement } from "../data/home";
import { paidInvoices, unpaidInvoices, type Invoice } from "../data/invoices";

/**
 * Tiny in-memory store so Home, Invoices, the sheets and the tab-bar badge share one state.
 * Stands in for TanStack Query + the /me/* API until the backend exists.
 */
interface PortalState {
  /** Unpaid invoices, oldest due first. */
  dues: Invoice[];
  /** Paid invoices, newest payment first. */
  history: Invoice[];
  announcements: Announcement[];
  activity: ActivityItem[];
}

let state: PortalState = {
  dues: [...unpaidInvoices].sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
  history: paidInvoices,
  announcements,
  activity: recentActivity,
};
const listeners = new Set<() => void>();

function set(next: Partial<PortalState>) {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
}

export function usePortalState(): PortalState {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
  );
}

export function findInvoice(s: PortalState, id: string): Invoice | undefined {
  return s.dues.find((i) => i.id === id) ?? s.history.find((i) => i.id === id);
}

let ticketSeq = 212;
let receiptSeq = 392;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Mock of POST /me/pay → Razorpay Checkout → webhook. Resolves as if the payment succeeded. */
export async function payInvoices(ids: string[]): Promise<number> {
  await delay(1200);
  const paidAt = new Date().toISOString();
  const paid = state.dues
    .filter((d) => ids.includes(d.id))
    .map<Invoice>((d) => ({
      ...d,
      balance: 0,
      payment: {
        receiptNo: `RCPT-2026-0${receiptSeq++}`,
        method: "UPI",
        reference: `pay_${Math.random().toString(36).slice(2, 11)}`,
        amount: d.balance,
        paidAt,
      },
    }));
  const total = paid.reduce((s, d) => s + d.payment!.amount, 0);
  set({
    dues: state.dues.filter((d) => !ids.includes(d.id)),
    history: [...paid, ...state.history],
    activity: [{ id: `pay-${Date.now()}`, kind: "payment", text: "Payment received", amount: total, at: paidAt }, ...state.activity],
  });
  return total;
}

/** Mock of POST /me/tickets. Returns the new ticket number. */
export async function raiseTicket(category: string, _description: string, _photos: File[]): Promise<string> {
  await delay(900);
  const number = `T-${ticketSeq++}`;
  set({
    activity: [{ id: `tk-${number}`, kind: "ticket", text: `Ticket #${number} raised · ${category}`, at: new Date().toISOString() }, ...state.activity],
  });
  return number;
}

/** Mock of POST /me/announcements/{id}/ack */
export async function acknowledgeAnnouncement(id: string): Promise<void> {
  await delay(400);
  set({ announcements: state.announcements.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)) });
}
