import { Mail, UserPlus } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { staffRoles, type RoleName } from "../../data/users";
import { properties } from "../../data/properties";
import { cn } from "../../lib/utils";

export function InviteUserModal({ onClose, onInvite }: { onClose: () => void; onInvite: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<RoleName>("Field Staff");
  const [scope, setScope] = useState("all");
  const [twoFactorRequired, setTwoFactorRequired] = useState(true);

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col gap-4 overflow-y-auto rounded-2xl border border-rule bg-surface p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-rule pb-3">
          <div className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-accent" strokeWidth={2} />
            <h3 className="text-base font-bold text-ink">Invite New Staff Member</h3>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-ink-muted hover:bg-surface-sunken">✕</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Full Name</span>
            <input className="field" placeholder="e.g. Kavita Deshmukh" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Work Email</span>
            <div className="relative flex items-center">
              <Mail className="pointer-events-none absolute left-3 h-4 w-4 text-ink-faint" strokeWidth={2} />
              <input className="field pl-9" placeholder="name@fahiq.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </label>
        </div>

        <div>
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Assign Role</span>
          <div className="grid grid-cols-5 gap-1.5">
            {staffRoles.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={cn("rounded-lg px-1.5 py-2 text-[11px] font-semibold", role === r ? "bg-accent text-white" : "bg-surface-sunken text-ink-muted hover:bg-rule")}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Property Scope</span>
          <select className="field" value={scope} onChange={(e) => setScope(e.target.value)}>
            <option value="all">All Properties (portfolio-wide)</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </label>

        <div className="flex items-center justify-between rounded-lg bg-surface-sunken p-3">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-ink">Require two-factor authentication</span>
            <span className="text-[10px] text-ink-faint">Enforced on first login</span>
          </div>
          <button
            type="button"
            onClick={() => setTwoFactorRequired((v) => !v)}
            className={cn("relative h-5 w-9 shrink-0 rounded-full transition-colors", twoFactorRequired ? "bg-accent" : "bg-rule-strong")}
          >
            <span className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform" style={{ transform: twoFactorRequired ? "translateX(16px)" : "translateX(0)" }} />
          </button>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule pt-3">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onInvite();
              onClose();
            }}
            disabled={!name.trim() || !email.trim()}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send Invite
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
