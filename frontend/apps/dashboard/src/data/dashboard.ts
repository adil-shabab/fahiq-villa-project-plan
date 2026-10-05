// Dummy data for the frontend-only prototype. No backend — shapes mirror the
// API responses described in docs/06-api-design.md so wiring up the real
// backend later is a drop-in swap for these constants.

export type Trend = "up" | "down" | "flat";

export interface KpiCardData {
  id: string;
  label: string;
  value: string;
  trend?: { direction: Trend; label: string };
  tone?: "default" | "danger";
}

export const kpis: KpiCardData[] = [
  { id: "occupancy", label: "Occupancy Rate", value: "87%", trend: { direction: "up", label: "+2% vs last month" } },
  { id: "units-occupied", label: "Units Occupied", value: "142 / 163" },
  { id: "properties", label: "Total Properties", value: "12" },
  { id: "expected", label: "Expected Rent This Month", value: "₹18,42,000" },
  { id: "collected", label: "Collected So Far", value: "₹14,20,500" },
  { id: "outstanding", label: "Outstanding", value: "₹4,21,500", tone: "danger" },
  { id: "overdue", label: "Overdue Tenants", value: "12", tone: "danger" },
  { id: "new-leads", label: "New Leads This Week", value: "9", trend: { direction: "up", label: "+4 vs last week" } },
];

export interface CollectionMonth {
  month: string;
  billed: number;
  collected: number;
}

export const collectionTrend: CollectionMonth[] = [
  { month: "Apr", billed: 1620000, collected: 1510000 },
  { month: "May", billed: 1655000, collected: 1600000 },
  { month: "Jun", billed: 1702000, collected: 1580000 },
  { month: "Jul", billed: 1748000, collected: 1690000 },
  { month: "Aug", billed: 1790000, collected: 1705000 },
  { month: "Sep", billed: 1842000, collected: 1420500 },
];

export interface OccupancyMonth {
  month: string;
  occupied: number;
}

export const occupancyTrend: OccupancyMonth[] = [
  { month: "Oct", occupied: 128 },
  { month: "Nov", occupied: 131 },
  { month: "Dec", occupied: 126 },
  { month: "Jan", occupied: 133 },
  { month: "Feb", occupied: 137 },
  { month: "Mar", occupied: 135 },
  { month: "Apr", occupied: 139 },
  { month: "May", occupied: 140 },
  { month: "Jun", occupied: 136 },
  { month: "Jul", occupied: 138 },
  { month: "Aug", occupied: 141 },
  { month: "Sep", occupied: 142 },
];

export interface AgingBucket {
  id: string;
  label: string;
  amount: number;
}

export const agingBuckets: AgingBucket[] = [
  { id: "0-30", label: "0–30 days", amount: 198000 },
  { id: "31-60", label: "31–60 days", amount: 134000 },
  { id: "61-90", label: "61–90 days", amount: 56500 },
  { id: "90+", label: "90+ days", amount: 33000 },
];

export interface PropertyRevenue {
  id: string;
  name: string;
  amount: number;
}

export const revenueByProperty: PropertyRevenue[] = [
  { id: "green-view", name: "Green View Residency", amount: 312000 },
  { id: "sunrise-pg", name: "Sunrise PG for Women", amount: 268000 },
  { id: "maple-court", name: "Maple Court Apartments", amount: 241000 },
  { id: "silver-oak", name: "Silver Oak Hostel", amount: 196000 },
  { id: "lake-breeze", name: "Lake Breeze Flats", amount: 174000 },
];

export interface ActionItem {
  id: string;
  label: string;
  count: number;
  icon: "file-clock" | "id-card" | "gauge" | "message-circle" | "banknote";
  href: string;
}

