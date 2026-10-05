import { CheckCircle2, Pin } from "lucide-react";
import { useState } from "react";
import { AnnouncementSheet } from "../components/home/AnnouncementSheet";
import { BackHeader } from "../components/ui/BackHeader";
import { usePortalState } from "../lib/store";

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" });

export function Announcements() {
  const { announcements } = usePortalState();
  const [openId, setOpenId] = useState<string | null>(null);
  // Pinned first, then newest first.
  const sorted = [...announcements].sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned) || b.publishedAt.localeCompare(a.publishedAt));
  const open = announcements.find((a) => a.id === openId) ?? null;

  return (
    <div className="flex flex-col gap-4">
      <BackHeader title="Announcements" fallback="/account" />
      <ul className="flex flex-col gap-2.5">
        {sorted.map((a) => {
          const pending = a.requireAck && !a.acknowledged;
          return (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => setOpenId(a.id)}
                className="flex w-full flex-col gap-1.5 rounded-2xl border border-rule bg-surface p-4 text-left transition hover:border-rule-strong focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none"
              >
                <span className="flex items-start gap-2">
                  {a.pinned && <Pin className="mt-0.5 h-4 w-4 shrink-0 fill-gold text-gold" aria-label="Pinned" />}
                  <span className="min-w-0 flex-1 text-base leading-snug font-semibold text-ink">{a.title}</span>
                  {pending ? (
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-warn" aria-label="Acknowledgement needed" />
                  ) : a.requireAck ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-ok" aria-label="Acknowledged" />
                  ) : null}
                </span>
                <span className="line-clamp-2 text-sm text-ink-muted">{a.body}</span>
                <span className="text-xs text-ink-faint">
                  {a.propertyName} · {dateFmt.format(new Date(a.publishedAt))}
                  {pending && <span className="font-semibold text-warn"> · Please acknowledge</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <AnnouncementSheet announcement={open} onClose={() => setOpenId(null)} />
    </div>
  );
}
