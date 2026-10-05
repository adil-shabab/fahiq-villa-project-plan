import { Briefcase, Globe2 } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { staffRoles, type RoleName, type StaffMember } from "../../data/users";
import { cn } from "../../lib/utils";

export function EditRoleModal({ member, onClose, onSave }: { member: StaffMember; onClose: () => void; onSave: () => void }) {
  const [role, setRole] = useState<RoleName>(member.role);
  const [ipRestriction, setIpRestriction] = useState(false);

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="flex max-h-[90vh] w-full max-w-md flex-col gap-4 overflow-y-auto rounded-2xl border border-rule bg-surface p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-rule pb-3">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-accent" strokeWidth={2} />
            <div>
              <h3 className="text-base font-bold text-ink">Edit Role &amp; Permissions</h3>
              <p className="text-xs text-ink-faint">{member.name} · {member.email}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-ink-muted hover:bg-surface-sunken">✕</button>
        </div>

        <div>
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Role</span>
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

        <div className="flex items-center justify-between rounded-lg bg-surface-sunken p-3">
          <div className="flex items-start gap-2">
            <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-ink">Restrict sign-in to office IP range</span>
              <span className="text-[10px] text-ink-faint">Blocks logins from outside the allowlisted network</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIpRestriction((v) => !v)}
            className={cn("relative h-5 w-9 shrink-0 rounded-full transition-colors", ipRestriction ? "bg-accent" : "bg-rule-strong")}
          >
            <span className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform" style={{ transform: ipRestriction ? "translateX(16px)" : "translateX(0)" }} />
          </button>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule pt-3">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSave();
              onClose();
            }}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-ink"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
