import { ChevronRight, Plus, Wrench } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { ExpectedByChip } from "../components/tickets/ExpectedByChip";
import { TicketStatusPill } from "../components/tickets/TicketStatusPill";
import { SegmentedControl } from "../components/ui/SegmentedControl";
import { useNow } from "../lib/now";
import { usePortalState } from "../lib/store";
import { categoryMeta } from "../lib/ticketCategories";
import { isActiveTicket } from "../lib/ticketStatus";

type Filter = "all" | "open" | "resolved";
const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "resolved", label: "Resolved" },
];

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" });

const raiseButton =
  "flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 text-base font-semibold text-on-accent transition hover:bg-accent-ink focus-visible:ring-4 focus-visible:ring-accent/25 focus-visible:outline-none";

export function Tickets() {
  const { tickets } = usePortalState();
  const now = useNow();
  const [params, setParams] = useSearchParams();
  const filter = (filters.some((f) => f.value === params.get("filter")) ? params.get("filter") : "all") as Filter;

  const shown = tickets.filter((t) => (filter === "all" ? true : filter === "open" ? isActiveTicket(t.status) : !isActiveTicket(t.status)));

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl leading-8 font-bold tracking-tight text-ink">My Tickets</h1>

      {tickets.length > 0 && (
        <>
          <Link to="/tickets/new" className={raiseButton}>
            <Plus className="h-5 w-5" strokeWidth={2.5} />
            Raise a Ticket
          </Link>
          <SegmentedControl label="Filter tickets" options={filters} value={filter} onChange={(f) => setParams(f === "all" ? {} : { filter: f }, { replace: true })} />
        </>
      )}

      {shown.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-rule bg-surface px-6 py-10 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-soft text-accent">
            <Wrench className="h-9 w-9" />
          </span>
          <p className="mt-4 text-lg font-bold text-ink">{tickets.length === 0 ? "No tickets yet" : `No ${filter} tickets`}</p>
          <p className="mt-1 text-sm text-ink-muted">
            {tickets.length === 0 ? "Tap below if something needs fixing." : "Try a different filter."}
          </p>
          {tickets.length === 0 && (
            <Link to="/tickets/new" className={`${raiseButton} mt-6`}>
              <Plus className="h-5 w-5" strokeWidth={2.5} />
              Raise a Ticket
            </Link>
          )}
        </div>
      ) : (
        <ul className="flex flex-col gap-2.5" aria-label="Tickets">
          {shown.map((t) => {
            const { icon: Icon, label } = categoryMeta(t.category);
            return (
              <li key={t.id}>
                <Link
                  to={`/tickets/${t.id}`}
                  className="flex items-start gap-3 rounded-2xl border border-rule bg-surface p-4 transition hover:border-rule-strong focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent" aria-label={label}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-2">
                      <span className="text-base leading-snug font-semibold text-ink">{t.title}</span>
                      <TicketStatusPill status={t.status} />
                    </span>
                    <span className="mt-1 block text-xs text-ink-faint">
                      #{t.number} · {t.unitCode} · {dateFmt.format(new Date(t.raisedAt))}
                      {t.priority === "urgent" && <span className="font-semibold text-danger"> · Urgent</span>}
                    </span>
                    {isActiveTicket(t.status) && t.expectedBy && (
                      <span className="mt-2 block">
                        <ExpectedByChip at={t.expectedBy} now={now} />
                      </span>
                    )}
                  </span>
                  <ChevronRight className="mt-3 h-5 w-5 shrink-0 text-ink-faint" />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
