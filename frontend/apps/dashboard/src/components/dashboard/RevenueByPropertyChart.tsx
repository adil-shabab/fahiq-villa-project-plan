import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { revenueByProperty } from "../../data/dashboard";
import { formatINRCompact } from "../../lib/format";

export function RevenueByPropertyChart() {
  const sorted = [...revenueByProperty].sort((a, b) => b.amount - a.amount);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={sorted} layout="vertical" margin={{ top: 0, right: 56, left: 4, bottom: 0 }} barSize={16}>
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          axisLine={false}
          tickLine={false}
          width={132}
          tick={{ fill: "var(--color-ink-muted)", fontSize: 12 }}
        />
        <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
          {sorted.map((entry) => (
            <Cell key={entry.id} fill="var(--color-accent)" />
          ))}
          <LabelList
            dataKey="amount"
            position="right"
            formatter={(value: unknown) => (typeof value === "number" ? formatINRCompact(value) : "")}
            fill="var(--color-ink)"
            fontSize={12}
            fontWeight={600}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
