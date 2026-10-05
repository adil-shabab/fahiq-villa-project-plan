import { House, ReceiptText, UserRound, Wrench, type LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { usePortalState } from "../../lib/store";
import { cn } from "../../lib/utils";

const tabs: { to: string; label: string; icon: LucideIcon; badge?: boolean }[] = [
  { to: "/", label: "Home", icon: House },
  { to: "/invoices", label: "Invoices", icon: ReceiptText, badge: true },
  { to: "/tickets", label: "Tickets", icon: Wrench },
  { to: "/account", label: "Account", icon: UserRound },
];

export function TabBar() {
  const hasDues = usePortalState().dues.length > 0;
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
    >
      <ul className="mx-auto grid max-w-[480px] grid-cols-4">
        {tabs.map(({ to, label, icon: Icon, badge }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex h-16 flex-col items-center justify-center gap-1 text-xs font-semibold transition focus-visible:bg-accent-soft focus-visible:outline-none",
                  isActive ? "text-accent" : "text-ink-faint hover:text-ink-muted",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative">
                    <Icon className="h-6 w-6" strokeWidth={isActive ? 2.4 : 2} />
                    {badge && hasDues && <span className="absolute -top-0.5 -right-1 h-2.5 w-2.5 rounded-full border-2 border-surface bg-danger" aria-label="Unpaid invoices" />}
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
