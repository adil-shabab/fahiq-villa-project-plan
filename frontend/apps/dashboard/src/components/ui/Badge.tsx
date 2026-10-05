import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type BadgeTone = "neutral" | "accent" | "ok" | "warn" | "danger" | "info";

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-surface-sunken text-ink-muted border-rule",
  accent: "bg-accent-soft text-accent-ink border-transparent",
  ok: "bg-ok/10 text-ok border-transparent",
  warn: "bg-warn/10 text-warn border-transparent",
  danger: "bg-danger/10 text-danger border-transparent",
  info: "bg-info/10 text-info border-transparent",
};

export function Badge({ tone = "neutral", children }: { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        toneClasses[tone],
      )}
    >
      {children}
    </span>
  );
}
