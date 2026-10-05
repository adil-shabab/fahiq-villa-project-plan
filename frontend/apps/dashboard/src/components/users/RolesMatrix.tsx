import { Activity, Briefcase, Check, Eye, Minus, ScanLine } from "lucide-react";
import { permissionMatrix, staffRoles, type PermissionLevel } from "../../data/users";
import { cn } from "../../lib/utils";

const levelClasses: Record<PermissionLevel, string> = {
  full: "bg-accent-soft text-accent-ink",
  view: "bg-info/10 text-info",
  scoped: "bg-gold-soft text-gold",
  none: "bg-surface-sunken text-ink-faint",
};

const levelIcons: Record<PermissionLevel, typeof Check> = {
  full: Check,
  view: Eye,
  scoped: ScanLine,
  none: Minus,
};

export function RolesMatrix() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-rule bg-surface p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h2 className="text-lg font-bold text-ink">Enterprise Role Privilege Matrix</h2>
          <p className="text-sm text-ink-faint">Audit granular capabilities mapped to each organizational role type.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {(["full", "view", "scoped", "none"] as PermissionLevel[]).map((l) => {
            const Icon = levelIcons[l];
            const label = l === "full" ? "Full Control" : l === "view" ? "View Only" : l === "scoped" ? "Scoped" : "No Access";
            return (
              <span key={l} className={cn("flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold", levelClasses[l])}>
                <Icon className="h-3 w-3" strokeWidth={2.5} />
                {label}
              </span>
            );
          })}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-rule">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-sunken text-[11px] uppercase tracking-wide text-ink-faint">
            <tr>
              <th className="px-4 py-3 font-semibold">Functional Module</th>
              {staffRoles.map((r) => (
                <th key={r} className="px-4 py-3 text-center font-semibold">
                  {r}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissionMatrix.map((row) => (
              <tr key={row.id} className="border-b border-rule last:border-b-0 hover:bg-surface-sunken/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <Activity className="h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
                    <span className="font-semibold text-ink">{row.module}</span>
                  </div>
                </td>
                {staffRoles.map((r) => {
                  const cell = row.cells[r];
                  return (
                    <td key={r} className="px-4 py-3 text-center">
                      <span className={cn("inline-flex min-w-[96px] items-center justify-center rounded-md px-2 py-1 text-xs font-medium", levelClasses[cell.level])}>
                        {cell.label}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-ink-faint">
        <Briefcase className="h-3.5 w-3.5" strokeWidth={2} />
        Changes to role permissions apply on the user's next session.
      </div>
    </div>
  );
}
