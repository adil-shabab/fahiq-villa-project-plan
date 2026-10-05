import { properties } from "./properties";

export type TenancyStatus = "Active" | "Notice" | "Ending Soon" | "Ended";
export type AgreementStatus = "Signed" | "Pending" | "Expired";

export interface LedgerEntry {
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface TenancyInvoice {
  id: string;
  number: string;
  period: string;
  amount: number;
  status: "Paid" | "Partially Paid" | "Overdue" | "Draft";
  dueDate: string;
}

export interface TenancyPayment {
  id: string;
  date: string;
  amount: number;
  method: string;
  receiptNo: string;
}

export interface DepositEntry {
  date: string;
  type: "Collected" | "Deduction" | "Refund";
  amount: number;
  note: string;
}

export interface RecurringCharge {
  id: string;
  type: string;
  amount: number;
  startPeriod: string;
  notes: string;
}

export interface TenancyDocument {
  name: string;
  category: string;
  uploadedOn: string;
}

export interface TenancyTicket {
  id: string;
  title: string;
  status: "Open" | "In Progress" | "Resolved";
  priority: "Low" | "Medium" | "High";
  raisedOn: string;
}

export interface CommLogEntry {
  date: string;
  channel: "WhatsApp" | "SMS" | "Email" | "Call";
  summary: string;
}

export interface Tenancy {
  id: string;
  tenantName: string;
  avatarInitials: string;
  phone: string;
  email: string;
  unitCode: string;
  propertyId: string;
  propertyName: string;
  rent: number;
  depositHeld: number;
  maintenanceCharge: number;
  lockInMonths: number;
  noticePeriodDays: number;
  escalationPercent: number;
  dueDay: number;
  startDate: string;
  endDate: string;
  status: TenancyStatus;
  outstandingBalance: number;
  agreementStatus: AgreementStatus;
  kycStatus: "Verified" | "Pending";
  coOccupants: string[];
  emergencyContact: { name: string; phone: string };
  noticeDate?: string;
  vacateDate?: string;
  ledger: LedgerEntry[];
  invoices: TenancyInvoice[];
  payments: TenancyPayment[];
  deposit: DepositEntry[];
  recurringCharges: RecurringCharge[];
  documents: TenancyDocument[];
  tickets: TenancyTicket[];
  commLog: CommLogEntry[];
}

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

function defaultLedger(rent: number, outstanding: number): LedgerEntry[] {
  const monthBill = rent + 1200;
  const entries: LedgerEntry[] = [
    { date: "2026-08-01", description: "Invoice · August", debit: monthBill, credit: 0, balance: monthBill },
    { date: "2026-08-04", description: "Payment · UPI", debit: 0, credit: monthBill, balance: 0 },
    { date: "2026-09-01", description: "Invoice · September", debit: monthBill, credit: 0, balance: monthBill },
  ];
  if (outstanding > 0) {
    return entries;
  }
  entries.push({ date: "2026-09-05", description: "Payment · UPI", debit: 0, credit: monthBill, balance: 0 });
  return entries;
}

function defaultInvoices(rent: number, outstanding: number): TenancyInvoice[] {
  return [
    { id: "inv-a", number: "INV-2026-0043", period: "Sep 2026", amount: rent + 1200, status: outstanding > 0 ? "Overdue" : "Paid", dueDate: "2026-09-05" },
    { id: "inv-b", number: "INV-2026-0021", period: "Aug 2026", amount: rent + 1150, status: "Paid", dueDate: "2026-08-05" },
    { id: "inv-c", number: "INV-2026-0008", period: "Jul 2026", amount: rent + 1080, status: "Paid", dueDate: "2026-07-05" },
  ];
}

function defaultPayments(rent: number): TenancyPayment[] {
  return [
    { id: "pay-a", date: "2026-08-04", amount: rent + 1150, method: "UPI", receiptNo: "RCPT-0091" },
    { id: "pay-b", date: "2026-07-04", amount: rent + 1080, method: "UPI", receiptNo: "RCPT-0064" },
  ];
}

function defaultDeposit(deposit: number): DepositEntry[] {
  return [{ date: "2026-03-01", type: "Collected", amount: deposit, note: "Security deposit collected at onboarding" }];
}

function defaultRecurring(wifi: boolean): RecurringCharge[] {
  const charges: RecurringCharge[] = [{ id: "rc-maint", type: "Maintenance", amount: 1200, startPeriod: "2026-03", notes: "" }];
  if (wifi) charges.push({ id: "rc-wifi", type: "Wi-Fi", amount: 500, startPeriod: "2026-03", notes: "" });
  return charges;
}

function defaultDocuments(): TenancyDocument[] {
  return [
    { name: "Rental Agreement.pdf", category: "Agreement", uploadedOn: "2026-03-01" },
    { name: "Aadhaar.pdf", category: "KYC", uploadedOn: "2026-02-28" },
    { name: "PAN.pdf", category: "KYC", uploadedOn: "2026-02-28" },
  ];
}

function defaultTickets(): TenancyTicket[] {
  return [{ id: "tk-1", title: "Kitchen tap leaking", status: "Resolved", priority: "Medium", raisedOn: "2026-08-14" }];
}

function defaultComms(name: string): CommLogEntry[] {
  return [
    { date: "2026-09-26", channel: "WhatsApp", summary: `Rent reminder sent to ${name.split(" ")[0]}` },
    { date: "2026-08-04", channel: "WhatsApp", summary: "Payment receipt sent" },
  ];
}

interface SeedTenant {
  unitId: string;
  propertyId: string;
  name: string;
  phone: string;
  email: string;
  status: TenancyStatus;
  outstanding: number;
  agreementStatus: AgreementStatus;
  startDate: string;
  endDate: string;
  coOccupants?: string[];
  noticeDate?: string;
  vacateDate?: string;
}

const seeds: SeedTenant[] = [
  { unitId: "gv-a101", propertyId: "green-view", name: "Rahul Sharma", phone: "+91 98450 11223", email: "rahul.sharma@example.com", status: "Active", outstanding: 16462, agreementStatus: "Signed", startDate: "2025-10-01", endDate: "2026-10-01", coOccupants: ["Amit Sharma (Brother)"] },
  { unitId: "gv-a102", propertyId: "green-view", name: "Fatima Khan", phone: "+91 97012 44321", email: "fatima.khan@example.com", status: "Active", outstanding: 0, agreementStatus: "Signed", startDate: "2026-01-15", endDate: "2027-01-15" },
  { unitId: "gv-a305", propertyId: "green-view", name: "Sneha Kulkarni", phone: "+91 90080 55667", email: "sneha.kulkarni@example.com", status: "Active", outstanding: 21050, agreementStatus: "Signed", startDate: "2025-11-01", endDate: "2026-11-01" },
  { unitId: "gv-a308", propertyId: "green-view", name: "Karan Mehta", phone: "+91 99452 90012", email: "karan.mehta@example.com", status: "Notice", outstanding: 0, agreementStatus: "Signed", startDate: "2025-06-01", endDate: "2026-06-01", noticeDate: "2026-09-01", vacateDate: "2026-10-01" },
  { unitId: "sr-d201", propertyId: "sunrise-pg", name: "Priyanka Das", phone: "+91 98103 67890", email: "priyanka.das@example.com", status: "Active", outstanding: 9800, agreementStatus: "Signed", startDate: "2026-02-01", endDate: "2026-08-01" },
  { unitId: "sr-d207", propertyId: "sunrise-pg", name: "Ayesha Siddiqui", phone: "+91 96203 44556", email: "ayesha.s@example.com", status: "Active", outstanding: 0, agreementStatus: "Signed", startDate: "2026-04-01", endDate: "2026-10-01" },
  { unitId: "sr-d305", propertyId: "sunrise-pg", name: "Lavanya Pillai", phone: "+91 94482 11223", email: "lavanya.p@example.com", status: "Notice", outstanding: 0, agreementStatus: "Signed", startDate: "2025-12-01", endDate: "2026-06-01", noticeDate: "2026-09-15", vacateDate: "2026-10-15" },
  { unitId: "mc-b112", propertyId: "maple-court", name: "Mohammed Irfan", phone: "+91 90226 33445", email: "mohammed.irfan@example.com", status: "Active", outstanding: 14230, agreementStatus: "Signed", startDate: "2025-09-01", endDate: "2026-09-01", coOccupants: ["Sarah Irfan (Spouse)", "Zain Irfan (Child)"] },
  { unitId: "mc-b204", propertyId: "maple-court", name: "Ananya Rao", phone: "+91 98765 22110", email: "ananya.rao@example.com", status: "Active", outstanding: 0, agreementStatus: "Signed", startDate: "2026-05-01", endDate: "2027-05-01" },
  { unitId: "so-c118", propertyId: "silver-oak", name: "Arjun Nair", phone: "+91 96543 77889", email: "arjun.nair@example.com", status: "Active", outstanding: 7600, agreementStatus: "Pending", startDate: "2026-06-01", endDate: "2026-12-01" },
  { unitId: "lb-e110", propertyId: "lake-breeze", name: "Divya Menon", phone: "+91 90012 66778", email: "divya.menon@example.com", status: "Active", outstanding: 0, agreementStatus: "Signed", startDate: "2026-01-01", endDate: "2026-12-31" },
  { unitId: "lb-e208", propertyId: "lake-breeze", name: "Vikram Shah", phone: "+91 98220 99001", email: "vikram.shah@example.com", status: "Notice", outstanding: 0, agreementStatus: "Signed", startDate: "2025-10-01", endDate: "2026-10-01", noticeDate: "2026-09-10", vacateDate: "2026-10-10" },
];

export const tenancies: Tenancy[] = seeds.map((seed, index) => {
  const property = properties.find((p) => p.id === seed.propertyId)!;
  const unit = property.units.find((u) => u.id === seed.unitId)!;
  const wifi = index % 3 !== 0;
  return {
    id: seed.unitId,
    tenantName: seed.name,
    avatarInitials: initials(seed.name),
    phone: seed.phone,
    email: seed.email,
    unitCode: unit.code,
    propertyId: property.id,
    propertyName: property.name,
    rent: unit.rent,
    depositHeld: unit.rent * 2,
    maintenanceCharge: 1200,
    lockInMonths: 6,
    noticePeriodDays: 30,
    escalationPercent: 5,
    dueDay: 5,
    startDate: seed.startDate,
    endDate: seed.endDate,
    status: seed.status,
    outstandingBalance: seed.outstanding,
    agreementStatus: seed.agreementStatus,
    kycStatus: seed.agreementStatus === "Pending" ? "Pending" : "Verified",
    coOccupants: seed.coOccupants ?? [],
    emergencyContact: { name: `${seed.name.split(" ")[0]}'s Emergency Contact`, phone: "+91 90000 00000" },
    noticeDate: seed.noticeDate,
    vacateDate: seed.vacateDate,
    ledger: defaultLedger(unit.rent, seed.outstanding),
    invoices: defaultInvoices(unit.rent, seed.outstanding),
    payments: defaultPayments(unit.rent),
    deposit: defaultDeposit(unit.rent * 2),
    recurringCharges: defaultRecurring(wifi),
    documents: defaultDocuments(),
    tickets: defaultTickets(),
    commLog: defaultComms(seed.name),
  } satisfies Tenancy;
});

export function getTenancyById(id: string): Tenancy | undefined {
  return tenancies.find((t) => t.id === id);
}
