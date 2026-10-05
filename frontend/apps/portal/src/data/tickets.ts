import type { TicketCategory } from "../lib/ticketCategories";

/**
 * Mock tickets for the tenant portal. Replaced by GET /me/tickets (+ comments) once the backend
 * exists (docs/06 §6.3). Only tenant-visible updates are ever sent to the portal — internal
 * staff notes never appear here.
 */

export type TicketStatus = "open" | "assigned" | "in_progress" | "resolved" | "closed";
export type TicketPriority = "normal" | "urgent";

export interface TicketUpdate {
  id: string;
  kind: "created" | "assigned" | "status" | "comment";
  by: "tenant" | "staff";
  text: string;
  at: string; // ISO timestamp
  photos?: string[];
}

export interface Ticket {
  id: string;
  number: string;
  title: string;
  category: TicketCategory;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  unitCode: string;
  raisedAt: string;
  /** SLA target shown as "Expected by" while the ticket is open. */
  expectedBy?: string;
  photos: string[];
  updates: TicketUpdate[];
  rating?: { stars: number; comment: string };
}

const hoursAgo = (n: number) => new Date(Date.now() - n * 3_600_000).toISOString();
const hoursFromNow = (n: number) => new Date(Date.now() + n * 3_600_000).toISOString();

/** Placeholder "photo" for seed tickets (an inline SVG), so the mock has no external assets. */
function placeholderPhoto(hue: number, label: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue} 45% 62%)"/><stop offset="1" stop-color="hsl(${hue + 30} 40% 38%)"/></linearGradient></defs><rect width="240" height="240" fill="url(#g)"/><text x="120" y="128" font-family="sans-serif" font-size="22" fill="white" text-anchor="middle" opacity=".85">${label}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const seedTickets: Ticket[] = [
  {
    id: "t-209",
    number: "T-209",
    title: "Bathroom geyser not heating",
    category: "appliance",
    description: "The geyser in the attached bathroom switches on but the water stays cold, even after 30 minutes.",
    priority: "normal",
    status: "in_progress",
    unitCode: "A-101",
    raisedAt: hoursAgo(50),
    expectedBy: hoursFromNow(20),
    photos: [placeholderPhoto(200, "Geyser")],
    updates: [
      { id: "u1", kind: "created", by: "tenant", text: "Ticket raised", at: hoursAgo(50) },
      { id: "u2", kind: "assigned", by: "staff", text: "Assigned to Ramesh (Electrician)", at: hoursAgo(46) },
      { id: "u3", kind: "comment", by: "staff", text: "Ramesh will visit tomorrow between 10 and 11 AM. Please keep the bathroom accessible.", at: hoursAgo(45) },
      { id: "u4", kind: "status", by: "staff", text: "Status changed to In Progress", at: hoursAgo(22) },
    ],
  },
  {
    id: "t-211",
    number: "T-211",
    title: "Wi-Fi drops every evening",
    category: "internet",
    description: "Internet disconnects every evening around 8 PM for 10–15 minutes.",
    priority: "normal",
    status: "open",
    unitCode: "A-101",
    raisedAt: hoursAgo(6),
    expectedBy: hoursFromNow(42),
    photos: [],
    updates: [{ id: "u1", kind: "created", by: "tenant", text: "Ticket raised", at: hoursAgo(6) }],
  },
  {
    id: "t-204",
    number: "T-204",
    title: "Kitchen sink leaking",
    category: "plumbing",
    description: "Water is leaking from the pipe under the kitchen sink and pooling inside the cabinet.",
    priority: "urgent",
    status: "resolved",
    unitCode: "A-101",
    raisedAt: hoursAgo(24 * 10),
    photos: [placeholderPhoto(15, "Sink"), placeholderPhoto(35, "Cabinet")],
    updates: [
      { id: "u1", kind: "created", by: "tenant", text: "Ticket raised", at: hoursAgo(24 * 10) },
      { id: "u2", kind: "assigned", by: "staff", text: "Assigned to Suresh (Plumber)", at: hoursAgo(24 * 10 - 1) },
      { id: "u3", kind: "status", by: "staff", text: "Status changed to In Progress", at: hoursAgo(24 * 9) },
      { id: "u4", kind: "status", by: "staff", text: "Resolved — replaced the trap and the inlet hose.", at: hoursAgo(24 * 8) },
    ],
  },
  {
    id: "t-187",
    number: "T-187",
    title: "Cockroaches in the kitchen",
    category: "pest_control",
    description: "Seeing cockroaches near the kitchen drain at night.",
    priority: "normal",
    status: "closed",
    unitCode: "A-101",
    raisedAt: hoursAgo(24 * 45),
    photos: [],
    updates: [
      { id: "u1", kind: "created", by: "tenant", text: "Ticket raised", at: hoursAgo(24 * 45) },
      { id: "u2", kind: "assigned", by: "staff", text: "Assigned to PestFree Services", at: hoursAgo(24 * 44) },
      { id: "u3", kind: "status", by: "staff", text: "Resolved — gel treatment done across the flat.", at: hoursAgo(24 * 42) },
    ],
    rating: { stars: 5, comment: "Quick and clean." },
  },
];
