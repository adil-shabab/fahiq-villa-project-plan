export interface SettingsNavItem {
  id: string;
  label: string;
  icon: string;
  meta?: string;
  metaTone?: "ok" | "neutral" | "dot";
}

export interface SettingsNavGroup {
  label: string;
  items: SettingsNavItem[];
}

export const settingsNavGroups: SettingsNavGroup[] = [
  {
    label: "General Organization",
    items: [
      { id: "business-profile", label: "Business Profile", icon: "apartment", meta: "Configured", metaTone: "ok" },
      { id: "users-roles", label: "Users & Permissions", icon: "group", meta: "4 Active", metaTone: "neutral" },
      { id: "localization-tax", label: "Tax, GST & Currency", icon: "public" },
      { id: "public-site", label: "Tenant Web Portal", icon: "language" },
    ],
  },
  {
    label: "Revenue & Billing",
    items: [
      { id: "billing-policy", label: "Billing Policy", icon: "receipt_long", metaTone: "dot" },
      { id: "reminder-cadence", label: "Reminder Cadence", icon: "forward_to_inbox", meta: "4 Steps", metaTone: "neutral" },
      { id: "invoice-numbering", label: "Invoice Numbering", icon: "tag" },
      { id: "charge-types", label: "Charge Catalogs", icon: "category" },
    ],
  },
  {
    label: "Facilities & Operations",
    items: [
      { id: "utility-rates", label: "Utility & Sub-Meters", icon: "electric_meter" },
      { id: "amenities", label: "Amenities & Assets", icon: "room_service" },
    ],
  },
  {
    label: "Platform & Ecosystem",
    items: [
      { id: "integrations", label: "Integrations & APIs", icon: "hub", meta: "6 Live", metaTone: "ok" },
      { id: "notification-rules", label: "Notification Protocols", icon: "notifications_active" },
    ],
  },
];

export const businessProfile = {
  orgId: "FAH-BLR-0091",
  legalName: "Fahiq Coliving & Hospitality Private Limited",
  brandName: "Fahiq Living",
  address: "Tower B, 4th Floor, Green Glen Layout, Outer Ring Road, Bellandur, Bengaluru, Karnataka - 560103",
  gstin: "29AABCF1234F1Z8",
  pan: "AABCF1234F",
  email: "support@fahiq.com, accounts@fahiq.com",
  phone: "+91 80 4920 8800",
  lastSaved: "28 Sep 2026, 18:24 IST",
  lastSavedBy: "Priya Sharma (Admin)",
  brandThemes: [
    { hex: "#0F5C4D", label: "Emerald (Active)" },
    { hex: "#00338D", label: "Navy" },
    { hex: "#131E17", label: "Slate Dark" },
    { hex: "#785A03", label: "Amber" },
  ],
};

export interface ReminderStep {
  id: string;
  offset: string;
  offsetLabel: string;
  milestone: string;
  subtitle: string;
  templateCode: string;
  channels: { wa: boolean; sms: boolean; email: boolean };
  tone: "accent" | "gold" | "danger";
  escalated?: boolean;
}

export const reminderSteps: ReminderStep[] = [
  {
    id: "step-1",
    offset: "-5 Days",
    offsetLabel: "-5 Days",
    milestone: "Advance Invoice Intimation",
    subtitle: "Triggers at 10:00 AM IST",
    templateCode: "rent_gen_v3_friendly",
    channels: { wa: true, sms: false, email: false },
    tone: "accent",
  },
  {
    id: "step-2",
    offset: "Due Day (0)",
    offsetLabel: "Due Day (0)",
    milestone: "Rent Due Today & Instant UPI Intent",
    subtitle: "Dynamic QR attachment embedded",
    templateCode: "rent_due_today_paylink",
    channels: { wa: true, sms: true, email: false },
    tone: "accent",
  },
  {
    id: "step-3",
    offset: "+3 Days",
    offsetLabel: "+3 Days",
    milestone: "Final Grace Window Reminder",
    subtitle: "Warns of upcoming ₹100/day fee",
    templateCode: "grace_warning_strict",
    channels: { wa: true, sms: true, email: false },
    tone: "gold",
  },
  {
    id: "step-4",
    offset: "+7 Days",
    offsetLabel: "+7 Days",
    milestone: "Default Notice & Room Keycard Freeze Warning",
    subtitle: "Escalated to Property Manager",
    templateCode: "legal_escalation_v1",
    channels: { wa: true, sms: true, email: true },
    tone: "danger",
    escalated: true,
  },
];

