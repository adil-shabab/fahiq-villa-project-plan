import { CircleAlert, Handshake } from "lucide-react";
import { promisesToPay } from "../../data/collections";
import { formatINR } from "../../lib/format";
import { cn } from "../../lib/utils";

const statusClasses: Record<string, string> = {
  Upcoming: "bg-accent-soft text-accent-ink",
  "Due Today": "bg-gold-soft text-gold",
  Broken: "bg-danger/15 text-danger",
};

function formatPromisedDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function PromiseToPayCard({ onNewPromise }: { onNewPromise: () => void }) {
  const resolvedRate = 78.4;

  return (
    <div id="pipeline-section" className="flex flex-col justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
      <div>
        <div className="flex items-center justify-between pb-2.5">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-surface-sunken p-1.5 text-accent">
              <Handshake className="h-5 w-5" strokeWidth={2} />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-ink">Promise to Pay Pipeline</h3>
              <p className="text-xs text-ink-faint">{promisesToPay.length} Active commitments across portfolio</p>
            </div>
          </div>
          <button type="button" onClick={onNewPromise} className="text-xs font-semibold text-accent hover:underline">
            + New Promise
          </button>
        </div>
        <div className="mt-2 flex flex-col gap-2.5">
          {promisesToPay.map((p) => (
            <div key={p.id} className="flex items-center justify-between gap-2.5 rounded-lg bg-surface-sunken p-3">
              <div className="flex flex-col leading-tight">
                <span className="font-semibold text-ink">
                  {p.tenantName} (Unit {p.unitCode})
                </span>
                <span className="text-xs text-ink-muted">
                  Promised: {formatPromisedDate(p.promisedDate)} · Logged by {p.loggedBy}
                </span>
                <span className={cn("text-[11px] italic", p.status === "Broken" ? "font-medium text-danger not-italic" : "text-ink-faint")}>
                  {p.status === "Broken" ? (
                    <span className="flex items-center gap-1">
                      <CircleAlert className="h-3 w-3" strokeWidth={2} />
                      {p.note}
                    </span>
                  ) : (
                    `"${p.note}"`
                  )}
                </span>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="font-mono font-bold text-ink">{formatINR(p.amount)}</span>
                <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", statusClasses[p.status])}>{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-rule pt-3 text-xs text-ink-muted">
        <span>
          Resolution rate: <strong className="font-semibold text-accent">{resolvedRate}% this cycle</strong>
        </span>
        <button type="button" className="font-medium text-accent hover:underline">
          View All {promisesToPay.length} Promises →
        </button>
      </div>
    </div>
  );
}
