import { Landmark, Mail, MapPin, MessageSquareText, PenLine, RefreshCw, SquareStack } from "lucide-react";
import { integrations } from "../../data/settings";

const integrationIcons: Record<string, typeof Landmark> = {
  whatsapp: MessageSquareText,
  razorpay: Landmark,
  ses: Mail,
  fast2sms: SquareStack,
  maps: MapPin,
  leegality: PenLine,
};

export function IntegrationsSection({ onConfigureWhatsApp }: { onConfigureWhatsApp: () => void }) {
  return (
    <section id="integrations" className="overflow-hidden rounded-xl border border-rule bg-surface shadow-sm">
      <div className="flex flex-col justify-between gap-2.5 bg-surface-sunken/50 p-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-ink">Integrations &amp; API Connections Hub</h2>
            <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-[11px] font-semibold text-accent">{integrations.length} Connected</span>
          </div>
          <p className="mt-0.5 text-sm text-ink-faint">Production communication pipelines, auto-debit rails, digital contract signing, and mapping infrastructure.</p>
        </div>
        <button type="button" className="flex shrink-0 items-center gap-1 self-start rounded-lg bg-surface-sunken px-3 py-1.5 text-xs font-semibold text-ink hover:bg-rule sm:self-auto">
          <RefreshCw className="h-4 w-4" strokeWidth={2} />
          Run Health Checks
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((i) => {
          const Icon = integrationIcons[i.id];
          return (
            <div key={i.id} className="flex flex-col justify-between gap-3 rounded-xl bg-surface-sunken p-4 transition-shadow hover:shadow-md">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {i.statusLabel}
                  </span>
                </div>
                <span className="text-sm font-bold text-ink">{i.name}</span>
                <span className="text-xs text-ink-faint">{i.description}</span>
                <div className="mt-2 flex items-center justify-between rounded bg-surface p-2 font-mono text-[11px] text-ink-muted">
                  <span>{i.metaLeft}</span>
                  <span className="font-semibold text-accent">{i.metaRight}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={i.id === "whatsapp" ? onConfigureWhatsApp : undefined}
                  className="h-8 flex-1 rounded bg-surface text-xs font-semibold text-accent shadow-sm hover:bg-rule"
                >
                  {i.primaryAction}
                </button>
                <button type="button" className="h-8 rounded bg-surface px-2.5 text-[11px] text-ink-muted hover:text-ink">
                  {i.secondaryAction}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
