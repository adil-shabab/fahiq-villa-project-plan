import { Briefcase, Building2, ConciergeBell, Hammer, KeyRound, MoreVertical, Search, ShieldCheck, Wallet } from "lucide-react";
import { useState } from "react";
import { staffMembers, type StaffMember } from "../../data/users";
import { cn } from "../../lib/utils";
import { Avatar } from "../ui/Avatar";

const roleIcons = {
  apartment: Building2,
  build: Hammer,
  account_balance_wallet: Wallet,
  concierge: ConciergeBell,
} as const;

export function StaffDirectoryTable({ onEditRole, onInvite }: { onEditRole: (m: StaffMember) => void; onInvite: () => void }) {
  const [search, setSearch] = useState("");
  const filtered = staffMembers.filter((m) => !search || `${m.name} ${m.email} ${m.role}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-rule bg-surface p-3 shadow-sm">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" strokeWidth={2} />
          <input className="field pl-8" placeholder="Search name, email, role..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <button type="button" onClick={onInvite} className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold text-white hover:bg-accent-ink">
          + Invite New User
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-rule bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-sunken text-[11px] uppercase tracking-wide text-ink-faint">
              <tr>
                <th className="px-4 py-3 font-semibold">Staff Member</th>
                <th className="px-4 py-3 font-semibold">Assigned Role</th>
                <th className="px-4 py-3 font-semibold">Property Scope</th>
                <th className="px-4 py-3 font-semibold">2FA Security</th>
                <th className="px-4 py-3 font-semibold">Last Active</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => {
                const RoleIcon = roleIcons[m.roleIcon];
                return (
                  <tr key={m.id} className="border-b border-rule last:border-b-0 hover:bg-surface-sunken/60">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar initials={m.initials} size="sm" />
                        <div className="flex flex-col leading-tight">
                          <span className="flex items-center gap-1.5 font-semibold text-ink">
                            {m.name}
                            {m.isCurrentUser && <span className="rounded bg-accent-soft px-1 text-[9px] font-bold text-accent-ink">YOU</span>}
                          </span>
                          <span className="text-xs text-ink-faint">{m.email}</span>
                          <span className="font-mono text-[11px] text-ink-faint">{m.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 text-ink">
                        <RoleIcon className="h-4 w-4 text-accent" strokeWidth={2} />
                        <span className="font-medium">{m.role}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-col leading-tight">
                        <span className="text-ink">{m.scope}</span>
                        {m.scopeSub && <span className="text-xs text-ink-faint">{m.scopeSub}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      {m.twoFactor === "None" ? (
                        <span className="text-xs text-danger">Not enrolled</span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-medium text-accent">
                          <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
                          Enforced ({m.twoFactor})
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-ink-muted">{m.lastActive}</td>
                    <td className="px-4 py-3.5">
                      {m.invited ? (
                        <span className="rounded-full bg-gold-soft px-2.5 py-0.5 text-[11px] font-semibold text-gold">Pending First Login</span>
                      ) : (
                        <span className="flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-semibold text-accent-ink">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {m.invited ? (
                          <button type="button" className="rounded bg-surface-sunken px-2.5 py-1 text-xs font-semibold text-accent hover:bg-rule">
                            Resend Invite
                          </button>
                        ) : (
                          <>
                            <button type="button" onClick={() => onEditRole(m)} title="Manage role" className="rounded p-1.5 text-ink-muted hover:bg-surface-sunken hover:text-accent">
                              <Briefcase className="h-4 w-4" strokeWidth={2} />
                            </button>
                            <button type="button" title="Reset 2FA" className="rounded p-1.5 text-ink-muted hover:bg-surface-sunken hover:text-ink">
                              <KeyRound className="h-4 w-4" strokeWidth={2} />
                            </button>
                          </>
                        )}
                        <button type="button" className={cn("rounded p-1.5 text-ink-muted hover:bg-surface-sunken hover:text-ink")}>
                          <MoreVertical className="h-4 w-4" strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between bg-surface-sunken/50 p-4 text-xs text-ink-muted">
          <span>
            Showing <strong className="text-ink">{filtered.length}</strong> of <strong className="text-ink">{staffMembers.length}</strong> active &amp; invited staff
          </span>
        </div>
      </div>
    </div>
  );
}
