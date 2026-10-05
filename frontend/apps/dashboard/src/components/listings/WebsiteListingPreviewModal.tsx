import { Bath, BedDouble, ExternalLink, MapPin, Wifi, X, Zap } from "lucide-react";
import { createPortal } from "react-dom";
import type { ListingRow } from "../../data/listings";
import { formatINR } from "../../lib/format";

export function WebsiteListingPreviewModal({ row, onClose }: { row: ListingRow; onClose: () => void }) {
  const url = `fahiq.in/rooms/${row.slug}`;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-rule-strong bg-surface shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-rule bg-surface-sunken px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-warn/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-ok/60" />
          <div className="ml-2 flex flex-1 items-center gap-1.5 rounded-md bg-surface px-3 py-1 text-xs text-ink-faint">
            <span className="truncate">{url}</span>
          </div>
          <button type="button" onClick={onClose} className="text-ink-faint hover:text-ink" aria-label="Close">
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        {/* Public site page */}
        <div className="flex-1 overflow-y-auto">
          <div className="h-56" style={{ backgroundColor: row.coverColor }} />
          <div className="px-6 py-5">
            <span className="rounded-full bg-ok/10 px-2.5 py-0.5 text-xs font-semibold text-ok">Available</span>
            <h3 className="mt-2 text-xl font-bold text-ink">{row.listingTitle}</h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-ink-faint">
              <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
              {row.propertyName}
            </p>

            <p className="mt-4 text-2xl font-bold tabular-nums text-ink">
              {formatINR(row.rent)}
              <span className="text-sm font-normal text-ink-faint"> / month</span>
            </p>

            <div className="mt-4 flex flex-wrap gap-3 text-sm text-ink-muted">
              <Amenity icon={BedDouble} label={row.type} />
              <Amenity icon={Bath} label="Attached bathroom" />
              <Amenity icon={Wifi} label="Wi-Fi included" />
              <Amenity icon={Zap} label="Power backup" />
            </div>

            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{row.listingDescription}</p>

            <button type="button" className="mt-5 w-full rounded-lg bg-accent py-2.5 text-sm font-semibold text-white">
              Schedule a Visit
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule px-5 py-3">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Close
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-rule px-3.5 py-2 text-sm font-medium text-ink hover:border-rule-strong"
          >
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
            Open in New Tab
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Amenity({ icon: Icon, label }: { icon: typeof Wifi; label: string }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-rule px-2.5 py-1">
      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
      {label}
    </span>
  );
}
