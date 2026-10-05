import { Moon, Plus, Zap } from "lucide-react";
import { reminderSteps } from "../../data/settings";
import { cn } from "../../lib/utils";

const toneDot = { accent: "bg-accent", gold: "bg-gold", danger: "bg-danger" } as const;
const toneText = { accent: "text-accent", gold: "text-gold", danger: "text-danger" } as const;

export function ReminderCadenceSection() {
  return (
    <section id="reminder-cadence" className="overflow-hidden rounded-xl border border-rule bg-surface shadow-sm">
      <div className="flex flex-col justify-between gap-2.5 bg-surface-sunken/50 p-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-ink">Automated Reminder Cadence (WhatsApp &amp; SMS)</h2>
            <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-[11px] font-semibold text-accent">Meta Approved Templates</span>
          </div>
          <p className="mt-0.5 text-sm text-ink-faint">Configure intelligent multi-channel triggers relative to an invoice's due date to optimize on-time UPI collections.</p>
        </div>
        <button type="button" className="flex shrink-0 items-center gap-1 self-start rounded-lg bg-surface-sunken px-3 py-1.5 text-xs font-semibold text-accent hover:bg-rule sm:self-auto">
          <Plus className="h-4 w-4" strokeWidth={2} />
          Add Reminder Step
        </button>
      </div>

      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-4 rounded-xl bg-surface-sunken p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-ink">Visual Trigger Sequence</span>
            <span className="text-xs text-ink-faint">Relative to invoice due date</span>
          </div>
          <div className="relative overflow-x-auto px-2 py-6">
            <div className="absolute left-6 right-6 top-1/2 h-1 -translate-y-1/2 rounded-full bg-rule" />
            <div className="relative flex min-w-[560px] items-center justify-between">
              {reminderSteps.map((s) => (
                <div key={s.id} className={cn("flex flex-col items-center gap-2", s.offset === "Due Day (0)" && "scale-105")}>
                  {s.offset === "Due Day (0)" ? (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-white">{s.offsetLabel}</span>
                  ) : (
                    <span className={cn("text-[11px] font-semibold", toneText[s.tone])}>{s.offsetLabel}</span>
                  )}
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-full shadow-md",
                      s.offset === "Due Day (0)" ? "h-9 w-9 bg-accent text-white ring-4 ring-accent/20" : "h-7 w-7 bg-surface",
                    )}
                  >
                    {s.offset === "Due Day (0)" ? <Zap className="h-[18px] w-[18px]" strokeWidth={2} /> : <span className={cn("h-3 w-3 rounded-full", toneDot[s.tone])} />}
                  </div>
                  <div className="text-center">
                    <span className={cn("block text-[11px] font-semibold", s.offset === "Due Day (0)" ? "text-accent" : "text-ink")}>{s.milestone.split(" ").slice(0, 2).join(" ")}</span>
                    <span className="text-[10px] text-ink-faint">{s.channels.email ? "WA + Email + Call" : s.channels.sms ? "WhatsApp + SMS" : "WhatsApp"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-rule">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-sunken text-[11px] uppercase tracking-wide text-ink-faint">
              <tr>
                <th className="px-4 py-3 font-semibold">Offset</th>
                <th className="px-4 py-3 font-semibold">Trigger Milestone</th>
                <th className="px-4 py-3 font-semibold">Template Code / WABA</th>
                <th className="px-4 py-3 font-semibold">Active Channels</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reminderSteps.map((s) => (
                <tr key={s.id} className="border-b border-rule last:border-b-0 hover:bg-surface-sunken/40">
                  <td className={cn("px-4 py-3 font-mono font-semibold", toneText[s.tone])}>{s.offsetLabel}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className={cn("text-sm font-semibold", s.escalated ? "text-danger" : "text-ink")}>{s.milestone}</span>
                      <span className="text-xs text-ink-faint">{s.subtitle}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded px-2 py-0.5 font-mono text-xs", s.escalated ? "bg-danger/15 text-danger" : "bg-surface-sunken text-ink-muted")}>{s.templateCode}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className={cn("flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold", s.channels.wa ? "bg-accent-soft text-accent-ink" : "bg-surface-sunken text-ink-faint opacity-50")}>WA</span>
                      <span className={cn("flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold", s.channels.sms ? "bg-accent-soft text-accent-ink" : "bg-surface-sunken text-ink-faint opacity-50")}>SMS</span>
                      <span className={cn("flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold", s.channels.email ? "bg-accent-soft text-accent-ink" : "bg-surface-sunken text-ink-faint opacity-50")}>EM</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2 text-ink-faint">
                      <button type="button" className="hover:text-accent">
                        <span className="text-xs font-semibold">Edit</span>
                      </button>
                      <button type="button" className="hover:text-danger">
                        <span className="text-xs font-semibold">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 rounded-xl bg-surface-sunken p-4 md:flex-row">
          <div className="flex items-start gap-2.5">
            <Moon className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={2} />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-ink">Quiet Hours &amp; Anti-Spam Safeguard</span>
              <span className="text-xs text-ink-muted">TRAI commercial communication and WhatsApp Business Messaging guidelines enforced.</span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2.5">
            <div className="flex items-center gap-1.5 rounded-lg bg-surface px-3 py-1.5 font-mono text-xs shadow-sm">
              <span>21:00</span>
              <span className="text-ink-faint">to</span>
              <span>08:30 IST</span>
            </div>
            <span className="rounded bg-surface-sunken px-2 py-0.5 text-[11px] font-semibold text-accent">Protected</span>
          </div>
        </div>
      </div>
    </section>
  );
}
