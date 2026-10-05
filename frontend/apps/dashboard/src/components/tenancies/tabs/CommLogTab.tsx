import { Mail, MessageCircle, Phone } from "lucide-react";
import type { CommLogEntry, Tenancy } from "../../../data/tenancies";

const channelIcon: Record<CommLogEntry["channel"], typeof MessageCircle> = {
  WhatsApp: MessageCircle,
  SMS: MessageCircle,
  Email: Mail,
  Call: Phone,
};

export function CommLogTab({ tenancy }: { tenancy: Tenancy }) {
  return (
    <div className="rounded-xl border border-rule bg-surface p-5">
      <h3 className="mb-3 text-sm font-semibold text-ink">Communication Log</h3>
      <ul className="flex flex-col gap-3">
        {tenancy.commLog.map((entry, i) => {
          const Icon = channelIcon[entry.channel];
          return (
            <li key={i} className="flex items-start gap-2.5 border-b border-rule pb-3 last:border-b-0 last:pb-0">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-ink">
                <Icon className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              <div>
                <p className="text-sm text-ink">{entry.summary}</p>
                <p className="text-xs text-ink-faint">
                  {entry.channel} &middot; {new Date(entry.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
