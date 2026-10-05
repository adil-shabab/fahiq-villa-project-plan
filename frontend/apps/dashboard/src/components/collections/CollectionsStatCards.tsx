import { CheckCircle2, TrendingUp, TriangleAlert, Wallet } from "lucide-react";
import { collectionStats } from "../../data/collections";
import { formatINR } from "../../lib/format";
import { ProgressRing } from "../ui/ProgressRing";

export function CollectionsStatCards() {
  const s = collectionStats;
  const collectedPercent = Math.round((s.collected / s.expectedThisMonth) * 100);
  const outstandingPercent = Math.round((s.outstanding / s.expectedThisMonth) * 100);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="flex flex-col justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
        <div className="flex items-start justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Expected This Month</span>
          <span className="rounded-lg bg-surface-sunken p-1.5 text-accent">
            <Wallet className="h-5 w-5" strokeWidth={2} />
          </span>
        </div>
        <div className="mt-3">
          <div className="font-mono text-[28px] font-bold leading-8 tracking-tight text-ink">{formatINR(s.expectedThisMonth)}</div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-ink-muted">
            <span className="font-semibold text-accent">{s.billedUnits} tenancies in cycle</span>
            <span>·</span>
            <span className="text-ink-faint">100% billed</span>
          </div>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken">
          <div className="h-full w-full rounded-full bg-accent" />
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
        <div className="flex items-start justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Collected</span>
          <span className="rounded-lg bg-ok/10 p-1.5 text-ok">
            <CheckCircle2 className="h-5 w-5" strokeWidth={2} />
          </span>
        </div>
        <div className="mt-3">
          <div className="font-mono text-[28px] font-bold leading-8 tracking-tight text-ok">{formatINR(s.collected)}</div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-ink-muted">
            <span className="font-semibold text-ok">{s.paidUnitsCount} paid units</span>
            <span>·</span>
            <span className="font-medium text-ok">via Autopay &amp; offline</span>
          </div>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken">
          <div className="h-full rounded-full bg-ok" style={{ width: `${collectedPercent}%` }} />
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
        <div className="flex items-start justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-danger">Outstanding / Overdue</span>
          <span className="rounded-lg bg-danger/10 p-1.5 text-danger">
            <TriangleAlert className="h-5 w-5" strokeWidth={2} />
          </span>
        </div>
        <div className="mt-3">
          <div className="font-mono text-[28px] font-bold leading-8 tracking-tight text-danger">{formatINR(s.outstanding)}</div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-ink-muted">
            <span className="font-semibold text-danger">{s.overdueTenantCount} overdue tenants</span>
          </div>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken">
          <div className="h-full rounded-full bg-danger" style={{ width: `${outstandingPercent}%` }} />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
        <div className="flex h-full flex-col justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Collection Efficiency</span>
          <div>
            <div className="font-mono text-[32px] font-bold leading-9 tracking-tight text-accent">{s.efficiencyPercent}%</div>
            <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-ok">
              <TrendingUp className="h-3.5 w-3.5" strokeWidth={2} />
              <span>vs last month</span>
            </div>
          </div>
          <span className="text-[11px] text-ink-faint">Target: 95% by 25th</span>
        </div>
        <ProgressRing percent={s.efficiencyPercent} size={80} />
      </div>
    </div>
  );
}
