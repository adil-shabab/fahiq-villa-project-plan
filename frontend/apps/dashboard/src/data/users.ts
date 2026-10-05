export type RoleName = "Owner" | "Property Manager" | "Accountant" | "Field Staff" | "Front Desk";
export type TwoFactorMethod = "Authenticator" | "SMS TOTP" | "Hardware FIDO";

export interface StaffMember {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  role: RoleName;
  roleIcon: "apartment" | "build" | "account_balance_wallet" | "concierge";
  scope: string;
  scopeSub?: string;
  twoFactor: TwoFactorMethod | "None";
  lastActive: string;
  invited?: boolean;
  isCurrentUser?: boolean;
}

export const staffMembers: StaffMember[] = [
  {
    id: "u-priya",
    name: "Priya Sharma",
    initials: "PS",
    email: "priya.sharma@fahiq.com",
    phone: "+91 98450 11234",
    role: "Property Manager",
    roleIcon: "apartment",
    scope: "All Properties (12)",
    scopeSub: "Full operational oversight",
    twoFactor: "Authenticator",
    lastActive: "Active Now",
    isCurrentUser: true,
  },
  {
    id: "u-rajesh",
    name: "Rajesh Kumar",
    initials: "RK",
    email: "rajesh.k@fahiq.com",
    phone: "+91 97401 88219",
    role: "Field Staff",
    roleIcon: "build",
    scope: "Fahiq Heights",
    scopeSub: "Pavilion +1",
    twoFactor: "SMS TOTP",
    lastActive: "14 mins ago",
  },
  {
    id: "u-anand",
    name: "Anand Murthy",
    initials: "AM",
    email: "anand.murthy@fahiq.com",
    phone: "+91 99002 44321",
    role: "Accountant",
    roleIcon: "account_balance_wallet",
    scope: "Portfolio-wide (12)",
    twoFactor: "Hardware FIDO",
    lastActive: "Today 11:22 IST",
  },
  {
    id: "u-sunita",
    name: "Sunita Rao",
    initials: "SR",
    email: "sunita.rao@fahiq.com",
    phone: "+91 96113 77610",
    role: "Front Desk",
    roleIcon: "concierge",
    scope: "Koramangala Res.",
    twoFactor: "Authenticator",
    lastActive: "Yesterday 19:40 IST",
  },
  {
    id: "u-kavita",
    name: "Kavita Deshmukh",
    initials: "KD",
    email: "kavita.d@fahiq.com",
    phone: "+91 91234 56789",
    role: "Property Manager",
    roleIcon: "apartment",
    scope: "HSR Villa North",
    twoFactor: "None",
    lastActive: "Never",
    invited: true,
  },
];

export const staffRoles: RoleName[] = ["Owner", "Property Manager", "Accountant", "Field Staff", "Front Desk"];

export type PermissionLevel = "full" | "view" | "scoped" | "none";

export interface PermissionCell {
  level: PermissionLevel;
  label: string;
}

export interface PermissionRow {
  id: string;
  icon: string;
  module: string;
  cells: Record<RoleName, PermissionCell>;
}

const full = (label = "Full"): PermissionCell => ({ level: "full", label });
const view = (label = "View Only"): PermissionCell => ({ level: "view", label });
const scoped = (label: string): PermissionCell => ({ level: "scoped", label });
const none = (): PermissionCell => ({ level: "none", label: "—" });

export const permissionMatrix: PermissionRow[] = [
  {
    id: "dashboard",
    icon: "dashboard",
    module: "Dashboard & High-level Analytics",
    cells: {
      Owner: full(),
      "Property Manager": full(),
      Accountant: scoped("Financials Only"),
      "Field Staff": none(),
      "Front Desk": scoped("Occupancy Only"),
    },
  },
  {
    id: "properties",
    icon: "apartment",
    module: "Properties, Floors & Bed Matrix",
    cells: {
      Owner: full(),
      "Property Manager": full(),
      Accountant: view(),
      "Field Staff": scoped("Assigned Units"),
      "Front Desk": scoped("Assigned Units"),
    },
  },
  {
    id: "tenancy",
    icon: "group",
    module: "Tenancy Agreements & KYC Verification",
    cells: {
      Owner: full(),
      "Property Manager": full(),
      Accountant: view(),
      "Field Staff": none(),
      "Front Desk": scoped("Create Leads"),
    },
  },
  {
    id: "payments",
    icon: "payments",
    module: "Rent Invoicing, Collections & UPI QR",
    cells: {
      Owner: full(),
      "Property Manager": full(),
      Accountant: full(),
      "Field Staff": none(),
      "Front Desk": scoped("Log Cash Receipt"),
    },
  },
  {
    id: "maintenance",
    icon: "handyman",
    module: "Maintenance Orders & Vendor Settlement",
    cells: {
      Owner: full(),
      "Property Manager": full(),
      Accountant: scoped("Pay Bills Only"),
      "Field Staff": scoped("Manage Work Orders"),
      "Front Desk": scoped("Log Complaint"),
    },
  },
  {
    id: "messaging",
    icon: "chat",
    module: "Automated WhatsApp Reminders & SMS",
    cells: {
      Owner: full(),
      "Property Manager": full(),
      Accountant: scoped("Payment Dues"),
      "Field Staff": none(),
      "Front Desk": scoped("Chat with Guest"),
    },
  },
  {
    id: "settings",
    icon: "settings",
    module: "System Config & Staff Access Control",
    cells: {
      Owner: full(),
      "Property Manager": scoped("Scoped Staff"),
      Accountant: none(),
      "Field Staff": none(),
      "Front Desk": none(),
    },
  },
];

export const usersKpis = {
  activeStaff: 18,
  propertiesCovered: 12,
  twoFactorPercent: 100,
  roleTiers: 5,
  pendingInvites: 2,
};
