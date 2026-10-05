import { Banknote, ChevronRight, FileClock, Gauge, IdCard, MessageCircle } from "lucide-react";
import { actionItems, type ActionItem } from "../../data/dashboard";

const iconMap: Record<ActionItem["icon"], typeof FileClock> = {
  "file-clock": FileClock,
  "id-card": IdCard,
  gauge: Gauge,
  "message-circle": MessageCircle,
  banknote: Banknote,
};

export function ActionRequiredCard() {
  return (
    <ul className="flex flex-col">
      {actionItems.map((item) => {
        const Icon = iconMap[item.icon];
        return (
          <li key={item.id}>
            <a
              href={item.href}
              className="flex items-center gap-3 border-b border-rule px-5 py-3 last:border-b-0 hover:bg-surface-sunken"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-warn/10 text-warn">
                <Icon className="h-4 w-4" strokeWidth={2} />
              </span>
              <span className="flex-1 text-sm text-ink">{item.label}</span>
              <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-xs font-semibold tabular-nums text-ink-muted">
                {item.count}
              </span>
              <ChevronRight className="h-4 w-4 text-ink-faint" strokeWidth={2} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
