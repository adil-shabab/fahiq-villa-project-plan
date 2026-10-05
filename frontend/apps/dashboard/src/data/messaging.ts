export type ConversationTagTone = "neutral" | "danger" | "accent" | "gold";

export interface ConversationTag {
  label: string;
  tone: ConversationTagTone;
}

export interface Conversation {
  id: string;
  name: string;
  avatarInitials: string;
  phone: string;
  unitLabel: string;
  propertyName: string;
  isLead: boolean;
  lastMessagePreview: string;
  timeLabel: string;
  unreadCount: number;
  tags: ConversationTag[];
  readStatus: "sent" | "delivered" | "read" | "none";
  sessionActive: boolean;
  sessionRemainingLabel: string;
}

export const conversations: Conversation[] = [
  {
    id: "c-rahul-sharma",
    name: "Rahul Sharma",
    avatarInitials: "RS",
    phone: "+91 98450 11223",
    unitLabel: "A-101",
    propertyName: "Green View Residency",
    isLead: false,
    lastMessagePreview: "Water dripping from AO Smith geyser, MCB tripping...",
    timeLabel: "14m ago",
    unreadCount: 1,
    tags: [
      { label: "Tenant", tone: "neutral" },
      { label: "Urgent", tone: "danger" },
    ],
    readStatus: "none",
    sessionActive: true,
    sessionRemainingLabel: "18h 42m",
  },
  {
    id: "c-vikram-shah",
    name: "Vikram Shah",
    avatarInitials: "VS",
    phone: "+91 98220 99001",
    unitLabel: "E-208",
    propertyName: "Lake Breeze Flats",
    isLead: false,
    lastMessagePreview: "Thanks for the deposit calculation. When will UPI reflect?",
    timeLabel: "1h ago",
    unreadCount: 0,
    tags: [
      { label: "Move-out", tone: "gold" },
      { label: "Notice", tone: "neutral" },
    ],
    readStatus: "read",
    sessionActive: true,
    sessionRemainingLabel: "21h 10m",
  },
  {
    id: "c-priyanka-das",
    name: "Priyanka Das",
    avatarInitials: "PD",
    phone: "+91 98103 67890",
    unitLabel: "D-201",
    propertyName: "Sunrise PG for Women",
    isLead: false,
    lastMessagePreview: "Parent transferring via NEFT today 2 PM, will confirm",
    timeLabel: "3h ago",
    unreadCount: 2,
    tags: [{ label: "Collections", tone: "neutral" }],
    readStatus: "none",
    sessionActive: true,
    sessionRemainingLabel: "9h 05m",
  },
  {
    id: "c-priya-nambiar",
    name: "Priya Nambiar",
    avatarInitials: "PN",
    phone: "+91 90080 12456",
    unitLabel: "Prospect",
    propertyName: "Inbound Lead",
    isLead: true,
    lastMessagePreview: "Is the single room in Indiranagar still available for June 1st?",
    timeLabel: "5h ago",
    unreadCount: 1,
    tags: [
      { label: "New Lead", tone: "accent" },
      { label: "Unassigned", tone: "neutral" },
    ],
    readStatus: "none",
    sessionActive: true,
    sessionRemainingLabel: "19h 50m",
  },
  {
    id: "c-arjun-nair",
    name: "Arjun Nair",
    avatarInitials: "AN",
    phone: "+91 96543 77889",
    unitLabel: "C-118",
    propertyName: "Silver Oak Hostel",
    isLead: false,
    lastMessagePreview: "Sent Aadhaar scan for KYC verification",
    timeLabel: "Yesterday",
    unreadCount: 0,
    tags: [{ label: "Onboarding", tone: "neutral" }],
    readStatus: "delivered",
    sessionActive: false,
    sessionRemainingLabel: "Expired",
  },
  {
    id: "c-mohammed-irfan",
    name: "Mohammed Irfan",
    avatarInitials: "MI",
    phone: "+91 90226 33445",
    unitLabel: "B-112",
    propertyName: "Maple Court Apartments",
    isLead: false,
    lastMessagePreview: "Maintenance team resolved the water pump noise. Thank you!",
    timeLabel: "2d ago",
    unreadCount: 0,
    tags: [{ label: "Resolved", tone: "neutral" }],
    readStatus: "read",
    sessionActive: false,
    sessionRemainingLabel: "Expired",
  },
];

export interface MessageBubble {
  id: string;
  kind: "incoming" | "outgoing" | "bot";
  body: string;
  time: string;
  photoLabel?: string;
  read?: boolean;
}

