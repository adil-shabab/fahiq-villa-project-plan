import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import type { DonutSlice } from "../../data/finance";
import { formatINR, formatINRCompact } from "../../lib/format";

export function DonutBreakdownCard({
  title,
  subtitle,
  centerLabel,
  centerValue,
  slices,
}: {
  title: string;
  subtitle: string;
  centerLabel: string;
  centerValue: number;
  slices: DonutSlice[];
}) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-rule bg-surface p-5 shadow-sm">
      <div className="pb-2">
        <h3 className="text-sm font-bold text-ink">{title}</h3>
        <span className="text-xs text-ink-faint">{subtitle}</span>
      </div>
      <div className="my-2 flex flex-col items-center gap-5 sm:flex-row">
        <div className="relative h-40 w-40 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={slices} dataKey="percent" nameKey="label" innerRadius={55} outerRadius={75} startAngle={90} endAngle={-270} stroke="var(--color-surface)" strokeWidth={2}>
                {slices.map((s) => (
                  <Cell key={s.label} fill={s.colorVar} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-ink-faint">{centerLabel}</span>
            <span className="font-mono text-sm font-bold text-ink">{formatINRCompact(centerValue)}</span>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          {slices.map((s) => (
            <div key={s.label} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.colorVar }} />
                <span className="text-ink">
                  {s.label} ({s.percent}%)
                </span>
              </div>
              <span className="whitespace-nowrap font-mono text-xs font-semibold text-ink">{formatINR(s.amount)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
