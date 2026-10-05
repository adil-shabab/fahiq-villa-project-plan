import { Zap } from "lucide-react";
import { agingTranches } from "../../data/collections";
import { formatINR } from "../../lib/format";
import { cn } from "../../lib/utils";

const trancheClasses: Record<string, string> = {
  "0-30": "bg-gold-soft text-gold",
  "31-60": "bg-warn/15 text-warn",
  "61-90": "bg-danger/15 text-danger",
  "90+": "bg-danger text-white",
};

const dotClasses: Record<string, string> = {
  "0-30": "bg-gold",
  "31-60": "bg-warn",
  "61-90": "bg-danger",
  "90+": "bg-white animate-pulse",
};

export function AgingTranchesBar({ activeKey, onSelect }: { activeKey: string | null; onSelect: (key: string | null) => void }) {
  const totalOverdue = agingTranches.reduce((sum, t) => sum + t.count, 0);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-rule bg-surface p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Aging Tranches:</span>
        {agingTranches.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => onSelect(activeKey === t.key ? null : t.key)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-opacity",
              trancheClasses[t.key],
              activeKey && activeKey !== t.key && "opacity-50",
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", dotClasses[t.key])} />
            {t.label}: {formatINR(t.amount)} <span className="opacity-80">({t.count} tenants)</span>
          </button>
        ))}
      </div>
      <button
        type="button"
        className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-ok/10 px-4 py-2 text-sm font-semibold text-accent hover:bg-ok/20"
      >
        <Zap className="h-4 w-4 text-ok" strokeWidth={2} />
        Bulk WhatsApp Reminders ({totalOverdue})
      </button>
    </div>
  );
}
