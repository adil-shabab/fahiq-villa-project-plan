import { Bell, ChevronRight, DoorOpen, Gift, Languages, LifeBuoy, LogOut, Megaphone, UserRoundPen, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tenantProfile } from "../data/home";
import { logout } from "../lib/auth";
import { formatMobile } from "../lib/phone";
import { usePortalState } from "../lib/store";
import { cn } from "../lib/utils";

const rowClass = "flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left transition";

function RowBody({ icon: Icon, label, trailing, tone = "default" }: { icon: LucideIcon; label: string; trailing?: ReactNode; tone?: "default" | "danger" | "muted" }) {
  return (
    <>
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
          tone === "danger" ? "bg-danger/10 text-danger" : tone === "muted" ? "bg-surface-sunken text-ink-faint" : "bg-accent-soft text-accent",
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className={cn("min-w-0 flex-1 text-base font-semibold", tone === "danger" ? "text-danger" : tone === "muted" ? "text-ink-muted" : "text-ink")}>{label}</span>
      {trailing}
    </>
  );
}

const soon = <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-xs font-semibold text-ink-faint">Soon</span>;
const chevron = <ChevronRight className="h-5 w-5 shrink-0 text-ink-faint" />;


export function Account() {
  const navigate = useNavigate();
  const { announcements, profile } = usePortalState();
  const unread = announcements.filter((a) => a.requireAck && !a.acknowledged).length;
  const initials = profile.fullName
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  const help = `https://wa.me/${tenantProfile.manager.whatsapp}?text=${encodeURIComponent(`Hi ${tenantProfile.manager.name}, I need help with my tenancy at ${tenantProfile.unitCode}.`)}`;

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl leading-8 font-bold tracking-tight text-ink">Account</h1>

      <section aria-label="Profile" className="flex items-center gap-4 rounded-2xl border border-rule bg-surface p-4">
        {profile.photo ? (
          <img src={profile.photo} alt="" className="h-16 w-16 shrink-0 rounded-full object-cover" />
        ) : (
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent text-xl font-bold text-on-accent" aria-hidden>
            {initials}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-bold text-ink">{profile.fullName}</p>
          <p className="text-sm text-ink-muted tabular-nums">+91 {formatMobile(profile.mobile)}</p>
          <p className="truncate text-sm text-ink-faint">
            {tenantProfile.propertyName} · <span className="whitespace-nowrap">{tenantProfile.unitCode}</span>
          </p>
        </div>
      </section>

      <nav aria-label="Account">
        <ul className="divide-y divide-rule overflow-hidden rounded-2xl border border-rule bg-surface">
          {/* Rows marked "Soon" are docs/19 Page 6 sub-screens not built yet; they render inert instead of linking nowhere. */}
          <li>
            <Link to="/account/profile" className={cn(rowClass, "hover:bg-surface-sunken focus-visible:bg-surface-sunken focus-visible:outline-none")}>
              <RowBody icon={UserRoundPen} label="Edit Profile" trailing={chevron} />
            </Link>
          </li>
          <li>
            <Link to="/account/notifications" className={cn(rowClass, "hover:bg-surface-sunken focus-visible:bg-surface-sunken focus-visible:outline-none")}>
              <RowBody icon={Bell} label="Notification Preferences" trailing={chevron} />
            </Link>
          </li>
          <li>
            <Link to="/account/announcements" className={cn(rowClass, "hover:bg-surface-sunken focus-visible:bg-surface-sunken focus-visible:outline-none")}>
              <RowBody
                icon={Megaphone}
                label="Announcements"
                trailing={
                  <>
                    {unread > 0 && (
                      <span className="rounded-full bg-danger px-2 py-0.5 text-xs font-bold text-white" aria-label={`${unread} unread`}>
                        {unread}
                      </span>
                    )}
                    {chevron}
                  </>
                }
              />
            </Link>
          </li>
          <li>
            <Link to="/account/refer" className={cn(rowClass, "hover:bg-surface-sunken focus-visible:bg-surface-sunken focus-visible:outline-none")}>
              <RowBody icon={Gift} label="Refer a Friend" trailing={chevron} />
            </Link>
          </li>
          <li className={rowClass} aria-disabled="true">
            <RowBody icon={DoorOpen} label="Request to Move Out" tone="muted" trailing={soon} />
          </li>
        </ul>
      </nav>

      <ul className="divide-y divide-rule overflow-hidden rounded-2xl border border-rule bg-surface">
        <li>
          <a href={help} target="_blank" rel="noreferrer" className={cn(rowClass, "hover:bg-surface-sunken focus-visible:bg-surface-sunken focus-visible:outline-none")}>
            <RowBody icon={LifeBuoy} label="Help & Support" trailing={<span className="text-sm text-ink-faint">WhatsApp</span>} />
          </a>
        </li>
        <li className={rowClass}>
          <RowBody icon={Languages} label="Language" trailing={<span className="text-sm text-ink-faint">English</span>} />
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
            className={cn(rowClass, "hover:bg-danger/5 focus-visible:bg-danger/5 focus-visible:outline-none")}
          >
            <RowBody icon={LogOut} label="Log Out" tone="danger" />
          </button>
        </li>
      </ul>

      <p className="text-center text-xs text-ink-faint">Fahiq Tenant Portal · v{__APP_VERSION__}</p>
    </div>
  );
}