export interface IntegrationCard {
  id: string;
  name: string;
  description: string;
  statusLabel: string;
  metaLeft: string;
  metaRight: string;
  primaryAction: string;
  secondaryAction: string;
}

export const integrations: IntegrationCard[] = [
  {
    id: "whatsapp",
    name: "WhatsApp Business Cloud",
    description: "Meta Official BSP (Gupshup Route). Auto dispatches, reminders & digital OTPs.",
    statusLabel: "Connected",
    metaLeft: "waba_prod_••••••9841",
    metaRight: "+91 98450 11234",
    primaryAction: "Configure",
    secondaryAction: "Test",
  },
  {
    id: "razorpay",
    name: "RazorpayX & Payments",
    description: "Virtual bank accounts (Smart Collect) & e-NACH auto-debit mandating.",
    statusLabel: "Connected",
    metaLeft: "rzp_live_••••••2819",
    metaRight: "eNACH Live",
    primaryAction: "Webhooks",
    secondaryAction: "Ledger",
  },
  {
    id: "ses",
    name: "Amazon SES (Transactional)",
    description: "Delivers formal tax invoice PDFs and legal eviction notices.",
    statusLabel: "Connected",
    metaLeft: "billing@fahiq.com",
    metaRight: "99.8% inbox",
    primaryAction: "DKIM / SPF",
    secondaryAction: "Test",
  },
  {
    id: "fast2sms",
    name: "Fast2SMS DLT Gateway",
    description: "Fallback Indian transactional telecom route for offline alerts.",
    statusLabel: "Verified",
    metaLeft: "DLT-1107294821",
    metaRight: "Header: FAHIQ",
    primaryAction: "Headers",
    secondaryAction: "Credits",
  },
  {
    id: "maps",
    name: "Google Maps Geocoding",
    description: "Powers property locator, tech arrival tracker, and geofenced locks.",
    statusLabel: "Live",
    metaLeft: "Places & Distance Matrix",
    metaRight: "84% Quota",
    primaryAction: "Key Auth",
    secondaryAction: "Usage",
  },
  {
    id: "leegality",
    name: "Leegality e-Sign & Stamp",
    description: "Automated Karnataka e-stamping and Aadhaar OTP lease signing.",
    statusLabel: "Escrow Active",
    metaLeft: "Stamp Escrow: ₹14,200",
    metaRight: "142 Stamps Left",
    primaryAction: "Top-up Balance",
    secondaryAction: "Logs",
  },
];

export const billingPolicyDefaults = {
  dueDateOptions: ["1st of every calendar month", "5th of every calendar month", "7th of every calendar month", "10th of every calendar month"],
  dueDate: "1st of every calendar month",
  graceDays: 5,
  lateFeeFormula: "Per Day",
  dailyAccrual: 100,
  maxCap: 1500,
  invoicePrefix: "INV-2026-",
  nextSequence: "INV-2026-0582",
  fiscalYear: "April 01 to March 31 (Indian FY 2026-27)",
  billDeliveryMode: "Consolidated" as "Consolidated" | "Itemized Split",
  prorationBasis: "Actual Days (28-31)" as "Actual Days (28-31)" | "Fixed 30-Day Base",
};

export const chargeTypeDefaults = {
  title: "High-Speed Dedicated Fiber 1Gbps",
  code: "CHG-FIBER-1G",
  amount: "850.00",
  recurring: true,
  taxable: true,
};

export const amenityCategories = ["Structure & Utilities", "Room Furnishing", "Entertainment & Social", "Safety & Biometrics"];
