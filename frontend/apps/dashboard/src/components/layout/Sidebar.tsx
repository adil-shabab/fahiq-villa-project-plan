import { ShieldCheck } from "lucide-react";
import { NavLink } from "react-router-dom";
import { navItems } from "../../data/nav";
import { cn } from "../../lib/utils";

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 border-r border-rule bg-surface lg:flex lg:flex-col">
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
          <ShieldCheck className="h-5 w-5" strokeWidth={2.25} />
        </span>
        <span className="text-lg font-extrabold tracking-tight text-ink">
          Fahiq<span className="text-accent">.</span>
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <NavLink
                  to={item.href}
                  end={item.href === "/"}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg border-l-2 px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "border-accent bg-accent-soft text-accent-ink"
                        : "border-transparent text-ink-muted hover:bg-surface-sunken hover:text-ink",
                    )
                  }
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-rule px-5 py-4 text-xs text-ink-faint">
        Fahiq Dashboard &middot; v0.1 (prototype)
      </div>
    </aside>
  );
}
