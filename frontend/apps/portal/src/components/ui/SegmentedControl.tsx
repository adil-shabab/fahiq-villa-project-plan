import { cn } from "../../lib/utils";

interface Props<T extends string> {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  /** "tabs" switches views (tablist); "radio" picks a form value (radiogroup). */
  kind?: "tabs" | "radio";
}

/** iOS-style segmented control: a tablist for switching views, or a radiogroup inside forms. */
export function SegmentedControl<T extends string>({ label, options, value, onChange, kind = "tabs" }: Props<T>) {
  return (
    <div role={kind === "tabs" ? "tablist" : "radiogroup"} aria-label={label} className="grid rounded-xl bg-surface-sunken p-1" style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role={kind === "tabs" ? "tab" : "radio"}
            aria-selected={kind === "tabs" ? active : undefined}
            aria-checked={kind === "radio" ? active : undefined}
            onClick={() => onChange(o.value)}
            className={cn(
              "h-10 rounded-lg text-sm font-semibold transition focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none",
              active ? "bg-surface text-ink shadow-[0_1px_3px_rgba(23,33,29,0.12)]" : "text-ink-muted hover:text-ink",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
