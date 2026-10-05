import { tenancies } from "./tenancies";

export interface OverdueTenant {
  id: string;
  tenantName: string;
  avatarInitials: string;
  phone: string;
  unitCode: string;
  unitLabel: string;
  propertyName: string;
  amountDue: number;
  originalAmount?: number;
  daysOverdue: number;
  reminderLabel: string;
  reminderChannel: "whatsapp" | "call" | "notice" | "none";
  legalNotice?: boolean;
}

const overdueMeta: Record<string, { daysOverdue: number; reminderLabel: string; reminderChannel: OverdueTenant["reminderChannel"]; legalNotice?: boolean; originalAmount?: number; unitLabel: string }> = {
  "gv-a101": { daysOverdue: 19, reminderLabel: "4h ago via WhatsApp", reminderChannel: "whatsapp", unitLabel: "A-101 (2BHK)" },
  "gv-a305": { daysOverdue: 38, reminderLabel: "3 days ago", reminderChannel: "notice", unitLabel: "A-305 (1BHK)" },
  "sr-d201": { daysOverdue: 2, reminderLabel: "Today 10:00 AM", reminderChannel: "whatsapp", unitLabel: "D-201 (PG Bed · Single)" },
  "mc-b112": { daysOverdue: 10, reminderLabel: "Yesterday 4:15 PM", reminderChannel: "call", originalAmount: 18230, unitLabel: "B-112 (3BHK)" },
  "so-c118": { daysOverdue: 52, reminderLabel: "1 day ago (Notice)", reminderChannel: "notice", legalNotice: true, unitLabel: "C-118 (PG Bed · Triple)" },
};

export const overdueTenants: OverdueTenant[] = tenancies
  .filter((t) => t.outstandingBalance > 0)
  .map((t) => {
    const meta = overdueMeta[t.id];
    return {
      id: t.id,
      tenantName: t.tenantName,
      avatarInitials: t.avatarInitials,
      phone: t.phone,
      unitCode: t.unitCode,
      unitLabel: meta.unitLabel,
      propertyName: t.propertyName,
      amountDue: t.outstandingBalance,
      originalAmount: meta.originalAmount,
      daysOverdue: meta.daysOverdue,
      reminderLabel: meta.reminderLabel,
      reminderChannel: meta.reminderChannel,
      legalNotice: meta.legalNotice,
    };
  })
  .sort((a, b) => b.daysOverdue - a.daysOverdue);

export type AgingTrancheKey = "0-30" | "31-60" | "61-90" | "90+";

export function agingBucket(days: number): AgingTrancheKey {
  if (days <= 30) return "0-30";
  if (days <= 60) return "31-60";
  if (days <= 90) return "61-90";
  return "90+";
}

export const agingTranches: { key: AgingTrancheKey; label: string; amount: number; count: number }[] = (
  ["0-30", "31-60", "61-90", "90+"] as AgingTrancheKey[]
).map((key) => {
  const rows = overdueTenants.filter((t) => agingBucket(t.daysOverdue) === key);
  return {
    key,
    label: key === "90+" ? "90+ Days" : `${key} Days`,
    amount: rows.reduce((sum, r) => sum + r.amountDue, 0),
    count: rows.length,
  };
});

const expectedThisMonth = tenancies.reduce((sum, t) => sum + t.rent + t.maintenanceCharge, 0);
const totalOutstanding = overdueTenants.reduce((sum, t) => sum + t.amountDue, 0);
const collected = expectedThisMonth - totalOutstanding;

export const collectionStats = {
  expectedThisMonth,
  billedUnits: tenancies.length,
  collected,
  paidUnitsCount: tenancies.length - overdueTenants.length,
  outstanding: totalOutstanding,
  overdueTenantCount: overdueTenants.length,
  efficiencyPercent: Math.round((collected / expectedThisMonth) * 1000) / 10,
};

