import { Bug, Droplets, Ellipsis, Hammer, Plug, Refrigerator, ShieldAlert, Sparkles, Wifi, type LucideIcon } from "lucide-react";

export type TicketCategory =
  | "plumbing"
  | "electrical"
  | "appliance"
  | "carpentry"
  | "pest_control"
  | "internet"
  | "cleaning"
  | "security"
  | "other";

export const ticketCategories: { id: TicketCategory; label: string; icon: LucideIcon }[] = [
  { id: "plumbing", label: "Plumbing", icon: Droplets },
  { id: "electrical", label: "Electrical", icon: Plug },
  { id: "appliance", label: "Appliance", icon: Refrigerator },
  { id: "carpentry", label: "Carpentry", icon: Hammer },
  { id: "pest_control", label: "Pest Control", icon: Bug },
  { id: "internet", label: "Internet", icon: Wifi },
  { id: "cleaning", label: "Cleaning", icon: Sparkles },
  { id: "security", label: "Security", icon: ShieldAlert },
  { id: "other", label: "Other", icon: Ellipsis },
];

/** The six shown in the quick-raise sheet on Home (docs/19 Page 2). */
export const quickCategories: TicketCategory[] = ["plumbing", "electrical", "appliance", "pest_control", "internet", "other"];

export function categoryMeta(id: TicketCategory) {
  return ticketCategories.find((c) => c.id === id)!;
}
