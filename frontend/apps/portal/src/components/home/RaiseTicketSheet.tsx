import { CircleAlert, CircleCheck } from "lucide-react";
import { useId, useState } from "react";
import { Link } from "react-router-dom";
import type { Ticket } from "../../data/tickets";
import { raiseTicket } from "../../lib/store";
import { quickCategories, ticketCategories, type TicketCategory } from "../../lib/ticketCategories";
import { cn } from "../../lib/utils";
import { PrimaryButton } from "../auth/PrimaryButton";
import { PhotoPicker, type PickedPhoto } from "../tickets/PhotoPicker";
import { BottomSheet } from "../ui/BottomSheet";

const categories = ticketCategories.filter((c) => quickCategories.includes(c.id));

interface Props {
  open: boolean;
  onClose: () => void;
}

/** Quick raise from Home (docs/19 Page 2). The full form lives at /tickets/new. */
export function RaiseTicketSheet({ open, onClose }: Props) {
  const descId = useId();
  const [category, setCategory] = useState<TicketCategory | null>(null);
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<PickedPhoto[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<Ticket | null>(null);

  const canSubmit = category !== null && description.trim().length >= 5;

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const text = description.trim();
      // The quick sheet has no title field; use the first line of the description.
      const title = text.split("\n")[0].slice(0, 60);
      setCreated(await raiseTicket({ category, title, description: text, priority: "normal", photos: photos.map((p) => p.file) }));
    } catch {
      setError("We couldn't submit your ticket. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (created) {
    return (
      <BottomSheet open={open} onClose={onClose} title="Ticket raised" footer={<PrimaryButton type="button" onClick={onClose}>Done</PrimaryButton>}>
        <div className="flex flex-col items-center py-6 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ok/12 text-ok">
            <CircleCheck className="h-8 w-8" />
          </span>
          <p className="mt-4 text-xl font-bold text-ink">Ticket #{created.number} raised</p>
          <p className="mt-1 text-sm text-ink-muted">Your property manager has been notified. You'll get updates on WhatsApp.</p>
          <Link to={`/tickets/${created.id}`} className="mt-3 text-sm font-semibold text-accent underline-offset-4 hover:underline">
            View ticket
          </Link>
        </div>
      </BottomSheet>
    );
  }

  return (
    <BottomSheet
      open={open}
      onClose={submitting ? () => {} : onClose}
      title="Raise a Ticket"
      footer={
        <PrimaryButton type="button" onClick={handleSubmit} loading={submitting} disabled={!canSubmit}>
          {submitting ? "Submitting…" : "Submit Ticket"}
        </PrimaryButton>
      }
    >
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-ink">What's the issue?</legend>
        <div className="grid grid-cols-3 gap-2">
          {categories.map(({ id, label, icon: Icon }) => {
            const on = category === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={on}
                onClick={() => setCategory(id)}
                className={cn(
                  "flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-xl border-2 px-1 py-2.5 text-xs font-semibold transition focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none",
                  on ? "border-accent bg-accent-soft text-accent-ink" : "border-rule bg-surface text-ink-muted hover:border-rule-strong",
                )}
              >
                <Icon className="h-6 w-6" />
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label htmlFor={descId} className="mt-5 mb-2 block text-sm font-semibold text-ink">
        Description
      </label>
      <textarea
        id={descId}
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="e.g. Kitchen sink is leaking under the cabinet since this morning"
        className="w-full resize-none rounded-xl border-2 border-rule bg-surface-sunken px-3.5 py-3 text-base text-ink placeholder:text-ink-faint focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/15 focus:outline-none"
      />

      <div className="mt-5">
        <p className="mb-2 text-sm font-semibold text-ink">
          Photos <span className="font-normal text-ink-faint">(optional, up to 4)</span>
        </p>
        <PhotoPicker photos={photos} onChange={setPhotos} />
      </div>

      {error && (
        <div role="alert" className="mt-4 flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/10 px-3.5 py-3 text-sm text-danger">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </div>
      )}
    </BottomSheet>
  );
}
