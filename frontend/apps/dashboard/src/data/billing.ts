import { properties } from "./properties";
import { tenancies } from "./tenancies";

export type InvoiceStatus = "Draft" | "Issued" | "Partially Paid" | "Paid" | "Overdue" | "Void";

export interface InvoiceLineItem {
  chargeType: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface BillingInvoice {
  id: string;
  number: string;
  tenancyId: string;
  tenantName: string;
  avatarInitials: string;
  unitCode: string;
  propertyId: string;
  propertyName: string;
  period: string;
  periodLabel: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  carryForward: number;
  total: number;
  amountPaid: number;
  balance: number;
  daysOverdue: number;
  electricityPending: boolean;
  sentChannels: string[];
  paymentHistory: { date: string; amount: number; method: string }[];
}

function buildLineItems(rent: number, electricityUnits: number, wifi: boolean): InvoiceLineItem[] {
  const items: InvoiceLineItem[] = [
    { chargeType: "Rent", description: "Monthly Rent", quantity: 1, unitPrice: rent, amount: rent },
    { chargeType: "Electricity", description: `Electricity · ${electricityUnits} units`, quantity: electricityUnits, unitPrice: 8.5, amount: Math.round(electricityUnits * 8.5) },
    { chargeType: "Maintenance", description: "Maintenance", quantity: 1, unitPrice: 1200, amount: 1200 },
  ];
  if (wifi) items.push({ chargeType: "Wi-Fi", description: "Wi-Fi", quantity: 1, unitPrice: 500, amount: 500 });
  return items;
}

const periods = [
  { period: "2026-09", label: "September 2026", issue: "2026-09-01", due: "2026-09-05" },
  { period: "2026-08", label: "August 2026", issue: "2026-08-01", due: "2026-08-05" },
];

export const invoices: BillingInvoice[] = tenancies.flatMap((t, tIndex) => {
  return periods.map((p, pIndex) => {
    const isLatest = pIndex === 0;
    const electricityPending = isLatest && tIndex % 5 === 0;
    const wifi = tIndex % 3 !== 0;
    const units = 140 + ((tIndex * 17) % 90);
    const lineItems = electricityPending ? buildLineItems(t.rent, 0, wifi).filter((li) => li.chargeType !== "Electricity") : buildLineItems(t.rent, units, wifi);
    const subtotal = lineItems.reduce((sum, li) => sum + li.amount, 0);
    const tax = 0;
    const carryForward = 0;
    const total = subtotal + tax + carryForward;

    let status: InvoiceStatus;
    let amountPaid = total;
    let daysOverdue = 0;
    const paymentHistory: BillingInvoice["paymentHistory"] = [];

    if (isLatest && t.outstandingBalance > 0) {
      status = "Overdue";
      amountPaid = 0;
      daysOverdue = 3 + (tIndex % 12);
    } else if (isLatest && electricityPending) {
      status = "Draft";
      amountPaid = 0;
    } else {
      status = "Paid";
      paymentHistory.push({ date: p.due, amount: total, method: tIndex % 2 === 0 ? "UPI" : "Card" });
    }

    const balance = total - amountPaid;

    return {
      id: `${t.id}-${p.period}`,
      number: `INV-2026-${String(tIndex * 2 + pIndex + 1).padStart(4, "0")}`,
      tenancyId: t.id,
      tenantName: t.tenantName,
      avatarInitials: t.avatarInitials,
      unitCode: t.unitCode,
      propertyId: t.propertyId,
      propertyName: t.propertyName,
      period: p.period,
      periodLabel: p.label,
      issueDate: p.issue,
      dueDate: p.due,
      status,
      lineItems,
      subtotal,
      tax,
      carryForward,
      total,
      amountPaid,
      balance,
      daysOverdue,
      electricityPending,
      sentChannels: status === "Draft" ? [] : ["WhatsApp"],
      paymentHistory,
    } satisfies BillingInvoice;
  });
});

export function getInvoiceById(id: string): BillingInvoice | undefined {
  return invoices.find((i) => i.id === id);
}

export interface CreditNote {
  id: string;
  number: string;
  invoiceNumber: string;
  tenantName: string;
  type: "Discount" | "Waiver" | "Adjustment" | "Correction";
  amount: number;
  reason: string;
  issuedBy: string;
  approvalStatus: "Approved" | "Pending Approval";
  date: string;
}

export const creditNotes: CreditNote[] = [
  { id: "cn1", number: "CN-2026-0012", invoiceNumber: "INV-2026-0003", tenantName: "Sneha Kulkarni", type: "Waiver", amount: 500, reason: "Late fee waived — first offense", issuedBy: "Priya Sharma", approvalStatus: "Approved", date: "2026-09-18" },
  { id: "cn2", number: "CN-2026-0011", invoiceNumber: "INV-2026-0009", tenantName: "Mohammed Irfan", type: "Adjustment", amount: 1200, reason: "Electricity reading correction", issuedBy: "Rohan Gupta", approvalStatus: "Approved", date: "2026-09-10" },
  { id: "cn3", number: "CN-2026-0010", invoiceNumber: "INV-2026-0015", tenantName: "Arjun Nair", type: "Discount", amount: 800, reason: "Referral discount", issuedBy: "Priya Sharma", approvalStatus: "Pending Approval", date: "2026-09-25" },
];

export const billingSummary = {
  totalBilled: invoices.filter((i) => i.period === "2026-09").reduce((s, i) => s + i.total, 0),
  totalCollected: invoices.filter((i) => i.period === "2026-09").reduce((s, i) => s + i.amountPaid, 0),
  outstanding: invoices.filter((i) => i.period === "2026-09").reduce((s, i) => s + i.balance, 0),
  overdueCount: invoices.filter((i) => i.status === "Overdue").length,
};

export const availableProperties = properties;
