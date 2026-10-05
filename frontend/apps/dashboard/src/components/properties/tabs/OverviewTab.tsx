import { Clock, Users } from "lucide-react";
import type { Property } from "../../../data/properties";

export function OverviewTab({ property }: { property: Property }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-4 lg:col-span-2">
        <div>
          <h3 className="text-sm font-semibold text-ink">About this property</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{property.description}</p>
        </div>

        <div className="rounded-xl border border-rule bg-surface p-4">
          <h3 className="text-sm font-semibold text-ink">Key Facts</h3>
          <dl className="mt-3 grid grid-cols-2 gap-y-3 text-sm sm:grid-cols-3">
            <Fact label="Property Type" value={property.type} />
            <Fact label="Total Units" value={String(property.totalUnits)} />
            <Fact label="City" value={property.city} />
          </dl>
        </div>

        <div className="rounded-xl border border-rule bg-surface p-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Clock className="h-4 w-4 text-ink-muted" strokeWidth={2} />
            House Rules
          </h3>
          <dl className="mt-3 flex flex-col gap-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-muted">Gate Closing Time</dt>
              <dd className="font-medium text-ink">{property.gateClosingTime}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="shrink-0 text-ink-muted">Guest Policy</dt>
              <dd className="text-right font-medium text-ink">{property.guestPolicy}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="rounded-xl border border-rule bg-surface p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
          <Users className="h-4 w-4 text-ink-muted" strokeWidth={2} />
          Recent Activity
        </h3>
        <ul className="mt-3 flex flex-col gap-3 text-sm">
          <ActivityRow text={`Unit ${property.units[0]?.code ?? ""} marked ${property.units[0]?.status.toLowerCase() ?? "occupied"}`} time="2 days ago" />
          <ActivityRow text="New enquiry received from website" time="4 days ago" />
          <ActivityRow text="Meter reading recorded for all units" time="1 week ago" />
        </ul>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-ink-faint">{label}</dt>
      <dd className="mt-0.5 font-medium text-ink">{value}</dd>
    </div>
  );
}

function ActivityRow({ text, time }: { text: string; time: string }) {
  return (
    <li className="border-b border-rule pb-3 last:border-b-0 last:pb-0">
      <p className="text-ink">{text}</p>
      <p className="mt-0.5 text-xs text-ink-faint">{time}</p>
    </li>
  );
}
