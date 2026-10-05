import { LoaderCircle } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function PrimaryButton({ loading, disabled, className, children, ...rest }: Props) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 text-base font-semibold text-on-accent transition",
        "hover:bg-accent-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/25",
        "disabled:cursor-not-allowed disabled:bg-rule-strong disabled:text-surface",
        className,
      )}
    >
      {loading && <LoaderCircle className="h-5 w-5 animate-spin" />}
      {children}
    </button>
  );
}
