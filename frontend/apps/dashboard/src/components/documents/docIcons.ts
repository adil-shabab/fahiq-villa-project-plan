import {
  BadgeCheck,
  Camera,
  FileText,
  Hourglass,
  Receipt,
  ScrollText,
  Shield,
  type LucideIcon,
} from "lucide-react";
import type { VaultDocument } from "../../data/documents";

export const docIcons: Record<VaultDocument["icon"], LucideIcon> = {
  pdf: FileText,
  badge: BadgeCheck,
  police: Shield,
  lease: ScrollText,
  photos: Camera,
  pending: Hourglass,
  settlement: Receipt,
  invoice: Receipt,
};
