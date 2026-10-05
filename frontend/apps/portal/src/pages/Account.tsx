import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { tenantProfile } from "../data/home";
import { getSessionPhone, logout } from "../lib/auth";

/** Minimal Account tab until docs/19 Account page is built: who's signed in + log out. */
export function Account() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight text-ink">Account</h1>
      <div className="rounded-2xl border border-rule bg-surface p-5">
        <p className="text-base font-semibold text-ink">{tenantProfile.firstName}</p>
        <p className="text-sm text-ink-muted tabular-nums">{getSessionPhone()}</p>
        <p className="mt-1 text-sm text-ink-faint">
          {tenantProfile.propertyName} · {tenantProfile.unitCode}
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          logout();
          navigate("/login", { replace: true });
        }}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-rule bg-surface text-base font-semibold text-danger transition hover:bg-surface-sunken focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none"
      >
        <LogOut className="h-5 w-5" />
        Log out
      </button>
    </div>
  );
}
