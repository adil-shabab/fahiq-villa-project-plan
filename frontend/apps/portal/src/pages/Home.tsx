import { LogOut } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/auth/AuthLayout";
import { BrandMark } from "../components/auth/BrandMark";
import { getSessionPhone, logout } from "../lib/auth";

/** Placeholder until the tenant Home screen (docs/19 Page 2) is built. */
export function Home() {
  const navigate = useNavigate();
  const phone = getSessionPhone();
  if (!phone) return <Navigate to="/login" replace />;

  return (
    <AuthLayout>
      <BrandMark />
      <div className="mt-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-ink">You're logged in</h1>
        <p className="mt-1.5 text-base text-ink-muted">
          Signed in as <span className="font-semibold text-ink tabular-nums">{phone}</span>. Your dues, invoices and tickets will appear here.
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          logout();
          navigate("/login", { replace: true });
        }}
        className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-rule text-base font-semibold text-ink transition hover:bg-surface-sunken focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none"
      >
        <LogOut className="h-5 w-5" />
        Log out
      </button>
    </AuthLayout>
  );
}
