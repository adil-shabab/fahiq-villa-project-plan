import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { occupancyTrend } from "../../data/dashboard";

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-rule bg-surface px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold text-ink">{label}</p>
      <p className="tabular-nums text-ink-muted">
        <span className="font-medium text-ink">{payload[0].value}</span> units occupied
      </p>
    </div>
  );
}

export function OccupancyTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <AreaChart data={occupancyTrend} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
        <defs>
          <linearGradient id="occupancyFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.28} />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--color-rule)" />
        <XAxis
          dataKey="month"
          axisLine={{ stroke: "var(--color-rule)" }}
          tickLine={false}
          interval={1}
          tick={{ fill: "var(--color-ink-faint)", fontSize: 11 }}
        />
        <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
        <Tooltip content={<ChartTooltip />} />
        <Area
          type="monotone"
          dataKey="occupied"
          stroke="var(--color-accent)"
          strokeWidth={2}
          fill="url(#occupancyFill)"
          dot={false}
          activeDot={{ r: 4, fill: "var(--color-accent)", stroke: "var(--color-surface)", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
