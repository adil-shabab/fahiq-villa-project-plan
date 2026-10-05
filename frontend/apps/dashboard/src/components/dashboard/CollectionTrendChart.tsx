import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { collectionTrend } from "../../data/dashboard";
import { formatINR, formatINRCompact } from "../../lib/format";

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ dataKey: string; value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-rule bg-surface px-3 py-2 text-xs shadow-lg">
      <p className="mb-1 font-semibold text-ink">{label} 2026</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="flex items-center justify-between gap-4 tabular-nums text-ink-muted">
          <span>{entry.dataKey === "billed" ? "Billed" : "Collected"}</span>
          <span className="font-medium text-ink">{formatINR(entry.value)}</span>
        </p>
      ))}
    </div>
  );
}

export function CollectionTrendChart() {
  return (
    <div>
      <div className="mb-3 flex items-center gap-4 text-xs text-ink-muted">
        <LegendSwatch className="bg-accent-soft ring-1 ring-inset ring-accent/40" label="Billed" />
        <LegendSwatch className="bg-accent" label="Collected" />
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={collectionTrend} barGap={4} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--color-rule)" />
          <XAxis
            dataKey="month"
            axisLine={{ stroke: "var(--color-rule)" }}
            tickLine={false}
            tick={{ fill: "var(--color-ink-faint)", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => formatINRCompact(v)}
            tick={{ fill: "var(--color-ink-faint)", fontSize: 11 }}
            width={48}
          />
          <Tooltip cursor={{ fill: "var(--color-surface-sunken)" }} content={<ChartTooltip />} />
          <Bar dataKey="billed" fill="var(--color-accent-soft)" stroke="var(--color-accent)" strokeOpacity={0.4} radius={[4, 4, 0, 0]} />
          <Bar dataKey="collected" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function LegendSwatch({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-2.5 w-2.5 rounded-sm ${className}`} />
      {label}
    </span>
  );
}
