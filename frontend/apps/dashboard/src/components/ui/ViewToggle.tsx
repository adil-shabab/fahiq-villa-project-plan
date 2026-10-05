import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

export interface ViewOption<T extends string> {
  value: T;
  icon: LucideIcon;
  label: string;
}

export function ViewToggle<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (next: T) => void;
  options: ViewOption<T>[];
}) {
  return (
    <div className="flex rounded-lg border border-rule p-0.5">
      {options.map((option) => {
        const Icon = option.icon;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-label={option.label}
            className={cn(
              "flex h-7 w-8 items-center justify-center rounded-md",
              value === option.value ? "bg-accent text-white" : "text-ink-muted hover:text-ink",
            )}
          >
            <Icon className="h-4 w-4" strokeWidth={2} />
          </button>
        );
      })}
    </div>
  );
}
