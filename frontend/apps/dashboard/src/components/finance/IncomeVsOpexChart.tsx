import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { incomeVsOpex, pnlStats } from "../../data/finance";
import { formatINR, formatINRCompact } from "../../lib/format";

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ dataKey: string; value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-rule bg-surface px-3 py-2 text-xs shadow-lg">
      <p className="mb-1 font-semibold text-ink">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="flex items-center justify-between gap-4 tabular-nums text-ink-muted">
          <span>{entry.dataKey === "revenue" ? "Revenue" : "OPEX"}</span>
          <span className="font-medium text-ink">{formatINR(entry.value)}</span>
        </p>
      ))}
    </div>
  );
}

export function IncomeVsOpexChart() {
  return (
    <div className="flex flex-col rounded-xl border border-rule bg-surface p-5 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-ink">Income vs. OPEX Comparison</h3>
          <span className="text-xs text-ink-faint">Past 6 months</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-ink">
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded bg-accent" /> Revenue
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded bg-danger" /> OPEX
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={incomeVsOpex} barGap={4} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--color-rule)" strokeDasharray="3 3" />
          <XAxis dataKey="month" axisLine={{ stroke: "var(--color-rule)" }} tickLine={false} tick={{ fill: "var(--color-ink-faint)", fontSize: 11 }} />
          <YAxis axisLine={false} tickLine={false} tickFormatter={(v: number) => formatINRCompact(v)} tick={{ fill: "var(--color-ink-faint)", fontSize: 11 }} width={48} />
          <Tooltip cursor={{ fill: "var(--color-surface-sunken)" }} content={<ChartTooltip />} />
          <Bar dataKey="revenue" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="opex" fill="var(--color-danger)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-between border-t border-rule pt-2 text-xs text-ink-muted">
        <span>Target OPEX ratio: ≤ 18.0%</span>
        <span className="font-semibold text-accent">Oct Performance: {pnlStats.expenseRatio}% (Optimal)</span>
      </div>
    </div>
  );
}
