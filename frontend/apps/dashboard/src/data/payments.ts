import { autopayMandates } from "./collections";

export type TxnStatus = "Success" | "Needs Verification" | "Auto-Debit Failed" | "Refund Settled" | "In Clearing";
export type TxnChannelIcon = "upi" | "qr" | "bank" | "cheque" | "refund" | "failed";

export interface Transaction {
  id: string;
  dateLabel: string;
  tenantName: string;
  avatarInitials: string;
  propertyName: string;
  unitCode: string;
  purpose: string;
  refNumber: string;
  channelLabel: string;
  channelRef: string;
  channelIcon: TxnChannelIcon;
  amount: number;
  isRefund?: boolean;
  isFailed?: boolean;
  status: TxnStatus;
}

export const transactionTabs = ["All Transactions", "UPI & Online", "Bank Transfer / NEFT", "Cash / Cheque", "Refunds & Disputes"] as const;

export const transactions: Transaction[] = [
  {
    id: "TXN-984210",
    dateLabel: "Today · 10:42 AM",
    tenantName: "Rahul Sharma",
    avatarInitials: "RS",
    propertyName: "Green View Residency",
    unitCode: "A-101",
    purpose: "Monthly Rent (Oct)",
    refNumber: "INV-2026-1004",
    channelLabel: "UPI AutoPay (Google Pay)",
    channelRef: "UTR: 4291880918",
    channelIcon: "upi",
    amount: 16200,
    status: "Success",
  },
  {
    id: "TXN-984209",
    dateLabel: "Today · 09:15 AM",
    tenantName: "Fatima Khan",
    avatarInitials: "FK",
    propertyName: "Green View Residency",
    unitCode: "A-102",
    purpose: "Monthly Rent (Oct)",
    refNumber: "INV-2026-1003",
    channelLabel: "UPI AutoPay (PhonePe)",
    channelRef: "UTR: 4291880902",
    channelIcon: "upi",
    amount: 12200,
    status: "Success",
  },
  {
    id: "TXN-984198",
    dateLabel: "Today · 08:30 AM",
    tenantName: "Mohammed Irfan",
    avatarInitials: "MI",
    propertyName: "Maple Court Apartments",
    unitCode: "B-112",
    purpose: "Security Deposit Balance",
    refNumber: "DEP-2026-0089",
    channelLabel: "Bank IMPS / Direct Transfer",
    channelRef: "Claimed UTR: 42918820",
    channelIcon: "bank",
    amount: 14230,
    status: "Needs Verification",
  },
  {
    id: "TXN-984180",
    dateLabel: "Yesterday · 06:14 PM",
    tenantName: "Ananya Rao",
    avatarInitials: "AR",
    propertyName: "Maple Court Apartments",
    unitCode: "B-204",
    purpose: "Monthly Rent (Oct)",
    refNumber: "INV-2026-0988",
    channelLabel: "UPI Dynamic QR Scan",
    channelRef: "Ref: CASH-QR-918",
    channelIcon: "qr",
    amount: 17400,
    status: "Success",
  },
  {
    id: "TXN-984172",
    dateLabel: "Yesterday · 04:30 PM",
    tenantName: "Arjun Nair",
    avatarInitials: "AN",
    propertyName: "Silver Oak Hostel",
    unitCode: "C-118",
    purpose: "Late Fee + Rent",
    refNumber: "INV-2026-0975",
    channelLabel: "e-Mandate (HDFC Bank)",
    channelRef: "Insufficient Balance (U16)",
    channelIcon: "failed",
    amount: 8400,
    isFailed: true,
    status: "Auto-Debit Failed",
  },
  {
    id: "TXN-984160",
    dateLabel: "Oct 28 · 11:20 AM",
    tenantName: "Vikram Shah",
    avatarInitials: "VS",
    propertyName: "Lake Breeze Flats",
    unitCode: "E-208",
    purpose: "Move-out Deposit Refund",
    refNumber: "REF-2026-0012",
    channelLabel: "RazorpayX Instant Payout",
    channelRef: "pout_L9198734",
    channelIcon: "refund",
    amount: 27800,
    isRefund: true,
    status: "Refund Settled",
  },
  {
    id: "TXN-984155",
    dateLabel: "Oct 27 · 03:45 PM",
    tenantName: "Divya Menon",
    avatarInitials: "DM",
    propertyName: "Lake Breeze Flats",
    unitCode: "E-110",
    purpose: "Maintenance Advance",
    refNumber: "INV-2026-0951",
    channelLabel: "Cheque Deposit (ICICI)",
    channelRef: "Chq No: 004128 · Deposit Slip #91",
    channelIcon: "cheque",
    amount: 1200,
    status: "In Clearing",
  },
];

const successTxns = transactions.filter((t) => t.status === "Success");
const pendingTxns = transactions.filter((t) => t.status === "Needs Verification" || t.status === "In Clearing");
const refundTxns = transactions.filter((t) => t.isRefund);

export const paymentStats = {
  totalCollected: successTxns.reduce((sum, t) => sum + t.amount, 0),
  successCount: successTxns.length,
  pendingAmount: pendingTxns.reduce((sum, t) => sum + t.amount, 0),
  pendingCount: pendingTxns.length,
  autoDebitSuccessCount: autopayMandates.filter((m) => m.lastRunOk).length,
  autoDebitTotalCount: autopayMandates.length,
  autoDebitSuccessRate: Math.round((autopayMandates.filter((m) => m.lastRunOk).length / autopayMandates.length) * 1000) / 10,
  refundsAmount: refundTxns.reduce((sum, t) => sum + t.amount, 0),
  refundsCount: refundTxns.length,
};

export const unreconciledAlert = {
  count: 2,
  amount: 11400,
  note: "Direct IMPS deposits matched against pending invoices for Maple Court and Silver Oak Hostel.",
  nextBatchLabel: "06:00 PM Today · HDFC Nodal",
};

export const settlementBatches = [
  { label: "Batch 1 (11:00 AM)", amount: Math.round(paymentStats.totalCollected * 0.66), status: "Credited" as const },
  { label: "Batch 2 (06:00 PM)", amount: Math.round(paymentStats.totalCollected * 0.34), status: "Processing" as const },
];

export const nodalAccount = "HDFC ••••4019";

export const channelMix = [
  { label: "UPI Mandates", percent: 68, colorClass: "bg-accent" },
  { label: "Gateways", percent: 18, colorClass: "bg-gold" },
  { label: "Bank IMPS", percent: 10, colorClass: "bg-info" },
  { label: "Offline / Cheque", percent: 4, colorClass: "bg-ink-faint" },
];
