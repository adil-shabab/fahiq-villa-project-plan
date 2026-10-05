import { Search } from "lucide-react";
import { AccountMenu } from "./AccountMenu";
import { NotificationsPanel } from "./NotificationsPanel";
import { PropertySwitcher } from "./PropertySwitcher";

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-rule bg-surface px-4 lg:px-6">
      <PropertySwitcher />

      <div className="relative ml-1 hidden max-w-sm flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" strokeWidth={2} />
        <input
          type="text"
          placeholder="Search tenants, units, invoices..."
          className="w-full rounded-lg border border-rule bg-surface-sunken py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <NotificationsPanel />
        <span className="h-6 w-px bg-rule" />
        <AccountMenu />
      </div>
    </header>
  );
}
