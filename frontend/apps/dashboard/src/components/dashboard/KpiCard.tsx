import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { KpiCardData } from "../../data/dashboard";
import { cn } from "../../lib/utils";

export function KpiCard({ data }: { data: KpiCardData }) {
  return (
    <div className="rounded-xl border border-rule bg-surface p-4 shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">{data.label}</p>
      <p
        className={cn(
          "mt-1.5 text-2xl font-bold tabular-nums tracking-tight",
          data.tone === "danger" ? "text-danger" : "text-ink",
        )}
      >
        {data.value}
      </p>
      {data.trend && (
        <p
          className={cn(
            "mt-1 flex items-center gap-1 text-xs font-medium",
            data.trend.direction === "up" ? "text-ok" : data.trend.direction === "down" ? "text-danger" : "text-ink-faint",
          )}
        >
          {data.trend.direction === "up" ? (
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          ) : data.trend.direction === "down" ? (
            <ArrowDownRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          ) : null}
          {data.trend.label}
        </p>
      )}
    </div>
  );
}
