import type { Tenancy } from "../../../data/tenancies";
import { Badge } from "../../ui/Badge";

const statusTone = { Open: "danger", "In Progress": "warn", Resolved: "ok" } as const;

export function TicketsTab({ tenancy }: { tenancy: Tenancy }) {
  if (tenancy.tickets.length === 0) {
    return <p className="rounded-xl border border-rule bg-surface py-10 text-center text-sm text-ink-faint">No maintenance tickets raised.</p>;
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-rule bg-surface">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-rule bg-surface-sunken text-xs uppercase tracking-wide text-ink-faint">
            <th className="px-5 py-2.5 font-semibold">Ticket</th>
            <th className="px-3 py-2.5 font-semibold">Priority</th>
            <th className="px-3 py-2.5 font-semibold">Status</th>
            <th className="px-3 py-2.5 font-semibold">Raised On</th>
          </tr>
        </thead>
        <tbody>
          {tenancy.tickets.map((t) => (
            <tr key={t.id} className="border-b border-rule last:border-b-0 hover:bg-surface-sunken/60">
              <td className="px-5 py-3 text-ink">{t.title}</td>
              <td className="px-3 py-3 text-ink-muted">{t.priority}</td>
              <td className="px-3 py-3">
                <Badge tone={statusTone[t.status]}>{t.status}</Badge>
              </td>
              <td className="px-3 py-3 text-ink-muted">{new Date(t.raisedOn).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
