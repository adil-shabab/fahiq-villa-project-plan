import type { ReactNode } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { listingsSummary } from "../../data/listings";

export function ListingsSummaryCards() {
  const sparklineData = listingsSummary.viewsSparkline.map((value, i) => ({ i, value }));

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <SummaryCard label="Live Listings" value={`${listingsSummary.liveListings} / ${listingsSummary.totalUnits}`} />
      <SummaryCard label="Views This Month" value={listingsSummary.viewsThisMonth.toLocaleString("en-IN")}>
        <div className="h-8 w-20">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="sparklineFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke="var(--color-accent)" strokeWidth={1.5} fill="url(#sparklineFill)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SummaryCard>
      <SummaryCard label="Enquiries This Month" value={String(listingsSummary.enquiriesThisMonth)} />
      <SummaryCard label="Conversion Rate" value={`${listingsSummary.conversionRate}%`} />
    </div>
  );
}

function SummaryCard({ label, value, children }: { label: string; value: string; children?: ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">{label}</p>
        <p className="mt-1.5 text-xl font-bold tabular-nums tracking-tight text-ink">{value}</p>
      </div>
      {children}
    </div>
  );
}
