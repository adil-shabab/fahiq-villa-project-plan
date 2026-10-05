import { Paperclip, Pin, UserPlus, Video, Zap } from "lucide-react";
import { useState } from "react";
import { focusTicket, statusColumns, type MaintenanceTicket, type TicketStatus } from "../../data/maintenance";
import { formatINR } from "../../lib/format";
import { cn } from "../../lib/utils";
import { categoryIcons } from "./categoryIcons";
import { EvidencePhoto } from "./EvidencePhoto";

export function TicketDetailPanel({
  ticket,
  onStatusChange,
  onAssignClick,
}: {
  ticket: MaintenanceTicket;
  onStatusChange: (status: TicketStatus) => void;
  onAssignClick: () => void;
}) {
  const [noteTab, setNoteTab] = useState<"internal" | "tenant">("internal");
  const [billToTenant, setBillToTenant] = useState(false);
  const Icon = categoryIcons[ticket.category];
  const isFocus = ticket.id === focusTicket.ticketId;
  const internalCount = focusTicket.notes.filter((n) => n.kind === "internal").length;
  const tenantCount = focusTicket.notes.filter((n) => n.kind === "tenant").length;
  const costTotal = focusTicket.costs.reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-rule bg-surface p-4 shadow-md">
      <div className="flex flex-col justify-between gap-2.5 border-b border-rule pb-3 lg:flex-row lg:items-center">
        <div className="flex items-start gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-danger/10 text-danger">
            <Icon className="h-6 w-6" strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-base font-bold text-ink">#{ticket.id}</span>
              <h2 className="text-base font-bold text-ink">{ticket.title}</h2>
              <span className="rounded-full bg-danger/10 px-2 py-0.5 text-xs font-bold text-danger">{ticket.priority} Priority</span>
              <select
                value={ticket.status}
                onChange={(e) => onStatusChange(e.target.value as TicketStatus)}
                className="rounded bg-gold-soft px-2.5 py-1 text-sm font-semibold text-gold focus:outline-none"
              >
                {statusColumns.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <p className="mt-0.5 text-sm text-ink-muted">
              {ticket.unitLabel} ({ticket.propertyName}){ticket.tenantName && (
                <>
                  {" "}
                  · Tenant: <span className="font-semibold text-ink">{ticket.tenantName}</span>
                  {ticket.tenantPhone && <span className="font-mono text-xs"> ({ticket.tenantPhone})</span>}
                </>
              )}{" "}
              · Reported {new Date(ticket.reportedAt).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })} via {ticket.reportedVia}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onAssignClick} className="flex items-center gap-1.5 rounded-lg bg-surface-sunken px-3 py-1.5 text-sm font-semibold text-ink hover:bg-rule">
            <UserPlus className="h-4 w-4" strokeWidth={2} />
            Assign Ticket
          </button>
          <button type="button" className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-white hover:bg-accent-ink">
            <Zap className="h-4 w-4" strokeWidth={2} />
            Fast-Track SLA
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <div className="flex flex-col gap-2.5 rounded-xl bg-surface-sunken p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-ink">Original Issue Report</span>
              {isFocus && <span className="text-[11px] text-ink-faint">{focusTicket.reportedAgoLabel}</span>}
            </div>
            <p className="text-sm leading-relaxed text-ink-muted">{isFocus ? focusTicket.description : "No additional description provided."}</p>
            {isFocus && (
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                {focusTicket.photos.map((p) => (
                  <EvidencePhoto key={p.seed} seed={p.seed} label={p.label} className="h-28" />
                ))}
                <div className="flex flex-col items-center justify-center rounded-lg bg-surface-sunken p-2 text-center text-ink-muted">
                  <Video className="h-6 w-6" strokeWidth={1.5} />
                  <span className="mt-1 text-[11px] font-medium">Tenant Video ({focusTicket.videoDuration})</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 rounded-xl bg-surface-sunken p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setNoteTab("internal")}
                  className={cn("rounded-md px-3 py-1 text-sm font-semibold", noteTab === "internal" ? "bg-surface text-accent shadow-sm" : "text-ink-muted")}
                >
                  Internal Staff Notes ({internalCount})
                </button>
                <button
                  type="button"
                  onClick={() => setNoteTab("tenant")}
                  className={cn("rounded-md px-3 py-1 text-sm font-semibold", noteTab === "tenant" ? "bg-surface text-accent shadow-sm" : "text-ink-muted")}
                >
                  Tenant Updates ({tenantCount})
                </button>
              </div>
              {isFocus && <span className="text-[11px] text-ink-faint">Audit Log ID: #{focusTicket.auditLogId}</span>}
            </div>
            <div className="flex max-h-56 flex-col gap-2.5 overflow-y-auto pr-1">
              {isFocus ? (
                focusTicket.notes
                  .filter((n) => n.kind === noteTab)
                  .map((n, i) => (
                    <div key={i} className={cn("flex flex-col rounded-lg p-3", n.kind === "tenant" ? "bg-accent-soft" : "bg-surface shadow-sm")}>
                      <div className="mb-1 flex items-center justify-between">
                        <span className={cn("text-sm font-bold", n.kind === "tenant" ? "text-accent-ink" : "text-ink")}>{n.author}</span>
                        <span className="text-[11px] text-ink-faint">{n.time}</span>
                      </div>
                      <p className="text-sm text-ink-muted">{n.body}</p>
                    </div>
                  ))
              ) : (
                <p className="py-4 text-center text-xs text-ink-faint">No activity logged for this ticket yet.</p>
              )}
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <textarea
                className="field min-h-16 resize-none"
                placeholder="Add an internal operational note or message tenant..."
                rows={2}
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1.5 text-xs text-ink-muted">
                  <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-[var(--color-accent)]" />
                  Visible to tenant on WhatsApp &amp; Resident App
                </label>
                <div className="flex items-center gap-2">
                  <button type="button" className="rounded p-1.5 text-ink-muted hover:bg-surface">
                    <Paperclip className="h-4 w-4" strokeWidth={2} />
                  </button>
                  <button type="button" className="rounded bg-accent px-3 py-1 text-xs font-semibold text-white hover:bg-accent-ink">
                    Send Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-5">
          <div className="flex flex-col gap-3 rounded-xl bg-surface-sunken p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-ink">Assigned Partner &amp; SLA Status</span>
              <button type="button" onClick={onAssignClick} className="text-xs font-semibold text-accent hover:underline">
                Reassign
              </button>
            </div>
            {isFocus || ticket.assigneeName ? (
              <div className="flex items-center gap-3 rounded-lg bg-surface p-2.5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-bold text-ink">{isFocus ? focusTicket.assignment.vendorName : ticket.assigneeName}</span>
                  {isFocus && (
                    <span className="text-xs text-ink-muted">
                      Technician: {focusTicket.assignment.technicianName} ({focusTicket.assignment.technicianPhone})
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-lg bg-surface p-3 text-center text-xs text-ink-faint shadow-sm">Not yet assigned</div>
            )}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg bg-surface p-2 shadow-sm">
                <span className="text-[11px] text-ink-faint">Target SLA</span>
                <span className="block font-mono text-sm font-bold text-ink">{ticket.slaTargetHours}h</span>
              </div>
              <div className={cn("rounded-lg p-2 shadow-sm", ticket.overdue ? "bg-danger/10" : "bg-surface")}>
                <span className={cn("text-[11px] font-semibold", ticket.overdue ? "text-danger" : "text-ink-faint")}>{ticket.overdue ? "SLA Breach" : "On Track"}</span>
                <span className={cn("block font-mono text-sm font-bold", ticket.overdue ? "text-danger" : "text-ink")}>
                  {isFocus ? focusTicket.assignment.breachLabel : ticket.slaRemainingLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-xl bg-surface-sunken p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-ink">Cost &amp; Tenant Liability</span>
              {isFocus && <span className="text-[11px] text-ink-faint">PO #{focusTicket.poNumber}</span>}
            </div>
            <div className="flex flex-col gap-1.5 text-sm">
              {(isFocus ? focusTicket.costs : []).map((c) => (
                <div key={c.label} className="flex justify-between text-ink-muted">
                  <span>{c.label}</span>
                  <span className="font-mono font-semibold text-ink">{formatINR(c.amount)}</span>
                </div>
              ))}
              {!isFocus && <p className="text-xs text-ink-faint">No costs logged yet.</p>}
              {isFocus && (
                <>
                  <div className="my-1 h-px bg-rule" />
                  <div className="flex justify-between font-bold text-ink">
                    <span>Estimated Job Total</span>
                    <span className="font-mono text-accent">{formatINR(costTotal)}</span>
                  </div>
                </>
              )}
            </div>
            <div className="mt-1 flex items-center justify-between rounded-lg bg-surface p-2.5">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-ink">Bill to Tenant Account</span>
                <span className="text-[11px] text-ink-faint">Landlord/building liability under standard wear &amp; tear</span>
              </div>
              <button
                type="button"
                onClick={() => setBillToTenant((v) => !v)}
                className={cn("relative h-5 w-9 shrink-0 rounded-full transition-colors", billToTenant ? "bg-accent" : "bg-rule-strong")}
              >
                <span
                  className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform"
                  style={{ transform: billToTenant ? "translateX(16px)" : "translateX(0)" }}
                />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-xl bg-surface-sunken p-3.5">
            <span className="text-sm font-bold text-ink">Tenant Sign-off Protocol</span>
            <p className="text-xs text-ink-muted">
              Requires tenant digital signature or OTP verification prior to ticket auto-closure and technician payout clearance.
            </p>
            {isFocus && (
              <div className="flex items-center justify-between pt-1">
                <span className="flex items-center gap-1 text-xs font-semibold text-accent">
                  <Pin className="h-3.5 w-3.5" strokeWidth={2} />
                  OTP Dispatched: {focusTicket.otp}
                </span>
                <button type="button" className="rounded bg-surface px-2.5 py-1 text-xs font-semibold text-ink hover:bg-rule">
                  Resend OTP
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
