import { CircleAlert, Eye, Megaphone, Send } from "lucide-react";
import { campaignStats, campaigns, type ConversationTagTone } from "../../data/messaging";
import { cn } from "../../lib/utils";

const segmentClasses: Record<ConversationTagTone, string> = {
  neutral: "bg-surface-sunken text-ink-muted",
  danger: "bg-danger/15 text-danger",
  accent: "bg-accent-soft text-accent-ink",
  gold: "bg-gold-soft text-gold",
};

export function BroadcastsTab({ onCreateCampaign }: { onCreateCampaign: () => void }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-2.5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-ink">Broadcast Campaigns (WhatsApp Business API)</h2>
          <p className="text-sm text-ink-faint">{campaigns.length} bulk campaigns this month · 97.8% delivery rate across contacts</p>
        </div>
        <button type="button" onClick={onCreateCampaign} className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold text-white hover:bg-accent-ink">
          <Send className="h-4 w-4" strokeWidth={2} />
          Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="flex items-center justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Messages Sent</span>
            <span className="font-mono text-xl font-bold text-ink">{campaignStats.sent}</span>
            <span className="mt-0.5 text-xs text-ok">{campaignStats.targetPercent}% of target segment</span>
          </div>
          <Megaphone className="h-8 w-8 text-accent" strokeWidth={1.5} />
        </div>
        <div className="flex items-center justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Delivered</span>
            <span className="font-mono text-xl font-bold text-ink">{campaignStats.delivered}</span>
            <span className="mt-0.5 text-xs text-ok">{campaignStats.deliveredPercent}% delivery rate</span>
          </div>
          <span className="text-2xl text-info">✓✓</span>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Read / Opened</span>
            <span className="font-mono text-xl font-bold text-ink">{campaignStats.read}</span>
            <span className="mt-0.5 text-xs text-accent">{campaignStats.readPercent}% engagement</span>
          </div>
          <Eye className="h-8 w-8 text-accent" strokeWidth={1.5} />
        </div>
        <div className="flex items-center justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Undelivered</span>
            <span className="font-mono text-xl font-bold text-danger">{campaignStats.undelivered}</span>
            <button type="button" className="mt-0.5 text-left text-xs font-bold text-danger underline">
              Retry {campaignStats.undelivered} Failed
            </button>
          </div>
          <CircleAlert className="h-8 w-8 text-danger" strokeWidth={1.5} />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-rule bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-sunken text-[11px] uppercase tracking-wide text-ink-faint">
              <tr>
                <th className="px-4 py-3 font-semibold">Campaign Name</th>
                <th className="px-4 py-3 font-semibold">Audience Segment</th>
                <th className="px-4 py-3 font-semibold">HSM Template</th>
                <th className="px-4 py-3 text-right font-semibold">Recipients</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Delivery Rate</th>
                <th className="px-4 py-3 text-right font-semibold">Timestamp</th>
                <th className="px-4 py-3 text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id} className="border-b border-rule last:border-b-0 hover:bg-surface-sunken/60">
                  <td className="px-4 py-3.5 font-semibold text-ink">{c.name}</td>
                  <td className="px-4 py-3.5">
                    <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", segmentClasses[c.segmentTone])}>{c.segmentLabel}</span>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-ink-faint">{c.templateId}</td>
                  <td className="px-4 py-3.5 text-right font-mono font-semibold text-ink">{c.recipients}</td>
                  <td className="px-4 py-3.5">
                    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", c.status === "Sent" ? "bg-ok/10 text-ok" : "bg-surface-sunken text-ink-muted")}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    {c.status === "Sent" ? (
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-sunken">
                          <div className="h-full rounded-full bg-accent" style={{ width: `${c.deliveryPercent}%` }} />
                        </div>
                        <span className="font-mono text-xs text-ink-muted">
                          {c.deliveryPercent}% ({c.readPercent}% Read)
                        </span>
                      </div>
                    ) : (
                      <span className="font-mono text-xs text-ink-faint">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-xs text-ink-muted">{c.timestamp}</td>
                  <td className="px-4 py-3.5 text-center">
                    <button type="button" className="rounded px-2.5 py-1 text-xs font-semibold text-accent hover:bg-surface-sunken">
                      {c.status === "Sent" ? "View Analytics" : "Edit Schedule"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
