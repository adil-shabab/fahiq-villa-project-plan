export interface ExpenseCategoryTile {
  id: string;
  label: string;
  amount: number;
  footnote: string;
  changeLabel: string;
  changeTone: "ok" | "danger" | "neutral";
}

export const expenseCategoryTiles: ExpenseCategoryTile[] = [
  { id: "maintenance", label: "Repairs & Maintenance", amount: 94500, footnote: "33.2% of operational spend", changeLabel: "-4.2% MoM", changeTone: "ok" },
  { id: "utilities", label: "Grid Power & Water", amount: 88200, footnote: "31.0% · 5 meters synced", changeLabel: "Reconciled", changeTone: "neutral" },
  { id: "salaries", label: "Staff & Guarding", amount: 65000, footnote: "22.8% · 6 on-site heads", changeLabel: "Disbursed", changeTone: "ok" },
  { id: "supplies", label: "Consumables & Cleaning", amount: 36800, footnote: "13.0% · Linen & chemicals", changeLabel: "+6.1% MoM", changeTone: "danger" },
];

export type ExpenseCategory = "Repairs" | "Utilities" | "Salaries" | "Society Maint" | "Supplies";

export interface ExpenseRow {
  id: string;
  date: string;
  description: string;
  refLabel: string;
  category: ExpenseCategory;
  propertyName: string;
  vendor: string;
  vendorVerified: boolean;
  amount: number;
  method: string;
  receiptLabel: string;
}

export const expenses: ExpenseRow[] = [
  {
    id: "exp-1",
    date: "24 Oct 2026",
    description: "AO Smith Geyser Inlet Replacement (Unit A-101)",
    refLabel: "Ticket #T-204",
    category: "Repairs",
    propertyName: "Green View Residency",
    vendor: "CoolCare HVAC",
    vendorVerified: true,
    amount: 2300,
    method: "UPI",
    receiptLabel: "INV-9921",
  },
  {
    id: "exp-2",
    date: "20 Oct 2026",
    description: "BESCOM Commercial Electricity Grid Bill",
    refLabel: "Meter: KA-04-E-9023",
    category: "Utilities",
    propertyName: "Green View Residency",
    vendor: "BESCOM Bengaluru",
    vendorVerified: false,
    amount: 44200,
    method: "Bank Auto",
    receiptLabel: "bescom_oct.pdf",
  },
  {
    id: "exp-3",
    date: "18 Oct 2026",
    description: "Security & Housekeeping Monthly Payroll",
    refLabel: "6 Staff Members",
    category: "Salaries",
    propertyName: "Portfolio-wide",
    vendor: "SIS Facility Staffing",
    vendorVerified: false,
    amount: 65000,
    method: "Bank (NEFT)",
    receiptLabel: "sis_payroll.pdf",
  },
  {
    id: "exp-4",
    date: "15 Oct 2026",
    description: "DG Generator Diesel Top-Up (300 L)",
    refLabel: "Emergency Backup Genset",
    category: "Society Maint",
    propertyName: "Sunrise PG for Women",
    vendor: "Shell Commercial",
    vendorVerified: false,
    amount: 28500,
    method: "Corp Card",
    receiptLabel: "fuel_slip.jpg",
  },
  {
    id: "exp-5",
    date: "10 Oct 2026",
    description: "High-Speed Fiber Lease Line",
    refLabel: "1 Gbps Common Mesh",
    category: "Utilities",
    propertyName: "Portfolio-wide",
    vendor: "ACT Enterprise",
    vendorVerified: false,
    amount: 12500,
    method: "UPI Autopay",
    receiptLabel: "act_fiber.pdf",
  },
  {
    id: "exp-6",
    date: "04 Oct 2026",
    description: "Waste & Deep Cleaning Supplies",
    refLabel: "Sanitizers & Bio-degraders",
    category: "Supplies",
    propertyName: "Maple Court Apartments",
    vendor: "UrbanShield Pest",
    vendorVerified: false,
    amount: 8500,
    method: "UPI",
    receiptLabel: "urban_inv.pdf",
  },
];

export const totalExpenseEntriesThisMonth = 38;
export const expenseCategories = ["All Categories", "Repairs", "Utilities", "Salaries", "Society Maint", "Supplies"] as const;

