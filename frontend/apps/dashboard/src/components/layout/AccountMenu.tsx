import { HelpCircle, LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { useRef, useState } from "react";
import { currentUser } from "../../data/dashboard";
import { useClickOutside } from "../../lib/useClickOutside";
import { useTheme } from "../../lib/useTheme";
import { Avatar } from "../ui/Avatar";
import { Switch } from "../ui/Switch";

export function AccountMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-surface-sunken"
      >
        <Avatar initials={currentUser.initials} />
        <span className="hidden text-left md:block">
          <span className="block text-sm font-medium leading-tight text-ink">{currentUser.name}</span>
          <span className="block text-xs leading-tight text-ink-faint">{currentUser.role}</span>
        </span>
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-2 w-60 overflow-hidden rounded-xl border border-rule bg-surface shadow-lg">
          <div className="border-b border-rule px-4 py-3">
            <p className="text-sm font-medium text-ink">{currentUser.name}</p>
            <p className="text-xs text-ink-faint">priya.sharma@fahiq.in</p>
            <span className="mt-1.5 inline-flex rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent-ink">
              {currentUser.role}
            </span>
          </div>

          <div className="py-1">
            <MenuRow icon={User} label="My Profile" />
            <MenuRow icon={Settings} label="Settings" />
            <MenuRow icon={HelpCircle} label="Help & Support" />
            <div className="flex w-full items-center justify-between px-4 py-2 text-sm text-ink">
              <span className="flex items-center gap-2.5">
                {theme === "dark" ? (
                  <Moon className="h-4 w-4 text-ink-muted" strokeWidth={2} />
                ) : (
                  <Sun className="h-4 w-4 text-ink-muted" strokeWidth={2} />
                )}
                Dark Mode
              </span>
              <Switch checked={theme === "dark"} onChange={toggleTheme} label="Toggle dark mode" />
            </div>
          </div>

          <div className="border-t border-rule py-1">
            <button
              type="button"
              className="flex w-full items-center gap-2.5 px-4 py-2 text-sm font-medium text-danger hover:bg-danger/10"
            >
              <LogOut className="h-4 w-4" strokeWidth={2} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuRow({ icon: Icon, label }: { icon: typeof User; label: string }) {
  return (
    <button type="button" className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-ink hover:bg-surface-sunken">
      <Icon className="h-4 w-4 text-ink-muted" strokeWidth={2} />
      {label}
    </button>
  );
}
