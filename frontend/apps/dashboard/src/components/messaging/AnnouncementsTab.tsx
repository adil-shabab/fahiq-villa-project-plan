import { Pin, Plus } from "lucide-react";
import { announcements } from "../../data/messaging";
import { cn } from "../../lib/utils";

export function AnnouncementsTab({ onNewAnnouncement }: { onNewAnnouncement: () => void }) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-ink">Announcements Board</h2>
          <p className="text-sm text-ink-faint">Notice broadcasts with resident read acknowledgement tracking.</p>
        </div>
        <button type="button" onClick={onNewAnnouncement} className="rounded-lg border border-rule bg-surface p-1.5 text-accent shadow-sm hover:bg-surface-sunken">
          <Plus className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>

      {announcements.map((a) => {
        const percent = Math.round((a.acknowledgedCount / a.totalCount) * 1000) / 10;
        return (
          <div key={a.id} className="relative flex flex-col gap-1.5 overflow-hidden rounded-xl border border-rule bg-surface p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-bold",
                  a.pinned ? "bg-gold-soft text-gold" : "bg-surface-sunken text-ink-muted",
                )}
              >
                {a.pinned && <Pin className="h-3 w-3" strokeWidth={2} />}
                {a.categoryLabel}
              </span>
              <span className="text-xs text-ink-faint">{a.publishedLabel}</span>
            </div>
            <h3 className="text-sm font-bold text-ink">{a.title}</h3>
            <p className="text-sm text-ink-muted">{a.body}</p>
            <div className="mt-2 flex flex-col gap-1.5 border-t border-rule pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-ink-muted">
                  Tenant Acknowledgement: <strong className="text-ink">{a.acknowledgedCount} of {a.totalCount}</strong>
                </span>
                <span className="font-mono font-bold text-accent">{percent}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-surface-sunken">
                <div className="h-full rounded-full bg-accent" style={{ width: `${percent}%` }} />
              </div>
              <div className="mt-0.5 flex items-center justify-between text-xs text-ink-faint">
                <span>{a.targetLabel}</span>
                {a.archived ? (
                  <span className="font-semibold text-accent">Archived</span>
                ) : (
                  <button type="button" className="font-semibold text-accent hover:underline">
                    Resend to {a.totalCount - a.acknowledgedCount} Unread
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
