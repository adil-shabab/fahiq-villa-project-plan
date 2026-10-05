import { Check, LoaderCircle, Mail, MessageCircle, MessageSquareText, Moon, type LucideIcon } from "lucide-react";
import { useRef, useState } from "react";
import { BackHeader } from "../components/ui/BackHeader";
import { Switch } from "../components/ui/Switch";
import { notifEvents, type NotifChannel, type NotifEvent, type NotificationPrefs } from "../data/profile";
import { saveNotificationPrefs, usePortalState } from "../lib/store";

const channels: { id: NotifChannel; label: string; icon: LucideIcon }[] = [
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "sms", label: "SMS", icon: MessageSquareText },
  { id: "email", label: "Email", icon: Mail },
];

const timeInput =
  "h-12 w-full rounded-xl border-2 border-rule bg-surface-sunken px-3 text-base text-ink tabular-nums focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/15 focus:outline-none";

/** Changes save automatically (mock of PUT /me/notification-preferences). */
export function NotificationPreferences() {
  const { notificationPrefs } = usePortalState();
  const [prefs, setPrefs] = useState<NotificationPrefs>(notificationPrefs);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const latestSave = useRef(0);

  async function persist(next: NotificationPrefs) {
    setPrefs(next);
    setStatus("saving");
    const ticket = ++latestSave.current;
    await saveNotificationPrefs(next);
    // Only the most recent change reports "Saved" (rapid toggles overlap).
    if (ticket === latestSave.current) setStatus("saved");
  }

  function toggle(event: NotifEvent, channel: NotifChannel, on: boolean) {
    persist({ ...prefs, channels: { ...prefs.channels, [event]: { ...prefs.channels[event], [channel]: on } } });
  }

  const q = prefs.quietHours;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-2">
        <BackHeader title="Notification Preferences" fallback="/account" />
        <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-ink-faint" aria-live="polite">
          {status === "saving" && (
            <>
              <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
              Saving…
            </>
          )}
          {status === "saved" && (
            <>
              <Check className="h-3.5 w-3.5 text-ok" />
              Saved
            </>
          )}
        </span>
      </div>

      <p className="-mt-2 text-sm text-ink-muted">Choose how we reach you for each kind of update.</p>

      {/* Table layout: channel names once in the header, three switches per row — fits 360px phones. */}
      <div className="overflow-hidden rounded-2xl border border-rule bg-surface">
        <div className="grid grid-cols-[1fr_repeat(3,3.25rem)] items-end gap-x-1 border-b border-rule bg-surface-sunken px-4 py-2.5" aria-hidden>
          <span />
          {channels.map((c) => (
            <span key={c.id} className="flex flex-col items-center gap-0.5 text-[0.6875rem] font-semibold text-ink-muted">
              <c.icon className="h-4 w-4" />
              {c.label}
            </span>
          ))}
        </div>
        <ul className="divide-y divide-rule">
          {notifEvents.map((ev) => {
            const allOff = channels.every((c) => !prefs.channels[ev.id][c.id]);
            return (
              <li key={ev.id} className="grid grid-cols-[1fr_repeat(3,3.25rem)] items-center gap-x-1 px-4 py-3.5">
                <div className="min-w-0 pr-2">
                  <p className="text-[0.9375rem] leading-snug font-semibold text-ink">{ev.label}</p>
                  <p className={allOff ? "text-xs text-ink-faint italic" : "text-xs text-ink-faint"}>{allOff ? "Off" : ev.hint}</p>
                  {ev.id === "rent_reminders" && allOff && <p className="mt-0.5 text-xs text-warn">You may miss due dates and late-fee warnings.</p>}
                </div>
                {channels.map((c) => (
                  <span key={c.id} className="flex justify-center">
                    <Switch size="sm" checked={prefs.channels[ev.id][c.id]} onChange={(on) => toggle(ev.id, c.id, on)} label={`${ev.label} via ${c.label}`} />
                  </span>
                ))}
              </li>
            );
          })}
        </ul>
      </div>

      <section aria-labelledby="quiet-heading" className="rounded-2xl border border-rule bg-surface p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <Moon className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="quiet-heading" className="text-base font-semibold text-ink">
              Quiet Hours
            </h2>
            <p className="text-xs text-ink-faint">No WhatsApp or SMS during these hours (IST)</p>
          </div>
          <Switch checked={q.enabled} onChange={(on) => persist({ ...prefs, quietHours: { ...q, enabled: on } })} label="Quiet hours" />
        </div>
        {q.enabled && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-ink">From</span>
              <input type="time" value={q.from} onChange={(e) => e.target.value && persist({ ...prefs, quietHours: { ...q, from: e.target.value } })} className={timeInput} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-ink">To</span>
              <input type="time" value={q.to} onChange={(e) => e.target.value && persist({ ...prefs, quietHours: { ...q, to: e.target.value } })} className={timeInput} />
            </label>
          </div>
        )}
      </section>
    </div>
  );
}
