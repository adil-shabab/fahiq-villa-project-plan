import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { cn } from "../../lib/utils";

interface Props {
  message: string | null;
  onDone: () => void;
  /** Sit higher, above a composer pinned over the tab bar. */
  raised?: boolean;
}

/** Bottom toast that sits above the tab bar and clears itself after 4 s. */
export function Toast({ message, onDone, raised }: Props) {
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(onDone, 4000);
    return () => clearTimeout(id);
  }, [message, onDone]);

  if (!message) return null;
  return (
    <div
      role="status"
      className={cn(
        "fixed inset-x-4 z-40 mx-auto flex max-w-[448px] items-start gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-medium text-surface shadow-lg",
        raised ? "bottom-[calc(8.5rem+env(safe-area-inset-bottom))]" : "bottom-[calc(5rem+env(safe-area-inset-bottom))]",
      )}
    >
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ok" />
      {message}
    </div>
  );
}
