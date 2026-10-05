import { ChevronRight, Download, FileText, Shield, UserPlus } from "lucide-react";
import { useState } from "react";
import { EditRoleModal } from "../components/users/EditRoleModal";
import { InviteUserModal } from "../components/users/InviteUserModal";
import { RolesMatrix } from "../components/users/RolesMatrix";
import { StaffDirectoryTable } from "../components/users/StaffDirectoryTable";
import { staffMembers, usersKpis, type StaffMember } from "../data/users";
import { cn } from "../lib/utils";

type UsersTab = "directory" | "matrix";

export function Users() {
  const [tab, setTab] = useState<UsersTab>("directory");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [editing, setEditing] = useState<StaffMember | null>(null);

  const kpis = [
    { label: "Active Staff Force", value: String(usersKpis.activeStaff), sub: `${usersKpis.twoFactorPercent}% 2FA enforced`, icon: UserPlus },
    { label: "Properties Covered", value: String(usersKpis.propertiesCovered), sub: "Distributed across live properties", icon: FileText },
    { label: "Role Tier Diversity", value: String(usersKpis.roleTiers), sub: "Owner, PM, Accountant, Staff, Desk", icon: Shield },
    { label: "Pending Onboarding", value: String(usersKpis.pendingInvites), sub: "Invitations expire in 48h", icon: Download },
  ];

  return (
    <div className="mx-auto flex max-w-[1700px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
            <span>System &amp; Organization</span>
            <ChevronRight className="h-3 w-3" strokeWidth={2} />
            <span>Settings</span>
            <ChevronRight className="h-3 w-3" strokeWidth={2} />
            <span className="text-accent">Users &amp; Roles</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Users &amp; Access Control</h1>
          <p className="mt-0.5 text-sm text-ink-faint">Manage staff team members, assign operational role privileges, enforce two-factor authentication (2FA), and audit administrative access across {usersKpis.propertiesCovered} properties.</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={() => setTab("matrix")} className="flex h-9 items-center gap-1.5 rounded-lg border border-rule bg-surface px-3.5 text-sm font-medium text-ink hover:bg-surface-sunken">
            <Shield className="h-4 w-4 text-ink-muted" strokeWidth={2} />
            Role Matrix Reference
          </button>
          <button type="button" onClick={() => setInviteOpen(true)} className="flex h-9 items-center gap-1.5 rounded-lg bg-accent px-3.5 text-sm font-semibold text-white hover:bg-accent-ink">
            <UserPlus className="h-4 w-4" strokeWidth={2} />
            Invite New User
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="flex flex-col justify-between rounded-xl border border-rule bg-surface p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">{k.label}</span>
                <span className="rounded-lg bg-surface-sunken p-1.5 text-accent">
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </span>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-ink">{k.value}</span>
              </div>
              <span className="mt-1 text-xs text-ink-muted">{k.sub}</span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 border-b border-rule">
        <button
          type="button"
          onClick={() => setTab("directory")}
          className={cn("flex items-center gap-2 border-b-2 px-3 pb-3 text-sm font-semibold", tab === "directory" ? "border-accent text-accent" : "border-transparent text-ink-muted hover:text-ink")}
        >
          Staff Directory
          <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-[11px] text-ink-muted">{staffMembers.length}</span>
        </button>
        <button
          type="button"
          onClick={() => setTab("matrix")}
          className={cn("flex items-center gap-2 border-b-2 px-3 pb-3 text-sm font-semibold", tab === "matrix" ? "border-accent text-accent" : "border-transparent text-ink-muted hover:text-ink")}
        >
          Roles &amp; Permissions Matrix
          <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-[11px] text-ink-muted">5</span>
        </button>
      </div>

      {tab === "directory" ? (
        <StaffDirectoryTable onEditRole={setEditing} onInvite={() => setInviteOpen(true)} />
      ) : (
        <RolesMatrix />
      )}

      {inviteOpen && <InviteUserModal onClose={() => setInviteOpen(false)} onInvite={() => {}} />}
      {editing && <EditRoleModal member={editing} onClose={() => setEditing(null)} onSave={() => {}} />}
    </div>
  );
}
