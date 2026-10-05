import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

/** Back arrow + title for full-screen sub-pages. Falls back to `fallback` when opened directly. */
export function BackHeader({ title, fallback }: { title: string; fallback: string }) {
  const navigate = useNavigate();
  return (
    <header className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => (window.history.state?.idx > 0 ? navigate(-1) : navigate(fallback, { replace: true }))}
        aria-label="Back"
        className="-ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-muted transition hover:bg-surface-sunken hover:text-ink focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <h1 className="truncate text-lg font-bold tracking-tight text-ink">{title}</h1>
    </header>
  );
}
