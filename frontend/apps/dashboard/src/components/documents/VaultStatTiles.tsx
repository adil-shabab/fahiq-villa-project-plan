import { Archive, CircleAlert, ShieldAlert, ShieldCheck } from "lucide-react";
import { vaultStats } from "../../data/documents";

export function VaultStatTiles() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="flex flex-col justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Total Documents</span>
          <span className="rounded-lg bg-surface-sunken p-1.5 text-accent">
            <Archive className="h-5 w-5" strokeWidth={2} />
          </span>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-bold text-ink">{vaultStats.totalDocuments}</span>
          <span className="flex items-center gap-0.5 text-xs font-medium text-accent">
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
            100% OCR Indexed
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Signed Agreements</span>
          <span className="rounded-lg bg-surface-sunken p-1.5 text-accent">
            <ShieldCheck className="h-5 w-5" strokeWidth={2} />
          </span>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-bold text-ink">{vaultStats.signedAgreements}</span>
          <span className="text-xs font-medium text-accent">Aadhaar e-Sign</span>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Expiring (&lt;30 Days)</span>
          <span className="rounded-lg bg-gold-soft p-1.5 text-gold">
            <CircleAlert className="h-5 w-5" strokeWidth={2} />
          </span>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-bold text-gold">{vaultStats.expiringSoon}</span>
          <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[11px] font-semibold text-gold">Action required</span>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Expired / Audit Flag</span>
          <span className="rounded-lg bg-danger/15 p-1.5 text-danger">
            <ShieldAlert className="h-5 w-5" strokeWidth={2} />
          </span>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-bold text-danger">{vaultStats.expiredFlag}</span>
          <span className="rounded-full bg-danger/15 px-2 py-0.5 text-[11px] font-bold text-danger">Renew Immediately</span>
        </div>
      </div>
    </div>
  );
}
