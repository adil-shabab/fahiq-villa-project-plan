import { useSyncExternalStore } from "react";
import { seedAgreement, seedKyc, sharedDocuments, type Agreement, type KycDocument, type KycType, type PortalDocument } from "../data/documents";
import { announcements, recentActivity, type ActivityItem, type Announcement } from "../data/home";
import { paidInvoices, unpaidInvoices, type Invoice } from "../data/invoices";
import { seedTickets, type Ticket, type TicketPriority } from "../data/tickets";
import { fileToDataUrl } from "./files";
import { categoryMeta, type TicketCategory } from "./ticketCategories";

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
  /** Newest first. */
  tickets: Ticket[];
  agreement: Agreement;
  kyc: KycDocument[];
  sharedDocs: PortalDocument[];
}

let state: PortalState = {
  dues: [...unpaidInvoices].sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
  history: paidInvoices,
  announcements,
  activity: recentActivity,
  tickets: seedTickets,
  agreement: seedAgreement,
  kyc: seedKyc,
  sharedDocs: sharedDocuments,
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

export interface NewTicket {
  category: TicketCategory;
  title: string;
  description: string;
  priority: TicketPriority;
  photos: File[];
}

/** Mock of POST /me/tickets. Returns the created ticket. */
export async function raiseTicket(input: NewTicket): Promise<Ticket> {
  const photos = await Promise.all(input.photos.map(fileToDataUrl));
  await delay(900);
  const number = `T-${ticketSeq++}`;
  const now = new Date().toISOString();
  const slaHours = input.priority === "urgent" ? 4 : 48;
  const ticket: Ticket = {
    id: number.toLowerCase(),
    number,
    title: input.title,
    category: input.category,
    description: input.description,
    priority: input.priority,
    status: "open",
    unitCode: "A-101",
    raisedAt: now,
    expectedBy: new Date(Date.now() + slaHours * 3_600_000).toISOString(),
    photos,
    updates: [{ id: "u1", kind: "created", by: "tenant", text: "Ticket raised", at: now }],
  };
  set({
    tickets: [ticket, ...state.tickets],
    activity: [{ id: `tk-${number}`, kind: "ticket", text: `Ticket #${number} raised · ${categoryMeta(input.category).label}`, at: now }, ...state.activity],
  });
  return ticket;
}

function updateTicket(id: string, fn: (t: Ticket) => Ticket) {
  set({ tickets: state.tickets.map((t) => (t.id === id ? fn(t) : t)) });
}

/** Mock of POST /me/tickets/{id}/comments */
export async function addTicketComment(id: string, text: string, files: File[]): Promise<void> {
  const photos = await Promise.all(files.map(fileToDataUrl));
  await delay(500);
  updateTicket(id, (t) => ({
    ...t,
    updates: [...t.updates, { id: `c-${Date.now()}`, kind: "comment", by: "tenant", text, at: new Date().toISOString(), photos }],
  }));
}

/** Mock of POST /me/tickets/{id}/rate — rating a resolved ticket closes it. */
export async function rateTicket(id: string, stars: number, comment: string): Promise<void> {
  await delay(500);
  updateTicket(id, (t) => ({ ...t, status: "closed", rating: { stars, comment } }));
}

/** Mock of a KYC re-upload (PATCH /me/profile → review queue). The document goes back to Pending review. */
export async function reuploadKyc(type: KycType, file: File): Promise<void> {
  const thumbnail = await fileToDataUrl(file);
  await delay(900);
  set({ kyc: state.kyc.map((k) => (k.type === type ? { ...k, status: "pending", rejectionReason: undefined, thumbnail } : k)) });
}

/** Mock of the e-sign hand-off (Digio / Leegality). The real flow redirects to the provider and returns via webhook. */
export async function signAgreement(): Promise<void> {
  await delay(1200);
  set({ agreement: { ...state.agreement, status: "signed", signedAt: new Date().toLocaleDateString("en-CA") } });
}

export function findDocument(s: PortalState, id: string): PortalDocument | undefined {
  return id === s.agreement.document.id ? s.agreement.document : s.sharedDocs.find((d) => d.id === id);
}

/** Mock of POST /me/announcements/{id}/ack */
export async function acknowledgeAnnouncement(id: string): Promise<void> {
  await delay(400);
  set({ announcements: state.announcements.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)) });
}
