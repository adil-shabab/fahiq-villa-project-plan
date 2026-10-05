import { Bell, Banknote, MessageCircle, Wrench } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useClickOutside } from "../../lib/useClickOutside";
import { cn } from "../../lib/utils";

interface NotificationRow {
  id: string;
  icon: "payment" | "lead" | "ticket";
  text: string;
  time: string;
  unread: boolean;
  group: "Today" | "Yesterday";
}

const notifications: NotificationRow[] = [
  { id: "n1", icon: "payment", text: "Payment received from Rahul Sharma · ₹15,000", time: "2 min ago", unread: true, group: "Today" },
  { id: "n2", icon: "lead", text: "New enquiry from website · Green View Residency", time: "14 min ago", unread: true, group: "Today" },
  { id: "n3", icon: "ticket", text: "Ticket #204 marked resolved", time: "1 hour ago", unread: true, group: "Today" },
  { id: "n4", icon: "payment", text: "Autopay debit failed for Karan Mehta", time: "3 hours ago", unread: false, group: "Today" },
  { id: "n5", icon: "lead", text: "Visit scheduled with Arjun Nair", time: "Yesterday, 6:40 PM", unread: false, group: "Yesterday" },
];

const iconMap = { payment: Banknote, lead: MessageCircle, ticket: Wrench };

export function NotificationsPanel() {
  const [open, setOpen] = useState(false);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  const unreadCount = notifications.filter((n) => n.unread && !readIds.has(n.id)).length;
  const groups: NotificationRow["group"][] = ["Today", "Yesterday"];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-rule bg-surface text-ink-muted hover:border-rule-strong hover:text-ink"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" strokeWidth={2} />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-2 w-80 overflow-hidden rounded-xl border border-rule bg-surface shadow-lg">
          <div className="flex items-center justify-between border-b border-rule px-4 py-3">
            <h3 className="text-sm font-semibold text-ink">Notifications</h3>
            <button
              type="button"
              onClick={() => setReadIds(new Set(notifications.map((n) => n.id)))}
              className="text-xs font-medium text-accent hover:text-accent-ink"
            >
              Mark all as read
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {groups.map((group) => {
              const rows = notifications.filter((n) => n.group === group);
              if (rows.length === 0) return null;
              return (
                <div key={group}>
                  <div className="bg-surface-sunken px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
                    {group}
                  </div>
                  {rows.map((n) => {
                    const Icon = iconMap[n.icon];
                    const isRead = !n.unread || readIds.has(n.id);
                    return (
                      <button
                        key={n.id}
                        type="button"
                        onClick={() => setReadIds((prev) => new Set(prev).add(n.id))}
                        className="flex w-full items-start gap-3 border-b border-rule px-4 py-3 text-left last:border-b-0 hover:bg-surface-sunken"
                      >
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-ink">
                          <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                        </span>
                        <span className="flex-1">
                          <span className={cn("block text-sm", isRead ? "text-ink-muted" : "font-medium text-ink")}>
                            {n.text}
                          </span>
                          <span className="mt-0.5 block text-xs text-ink-faint">{n.time}</span>
                        </span>
                        {!isRead && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="border-t border-rule px-4 py-2.5 text-center">
            <Link to="/audit" className="text-xs font-medium text-accent hover:text-accent-ink" onClick={() => setOpen(false)}>
              View all activity &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
