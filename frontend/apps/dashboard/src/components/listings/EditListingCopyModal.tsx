import { Copy, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { ListingRow } from "../../data/listings";
import { formatINR } from "../../lib/format";

export function EditListingCopyModal({
  row,
  onClose,
  onSave,
}: {
  row: ListingRow;
  onClose: () => void;
  onSave: (next: { listingTitle: string; listingDescription: string }) => void;
}) {
  const [title, setTitle] = useState(row.listingTitle);
  const [description, setDescription] = useState(row.listingDescription);
  const metaDescription = description.slice(0, 160);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div
        className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-rule bg-surface shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-rule px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-ink">Edit Listing Copy</h2>
            <p className="text-xs text-ink-faint">
              {row.unitCode} &middot; {row.propertyName}
            </p>
          </div>
          <button type="button" onClick={onClose} className="text-ink-faint hover:text-ink" aria-label="Close">
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-6 overflow-y-auto px-5 py-5 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Field label="Listing Title">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-rule bg-surface-sunken px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
              />
            </Field>
            <Field label="Listing Description">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full resize-none rounded-lg border border-rule bg-surface-sunken px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
              />
            </Field>
            <Field label={`SEO Meta Description · ${metaDescription.length}/160`}>
              <textarea
                value={metaDescription}
                readOnly
                rows={2}
                className="w-full resize-none rounded-lg border border-rule bg-surface-sunken px-3 py-2 text-sm text-ink-muted"
              />
            </Field>
            <Field label="URL Slug">
              <div className="flex items-center gap-2 rounded-lg border border-rule bg-surface-sunken px-3 py-2 text-sm text-ink-muted">
                <span className="flex-1 truncate">{row.slug}</span>
                <Copy className="h-3.5 w-3.5 shrink-0 cursor-pointer hover:text-ink" strokeWidth={2} />
              </div>
            </Field>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">Preview</p>
            <div className="overflow-hidden rounded-xl border border-rule">
              <div className="h-32" style={{ backgroundColor: row.coverColor }} />
              <div className="p-3.5">
                <p className="font-semibold leading-snug text-ink">{title || "Listing title"}</p>
                <p className="mt-1 text-sm font-bold tabular-nums text-accent-ink">{formatINR(row.rent)}/mo</p>
                <p className="mt-2 line-clamp-3 text-xs text-ink-muted">{description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSave({ listingTitle: title, listingDescription: description });
              onClose();
            }}
            className="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">{label}</span>
      {children}
    </label>
  );
}
