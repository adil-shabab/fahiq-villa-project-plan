import { ChevronRight, Plus, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { localityPages } from "../../data/listings";

export function LocalitySEOPanel({ onClose }: { onClose: () => void }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/40" onClick={onClose}>
      <div
        className="flex h-full w-full max-w-md flex-col overflow-hidden border-l border-rule bg-surface shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-rule px-5 py-4">
          <h2 className="text-sm font-semibold text-ink">Locality Pages</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg bg-accent px-2.5 py-1.5 text-xs font-medium text-white hover:bg-accent-ink"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2} />
              Add Locality Page
            </button>
            <button type="button" onClick={onClose} className="text-ink-faint hover:text-ink" aria-label="Close">
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {localityPages.map((page) => {
            const expanded = expandedId === page.id;
            return (
              <div key={page.id} className="border-b border-rule">
                <button
                  type="button"
                  onClick={() => setExpandedId(expanded ? null : page.id)}
                  className="flex w-full items-center justify-between px-5 py-3.5 text-left hover:bg-surface-sunken"
                >
                  <span>
                    <span className="block text-sm font-medium text-ink">{page.name}</span>
                    <span className="block text-xs text-ink-faint">
                      {page.listingCount} listings &middot; {page.monthlyViews.toLocaleString("en-IN")} views/mo
                    </span>
                  </span>
                  <ChevronRight className={`h-4 w-4 text-ink-faint transition-transform ${expanded ? "rotate-90" : ""}`} strokeWidth={2} />
                </button>

                {expanded && (
                  <div className="flex flex-col gap-3 bg-surface-sunken px-5 py-4">
                    <LabeledInput label="Locality Name" defaultValue={page.name} />
                    <LabeledTextarea label="Intro Copy" defaultValue={`Explore verified rooms and PGs for rent in ${page.name}, from budget shares to furnished private flats.`} />
                    <LabeledInput label="Meta Title" defaultValue={`Rooms & PGs for Rent in ${page.name} | Fahiq`} />
                    <LabeledTextarea
                      label="Meta Description"
                      rows={2}
                      defaultValue={`Browse ${page.listingCount} verified listings in ${page.name}. No brokerage, instant enquiry, WhatsApp support.`}
                    />
                    <button type="button" className="self-start rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white hover:bg-accent-ink">
                      Save Page
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function LabeledInput({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">{label}</span>
      <input
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-rule bg-surface px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
      />
    </label>
  );
}

function LabeledTextarea({ label, defaultValue, rows = 3 }: { label: string; defaultValue: string; rows?: number }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">{label}</span>
      <textarea
        defaultValue={defaultValue}
        rows={rows}
        className="w-full resize-none rounded-lg border border-rule bg-surface px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
      />
    </label>
  );
}
