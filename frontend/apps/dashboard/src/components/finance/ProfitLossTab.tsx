import { incomeByHead, opexByCategory, pnlStats } from "../../data/finance";
import { formatINR } from "../../lib/format";
import { DonutBreakdownCard } from "./DonutBreakdownCard";
import { IncomeVsOpexChart } from "./IncomeVsOpexChart";
import { NetIncomeTrajectoryChart } from "./NetIncomeTrajectoryChart";
import { PnlLedgerStatement } from "./PnlLedgerStatement";
import { PnlStatTiles } from "./PnlStatTiles";

export function ProfitLossTab() {
  return (
    <section className="flex flex-col gap-4">
      <PnlStatTiles />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <NetIncomeTrajectoryChart />
        <IncomeVsOpexChart />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DonutBreakdownCard
          title="Income Breakdown by Head"
          subtitle={`Total collections ${formatINR(pnlStats.totalIncome)} for October 2026`}
          centerLabel="Gross"
          centerValue={pnlStats.totalIncome}
          slices={incomeByHead}
        />
        <DonutBreakdownCard
          title="OPEX Category Apportionment"
          subtitle={`Total expenses ${formatINR(pnlStats.totalExpenses)} for October 2026`}
          centerLabel="OPEX"
          centerValue={pnlStats.totalExpenses}
          slices={opexByCategory}
        />
      </div>

      <PnlLedgerStatement />
    </section>
  );
}
