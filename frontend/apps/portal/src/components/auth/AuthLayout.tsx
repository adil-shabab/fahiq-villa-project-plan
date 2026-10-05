import type { ReactNode } from "react";

/** Full-height, soft teal-tinted canvas with a centred card — shared by Login and Verify OTP. */
export function AuthLayout({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-ground px-4 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-accent-soft to-transparent"
      />
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative w-full max-w-[400px]">
        <div className="rounded-2xl border border-rule bg-surface p-6 shadow-[0_1px_2px_rgba(23,33,29,0.05),0_18px_40px_-20px_rgba(23,33,29,0.25)] sm:p-8">
          {children}
        </div>
        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </main>
  );
}
