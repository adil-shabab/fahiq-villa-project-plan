export type TicketStatus = "Open" | "Assigned" | "In Progress" | "On Hold" | "Resolved" | "Closed";
export type TicketPriority = "Low" | "Medium" | "High" | "Urgent";
export type TicketCategory =
  | "Plumbing"
  | "Electrical"
  | "Appliance"
  | "Carpentry"
  | "Pest Control"
  | "Internet"
  | "Cleaning"
  | "Security"
  | "Structural";

export interface MaintenanceTicket {
  id: string;
  title: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  propertyName: string;
  unitLabel: string;
  tenantName?: string;
  tenantPhone?: string;
  reportedAt: string;
  reportedVia: string;
  slaTargetHours: number;
  slaRemainingLabel: string;
  overdue: boolean;
  assigneeName?: string;
  assigneeKind?: "vendor" | "staff";
  rating?: number;
  ratingBy?: string;
  note?: string;
  closedLabel?: string;
  signoff?: string;
}

export const categories: TicketCategory[] = [
  "Plumbing",
  "Electrical",
  "Appliance",
  "Carpentry",
  "Pest Control",
  "Internet",
  "Cleaning",
  "Security",
  "Structural",
];

export const statusColumns: TicketStatus[] = ["Open", "Assigned", "In Progress", "On Hold", "Resolved", "Closed"];

