import { Check } from "lucide-react";
import { onboardingSteps } from "../../data/onboarding";
import { cn } from "../../lib/utils";

export function Stepper({ activeIndex }: { activeIndex: number }) {
  return (
    <ol className="flex items-center overflow-x-auto pb-1">
      {onboardingSteps.map((step, i) => {
        const isDone = i < activeIndex;
        const isActive = i === activeIndex;
        return (
          <li key={step} className="flex shrink-0 items-center">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-semibold",
                  isDone && "border-accent bg-accent text-white",
                  isActive && "border-accent bg-accent-soft text-accent-ink",
                  !isDone && !isActive && "border-rule-strong bg-surface text-ink-faint",
                )}
              >
                {isDone ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
              </span>
              <span className={cn("whitespace-nowrap text-[11px] font-medium", isActive ? "text-ink" : "text-ink-faint")}>{step}</span>
            </div>
            {i < onboardingSteps.length - 1 && (
              <span className={cn("mx-2 mb-4 h-0.5 w-10 shrink-0 rounded", isDone ? "bg-accent" : "bg-rule-strong")} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
