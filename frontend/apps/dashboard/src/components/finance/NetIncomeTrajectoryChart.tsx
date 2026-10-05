import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { netIncomeTrajectory } from "../../data/finance";
import { formatINR, formatINRCompact } from "../../lib/format";

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-rule bg-surface px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold text-ink">{label}</p>
      <p className="tabular-nums text-ink-muted">
        Net cashflow: <span className="font-medium text-ink">{formatINR(payload[0].value)}</span>
      </p>
    </div>
  );
}

export function NetIncomeTrajectoryChart() {
  const latest = netIncomeTrajectory[netIncomeTrajectory.length - 1];
  return (
    <div className="flex flex-col rounded-xl border border-rule bg-surface p-5 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-ink">Net Income Trajectory (12 Months)</h3>
          <span className="text-xs text-ink-faint">Nov 2025 – Oct 2026</span>
        </div>
        <span className="flex items-center gap-1 text-xs text-accent">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" /> Net Cashflow
        </span>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={netIncomeTrajectory} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="netIncomeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.28} />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--color-rule)" strokeDasharray="3 3" />
          <XAxis dataKey="month" axisLine={{ stroke: "var(--color-rule)" }} tickLine={false} tick={{ fill: "var(--color-ink-faint)", fontSize: 11 }} />
          <YAxis axisLine={false} tickLine={false} tickFormatter={(v: number) => formatINRCompact(v)} tick={{ fill: "var(--color-ink-faint)", fontSize: 11 }} width={48} />
          <Tooltip content={<ChartTooltip />} />
          <Area
            type="monotone"
            dataKey="netIncome"
            stroke="var(--color-accent)"
            strokeWidth={2.5}
            fill="url(#netIncomeFill)"
            dot={{ r: 3, fill: "var(--color-accent)" }}
            activeDot={{ r: 5, fill: "var(--color-accent)", stroke: "var(--color-surface)", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-between pt-1 text-xs text-ink-faint">
        <span>{netIncomeTrajectory[0].month} (&nbsp;{formatINRCompact(netIncomeTrajectory[0].netIncome)})</span>
        <span className="font-semibold text-accent">
          {latest.month} ({formatINRCompact(latest.netIncome)})
        </span>
      </div>
    </div>
  );
}
