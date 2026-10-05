import { PieChart } from "lucide-react";
import { channelMix } from "../../data/payments";

export function ChannelMixCard() {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl border border-rule bg-surface p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PieChart className="h-5 w-5 text-accent" strokeWidth={2} />
          <span className="text-sm font-bold text-ink">Collection Channel Mix</span>
        </div>
        <span className="text-xs text-ink-faint">This month</span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex h-4 w-full overflow-hidden rounded-md">
          {channelMix.map((c) => (
            <div key={c.label} className={c.colorClass} style={{ width: `${c.percent}%` }} title={`${c.label}: ${c.percent}%`} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          {channelMix.map((c) => (
            <div key={c.label} className="flex items-center gap-1.5 text-xs">
              <span className={`h-2.5 w-2.5 rounded-sm ${c.colorClass}`} />
              <span className="text-ink">
                {c.label} ({c.percent}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-ink-faint">Zero MDR active on domestic RuPay UPI payments.</p>
    </div>
  );
}
