import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

/** Bottom toast that sits above the tab bar and clears itself after 4 s. */
export function Toast({ message, onDone }: { message: string | null; onDone: () => void }) {
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(onDone, 4000);
    return () => clearTimeout(id);
  }, [message, onDone]);

  if (!message) return null;
  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-40 mx-auto flex max-w-[448px] items-start gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-medium text-surface shadow-lg"
    >
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ok" />
      {message}
    </div>
  );
}