export const tickets: MaintenanceTicket[] = [
  {
    id: "T-204",
    title: "Master Bath Geyser Leaking & Tripping MCB",
    category: "Plumbing",
    priority: "Urgent",
    status: "Open",
    propertyName: "Green View Residency",
    unitLabel: "A-101",
    tenantName: "Rahul Sharma",
    tenantPhone: "+91 98450 11234",
    reportedAt: "2026-10-01T08:30:00+05:30",
    reportedVia: "Resident App",
    slaTargetHours: 2,
    slaRemainingLabel: "Overdue · 2h ago",
    overdue: true,
  },
  {
    id: "T-208",
    title: "Wi-Fi Router 5GHz Band Dropping Packets",
    category: "Internet",
    priority: "Medium",
    status: "Open",
    propertyName: "Maple Court Apartments",
    unitLabel: "B-204",
    tenantName: "Ananya Rao",
    reportedAt: "2026-10-01T11:00:00+05:30",
    reportedVia: "WhatsApp",
    slaTargetHours: 12,
    slaRemainingLabel: "4h left",
    overdue: false,
    assigneeName: "Rajesh Kumar",
    assigneeKind: "staff",
  },
  {
    id: "T-211",
    title: "Balcony French Door Latch Jammed",
    category: "Carpentry",
    priority: "Low",
    status: "Open",
    propertyName: "Lake Breeze Flats",
    unitLabel: "G-02",
    reportedAt: "2026-10-01T09:15:00+05:30",
    reportedVia: "Phone Call",
    slaTargetHours: 48,
    slaRemainingLabel: "18h left",
    overdue: false,
  },
  {
    id: "T-201",
    title: "Daikin Inverter AC Not Cooling (E4 Error)",
    category: "Appliance",
    priority: "High",
    status: "Assigned",
    propertyName: "Maple Court Apartments",
    unitLabel: "C-401",
    tenantName: "Mohammed Irfan",
    reportedAt: "2026-10-01T07:40:00+05:30",
    reportedVia: "Resident App",
    slaTargetHours: 8,
    slaRemainingLabel: "1h 30m left",
    overdue: false,
    assigneeName: "CoolCare HVAC",
    assigneeKind: "vendor",
  },
  {
    id: "T-205",
    title: "Quarterly Cockroach & Termite Treatment",
    category: "Pest Control",
    priority: "Medium",
    status: "Assigned",
    propertyName: "Silver Oak Hostel",
    unitLabel: "Townhouse TH-02",
    reportedAt: "2026-10-01T06:00:00+05:30",
    reportedVia: "Scheduled",
    slaTargetHours: 24,
    slaRemainingLabel: "5h left",
    overdue: false,
    assigneeName: "UrbanShield Pest",
    assigneeKind: "vendor",
  },
  {
    id: "T-198",
    title: "Kitchen Exhaust Fan Motor Sparking",
    category: "Electrical",
    priority: "Urgent",
    status: "In Progress",
    propertyName: "Sunrise PG for Women",
    unitLabel: "D-302",
    tenantName: "Priyanka Das",
    reportedAt: "2026-10-01T05:30:00+05:30",
    reportedVia: "Resident App",
    slaTargetHours: 2,
    slaRemainingLabel: "Overdue · 45m",
    overdue: true,
    assigneeName: "SpeedyElectro",
    assigneeKind: "vendor",
  },
  {
    id: "T-199",
    title: "Main Overhead Tank Float Valve Overflow",
    category: "Plumbing",
    priority: "Urgent",
    status: "In Progress",
    propertyName: "Green View Residency",
    unitLabel: "Common Area · Roof",
    reportedAt: "2026-10-01T06:50:00+05:30",
    reportedVia: "Staff Report",
    slaTargetHours: 1,
    slaRemainingLabel: "30m left",
    overdue: false,
    assigneeName: "Ankit Verma (Lead)",
    assigneeKind: "staff",
  },
  {
    id: "T-194",
    title: "Washing Machine Drum Bearing Replacement",
    category: "Appliance",
    priority: "Medium",
    status: "On Hold",
    propertyName: "Maple Court Apartments",
    unitLabel: "Clubhouse Laundry",
    reportedAt: "2026-09-28T10:00:00+05:30",
    reportedVia: "Staff Report",
    slaTargetHours: 48,
    slaRemainingLabel: "Paused",
    overdue: false,
    assigneeName: "CoolCare HVAC",
    assigneeKind: "vendor",
    note: "Waiting for Spare Part (Samsung India dispatch)",
  },
  {
    id: "T-189",
    title: "MCB Sub-meter Calibrated & Replaced",
    category: "Electrical",
    priority: "High",
    status: "Resolved",
    propertyName: "Green View Residency",
    unitLabel: "A-102",
    tenantName: "Fatima Khan",
    reportedAt: "2026-09-29T09:00:00+05:30",
    reportedVia: "Resident App",
    slaTargetHours: 8,
    slaRemainingLabel: "Resolved (2h 15m)",
    overdue: false,
    assigneeName: "SpeedyElectro",
    assigneeKind: "vendor",
    rating: 5,
    ratingBy: "Fatima K.",
  },
  {
    id: "T-178",
    title: "Deep Sanitization & Mattress Steam Clean",
    category: "Cleaning",
    priority: "Low",
    status: "Closed",
    propertyName: "Sunrise PG for Women",
    unitLabel: "D-207",
    tenantName: "Ayesha Siddiqui",
    reportedAt: "2026-09-21T09:00:00+05:30",
    reportedVia: "Scheduled",
    slaTargetHours: 48,
    slaRemainingLabel: "Closed on 21 Sept",
    overdue: false,
    closedLabel: "Signoff OK",
  },
  {
    id: "T-165",
    title: "Clubhouse CCTV Camera 3 Night Vision Failure",
    category: "Security",
    priority: "Medium",
    status: "Closed",
    propertyName: "Lake Breeze Flats",
    unitLabel: "Common Area · Lobby",
    reportedAt: "2026-09-18T09:00:00+05:30",
    reportedVia: "Staff Report",
    slaTargetHours: 24,
    slaRemainingLabel: "Closed on 18 Sept",
    overdue: false,
    closedLabel: "Signoff OK",
  },
  {
    id: "T-152",
    title: "Lobby Ceiling Plaster Crack Repair",
    category: "Structural",
    priority: "Low",
    status: "Closed",
    propertyName: "Silver Oak Hostel",
    unitLabel: "Common Area · Lobby",
    reportedAt: "2026-09-10T09:00:00+05:30",
    reportedVia: "Staff Report",
    slaTargetHours: 72,
    slaRemainingLabel: "Closed on 12 Sept",
    overdue: false,
    closedLabel: "Signoff OK",
  },
];

