/**
 * Mock data for the tenant Home screen (invoices live in ./invoices.ts). Replaced by GET /api/v1/me/tenancy, /me/dues,
 * /me/announcements and an activity feed once the backend exists (docs/06 §6.3, tenant portal).
 */

export interface Announcement {
  id: string;
  title: string;
  propertyName: string;
  publishedAt: string; // ISO timestamp
  body: string;
  requireAck: boolean;
  acknowledged: boolean;
  pinned?: boolean;
}

export type ActivityKind = "payment" | "ticket" | "announcement" | "invoice";

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  text: string;
  amount?: number;
  at: string; // ISO timestamp
  announcementId?: string;
}

const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString();

export const tenantProfile = {
  firstName: "Rahul",
  fullName: "Rahul Verma",
  propertyName: "Green View Residency",
  unitCode: "A-101",
  nextDueDate: "2026-11-05",
  manager: { name: "Priya Sharma", phone: "+918049208800", whatsapp: "918049208800" },
};

export const announcements: Announcement[] = [
  {
    id: "ann-31",
    title: "Water supply maintenance on Saturday",
    propertyName: "Green View Residency",
    publishedAt: daysAgo(2),
    body:
      "The overhead tanks will be cleaned this Saturday between 10:00 AM and 2:00 PM. Water supply to all flats will be paused during this window. Please store enough water for the morning. Drinking water from the RO unit in the lobby will remain available.",
    requireAck: true,
    acknowledged: false,
  },
  {
    id: "ann-29",
    title: "Festive season gate timings",
    propertyName: "Green View Residency",
    publishedAt: daysAgo(9),
    body:
      "During Diwali week (20–26 Oct) the main gate will stay open until 1:00 AM. Please carry your access card after 11:30 PM and register any overnight guests with the front desk.",
    requireAck: false,
    acknowledged: false,
    pinned: true,
  },
  {
    id: "ann-27",
    title: "Lift servicing in Tower A",
    propertyName: "Green View Residency · Tower A",
    publishedAt: daysAgo(16),
    body: "Lift 2 in Tower A will be under annual maintenance on Tuesday from 11:00 AM to 4:00 PM. Lift 1 remains available.",
    requireAck: true,
    acknowledged: true,
  },
  {
    id: "ann-22",
    title: "New water purifier in the lobby",
    propertyName: "All properties",
    publishedAt: daysAgo(34),
    body: "A new RO + UV purifier has been installed in the ground-floor lobby. Feel free to refill bottles any time.",
    requireAck: false,
    acknowledged: false,
  },
];

export const recentActivity: ActivityItem[] = [
  { id: "a1", kind: "announcement", text: "New announcement: Water supply maintenance", at: daysAgo(2), announcementId: "ann-31" },
  { id: "a2", kind: "payment", text: "Payment received", amount: 15000, at: daysAgo(3) },
  { id: "a3", kind: "invoice", text: "October invoice issued", amount: 15930, at: daysAgo(5) },
  { id: "a4", kind: "ticket", text: "Ticket #T-204 marked resolved", at: daysAgo(8) },
];