export const threads: Record<string, MessageBubble[]> = {
  "c-rahul-sharma": [
    {
      id: "m1",
      kind: "incoming",
      body: "Hi Fahiq team, there is urgent water dripping from the AO Smith geyser in Unit A-101 and the bathroom MCB switch tripped. Please send someone urgently.",
      time: "08:30 AM",
      photoLabel: "IMG_2941.jpg",
    },
    {
      id: "m2",
      kind: "outgoing",
      body: "Hello Rahul, we have received your emergency request. Creating maintenance ticket #T-204 immediately. Technician Mukesh Sharma from CoolCare HVAC is assigned and will arrive by 11:30 AM.",
      time: "08:45 AM",
      read: true,
    },
    {
      id: "m3",
      kind: "bot",
      body: "Ticket #T-204 dispatched. SLA: 2 Hours. Verification OTP: 4920.",
      time: "08:46 AM",
      read: true,
    },
    {
      id: "m4",
      kind: "incoming",
      body: "Thank you. Mukesh arrived and checked the heating element. Awaiting replacement parts.",
      time: "09:12 AM",
    },
    {
      id: "m5",
      kind: "outgoing",
      body: "Great. Plumber labor is ₹450 covered by building warranty, parts ₹1,850 under standard wear & tear. We will share the job sheet shortly.",
      time: "09:20 AM",
      read: true,
    },
  ],
  "c-vikram-shah": [
    {
      id: "m1",
      kind: "incoming",
      body: "Hi, I moved out of E-208 on 10th. Could you share the deposit settlement breakup?",
      time: "Yesterday, 05:40 PM",
    },
    {
      id: "m2",
      kind: "outgoing",
      body: "Hi Vikram, deposit of ₹30,000 less ₹2,200 deductions (cleaning + minor repairs) = ₹27,800 net refund. Processing via RazorpayX UPI payout.",
      time: "Yesterday, 06:05 PM",
      read: true,
    },
    {
      id: "m3",
      kind: "incoming",
      body: "Thanks for the deposit calculation. When will UPI reflect?",
      time: "1h ago",
    },
  ],
  "c-priyanka-das": [
    {
      id: "m1",
      kind: "outgoing",
      body: "Hi Priyanka, your rent of ₹9,800 for D-201 is now 2 days overdue. Please confirm a payment date at your earliest.",
      time: "Today, 09:50 AM",
      read: true,
    },
    {
      id: "m2",
      kind: "incoming",
      body: "Sorry for the delay! Parent transferring via NEFT today 2 PM, will confirm once done.",
      time: "3h ago",
    },
  ],
  "c-priya-nambiar": [
    {
      id: "m1",
      kind: "incoming",
      body: "Hi, is the single room in Indiranagar still available for June 1st?",
      time: "5h ago",
    },
  ],
  "c-arjun-nair": [
    {
      id: "m1",
      kind: "outgoing",
      body: "Hi Arjun, welcome aboard! Please share your Aadhaar front & back for KYC verification to complete onboarding.",
      time: "Yesterday, 10:00 AM",
      read: true,
    },
    {
      id: "m2",
      kind: "incoming",
      body: "Sent Aadhaar scan for KYC verification",
      time: "Yesterday",
      photoLabel: "AADHAAR_SCAN.pdf",
    },
  ],
  "c-mohammed-irfan": [
    {
      id: "m1",
      kind: "outgoing",
      body: "Hi Mohammed, our technician has resolved the water pump noise reported at B-112. Please confirm all is well.",
      time: "2d ago",
      read: true,
    },
    {
      id: "m2",
      kind: "incoming",
      body: "Maintenance team resolved the water pump noise. Thank you!",
      time: "2d ago",
    },
  ],
};

export const quickShortcuts = ["/quick-replies", "/payment-link", "/ticket", "/kyc-reminder"];

export interface HsmTemplate {
  id: string;
  label: string;
}

export const hsmTemplates: HsmTemplate[] = [
  { id: "rent_reminder_v2", label: "Rent Overdue Reminder (rent_reminder_v2)" },
  { id: "payment_rcpt_v1", label: "Payment Receipt Acknowledgement (payment_rcpt_v1)" },
  { id: "maint_status_v3", label: "Maintenance Ticket Update (maint_status_v3)" },
  { id: "rent_invoice_hsm", label: "Monthly Rent Invoice Generated (rent_invoice_hsm)" },
];

