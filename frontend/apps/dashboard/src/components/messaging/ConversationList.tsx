import { CheckCheck, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { conversations, type ConversationTagTone } from "../../data/messaging";
import { cn } from "../../lib/utils";
import { Avatar } from "../ui/Avatar";

const tagClasses: Record<ConversationTagTone, string> = {
  neutral: "bg-surface-sunken text-ink-muted",
  danger: "bg-danger/15 text-danger font-bold",
  accent: "bg-accent-soft text-accent-ink",
  gold: "bg-gold-soft text-gold",
};

type FilterKind = "all" | "unread" | "unassigned";

export function ConversationList({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterKind>("all");

  const unreadCount = conversations.filter((c) => c.unreadCount > 0).length;
  const unassignedCount = conversations.filter((c) => c.tags.some((t) => t.label === "Unassigned")).length;

  const filtered = useMemo(() => {
    return conversations.filter((c) => {
      if (search && !`${c.name} ${c.phone} ${c.unitLabel}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (filter === "unread" && c.unreadCount === 0) return false;
      if (filter === "unassigned" && !c.tags.some((t) => t.label === "Unassigned")) return false;
      return true;
    });
  }, [search, filter]);

  return (
    <div className="flex h-[740px] flex-col overflow-hidden rounded-xl border border-rule bg-surface shadow-sm lg:col-span-4">
      <div className="flex flex-col gap-2 bg-surface-sunken/40 p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" strokeWidth={2} />
          <input className="field pl-8" placeholder="Search conversations, phone, tags..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={cn("rounded-md px-2.5 py-1 text-xs font-semibold", filter === "all" ? "bg-surface-sunken text-accent" : "text-ink-muted hover:bg-surface-sunken")}
            >
              All <span className="font-mono">{conversations.length}</span>
            </button>
            <button
              type="button"
              onClick={() => setFilter("unread")}
              className={cn("rounded-md px-2.5 py-1 text-xs font-semibold", filter === "unread" ? "bg-surface-sunken text-accent" : "text-ink-muted hover:bg-surface-sunken")}
            >
              Unread <span className="font-mono text-danger">{unreadCount}</span>
            </button>
            <button
              type="button"
              onClick={() => setFilter("unassigned")}
              className={cn("rounded-md px-2.5 py-1 text-xs font-semibold", filter === "unassigned" ? "bg-surface-sunken text-accent" : "text-ink-muted hover:bg-surface-sunken")}
            >
              Unassigned <span className="font-mono">{unassignedCount}</span>
            </button>
          </div>
          <button type="button" className="rounded p-1 text-ink-muted hover:bg-surface-sunken" title="Filter criteria">
            <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
          <span className="whitespace-nowrap rounded-full bg-surface-sunken px-2 py-0.5 text-[11px] text-ink-muted">🏷️ Tenants</span>
          <span className="whitespace-nowrap rounded-full bg-surface-sunken px-2 py-0.5 text-[11px] text-ink-muted">🎯 Leads</span>
          <span className="whitespace-nowrap rounded-full bg-danger/15 px-2 py-0.5 text-[11px] font-semibold text-danger">⚠️ Urgent / Breached</span>
        </div>
      </div>

      <div className="flex-1 divide-y divide-rule overflow-y-auto">
        {filtered.map((c) => (
          <div
            key={c.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(c.id)}
            className={cn("relative cursor-pointer p-3 transition-colors", c.id === activeId ? "bg-surface-sunken" : "hover:bg-surface-sunken/60")}
          >
            {c.id === activeId && <div className="absolute inset-y-0 left-0 w-1 bg-accent" />}
            <div className="flex items-start gap-2.5 pl-1">
              <Avatar initials={c.avatarInitials} size="md" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className={cn("truncate text-sm text-ink", c.id === activeId ? "font-bold" : "font-semibold")}>{c.name}</span>
                  <span className="whitespace-nowrap font-mono text-[11px] text-ink-faint">{c.timeLabel}</span>
                </div>
                <div className="truncate text-xs text-ink-muted">
                  {c.unitLabel} · {c.propertyName}
                </div>
                <p className={cn("mt-0.5 truncate text-xs", c.unreadCount > 0 ? "font-medium text-ink" : "text-ink-muted")}>{c.lastMessagePreview}</p>
                <div className="mt-1.5 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1">
                    {c.tags.map((t) => (
                      <span key={t.label} className={cn("rounded px-1.5 py-0.5 text-[10px]", tagClasses[t.tone])}>
                        {t.label}
                      </span>
                    ))}
                  </div>
                  {c.unreadCount > 0 ? (
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">{c.unreadCount}</span>
                  ) : c.readStatus !== "none" ? (
                    <CheckCheck className={cn("h-4 w-4 shrink-0", c.readStatus === "read" ? "text-info" : "text-ink-faint")} strokeWidth={2} />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="py-10 text-center text-xs text-ink-faint">No conversations match.</p>}
      </div>
    </div>
  );
}