export interface PromiseToPay {
  id: string;
  tenantName: string;
  unitCode: string;
  amount: number;
  promisedDate: string;
  loggedBy: string;
  note: string;
  status: "Upcoming" | "Due Today" | "Broken";
}

export const promisesToPay: PromiseToPay[] = [
  {
    id: "ptp-1",
    tenantName: "Rahul Sharma",
    unitCode: "A-101",
    amount: 16462,
    promisedDate: "2026-10-04",
    loggedBy: "Priya Sharma",
    note: "Awaiting company salary credit on 4th morning",
    status: "Upcoming",
  },
  {
    id: "ptp-2",
    tenantName: "Priyanka Das",
    unitCode: "D-201",
    amount: 9800,
    promisedDate: "2026-10-02",
    loggedBy: "Rajesh Kumar",
    note: "Parent transferring via NEFT today 2 PM",
    status: "Due Today",
  },
  {
    id: "ptp-3",
    tenantName: "Sneha Kulkarni",
    unitCode: "A-305",
    amount: 21050,
    promisedDate: "2026-09-28",
    loggedBy: "Priya Sharma",
    note: "Tenant phone switched off since yesterday",
    status: "Broken",
  },
];

export interface ReconciliationEvent {
  id: string;
  eventId: string;
  time: string;
  amount: number;
  tenantName: string;
  unitCode: string;
  matched: true;
}

export const reconciliationEvents: ReconciliationEvent[] = [
  { id: "re-1", eventId: "evt_pay_NzK8912Ja9", time: "10:42 AM", amount: 16200, tenantName: "Ananya Rao", unitCode: "B-204", matched: true },
  { id: "re-2", eventId: "evt_pay_Op77218Kq1", time: "09:18 AM", amount: 12800, tenantName: "Divya Menon", unitCode: "E-110", matched: true },
];

export const reconciliationAnomaly = {
  amount: 9800,
  upiRef: "pay_Nz99401",
  minutesAgo: 12,
  note: "No matching invoice balance for ₹9,800 on record",
};

export interface AutopayMandate {
  id: string;
  tenantName: string;
  unitCode: string;
  propertyName: string;
  amount: number;
  debitDay: number;
  status: "Active" | "Debit Failed";
  nextDebitLabel: string;
  lastRunLabel: string;
  lastRunOk: boolean;
}

export const autopayMandates: AutopayMandate[] = tenancies
  .filter((t) => t.status === "Active")
  .map((t) => ({
    id: t.id,
    tenantName: t.tenantName,
    unitCode: t.unitCode,
    propertyName: t.propertyName,
    amount: t.rent + t.maintenanceCharge,
    debitDay: t.dueDay,
    status: t.outstandingBalance > 0 ? "Debit Failed" : "Active",
    nextDebitLabel: t.outstandingBalance > 0 ? "Immediate Retry" : "05 Nov 2026",
    lastRunLabel: t.outstandingBalance > 0 ? "Insufficient Balance" : "Success (Oct 5)",
    lastRunOk: t.outstandingBalance === 0,
  }));

export const autopaySuccessRate =
  Math.round((autopayMandates.filter((m) => m.lastRunOk).length / autopayMandates.length) * 1000) / 10;

export interface DepositRefund {
  id: string;
  tenantName: string;
  unitCode: string;
  upiId: string;
  refNo: string;
  amount: number;
  status: "Processing" | "Completed";
}

export const depositRefunds: DepositRefund[] = [
  {
    id: "ref-1",
    tenantName: "Karan Mehta",
    unitCode: "A-308",
    upiId: "karan.mehta@okaxis",
    refNo: "REF-99412",
    amount: 29100,
    status: "Processing",
  },
];

export const ownerPayout = {
  entity: "Fahiq Properties Ops (Owner Entity)",
  periodLabel: "September 2026 Net Rental Disbursal",
  channel: "Bank NEFT",
  utr: "NEFT8839120",
  amount: 1140000,
  status: "Completed" as const,
};

export const razorpayBalance = 482300;
