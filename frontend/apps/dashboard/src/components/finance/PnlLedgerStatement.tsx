import { Printer } from "lucide-react";
import { noiLine, opexLines, pnlStats, revenueLines, totalOpex, totalRevenue, type LedgerLine } from "../../data/finance";
import { formatINR } from "../../lib/format";
import { cn } from "../../lib/utils";

const varianceToneClasses = { ok: "text-ok", danger: "text-danger", neutral: "text-ink-muted" } as const;

function LineRow({ line }: { line: LedgerLine }) {
  return (
    <tr className="hover:bg-surface-sunken/40">
      <td className="py-2.5 pl-8 pr-4 text-ink">{line.description}</td>
      <td className="px-4 py-2.5 font-mono text-xs text-ink-faint">{line.ledgerCode}</td>
      <td className="px-4 py-2.5 text-right font-mono text-xs text-ink">{formatINR(line.prevMonth)}</td>
      <td className="px-4 py-2.5 text-right font-mono text-xs font-bold text-ink">{formatINR(line.currentMonth)}</td>
      <td className="px-4 py-2.5 text-right font-mono text-xs text-ink-muted">{line.percentOfRevenue}</td>
      <td className={cn("px-4 py-2.5 text-right font-mono text-xs font-medium", varianceToneClasses[line.varianceTone])}>{line.variance}</td>
    </tr>
  );
}

export function PnlLedgerStatement() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-rule bg-surface p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-2.5 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-bold text-ink">Standard GAAP Profit &amp; Loss Statement</h3>
          <span className="text-xs text-ink-faint">Accrual Accounting Basis · Portfolio Consolidated (5 Properties)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-surface-sunken px-2.5 py-1 font-mono text-xs text-ink">FY 2026-27 Q3</span>
          <button type="button" className="flex items-center gap-1 rounded-lg bg-surface-sunken px-3 py-1.5 text-xs font-medium text-accent hover:bg-rule">
            <Printer className="h-4 w-4" strokeWidth={2} />
            Print Voucher
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-sunken text-[11px] uppercase tracking-wide text-ink-faint">
            <tr>
              <th className="px-4 py-3 font-semibold">Account / Line Item Description</th>
              <th className="px-4 py-3 font-semibold">Ledger Code</th>
              <th className="px-4 py-3 text-right font-semibold">Sept 2026</th>
              <th className="px-4 py-3 text-right font-semibold">Oct 2026 (Current)</th>
              <th className="px-4 py-3 text-right font-semibold">% of Revenue</th>
              <th className="px-4 py-3 text-right font-semibold">MoM Variance</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-surface-sunken/60">
              <td className="px-4 py-2.5 text-[13px] font-bold uppercase tracking-wide text-accent" colSpan={6}>
                1. Operating Revenue (Collections)
              </td>
            </tr>
            {revenueLines.map((l) => (
              <LineRow key={l.description} line={l} />
            ))}
            <tr className="bg-surface-sunken font-bold text-ink">
              <td className="px-4 py-3">TOTAL OPERATING REVENUE (A)</td>
              <td className="px-4 py-3 font-mono text-xs text-ink-faint">GRP-REV</td>
              <td className="px-4 py-3 text-right font-mono text-xs">{formatINR(totalRevenue.prevMonth)}</td>
              <td className="px-4 py-3 text-right font-mono text-xs text-accent">{formatINR(totalRevenue.currentMonth)}</td>
              <td className="px-4 py-3 text-right font-mono text-xs">100.0%</td>
              <td className="px-4 py-3 text-right font-mono text-xs text-ok">{totalRevenue.variance}</td>
            </tr>

            <tr className="bg-surface-sunken/60">
              <td className="px-4 py-2.5 text-[13px] font-bold uppercase tracking-wide text-danger" colSpan={6}>
                2. Operating Expenses (OPEX)
              </td>
            </tr>
            {opexLines.map((l) => (
              <LineRow key={l.description} line={l} />
            ))}
            <tr className="bg-surface-sunken font-bold text-ink">
              <td className="px-4 py-3">TOTAL OPERATING EXPENSES (B)</td>
              <td className="px-4 py-3 font-mono text-xs text-ink-faint">GRP-OPX</td>
              <td className="px-4 py-3 text-right font-mono text-xs">{formatINR(totalOpex.prevMonth)}</td>
              <td className="px-4 py-3 text-right font-mono text-xs text-danger">{formatINR(totalOpex.currentMonth)}</td>
              <td className="px-4 py-3 text-right font-mono text-xs">{pnlStats.expenseRatio}%</td>
              <td className="px-4 py-3 text-right font-mono text-xs text-ink-muted">{totalOpex.variance}</td>
            </tr>

            <tr className="bg-accent font-bold text-white">
              <td className="px-4 py-4 text-base">NET OPERATING INCOME (NOI = A - B)</td>
              <td className="px-4 py-4 font-mono text-xs text-white/80">ACC-9000</td>
              <td className="px-4 py-4 text-right font-mono text-sm">{formatINR(noiLine.prevMonth)}</td>
              <td className="px-4 py-4 text-right font-mono text-base">{formatINR(noiLine.currentMonth)}</td>
              <td className="px-4 py-4 text-right font-mono text-xs">{pnlStats.netMargin}% margin</td>
              <td className="px-4 py-4 text-right font-mono text-xs">{noiLine.variance}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
