import { AlarmClockPlus, CalendarRange, DownloadCloud, Send, Trash2, TriangleAlert } from "lucide-react";
import { scheduledJobs } from "../../data/reports";

export function ScheduledDeliveriesTab({ onNewSchedule, onManualExport }: { onNewSchedule: () => void; onManualExport: () => void }) {
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-rule bg-surface p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-2.5 md:flex-row md:items-center">
        <div>
          <h2 className="text-lg font-bold text-ink">Automated Delivery &amp; Distribution</h2>
          <p className="text-sm text-ink-faint">Scheduled report dispatches sent directly to property partners, auditors, and operations teams.</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onNewSchedule} className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white hover:bg-accent-ink">
            <AlarmClockPlus className="h-4 w-4" strokeWidth={2} />
            New Schedule
          </button>
          <button type="button" onClick={onManualExport} className="flex items-center gap-1.5 rounded-lg bg-surface-sunken px-3 py-2 text-sm font-semibold text-ink hover:bg-rule">
            <DownloadCloud className="h-4 w-4" strokeWidth={2} />
            Manual Export Engine
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {scheduledJobs.map((job, i) => (
          <div key={job.id} className="flex flex-col justify-between gap-3 rounded-xl bg-surface-sunken p-4 md:flex-row md:items-center">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-white">
                {i === 0 ? <CalendarRange className="h-5 w-5" strokeWidth={2} /> : <TriangleAlert className="h-5 w-5" strokeWidth={2} />}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-semibold text-ink">{job.title}</h4>
                  <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-bold uppercase text-accent-ink">Active Cron</span>
                  <span className="rounded bg-surface px-2 py-0.5 text-[10px] text-ink-muted">{job.formats}</span>
                </div>
                <p className="mt-0.5 text-xs text-ink-muted">{job.frequencyLabel}</p>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-ink-faint">Recipients:</span>
                  {job.recipients.map((r) => (
                    <span key={r} className="rounded-full bg-surface px-2 py-0.5 font-mono text-[11px] text-ink">{r}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2 self-end md:self-auto">
              <button type="button" className="flex items-center gap-1 rounded-lg bg-surface px-3 py-1.5 text-xs font-semibold text-ink hover:bg-rule">
                <Send className="h-3.5 w-3.5" strokeWidth={2} />
                Send Now
              </button>
              <button type="button" title="Delete Schedule" className="rounded p-1.5 text-ink-faint hover:bg-surface hover:text-danger">
                <Trash2 className="h-[18px] w-[18px]" strokeWidth={2} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
