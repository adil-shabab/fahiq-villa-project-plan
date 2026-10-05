import {
  BellRing,
  Building2,
  ConciergeBell,
  Gauge,
  Globe,
  Languages,
  LayoutGrid,
  Network,
  Receipt,
  ShieldCheck,
  Tag,
  Users,
} from "lucide-react";
import { settingsNavGroups } from "../../data/settings";
import { cn } from "../../lib/utils";

const iconMap: Record<string, typeof Building2> = {
  apartment: Building2,
  group: Users,
  public: Globe,
  language: Languages,
  receipt_long: Receipt,
  forward_to_inbox: Receipt,
  tag: Tag,
  category: LayoutGrid,
  electric_meter: Gauge,
  room_service: ConciergeBell,
  hub: Network,
  notifications_active: BellRing,
};

export function SettingsNavRail({ activeId, onNavigate }: { activeId: string; onNavigate: (id: string) => void }) {
  return (
    <div className="sticky top-4 flex max-h-[calc(100vh-6rem)] flex-col gap-1 overflow-y-auto rounded-xl border border-rule bg-surface p-2 shadow-sm lg:col-span-3">
      {settingsNavGroups.map((group) => (
        <div key={group.label}>
          <div className="px-2 py-2 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">{group.label}</div>
          <nav className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const Icon = iconMap[item.icon] ?? Building2;
              const active = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-2.5 py-2.5 text-left text-sm font-medium transition-colors",
                    active ? "bg-accent-soft font-semibold text-accent-ink" : "text-ink-muted hover:bg-surface-sunken hover:text-ink",
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className={cn("h-[18px] w-[18px]", active ? "text-accent" : "text-ink-faint")} strokeWidth={2} />
                    <span>{item.label}</span>
                  </span>
                  {item.meta &&
                    (item.metaTone === "dot" ? (
                      <span className="h-2 w-2 rounded-full bg-gold" />
                    ) : (
                      <span className={cn("text-[11px] font-mono", item.metaTone === "ok" ? "text-accent" : "text-ink-faint")}>{item.meta}</span>
                    ))}
                </button>
              );
            })}
          </nav>
        </div>
      ))}

      <div className="mt-3 flex flex-col gap-1 rounded-lg bg-surface-sunken p-3">
        <div className="flex items-center gap-1.5 text-accent">
          <ShieldCheck className="h-4 w-4" strokeWidth={2} />
          <span className="text-xs font-semibold">SOC-2 &amp; RBI Ready</span>
        </div>
        <p className="text-[11px] leading-tight text-ink-muted">Audit logs, encrypted keys, and multi-tenant isolation updated 8m ago.</p>
      </div>
    </div>
  );
}
