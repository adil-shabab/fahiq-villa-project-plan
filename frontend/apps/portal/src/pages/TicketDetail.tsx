import { CalendarDays, Check, CheckCircle2, MessageSquare, Paperclip, SendHorizontal, Star, UserRound, Wrench } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { PrimaryButton } from "../components/auth/PrimaryButton";
import { ExpectedByChip } from "../components/tickets/ExpectedByChip";
import { PhotoPicker, type PickedPhoto } from "../components/tickets/PhotoPicker";
import { TicketStatusPill } from "../components/tickets/TicketStatusPill";
import { BackHeader } from "../components/ui/BackHeader";
import { Toast } from "../components/ui/Toast";
import type { Ticket, TicketUpdate } from "../data/tickets";
import { formatRelative } from "../lib/format";
import { useNow } from "../lib/now";
import { addTicketComment, rateTicket, usePortalState } from "../lib/store";
import { categoryMeta } from "../lib/ticketCategories";
import { isActiveTicket, stageIndex, ticketStages } from "../lib/ticketStatus";
import { cn } from "../lib/utils";

const raisedFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });

function StageStrip({ ticket }: { ticket: Ticket }) {
  const current = stageIndex(ticket.status);
  return (
    <ol className="flex items-start" aria-label="Ticket progress">
      {ticketStages.map((s, i) => {
        const done = i < current || (i === current && i === ticketStages.length - 1);
        const active = i === current;
        return (
          <li key={s.status} className="flex flex-1 flex-col items-center text-center" aria-current={active ? "step" : undefined}>
            <div className="flex w-full items-center">
              <span className={cn("h-0.5 flex-1", i === 0 ? "opacity-0" : i <= current ? "bg-accent" : "bg-rule")} />
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold",
                  done ? "border-accent bg-accent text-on-accent" : active ? "border-accent bg-accent-soft text-accent" : "border-rule bg-surface text-ink-faint",
                )}
              >
                {done ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
              </span>
              <span className={cn("h-0.5 flex-1", i === ticketStages.length - 1 ? "opacity-0" : i < current ? "bg-accent" : "bg-rule")} />
            </div>
            <span className={cn("mt-1.5 text-[0.6875rem] leading-tight font-semibold", active ? "text-accent" : done ? "text-ink" : "text-ink-faint")}>
              {s.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

const updateIcon: Record<TicketUpdate["kind"], typeof Wrench> = {
  created: Wrench,
  assigned: UserRound,
  status: CheckCircle2,
  comment: MessageSquare,
};

function RatingCard({ ticketId }: { ticketId: string }) {
  const commentId = useId();
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);

  return (
    <section aria-labelledby="rate-heading" className="rounded-2xl border-2 border-accent/40 bg-accent-soft/40 p-4">
      <h2 id="rate-heading" className="text-base font-bold text-ink">
        Rate this resolution
      </h2>
      <div className="mt-2 flex gap-1" role="radiogroup" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={stars === n}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onClick={() => setStars(n)}
            className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-surface focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none"
          >
            <Star className={cn("h-7 w-7", n <= stars ? "fill-gold text-gold" : "text-rule-strong")} />
          </button>
        ))}
      </div>
      <label htmlFor={commentId} className="sr-only">
        Comment (optional)
      </label>
      <textarea
        id={commentId}
        rows={2}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Anything to add? (optional)"
        className="mt-2 w-full resize-none rounded-xl border-2 border-rule bg-surface px-3.5 py-2.5 text-base text-ink placeholder:text-ink-faint focus:border-accent focus:ring-4 focus:ring-accent/15 focus:outline-none"
      />
      <PrimaryButton
        type="button"
        className="mt-3"
        disabled={stars === 0}
        loading={saving}
        onClick={async () => {
          setSaving(true);
          try {
            await rateTicket(ticketId, stars, comment.trim());
          } finally {
            setSaving(false);
          }
        }}
      >
        Submit Rating
      </PrimaryButton>
    </section>
  );
}

function Composer({ ticketId }: { ticketId: string }) {
  const [text, setText] = useState("");
  const [photos, setPhotos] = useState<PickedPhoto[]>([]);
  const [attaching, setAttaching] = useState(false);
  const [sending, setSending] = useState(false);
  const canSend = text.trim().length > 0 || photos.length > 0;

  async function send(e: FormEvent) {
    e.preventDefault();
    if (!canSend || sending) return;
    setSending(true);
    try {
      await addTicketComment(ticketId, text.trim(), photos.map((p) => p.file));
      photos.forEach((p) => URL.revokeObjectURL(p.url));
      setText("");
      setPhotos([]);
      setAttaching(false);
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={send}
      className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-30 border-t border-rule bg-surface/95 backdrop-blur"
      aria-label="Add an update"
    >
      <div className="mx-auto max-w-[480px] px-3 py-2">
        {attaching && (
          <div className="px-1 pb-2">
            <PhotoPicker photos={photos} onChange={setPhotos} size="sm" max={3} />
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setAttaching((a) => !a)}
            aria-label="Attach photos"
            aria-pressed={attaching}
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none",
              attaching || photos.length ? "bg-accent-soft text-accent" : "text-ink-muted hover:bg-surface-sunken",
            )}
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <label className="sr-only" htmlFor="ticket-comment">
            Write an update
          </label>
          <input
            id="ticket-comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write an update…"
            className="h-11 min-w-0 flex-1 rounded-full border border-rule bg-surface-sunken px-4 text-base text-ink placeholder:text-ink-faint focus:border-accent focus:bg-surface focus:outline-none"
          />
          <button
            type="submit"
            disabled={!canSend || sending}
            aria-label="Send"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent transition hover:bg-accent-ink focus-visible:ring-4 focus-visible:ring-accent/25 focus-visible:outline-none disabled:bg-rule-strong"
          >
            <SendHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
    </form>
  );
}

export function TicketDetail() {
  const { id = "" } = useParams();
  const { tickets } = usePortalState();
  const now = useNow();
  const justRaised = (useLocation().state as { justRaised?: boolean } | null)?.justRaised ?? false;
  const [toast, setToast] = useState<string | null>(null);
  const [toastShown, setToastShown] = useState(false);
  const ticket = tickets.find((t) => t.id === id);

  if (justRaised && ticket && !toastShown) {
    setToastShown(true);
    setToast(`Ticket #${ticket.number} raised. You'll get updates on WhatsApp.`);
  }

  if (!ticket) {
    return (
      <div className="flex flex-col gap-4">
        <BackHeader title="Ticket" fallback="/tickets" />
        <div className="rounded-2xl border border-rule bg-surface px-6 py-10 text-center">
          <p className="text-lg font-bold text-ink">Ticket not found</p>
          <Link to="/tickets" className="mt-2 inline-block text-sm font-semibold text-accent hover:underline">
            Back to tickets
          </Link>
        </div>
      </div>
    );
  }

  const { icon: CatIcon, label: catLabel } = categoryMeta(ticket.category);
  const canComment = ticket.status !== "closed";

  return (
    <div className={cn("flex flex-col gap-5", canComment ? "pb-20" : "pb-2")}>
      <BackHeader title={ticket.title} fallback="/tickets" />

      <div className="rounded-2xl border border-rule bg-surface px-3 py-4">
        <StageStrip ticket={ticket} />
      </div>

      <section aria-label="Details" className="rounded-2xl border border-rule bg-surface p-4">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <CatIcon className="h-5 w-5" />
            </span>
            {catLabel}
            {ticket.priority === "urgent" && <span className="rounded-full bg-danger/12 px-2 py-0.5 text-xs text-danger">Urgent</span>}
          </span>
          <TicketStatusPill status={ticket.status} />
        </div>
        <p className="mt-3 text-base leading-relaxed text-ink-muted">{ticket.description}</p>
        {ticket.photos.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {ticket.photos.map((src, i) => (
              <a key={i} href={src} target="_blank" rel="noreferrer" className="block h-20 w-20 overflow-hidden rounded-xl border border-rule">
                <img src={src} alt={`Ticket photo ${i + 1}`} className="h-full w-full object-cover" />
              </a>
            ))}
          </div>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-ink-faint">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            #{ticket.number} · Raised {raisedFmt.format(new Date(ticket.raisedAt))}
          </span>
          {isActiveTicket(ticket.status) && ticket.expectedBy && <ExpectedByChip at={ticket.expectedBy} now={now} />}
        </div>
      </section>

      <section aria-labelledby="updates-heading">
        <h2 id="updates-heading" className="mb-3 text-base font-bold tracking-tight text-ink">
          Updates
        </h2>
        <ol className="relative flex flex-col gap-4 pl-1">
          {ticket.updates.map((u, i) => {
            const Icon = updateIcon[u.kind];
            const mine = u.by === "tenant" && u.kind === "comment";
            return (
              <li key={u.id} className="relative flex gap-3">
                {i < ticket.updates.length - 1 && <span className="absolute top-9 bottom-[-1rem] left-[17px] w-0.5 bg-rule" aria-hidden />}
                <span
                  className={cn(
                    "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                    mine ? "bg-accent text-on-accent" : u.kind === "comment" ? "bg-info/12 text-info" : "bg-surface-sunken text-ink-muted",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1 pt-1.5">
                  {u.kind === "comment" && <p className="text-xs font-semibold text-ink-faint">{mine ? "You" : "Property team"}</p>}
                  {u.text && <p className={cn("text-sm text-ink", u.kind !== "comment" && "font-semibold")}>{u.text}</p>}
                  {u.photos && u.photos.length > 0 && (
                    <div className="mt-1.5 flex gap-1.5">
                      {u.photos.map((src, j) => (
                        <img key={j} src={src} alt={`Attached photo ${j + 1}`} className="h-14 w-14 rounded-lg border border-rule object-cover" />
                      ))}
                    </div>
                  )}
                  <p className="mt-0.5 text-xs text-ink-faint">{formatRelative(u.at, now)}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {ticket.status === "resolved" && !ticket.rating && <RatingCard ticketId={ticket.id} />}
      {ticket.rating && (
        <section aria-label="Your rating" className="flex items-center gap-3 rounded-2xl border border-rule bg-surface p-4">
          <div className="flex" aria-label={`${ticket.rating.stars} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} className={cn("h-5 w-5", n <= ticket.rating!.stars ? "fill-gold text-gold" : "text-rule-strong")} />
            ))}
          </div>
          <p className="min-w-0 flex-1 truncate text-sm text-ink-muted">{ticket.rating.comment || "Thanks for your feedback!"}</p>
        </section>
      )}

      {canComment && <Composer ticketId={ticket.id} />}
      <Toast message={toast} onDone={() => setToast(null)} raised={canComment} />
    </div>
  );
}