export interface OwnerPayoutRow {
  id: string;
  date: string;
  propertyName: string;
  beneficiaryName: string;
  beneficiarySubtitle: string;
  amount: number;
  method: string;
  reference: string;
  memo: string;
  recordedBy: string;
}

export const ownerPayouts: OwnerPayoutRow[] = [
  {
    id: "po-1",
    date: "22 Oct 2026",
    propertyName: "Green View Residency",
    beneficiaryName: "Ankit Verma",
    beneficiarySubtitle: "Lead Lessor (HDFC ...4821)",
    amount: 420000,
    method: "RTGS Transfer",
    reference: "HDFC8839120",
    memo: "Net monthly disbursal post TDS (₹42,000 deducted)",
    recordedBy: "Priya Sharma",
  },
  {
    id: "po-2",
    date: "15 Oct 2026",
    propertyName: "Sunrise PG for Women",
    beneficiaryName: "Koramangala Realty Trust",
    beneficiarySubtitle: "Asset Partnership SPV",
    amount: 380000,
    method: "NEFT Transfer",
    reference: "ICIC9941023",
    memo: "October rental share (80/20 co-living revenue agreement)",
    recordedBy: "Priya Sharma",
  },
  {
    id: "po-3",
    date: "05 Oct 2026",
    propertyName: "Maple Court Apartments",
    beneficiaryName: "Sunita Rao & Partners",
    beneficiarySubtitle: "Joint Owners (SBI ...1902)",
    amount: 250000,
    method: "UPI RazorpayX",
    reference: "RZPX4920199",
    memo: "Advance distribution for October operational window",
    recordedBy: "Priya Sharma",
  },
  {
    id: "po-4",
    date: "28 Sept 2026",
    propertyName: "Portfolio-wide",
    beneficiaryName: "Apex Real Estate Holdings",
    beneficiarySubtitle: "Equity Trustee",
    amount: 190000,
    method: "Bank Cheque",
    reference: "CHQ# 409182",
    memo: "Reserve balance payout & Q3 yield reconciliation",
    recordedBy: "Priya Sharma",
  },
];

export const quarterPayoutTotal = ownerPayouts.reduce((sum, p) => sum + p.amount, 0);

export const pnlStats = {
  totalIncome: 1842000,
  unitsBilled: 163,
  incomeChangeLabel: "+8.4% vs Sept",
  totalExpenses: 284500,
  expenseRatio: 15.4,
  noi: 1557500,
  netMargin: 84.6,
  noiChangeLabel: "+4.4% MoM",
  yieldPercent: 9.2,
  occupancyPercent: 96.2,
};

export interface MonthPoint {
  month: string;
  netIncome: number;
}

export const netIncomeTrajectory: MonthPoint[] = [
  { month: "Nov", netIncome: 1120000 },
  { month: "Dec", netIncome: 1185000 },
  { month: "Jan", netIncome: 1230000 },
  { month: "Feb", netIncome: 1260000 },
  { month: "Mar", netIncome: 1310000 },
  { month: "Apr", netIncome: 1390000 },
  { month: "May", netIncome: 1420000 },
  { month: "Jun", netIncome: 1455000 },
  { month: "Jul", netIncome: 1470000 },
  { month: "Aug", netIncome: 1492000 },
  { month: "Sep", netIncome: 1520000 },
  { month: "Oct", netIncome: 1557500 },
];

export interface MonthIncomeOpex {
  month: string;
  revenue: number;
  opex: number;
}

export const incomeVsOpex: MonthIncomeOpex[] = [
  { month: "May", revenue: 1490000, opex: 210000 },
  { month: "Jun", revenue: 1560000, opex: 225000 },
  { month: "Jul", revenue: 1640000, opex: 230000 },
  { month: "Aug", revenue: 1720000, opex: 245000 },
  { month: "Sep", revenue: 1790000, opex: 258000 },
  { month: "Oct", revenue: 1842000, opex: 284500 },
];

export interface DonutSlice {
  label: string;
  amount: number;
  percent: number;
  colorVar: string;
}

export const incomeByHead: DonutSlice[] = [
  { label: "Base Bed/Room Rent", amount: 1436760, percent: 78, colorVar: "var(--color-accent)" },
  { label: "Electricity Sub-meters", amount: 202620, percent: 11, colorVar: "var(--color-info)" },
  { label: "Water & Sewerage", amount: 92100, percent: 5, colorVar: "var(--color-accent-ink)" },
  { label: "Amenity & Fiber Wi-Fi", amount: 73680, percent: 4, colorVar: "var(--color-gold)" },
  { label: "Late Fees & Onboarding", amount: 36840, percent: 2, colorVar: "var(--color-ink-faint)" },
];

