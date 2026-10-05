import { useSyncExternalStore } from "react";
import { announcements, dueInvoices, recentActivity, type ActivityItem, type Announcement, type DueInvoice } from "../data/home";

/**
 * Tiny in-memory store so Home, the sheets and the tab-bar badge share one state.
 * Stands in for TanStack Query + the /me/* API until the backend exists.
 */
interface PortalState {
  dues: DueInvoice[];
  announcements: Announcement[];
  activity: ActivityItem[];
}

let state: PortalState = { dues: dueInvoices, announcements, activity: recentActivity };
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

let ticketSeq = 212;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Mock of POST /me/pay → Razorpay Checkout → webhook. Resolves as if the payment succeeded. */
export async function payInvoices(ids: string[]): Promise<number> {
  await delay(1200);
  const paid = state.dues.filter((d) => ids.includes(d.id));
  const total = paid.reduce((s, d) => s + d.balance, 0);
  set({
    dues: state.dues.filter((d) => !ids.includes(d.id)),
    activity: [{ id: `pay-${Date.now()}`, kind: "payment", text: "Payment received", amount: total, at: new Date().toISOString() }, ...state.activity],
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
