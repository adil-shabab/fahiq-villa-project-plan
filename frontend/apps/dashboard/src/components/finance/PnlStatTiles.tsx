import { LineChart, PiggyBank, TrendingDown, TrendingUp } from "lucide-react";
import { pnlStats } from "../../data/finance";
import { formatINR } from "../../lib/format";

export function PnlStatTiles() {
  const s = pnlStats;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="flex flex-col justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Total Gross Income</span>
          <TrendingUp className="h-5 w-5 text-accent" strokeWidth={2} />
        </div>
        <div className="mt-3">
          <div className="font-mono text-xl font-bold text-accent">{formatINR(s.totalIncome)}</div>
          <div className="mt-1 flex items-center justify-between text-xs">
            <span className="text-ink-muted">{s.unitsBilled} Units Billed</span>
            <span className="font-semibold text-accent">{s.incomeChangeLabel}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Total OPEX Spend</span>
          <TrendingDown className="h-5 w-5 text-danger" strokeWidth={2} />
        </div>
        <div className="mt-3">
          <div className="font-mono text-xl font-bold text-danger">{formatINR(s.totalExpenses)}</div>
          <div className="mt-1 flex items-center justify-between text-xs">
            <span className="text-ink-muted">{s.expenseRatio}% Expense Ratio</span>
            <span className="font-semibold text-accent">Under 18% Cap</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Net Operating Income</span>
          <PiggyBank className="h-5 w-5 text-accent" strokeWidth={2} />
        </div>
        <div className="mt-3">
          <div className="font-mono text-xl font-bold text-accent">{formatINR(s.noi)}</div>
          <div className="mt-1 flex items-center justify-between text-xs">
            <span className="text-ink-muted">{s.netMargin}% Net Margin</span>
            <span className="font-semibold text-accent">{s.noiChangeLabel}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Portfolio Yield (Cap Rate)</span>
          <LineChart className="h-5 w-5 text-gold" strokeWidth={2} />
        </div>
        <div className="mt-3">
          <div className="font-mono text-xl font-bold text-gold">{s.yieldPercent}% p.a.</div>
          <div className="mt-1 flex items-center justify-between text-xs">
            <span className="text-ink-muted">{s.occupancyPercent}% Occupancy</span>
            <span className="font-semibold text-gold">+0.6% vs target</span>
          </div>
        </div>
      </div>
    </div>
  );
}