export const opexByCategory: DonutSlice[] = [
  { label: "Repairs & Maintenance", amount: 94500, percent: 33.2, colorVar: "var(--color-accent)" },
  { label: "Utilities: BESCOM/Water", amount: 88200, percent: 31.0, colorVar: "var(--color-info)" },
  { label: "Salaries & Site Security", amount: 65000, percent: 22.8, colorVar: "var(--color-gold)" },
  { label: "Cleaning & Linen", amount: 24300, percent: 8.5, colorVar: "var(--color-accent-ink)" },
  { label: "Listing Ads & Brokerage", amount: 12500, percent: 4.5, colorVar: "var(--color-danger)" },
];

export interface LedgerLine {
  description: string;
  ledgerCode: string;
  prevMonth: number;
  currentMonth: number;
  percentOfRevenue: string;
  variance: string;
  varianceTone: "ok" | "danger" | "neutral";
}

export const revenueLines: LedgerLine[] = [
  { description: "Gross Rental Revenue (163 Units)", ledgerCode: "ACC-4010", prevMonth: 1380000, currentMonth: 1436760, percentOfRevenue: "78.0%", variance: "+4.1% ↑", varianceTone: "ok" },
  { description: "Electricity & Power Backup Sub-meter Billings", ledgerCode: "ACC-4020", prevMonth: 195000, currentMonth: 202620, percentOfRevenue: "11.0%", variance: "+3.9% ↑", varianceTone: "ok" },
  { description: "Water & Sewage Surcharge Recoveries", ledgerCode: "ACC-4030", prevMonth: 88000, currentMonth: 92100, percentOfRevenue: "5.0%", variance: "+4.6% ↑", varianceTone: "ok" },
  { description: "Amenity, Community & High-Speed Wi-Fi Fees", ledgerCode: "ACC-4040", prevMonth: 70000, currentMonth: 73680, percentOfRevenue: "4.0%", variance: "+5.2% ↑", varianceTone: "ok" },
  { description: "Tenant Onboarding Fees, Notice Penalties & Misc", ledgerCode: "ACC-4090", prevMonth: 42000, currentMonth: 36840, percentOfRevenue: "2.0%", variance: "-12.3% ↓", varianceTone: "danger" },
];

export const opexLines: LedgerLine[] = [
  { description: "Building Maintenance & Turnaround Repairs", ledgerCode: "ACC-5010", prevMonth: 88000, currentMonth: 94500, percentOfRevenue: "5.1%", variance: "+7.4% ↑", varianceTone: "danger" },
  { description: "Grid Power (BESCOM) & Water Tankers", ledgerCode: "ACC-5020", prevMonth: 92000, currentMonth: 88200, percentOfRevenue: "4.8%", variance: "-4.1% ↓", varianceTone: "ok" },
  { description: "On-site Staff Wages, Housekeeping & Security", ledgerCode: "ACC-5030", prevMonth: 65000, currentMonth: 65000, percentOfRevenue: "3.5%", variance: "0.0%", varianceTone: "neutral" },
  { description: "Property Consumables & Cleaning Chemicals", ledgerCode: "ACC-5040", prevMonth: 22000, currentMonth: 24300, percentOfRevenue: "1.3%", variance: "+10.4% ↑", varianceTone: "danger" },
  { description: "Marketing, Listing Ads & Brokerage Commissions", ledgerCode: "ACC-5050", prevMonth: 16000, currentMonth: 12500, percentOfRevenue: "0.7%", variance: "-21.8% ↓", varianceTone: "ok" },
];

export const totalRevenue = { prevMonth: 1775000, currentMonth: pnlStats.totalIncome, variance: "+3.8% ↑" };
export const totalOpex = { prevMonth: 283000, currentMonth: pnlStats.totalExpenses, variance: "+0.5% ↑" };
export const noiLine = { prevMonth: 1492000, currentMonth: pnlStats.noi, variance: "+4.4% ↑" };

export const taxStats = {
  tdsDeducted: 124000,
  itc: 26450,
  challanDueDate: "07 Nov 2026",
};