export interface BroadcastCampaign {
  id: string;
  name: string;
  segmentLabel: string;
  segmentTone: ConversationTagTone;
  templateId: string;
  recipients: number;
  status: "Sent" | "Scheduled";
  deliveryPercent: number;
  readPercent: number;
  timestamp: string;
}

export const campaigns: BroadcastCampaign[] = [
  {
    id: "camp-1",
    name: "October Rent Reminder - Batch 2",
    segmentLabel: "Overdue Tenants (5)",
    segmentTone: "danger",
    templateId: "rent_overdue_urgency",
    recipients: 5,
    status: "Sent",
    deliveryPercent: 100,
    readPercent: 91,
    timestamp: "01 Oct, 10:00 AM",
  },
  {
    id: "camp-2",
    name: "DG Generator Maintenance Notice",
    segmentLabel: "Green View Residency (24 units)",
    segmentTone: "neutral",
    templateId: "utility_shutdown_notice",
    recipients: 24,
    status: "Sent",
    deliveryPercent: 100,
    readPercent: 96,
    timestamp: "28 Sept, 04:30 PM",
  },
  {
    id: "camp-3",
    name: "November Lease Renewal Invitations",
    segmentLabel: "Expiring in 60d (4)",
    segmentTone: "gold",
    templateId: "renewal_offer_v1",
    recipients: 4,
    status: "Sent",
    deliveryPercent: 100,
    readPercent: 80,
    timestamp: "25 Sept, 11:15 AM",
  },
  {
    id: "camp-4",
    name: "Monsoon Preparedness Checklist",
    segmentLabel: "All Active Tenants (12)",
    segmentTone: "neutral",
    templateId: "general_announcement",
    recipients: 12,
    status: "Scheduled",
    deliveryPercent: 0,
    readPercent: 0,
    timestamp: "08 Oct, 09:00 AM",
  },
];

export const campaignStats = {
  sent: 142,
  targetPercent: 100,
  delivered: 139,
  deliveredPercent: 97.8,
  read: 128,
  readPercent: 90.1,
  undelivered: 3,
};

export interface Announcement {
  id: string;
  pinned: boolean;
  categoryLabel: string;
  publishedLabel: string;
  title: string;
  body: string;
  acknowledgedCount: number;
  totalCount: number;
  targetLabel: string;
  archived: boolean;
}

export const announcements: Announcement[] = [
  {
    id: "ann-1",
    pinned: true,
    categoryLabel: "Pinned Urgent",
    publishedLabel: "Published 2d ago",
    title: "Scheduled DG Generator Power Maintenance",
    body: "Annual ATS panel and backup diesel generator servicing. Backup will be offline between 02:00 PM and 05:00 PM on Saturday, 10th Oct.",
    acknowledgedCount: 21,
    totalCount: 24,
    targetLabel: "Target: Green View Residency",
    archived: false,
  },
  {
    id: "ann-2",
    pinned: false,
    categoryLabel: "Building Hygiene",
    publishedLabel: "Published 1w ago",
    title: "Water Tank Cleaning & Rooftop Treatment",
    body: "Overhead and underground reservoir sanitation completed across all blocks. Water supply restored to full pressure.",
    acknowledgedCount: 98,
    totalCount: 118,
    targetLabel: "Target: All Properties (5 Buildings)",
    archived: true,
  },
];

export type TemplateStatus = "Approved" | "In Review";

export interface MessageTemplate {
  id: string;
  name: string;
  description: string;
  category: "Collections" | "Onboarding" | "Maintenance" | "Advisory";
  languages: string;
  status: TemplateStatus;
}

export const templateCategories = ["All", "Billing", "Collections", "Onboarding & KYC", "Facilities"] as const;

export const messageTemplates: MessageTemplate[] = [
  {
    id: "rent_reminder_v2",
    name: "rent_reminder_v2",
    description: "Billing & Collections",
    category: "Collections",
    languages: "en_US, hi_IN",
    status: "Approved",
  },
  {
    id: "kyc_document_request",
    name: "kyc_document_request",
    description: "Aadhaar & Police Verification",
    category: "Onboarding",
    languages: "en_US",
    status: "Approved",
  },
  {
    id: "ticket_resolution_feedback",
    name: "ticket_resolution_feedback",
    description: "Post-job CSAT rating",
    category: "Maintenance",
    languages: "en_US, hi_IN",
    status: "Approved",
  },
  {
    id: "monsoon_advisory_2024",
    name: "monsoon_advisory_2024",
    description: "Safety advisory announcement",
    category: "Advisory",
    languages: "en_US",
    status: "In Review",
  },
];

export const totalTemplatesCount = 28;
