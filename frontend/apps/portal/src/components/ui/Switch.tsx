import { cn } from "../../lib/utils";

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  size?: "md" | "sm";
}

/** Accessible on/off switch (role="switch"); `label` is the accessible name. */
export function Switch({ checked, onChange, label, size = "md" }: Props) {
  const track = size === "md" ? "h-7 w-12" : "h-6 w-10";
  const knob = size === "md" ? "h-5 w-5" : "h-4 w-4";
  const shift = size === "md" ? "translate-x-5" : "translate-x-4";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex shrink-0 items-center rounded-full p-1 transition focus-visible:ring-4 focus-visible:ring-accent/25 focus-visible:outline-none",
        track,
        checked ? "bg-accent" : "bg-rule-strong",
      )}
    >
      <span className={cn("rounded-full bg-white shadow transition-transform", knob, checked ? shift : "translate-x-0")} />
    </button>
  );
}
