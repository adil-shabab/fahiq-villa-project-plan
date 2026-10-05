import { CircleAlert, Gift, UserRoundPlus } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { PrimaryButton } from "../components/auth/PrimaryButton";
import { BackHeader } from "../components/ui/BackHeader";
import { Toast } from "../components/ui/Toast";
import { REFERRAL_REWARD, type ReferralStatus } from "../data/referrals";
import { getSessionPhone } from "../lib/auth";
import { formatINR } from "../lib/format";
import { formatMobile, isValidMobile, sanitizeMobile, toE164 } from "../lib/phone";
import { ReferralError, sendReferral, usePortalState } from "../lib/store";
import { cn } from "../lib/utils";

const statusMeta: Record<ReferralStatus, { label: string; className: string }> = {
  invited: { label: "Invited", className: "bg-info/12 text-info" },
  visited: { label: "Visited", className: "bg-warn/12 text-warn" },
  moved_in: { label: "Moved In", className: "bg-accent-soft text-accent" },
  rewarded: { label: "Reward Credited", className: "bg-ok/12 text-ok" },
};

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" });
const fieldClass =
  "h-12 w-full rounded-xl border-2 bg-surface-sunken px-3.5 text-base text-ink placeholder:text-ink-faint focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/15 focus:outline-none";

export function ReferFriend() {
  const nameId = useId();
  const phoneId = useId();
  const { referrals } = usePortalState();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [touched, setTouched] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const ownNumber = getSessionPhone() === toE164(mobile);
  const phoneError = touched && mobile.length > 0 && (!isValidMobile(mobile) ? "Enter a valid 10-digit mobile number" : ownNumber ? "That's your own number" : null);
  const canSend = name.trim().length >= 2 && isValidMobile(mobile) && !ownNumber;
  const earned = referrals.filter((r) => r.status === "rewarded").length * REFERRAL_REWARD;

  async function submit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!canSend || sending) return;
    setSending(true);
    setError(null);
    try {
      const r = await sendReferral(name.trim(), toE164(mobile));
      setName("");
      setMobile("");
      setTouched(false);
      setToast(`Invite sent to ${r.name} on WhatsApp.`);
    } catch (err) {
      setError(err instanceof ReferralError ? err.message : "Couldn't send the referral. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <BackHeader title="Refer a Friend" fallback="/account" />

      <section className="relative overflow-hidden rounded-2xl bg-accent px-5 py-6 text-on-accent">
        <Gift aria-hidden className="absolute -right-4 -bottom-4 h-32 w-32 opacity-15" strokeWidth={1.5} />
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
          <Gift className="h-6 w-6" />
        </span>
        <h2 className="mt-4 text-xl leading-7 font-bold tracking-tight">Know someone looking for a room?</h2>
        <p className="mt-1.5 text-sm leading-relaxed opacity-90">
          Get <strong>{formatINR(REFERRAL_REWARD)}</strong> credited to your account when they move in and stay 3 months.
        </p>
        {earned > 0 && <p className="mt-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">You've earned {formatINR(earned)} so far 🎉</p>}
      </section>

      <form onSubmit={submit} noValidate className="flex flex-col gap-4 rounded-2xl border border-rule bg-surface p-4">
        <div>
          <label htmlFor={nameId} className="mb-1.5 block text-sm font-semibold text-ink">
            Friend's name
          </label>
          <input id={nameId} value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" placeholder="e.g. Ananya Gupta" className={cn(fieldClass, "border-rule")} />
        </div>
        <div>
          <label htmlFor={phoneId} className="mb-1.5 block text-sm font-semibold text-ink">
            Friend's phone number
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-base font-semibold text-ink-muted">+91</span>
            <input
              id={phoneId}
              type="tel"
              inputMode="numeric"
              value={formatMobile(mobile)}
              onChange={(e) => {
                setMobile(sanitizeMobile(e.target.value));
                setError(null);
              }}
              onBlur={() => setTouched(true)}
              placeholder="98765 43210"
              aria-invalid={!!phoneError || undefined}
              aria-describedby={phoneError ? `${phoneId}-err` : undefined}
              className={cn(fieldClass, "pl-13 tabular-nums", phoneError ? "border-danger" : "border-rule")}
            />
          </div>
          {phoneError && (
            <p id={`${phoneId}-err`} className="mt-1.5 flex items-center gap-1.5 text-sm text-danger">
              <CircleAlert className="h-4 w-4 shrink-0" />
              {phoneError}
            </p>
          )}
        </div>
        {error && (
          <div role="alert" className="flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/10 px-3.5 py-3 text-sm text-danger">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </div>
        )}
        <PrimaryButton type="submit" loading={sending} disabled={!canSend}>
          {sending ? "Sending…" : "Send Referral"}
        </PrimaryButton>
        <p className="-mt-1 text-center text-xs text-ink-faint">We'll send them a WhatsApp invite with available rooms.</p>
      </form>

      <section aria-labelledby="referrals-heading">
        <h2 id="referrals-heading" className="mb-3 text-base font-bold tracking-tight text-ink">
          Your Referrals
        </h2>
        {referrals.length === 0 ? (
          <p className="rounded-2xl border border-rule bg-surface px-5 py-8 text-center text-sm text-ink-muted">No referrals yet.</p>
        ) : (
          <ul className="divide-y divide-rule overflow-hidden rounded-2xl border border-rule bg-surface">
            {referrals.map((r) => (
              <li key={r.id} className="flex items-center gap-3 px-4 py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-ink-muted">
                  <UserRoundPlus className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-ink">{r.name}</span>
                  <span className="block text-xs text-ink-faint">
                    {r.phone.replace(/^\+91(\d{5})(\d{5})$/, "+91 $1 $2")} · {dateFmt.format(new Date(r.createdAt))}
                  </span>
                </span>
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap", statusMeta[r.status].className)}>{statusMeta[r.status].label}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Toast message={toast} onDone={() => setToast(null)} />
    </div>
  );
}
