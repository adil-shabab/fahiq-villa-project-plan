import { properties } from "./properties";
import { tenancies } from "./tenancies";

export type ReportCategory = "financial" | "occupancy" | "operations" | "marketing";

export interface ReportCatalogItem {
  id: string;
  title: string;
  category: ReportCategory;
  badge: string;
  description: string;
  lastViewedLabel: string;
}

export const reportCategories: { id: ReportCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "financial", label: "Financial" },
  { id: "occupancy", label: "Occupancy & Leases" },
  { id: "operations", label: "Operations" },
  { id: "marketing", label: "Marketing" },
];

export const reportCatalog: ReportCatalogItem[] = [
  {
    id: "rent-roll",
    title: "Rent Roll",
    category: "financial",
    badge: "Core Ledger",
    description: "Unit-level lease status, monthly rent rates, security deposits & tenant identities across buildings.",
    lastViewedLabel: "Last viewed 2 days ago",
  },
  {
    id: "occupancy",
    title: "Occupancy",
    category: "occupancy",
    badge: "57% Peak",
    description: "Physical vs economic occupancy rates, bed yield, and floor-level utilization trends.",
    lastViewedLabel: "Last viewed yesterday",
  },
  {
    id: "collections",
    title: "Collections",
    category: "financial",
    badge: "59% Recovered",
    description: "Monthly collection efficiency, payment channels (UPI, NACH, Wire) and overdue debt.",
    lastViewedLabel: "Last viewed 3 hours ago",
  },
  {
    id: "aging",
    title: "Aging",
    category: "financial",
    badge: "₹69,142 Risk",
    description: "Arrears broken into 0–30d, 31–60d, 61–90d and severe default 90d+ recovery tranches.",
    lastViewedLabel: "Last viewed 4 days ago",
  },
  {
    id: "upcoming-vacancies",
    title: "Upcoming Vacancies",
    category: "occupancy",
    badge: "3 Move-outs",
    description: "Confirmed move-outs and 30-day notice rollups for quick housekeeping turnaround.",
    lastViewedLabel: "Last viewed 5 days ago",
  },
  {
    id: "expiring-agreements",
    title: "Expiring Agreements",
    category: "occupancy",
    badge: "4 Expiring",
    description: "Leases expiring within 30, 60, and 90 days needing renewal prompts or rent escalations.",
    lastViewedLabel: "Last viewed 6 days ago",
  },
  {
    id: "utility-consumption",
    title: "Utility Consumption",
    category: "operations",
    badge: "Sub-metered",
    description: "Sub-meter electricity & water usage per bed, tariff reconciliations and tenant apportionments.",
    lastViewedLabel: "Last viewed 1 week ago",
  },
  {
    id: "lead-funnel",
    title: "Lead Funnel",
    category: "marketing",
    badge: "22% Conversion",
    description: "Inquiry to viewing, KYC verification and signed tenancy conversion cycle analytics.",
    lastViewedLabel: "Last viewed 2 days ago",
  },
  {
    id: "vacancy-days",
    title: "Vacancy Days",
    category: "occupancy",
    badge: "4.2 Days Avg",
    description: "Average turnaround downtime per unit between tenant move-out and check-in onboarding.",
    lastViewedLabel: "Last viewed 3 days ago",
  },
  {
    id: "tenant-churn",
    title: "Tenant Churn & Retention",
    category: "occupancy",
    badge: "84% Retained",
    description: "Historical lease renewal ratios and voluntary relocations vs involuntary breach terminations.",
    lastViewedLabel: "Last viewed 1 week ago",
  },
  {
    id: "maintenance-cost",
    title: "Maintenance Cost",
    category: "operations",
    badge: "₹94,500 Capex",
    description: "Preventive vs reactive maintenance expenditures broken down by plumbing, electrical & HVAC.",
    lastViewedLabel: "Last viewed yesterday",
  },
];

export interface RentRollRow {
  unitId: string;
  unitCode: string;
  roomType: string;
  floor: string;
  propertyName: string;
  locality: string;
  tenantName?: string;
  tenantPhone?: string;
  avatarInitials?: string;
  rent: number;
  paymentStatusLabel: string;
  status: "Occupied" | "Available" | "Notice" | "Under Maintenance" | "Booked";
  leaseTermLabel?: string;
  leaseSubLabel?: string;
  leaseSubTone: "warn" | "danger" | "neutral";
  deposit?: number;
  depositSubLabel: string;
}

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

function formatLeaseRange(start?: string, end?: string): string {
  if (!start || !end) return "—";
  const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" });
  return `${fmt(start)} – ${fmt(end)}`;
}

export const rentRoll: RentRollRow[] = properties.flatMap((p) =>
  p.units.map((u): RentRollRow => {
    const tenancy = tenancies.find((t) => t.id === u.id);
    const base: RentRollRow = {
      unitId: u.id,
      unitCode: u.code,
      roomType: u.type,
      floor: u.floor,
      propertyName: p.name,
      locality: p.locality,
      rent: u.rent,
      paymentStatusLabel: "—",
      status: u.status,
      leaseSubTone: "neutral",
      depositSubLabel: "—",
    };

    if (!tenancy) return base;

    const daysToEnd = Math.round((new Date(tenancy.endDate).getTime() - Date.now()) / 86400000);
    return {
      ...base,
      tenantName: tenancy.tenantName,
      tenantPhone: tenancy.phone,
      avatarInitials: tenancy.avatarInitials ?? initials(tenancy.tenantName),
      paymentStatusLabel: tenancy.outstandingBalance > 0 ? `Pending: ₹${tenancy.outstandingBalance.toLocaleString("en-IN")}` : "Paid (UPI Autopay)",
      leaseTermLabel: formatLeaseRange(tenancy.startDate, tenancy.endDate),
      leaseSubLabel:
        tenancy.status === "Notice"
          ? `Checkout by ${new Date(tenancy.vacateDate ?? tenancy.endDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}`
          : daysToEnd > 0
            ? `Expires in ${daysToEnd} days`
            : "Expired",
      leaseSubTone: tenancy.status === "Notice" ? "danger" : daysToEnd <= 60 ? "warn" : "neutral",
      deposit: tenancy.depositHeld,
      depositSubLabel: "2 Months Held",
    };
  }),
);

export const rentRollStats = {
  totalUnits: rentRoll.length,
  occupied: rentRoll.filter((r) => r.status === "Occupied" || r.status === "Notice").length,
  vacant: rentRoll.filter((r) => r.status === "Available" || r.status === "Under Maintenance").length,
  totalMonthlyRent: rentRoll.reduce((sum, r) => (r.status === "Occupied" || r.status === "Notice" ? sum + r.rent : sum), 0),
  totalDeposits: rentRoll.reduce((sum, r) => sum + (r.deposit ?? 0), 0),
};

export interface ScheduledJob {
  id: string;
  title: string;
  frequencyLabel: string;
  formats: string;
  recipients: string[];
}

export const scheduledJobs: ScheduledJob[] = [
  {
    id: "job-1",
    title: "Monthly Rent Roll & Escrow Reconciliation",
    frequencyLabel: "Dispatches automatically on the 1st of every month at 08:00 AM IST",
    formats: "PDF + Excel",
    recipients: ["priya.sharma@fahiq.in", "ankit.verma@fahiq.in", "investors@capitalspv.com"],
  },
  {
    id: "job-2",
    title: "Weekly Collections Defaulters & Aging Summary",
    frequencyLabel: "Dispatches every Monday at 09:00 AM IST for morning operations scrum",
    formats: "PDF",
    recipients: ["operations@fahiq.in", "wardens-all@fahiq.in"],
  },
];
