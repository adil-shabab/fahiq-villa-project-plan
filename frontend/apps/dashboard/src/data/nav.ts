import type { LucideIcon } from "lucide-react";
import {
  Building2,
  ClipboardList,
  CreditCard,
  FileText,
  FolderOpen,
  Globe,
  HandCoins,
  History,
  LayoutDashboard,
  MessageCircle,
  Receipt,
  Settings,
  ShieldCheck,
  UserPlus,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
}

export const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: LayoutDashboard, href: "/" },
  { id: "properties", label: "Properties", icon: Building2, href: "/properties" },
  { id: "listings", label: "Listings", icon: Globe, href: "/listings" },
  { id: "leads", label: "Leads", icon: UserPlus, href: "/leads" },
  { id: "onboarding", label: "Onboarding", icon: ClipboardList, href: "/onboarding" },
  { id: "tenancies", label: "Tenancies", icon: FileText, href: "/tenancies" },
  { id: "billing", label: "Billing", icon: Receipt, href: "/billing" },
  { id: "payments", label: "Payments", icon: CreditCard, href: "/payments" },
  { id: "collections", label: "Collections", icon: HandCoins, href: "/collections" },
  { id: "maintenance", label: "Maintenance", icon: Wrench, href: "/maintenance" },
  { id: "messaging", label: "Messaging", icon: MessageCircle, href: "/messaging" },
  { id: "finance", label: "Finance", icon: Wallet, href: "/finance" },
  { id: "reports", label: "Reports", icon: FileText, href: "/reports" },
  { id: "documents", label: "Documents", icon: FolderOpen, href: "/documents" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  { id: "users", label: "Users & Roles", icon: Users, href: "/users" },
  { id: "audit", label: "Audit Log", icon: History, href: "/audit" },
];

export const brandNavIcon = ShieldCheck;