export const focusTicket = {
  ticketId: "T-204",
  reportedAgoLabel: "Reported 2h 42m ago",
  description:
    "Water dripping continuously from AO Smith 25L geyser inlet pipe joint. When turned on, main MCB trips immediately with burning plastic smell. Tenant advised to switch off bathroom sub-meter breaker.",
  photos: [
    { label: "Inlet Hose Leak", seed: "t204-photo-1" },
    { label: "Tripped MCB Box", seed: "t204-photo-2" },
  ],
  hasVideo: true,
  videoDuration: "0:14",
  auditLogId: "LOG-8812",
  notes: [
    {
      author: "Rajesh Kumar (Facility Supervisor)",
      time: "08:45 AM",
      body: "Spoke to tenant. Power cut to bathroom geyser line as safety measure. CoolCare alerted under emergency 2-hour SLA. Technician Mukesh Sharma dispatched with replacement heating element & braided hose.",
      kind: "internal" as const,
    },
    {
      author: "Fahiq Ops (WhatsApp & Resident App)",
      time: "09:05 AM",
      body: "Hi Rahul, technician Mukesh Sharma from CoolCare HVAC is assigned and will arrive today between 11:30 AM - 12:00 PM. Verification OTP: 4920.",
      kind: "tenant" as const,
    },
  ],
  assignment: {
    vendorName: "CoolCare HVAC & Plumbing",
    technicianName: "Mukesh Sharma",
    technicianPhone: "+91 98765 43210",
    targetSlaLabel: "2 Hours",
    breachLabel: "+18 mins",
  },
  costs: [
    { label: "Standard Inspection & Plumber Labor", amount: 450 },
    { label: "Braided Hose & 3kW Heating Element", amount: 1850 },
  ],
  poNumber: "PO-9912",
  otp: "4920",
};

export interface Vendor {
  id: string;
  name: string;
  tier: string;
  rating: number;
  jobCount: number;
  specialties: string[];
  phone: string;
  rateCard: string;
}

export const vendors: Vendor[] = [
  {
    id: "v-coolcare",
    name: "CoolCare HVAC & Plumbing",
    tier: "Tier 1 Partner",
    rating: 4.9,
    jobCount: 42,
    specialties: ["Plumbing", "HVAC / AC", "Geyser"],
    phone: "+91 98234 11092",
    rateCard: "Inspection: ₹250 · AC Gas: ₹1,800 · Pipe: ₹400",
  },
  {
    id: "v-speedyelectro",
    name: "SpeedyElectro Tech",
    tier: "Tier 1 Partner",
    rating: 4.8,
    jobCount: 38,
    specialties: ["Electrical", "Sub-meters", "MCB Panels"],
    phone: "+91 99100 88231",
    rateCard: "Electrician Visit: ₹300 · Board: ₹500",
  },
  {
    id: "v-urbanshield",
    name: "UrbanShield Pest Control",
    tier: "On-Demand",
    rating: 4.7,
    jobCount: 19,
    specialties: ["Pest Control", "Termite", "Bedbugs"],
    phone: "+91 98450 67890",
    rateCard: "Full 2BHK Spray: ₹1,400 · Termite: ₹3,500",
  },
  {
    id: "v-ceasefire",
    name: "CeaseFire & Security",
    tier: "Annual Contract",
    rating: 4.9,
    jobCount: 12,
    specialties: ["Fire Safety", "CCTV", "Biometric"],
    phone: "+91 98860 12345",
    rateCard: "Refill ABC 4kg: ₹850 · Camera Repair: ₹650",
  },
];

export interface PreventiveSchedule {
  id: string;
  name: string;
  category: TicketCategory | "Power" | "Fire Safety" | "Water";
  scope: string;
  frequency: string;
  nextDueLabel: string;
  dueSoon: boolean;
  vendorName: string;
  lastCompletedLabel: string;
}

