import { Clock } from "lucide-react";
import { cn } from "../../lib/utils";

const fmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

/** SLA chip; turns red once the expected time has passed. `now` is passed in to keep render pure. */
export function ExpectedByChip({ at, now }: { at: string; now: number }) {
  const late = new Date(at).getTime() < now;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap",
        late ? "bg-danger/12 text-danger" : "bg-surface-sunken text-ink-muted",
      )}
    >
      <Clock className="h-3.5 w-3.5" />
      {late ? "Past expected time" : `Expected by ${fmt.format(new Date(at))}`}
    </span>
  );
}
