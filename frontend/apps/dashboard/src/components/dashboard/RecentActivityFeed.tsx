import { Banknote, UserPlus, Wrench } from "lucide-react";
import { recentActivity, type ActivityEvent } from "../../data/dashboard";

const iconMap: Record<ActivityEvent["icon"], typeof Banknote> = {
  payment: Banknote,
  lead: UserPlus,
  ticket: Wrench,
};

const toneMap: Record<ActivityEvent["icon"], string> = {
  payment: "bg-ok/10 text-ok",
  lead: "bg-info/10 text-info",
  ticket: "bg-gold-soft text-gold",
};

export function RecentActivityFeed() {
  return (
    <ol className="relative flex flex-col gap-4 pl-2">
      <span className="absolute bottom-2 left-[15px] top-2 w-px bg-rule" aria-hidden />
      {recentActivity.map((event) => {
        const Icon = iconMap[event.icon];
        return (
          <li key={event.id} className="relative flex items-start gap-3">
            <span className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${toneMap[event.icon]}`}>
              <Icon className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
            <span>
              <span className="block text-sm text-ink">{event.text}</span>
              <span className="block text-xs text-ink-faint">{event.time}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
