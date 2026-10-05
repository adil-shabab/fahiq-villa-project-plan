import { Boxes, Users, Wrench, Zap } from "lucide-react";
import { expenseCategoryTiles } from "../../data/finance";
import { formatINR } from "../../lib/format";
import { cn } from "../../lib/utils";

const icons = { maintenance: Wrench, utilities: Zap, salaries: Users, supplies: Boxes } as const;

const toneClasses = { ok: "text-ok", danger: "text-danger", neutral: "text-ink-muted" } as const;

export function ExpenseCategoryTiles() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {expenseCategoryTiles.map((t) => {
        const Icon = icons[t.id as keyof typeof icons];
        return (
          <div key={t.id} className="flex flex-col justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">{t.label}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-sunken text-accent">
                <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
              </div>
            </div>
            <div className="mt-3 flex flex-col">
              <span className="font-mono text-lg font-bold text-ink">{formatINR(t.amount)}</span>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-ink-muted">{t.footnote}</span>
                <span className={cn("text-xs font-medium", toneClasses[t.changeTone])}>{t.changeLabel}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