export const actionItems: ActionItem[] = [
  { id: "expiring", label: "Leases expiring in 30 days", count: 5, icon: "file-clock", href: "/tenancies/renewals" },
  { id: "kyc", label: "KYC documents pending verification", count: 8, icon: "id-card", href: "/onboarding" },
  { id: "meters", label: "Units missing this month's meter reading", count: 3, icon: "gauge", href: "/properties/meters" },
  { id: "inbox", label: "Unread WhatsApp messages", count: 6, icon: "message-circle", href: "/messaging/inbox" },
  { id: "offline-payments", label: "Offline payments awaiting approval", count: 2, icon: "banknote", href: "/payments/collections" },
];

export interface MoveEvent {
  id: string;
  tenantName: string;
  unitCode: string;
  avatarInitials: string;
}

export const movingInToday: MoveEvent[] = [
  { id: "mi-1", tenantName: "Ananya Rao", unitCode: "B-204", avatarInitials: "AR" },
  { id: "mi-2", tenantName: "Vikram Shah", unitCode: "A-110", avatarInitials: "VS" },
];

export const movingOutToday: MoveEvent[] = [
  { id: "mo-1", tenantName: "Karan Mehta", unitCode: "C-301", avatarInitials: "KM" },
];

export interface FollowUpRow {
  id: string;
  tenantName: string;
  avatarInitials: string;
  unitCode: string;
  propertyName: string;
  amountDue: number;
  daysOverdue: number;
}

export const followUpQueue: FollowUpRow[] = [
  { id: "f1", tenantName: "Rahul Sharma", avatarInitials: "RS", unitCode: "A-101", propertyName: "Green View Residency", amountDue: 16462, daysOverdue: 9 },
  { id: "f2", tenantName: "Priyanka Das", avatarInitials: "PD", unitCode: "D-207", propertyName: "Sunrise PG for Women", amountDue: 9800, daysOverdue: 5 },
  { id: "f3", tenantName: "Mohammed Irfan", avatarInitials: "MI", unitCode: "B-112", propertyName: "Maple Court Apartments", amountDue: 14230, daysOverdue: 3 },
  { id: "f4", tenantName: "Sneha Kulkarni", avatarInitials: "SK", unitCode: "A-305", propertyName: "Green View Residency", amountDue: 21050, daysOverdue: 15 },
  { id: "f5", tenantName: "Arjun Nair", avatarInitials: "AN", unitCode: "C-118", propertyName: "Silver Oak Hostel", amountDue: 7600, daysOverdue: 1 },
];

export interface ActivityEvent {
  id: string;
  icon: "payment" | "lead" | "ticket";
  text: string;
  time: string;
}

export const recentActivity: ActivityEvent[] = [
  { id: "a1", icon: "payment", text: "Payment received from Rahul Sharma · ₹15,000", time: "2 min ago" },
  { id: "a2", icon: "lead", text: "New enquiry from website · Green View Residency", time: "14 min ago" },
  { id: "a3", icon: "ticket", text: "Ticket #204 marked resolved", time: "1 hour ago" },
  { id: "a4", icon: "payment", text: "Payment received from Sneha Kulkarni · ₹18,500", time: "3 hours ago" },
  { id: "a5", icon: "lead", text: "Visit scheduled with Arjun Nair · Silver Oak Hostel", time: "5 hours ago" },
];

export interface CurrentUser {
  name: string;
  role: string;
  initials: string;
}

export const currentUser: CurrentUser = {
  name: "Priya Sharma",
  role: "Property Manager",
  initials: "PS",
};

export interface Property {
  id: string;
  name: string;
  unitCount: number;
}

export const properties: Property[] = [
  { id: "green-view", name: "Green View Residency", unitCount: 24 },
  { id: "sunrise-pg", name: "Sunrise PG for Women", unitCount: 18 },
  { id: "maple-court", name: "Maple Court Apartments", unitCount: 32 },
  { id: "silver-oak", name: "Silver Oak Hostel", unitCount: 21 },
  { id: "lake-breeze", name: "Lake Breeze Flats", unitCount: 16 },
];
