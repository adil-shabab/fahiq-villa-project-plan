import { agingBuckets } from "../../data/dashboard";
import { formatINR } from "../../lib/format";

// Sequential severity ramp — light to dark, amber to red — for the four
// ordinal aging buckets (not a categorical comparison, so no hue variation).
const rampColors = ["#f0ddb0", "#d9a94c", "#c97a33", "#bc4330"];

export function AgingBar() {
  const total = agingBuckets.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div>
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-surface-sunken">
        {agingBuckets.map((bucket, i) => (
          <div
            key={bucket.id}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{
              width: `${(bucket.amount / total) * 100}%`,
              backgroundColor: rampColors[i],
              marginLeft: i === 0 ? 0 : 2,
            }}
            title={`${bucket.label}: ${formatINR(bucket.amount)}`}
          />
        ))}
      </div>

      <ul className="mt-4 flex flex-col gap-2.5">
        {agingBuckets.map((bucket, i) => (
          <li key={bucket.id} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-ink-muted">
              <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: rampColors[i] }} />
              {bucket.label}
            </span>
            <span className="font-medium tabular-nums text-ink">{formatINR(bucket.amount)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