export const preventiveSchedules: PreventiveSchedule[] = [
  {
    id: "ps-1",
    name: "AC Pre-Summer Overhaul — Block A",
    category: "Appliance",
    scope: "Green View Residency (24 Units)",
    frequency: "Quarterly",
    nextDueLabel: "05 Oct 2026 (In 3 days)",
    dueSoon: true,
    vendorName: "CoolCare HVAC",
    lastCompletedLabel: "05 Jul 2026",
  },
  {
    id: "ps-2",
    name: "DG Set 125kVA Load Test & Diesel Top-up",
    category: "Power",
    scope: "All Properties (Common Area)",
    frequency: "Monthly",
    nextDueLabel: "15 Oct 2026",
    dueSoon: false,
    vendorName: "Kirloskar PowerCare",
    lastCompletedLabel: "15 Sept 2026",
  },
  {
    id: "ps-3",
    name: "Fire Safety & Extinguisher Hydro-Test",
    category: "Fire Safety",
    scope: "Maple Court & Silver Oak",
    frequency: "Half-Yearly",
    nextDueLabel: "20 Dec 2026",
    dueSoon: false,
    vendorName: "CeaseFire Safety",
    lastCompletedLabel: "20 Jun 2026",
  },
  {
    id: "ps-4",
    name: "RO Water Plant Membrane & Sediment Filter",
    category: "Water",
    scope: "Sunrise PG for Women",
    frequency: "Monthly",
    nextDueLabel: "03 Oct 2026 (Tomorrow)",
    dueSoon: true,
    vendorName: "Aquaguard Commercial",
    lastCompletedLabel: "03 Sept 2026",
  },
];

export const recentCompletions = [
  { name: "Elevator Annual Fitness Test", vendor: "Schindler India", date: "28 Sept 2026", invoiceAmount: 8400 },
  { name: "Solar Water Heater Descaling", vendor: "SunPower Solar", date: "24 Sept 2026", invoiceAmount: 3200 },
  { name: "CCTV NVR Backup Drive Swapped", vendor: "CeaseFire Systems", date: "19 Sept 2026", invoiceAmount: 4100 },
];

export interface AssetRecord {
  code: string;
  name: string;
  location: string;
  category: string;
  purchaseDate: string;
  warrantyLabel: string;
  warrantyTone: "ok" | "warn" | "danger";
  lastServiced: string;
  statusLabel: string;
  statusTone: "ok" | "danger";
}

export const assets: AssetRecord[] = [
  {
    code: "AST-DAIK-101",
    name: "Split AC 1.5 Ton 5-Star Inverter",
    location: "Unit A-101 · Green View Residency",
    category: "HVAC",
    purchaseDate: "14 Mar 2024",
    warrantyLabel: "14 Mar 2027 · Active",
    warrantyTone: "ok",
    lastServiced: "12 Jul 2026",
    statusLabel: "Operational",
    statusTone: "ok",
  },
  {
    code: "AST-AOSM-101",
    name: "AO Smith 25L Storage Geyser",
    location: "Unit A-101 (Master Bath)",
    category: "Plumbing / Heat",
    purchaseDate: "20 Jun 2024",
    warrantyLabel: "Expires in 12 days",
    warrantyTone: "danger",
    lastServiced: "08 Apr 2026",
    statusLabel: "Under Ticket",
    statusTone: "danger",
  },
  {
    code: "AST-KIRL-GEN",
    name: "Kirloskar 125kVA Silent Diesel Generator",
    location: "Ground Utility Yard",
    category: "Power Backup",
    purchaseDate: "11 Jan 2023",
    warrantyLabel: "AMC Active",
    warrantyTone: "ok",
    lastServiced: "15 Sept 2026",
    statusLabel: "Operational",
    statusTone: "ok",
  },
];

export function ticketCount(status: TicketStatus) {
  return tickets.filter((t) => t.status === status).length;
}

export const openTicketCount = tickets.filter((t) => t.status !== "Resolved" && t.status !== "Closed").length;
export const slaBreachedCount = tickets.filter((t) => t.overdue).length;
export const preventiveActiveCount = preventiveSchedules.length;

export function categoryCount(category: TicketCategory) {
  return tickets.filter((t) => t.category === category).length;
}
