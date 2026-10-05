import { CircleAlert } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/auth/PrimaryButton";
import { PhotoPicker, type PickedPhoto } from "../components/tickets/PhotoPicker";
import { BackHeader } from "../components/ui/BackHeader";
import { SegmentedControl } from "../components/ui/SegmentedControl";
import type { TicketPriority } from "../data/tickets";
import { raiseTicket } from "../lib/store";
import { ticketCategories, type TicketCategory } from "../lib/ticketCategories";
import { cn } from "../lib/utils";

const fieldClass =
  "w-full rounded-xl border-2 border-rule bg-surface-sunken px-3.5 text-base text-ink placeholder:text-ink-faint focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/15 focus:outline-none";

export function RaiseTicket() {
  const navigate = useNavigate();
  const titleId = useId();
  const descId = useId();
  const [category, setCategory] = useState<TicketCategory | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("normal");
  const [photos, setPhotos] = useState<PickedPhoto[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = category !== null && title.trim().length >= 3 && description.trim().length >= 5;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const ticket = await raiseTicket({
        category,
        title: title.trim(),
        description: description.trim(),
        priority,
        photos: photos.map((p) => p.file),
      });
      navigate(`/tickets/${ticket.id}`, { replace: true, state: { justRaised: true } });
    } catch {
      setError("We couldn't submit your ticket. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 pb-20" noValidate>
      <BackHeader title="Raise a Ticket" fallback="/tickets" />

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-ink">Category</legend>
        <div className="grid grid-cols-2 gap-2.5">
          {ticketCategories.map(({ id, label, icon: Icon }) => {
            const on = category === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={on}
                onClick={() => setCategory(id)}
                className={cn(
                  "flex min-h-16 items-center gap-3 rounded-xl border-2 px-3.5 text-left text-sm font-semibold transition focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none",
                  on ? "border-accent bg-accent-soft text-accent-ink" : "border-rule bg-surface text-ink hover:border-rule-strong",
                )}
              >
                <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", on ? "bg-accent text-on-accent" : "bg-surface-sunken text-ink-muted")}>
                  <Icon className="h-5 w-5" />
                </span>
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor={titleId} className="mb-2 block text-sm font-semibold text-ink">
          Title
        </label>
        <input
          id={titleId}
          value={title}
          maxLength={80}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Bathroom tap is dripping"
          className={cn(fieldClass, "h-12")}
        />
      </div>

      <div>
        <label htmlFor={descId} className="mb-2 block text-sm font-semibold text-ink">
          Description
        </label>
        <textarea
          id={descId}
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What's wrong, where exactly, and since when?"
          className={cn(fieldClass, "resize-none py-3")}
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-ink">Priority</p>
        <SegmentedControl
          label="Priority"
          kind="radio"
          options={[
            { value: "normal", label: "Normal" },
            { value: "urgent", label: "Urgent" },
          ]}
          value={priority}
          onChange={setPriority}
        />
        {priority === "urgent" && (
          <p className="mt-2 text-sm text-ink-muted">Use Urgent for leaks, power cuts, or anything unsafe — the team aims to respond within 4 hours.</p>
        )}
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-ink">
          Photos <span className="font-normal text-ink-faint">(optional, up to 4)</span>
        </p>
        <PhotoPicker photos={photos} onChange={setPhotos} />
      </div>

      {error && (
        <div role="alert" className="flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/10 px-3.5 py-3 text-sm text-danger">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="fixed inset-x-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-30 mx-auto max-w-[448px]">
        <PrimaryButton type="submit" loading={submitting} disabled={!canSubmit} className="shadow-[0_12px_28px_-12px_rgba(15,92,77,0.55)]">
          {submitting ? "Submitting…" : "Submit Ticket"}
        </PrimaryButton>
      </div>
    </form>
  );
}
