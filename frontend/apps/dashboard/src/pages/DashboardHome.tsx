import { Building2, Plus, Receipt, UserPlus } from "lucide-react";
import { currentUser, kpis } from "../data/dashboard";
import { ActionRequiredCard } from "../components/dashboard/ActionRequiredCard";
import { AgingBar } from "../components/dashboard/AgingBar";
import { CollectionTrendChart } from "../components/dashboard/CollectionTrendChart";
import { FollowUpQueueTable } from "../components/dashboard/FollowUpQueueTable";
import { KpiCard } from "../components/dashboard/KpiCard";
import { MoveInOutCard } from "../components/dashboard/MoveInOutCard";
import { OccupancyTrendChart } from "../components/dashboard/OccupancyTrendChart";
import { RecentActivityFeed } from "../components/dashboard/RecentActivityFeed";
import { RevenueByPropertyChart } from "../components/dashboard/RevenueByPropertyChart";
import { Card, CardHeader } from "../components/ui/Card";

const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function DashboardHome() {
  const firstName = currentUser.name.split(" ")[0];

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      {/* Greeting + quick actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">
            {greeting()}, {firstName}
          </h1>
          <p className="mt-0.5 text-sm text-ink-faint">{today}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <QuickAction icon={Building2} label="Add Property" />
          <QuickAction icon={Plus} label="Add Unit" />
          <QuickAction icon={UserPlus} label="New Lead" />
          <QuickAction icon={Receipt} label="Run Billing" primary />
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.id} data={kpi} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="flex flex-col gap-6 xl:col-span-2">
          <Card>
            <CardHeader title="Collection Trend · Last 6 Months" />
            <div className="px-5 py-5">
              <CollectionTrendChart />
            </div>
          </Card>
          <Card>
            <CardHeader title="Occupancy Trend · Last 12 Months" />
            <div className="px-5 py-5">
              <OccupancyTrendChart />
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader title="Outstanding Aging" />
            <div className="px-5 py-5">
              <AgingBar />
            </div>
          </Card>
          <Card>
            <CardHeader title="Revenue by Property" />
            <div className="px-5 py-5">
              <RevenueByPropertyChart />
            </div>
          </Card>
        </div>
      </div>

      {/* Action required + move-ins/outs */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Action Required" />
          <ActionRequiredCard />
        </Card>
        <Card>
          <CardHeader title="Today's Move-ins & Move-outs" />
          <MoveInOutCard />
        </Card>
      </div>

      {/* Follow-up queue */}
      <Card>
        <CardHeader title="Today's Follow-up Queue" />
        <FollowUpQueueTable />
      </Card>

      {/* Recent activity */}
      <Card>
        <CardHeader title="Recent Activity" />
        <div className="px-5 py-5">
          <RecentActivityFeed />
        </div>
      </Card>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  label,
  primary,
}: {
  icon: typeof Plus;
  label: string;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      className={
        primary
          ? "flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink"
          : "flex items-center gap-1.5 rounded-lg border border-rule bg-surface px-3.5 py-2 text-sm font-medium text-ink hover:border-rule-strong"
      }
    >
      <Icon className="h-4 w-4" strokeWidth={2} />
      {label}
    </button>
  );
}
