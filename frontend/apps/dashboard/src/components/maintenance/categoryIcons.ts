import {
  Bug,
  Construction,
  Hammer,
  Lock,
  Snowflake,
  Sparkles,
  Wifi,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { TicketCategory } from "../../data/maintenance";

export const categoryIcons: Record<TicketCategory, LucideIcon> = {
  Plumbing: Wrench,
  Electrical: Zap,
  Appliance: Snowflake,
  Carpentry: Hammer,
  "Pest Control": Bug,
  Internet: Wifi,
  Cleaning: Sparkles,
  Security: Lock,
  Structural: Construction,
};
