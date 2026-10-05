import {
  Bolt,
  CalendarClock,
  Filter,
  Hourglass,
  PieChart,
  RefreshCcw,
  Rows3,
  TimerReset,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const catalogIcons: Record<string, LucideIcon> = {
  "rent-roll": Rows3,
  occupancy: PieChart,
  collections: Wallet,
  aging: Hourglass,
  "upcoming-vacancies": CalendarClock,
  "expiring-agreements": TimerReset,
  "utility-consumption": Bolt,
  "lead-funnel": Filter,
  "vacancy-days": Hourglass,
  "tenant-churn": RefreshCcw,
  "maintenance-cost": Wrench,
};
