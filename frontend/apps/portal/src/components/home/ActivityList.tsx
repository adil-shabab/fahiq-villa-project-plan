import { CheckCircle2, Megaphone, ReceiptText, Wrench, type LucideIcon } from "lucide-react";
import type { ActivityItem, ActivityKind } from "../../data/home";
import { formatINR, formatRelative } from "../../lib/format";
import { cn } from "../../lib/utils";

const kindStyle: Record<ActivityKind, { icon: LucideIcon; tone: string }> = {
  payment: { icon: CheckCircle2, tone: "bg-ok/12 text-ok" },
  ticket: { icon: Wrench, tone: "bg-info/12 text-info" },
  announcement: { icon: Megaphone, tone: "bg-gold-soft text-gold" },
  invoice: { icon: ReceiptText, tone: "bg-accent-soft text-accent" },
};

interface Props {
  items: ActivityItem[];
  onOpenAnnouncement: (id: string) => void;
}

export function ActivityList({ items, onOpenAnnouncement }: Props) {
  return (
    <section aria-labelledby="activity-heading">
      <h2 id="activity-heading" className="mb-3 text-base font-bold tracking-tight text-ink">
        Recent Activity
      </h2>
      <ul className="divide-y divide-rule overflow-hidden rounded-2xl border border-rule bg-surface">
        {items.slice(0, 5).map((item) => {
          const { icon: Icon, tone } = kindStyle[item.kind];
          const content = (
            <>
              <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", tone)}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-ink">{item.text}</span>
                <span className="block text-xs text-ink-faint">
                  {item.amount !== undefined && <span className="font-semibold text-ink-muted tabular-nums">{formatINR(item.amount)} · </span>}
                  {formatRelative(item.at)}
                </span>
              </span>
            </>
          );
          return (
            <li key={item.id}>
              {item.announcementId ? (
                <button
                  type="button"
                  onClick={() => onOpenAnnouncement(item.announcementId!)}
                  className="flex min-h-16 w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-surface-sunken focus-visible:bg-surface-sunken focus-visible:outline-none"
                >
                  {content}
                </button>
              ) : (
                <div className="flex min-h-16 items-center gap-3 px-4 py-3">{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
