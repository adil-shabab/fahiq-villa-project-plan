import { Bug, Camera, CircleAlert, CircleCheck, Droplets, Ellipsis, Plug, Refrigerator, Wifi, X, type LucideIcon } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { raiseTicket } from "../../lib/store";
import { cn } from "../../lib/utils";
import { PrimaryButton } from "../auth/PrimaryButton";
import { BottomSheet } from "../ui/BottomSheet";

const categories: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "plumbing", label: "Plumbing", icon: Droplets },
  { id: "electrical", label: "Electrical", icon: Plug },
  { id: "appliance", label: "Appliance", icon: Refrigerator },
  { id: "pest_control", label: "Pest Control", icon: Bug },
  { id: "internet", label: "Internet", icon: Wifi },
  { id: "other", label: "Other", icon: Ellipsis },
];

const MAX_PHOTOS = 4;

interface Props {
  open: boolean;
  onClose: () => void;
}

export function RaiseTicketSheet({ open, onClose }: Props) {
  const descId = useId();
  const [category, setCategory] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<{ file: File; url: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<string | null>(null);

  // Release preview object URLs when the sheet unmounts (removed photos are released immediately).
  const photosRef = useRef(photos);
  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);
  useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

  const canSubmit = category !== null && description.trim().length >= 5;

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const label = categories.find((c) => c.id === category)!.label;
      setCreated(await raiseTicket(label, description.trim(), photos.map((p) => p.file)));
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
          <p className="mt-4 text-xl font-bold text-ink">Ticket #{created} raised</p>
          <p className="mt-1 text-sm text-ink-muted">Your property manager has been notified. You'll get updates on WhatsApp.</p>
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
          Photos <span className="font-normal text-ink-faint">(optional, up to {MAX_PHOTOS})</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {photos.map((p, i) => (
            <div key={p.url} className="relative h-18 w-18 overflow-hidden rounded-xl border border-rule">
              <img src={p.url} alt={`Attached photo ${i + 1}`} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => {
                  URL.revokeObjectURL(p.url);
                  setPhotos((prev) => prev.filter((x) => x.url !== p.url));
                }}
                aria-label={`Remove photo ${i + 1}`}
                className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          {photos.length < MAX_PHOTOS && (
            <label className="flex h-18 w-18 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-rule-strong text-xs font-semibold text-ink-muted transition hover:border-accent hover:text-accent has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent/20">
              <Camera className="h-5 w-5" />
              Add
              <input
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(e) => {
                  const files = Array.from(e.target.files ?? []).slice(0, MAX_PHOTOS - photos.length);
                  setPhotos((prev) => [...prev, ...files.map((file) => ({ file, url: URL.createObjectURL(file) }))]);
                  e.target.value = "";
                }}
              />
            </label>
          )}
        </div>
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
