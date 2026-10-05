import { CircleAlert } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/auth/AuthLayout";
import { BrandMark } from "../components/auth/BrandMark";
import { PrimaryButton } from "../components/auth/PrimaryButton";
import { WhatsAppHelp } from "../components/auth/WhatsAppHelp";
import { AuthError, requestOtp } from "../lib/auth";
import { formatMobile, isValidMobile, sanitizeMobile, toE164 } from "../lib/phone";
import { cn } from "../lib/utils";

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  // "Change number" on the verify screen sends the previous number back so it is prefilled.
  const [mobile, setMobile] = useState<string>(() => (location.state as { mobile?: string } | null)?.mobile ?? "");
  const [touched, setTouched] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid = isValidMobile(mobile);
  const showFieldError = touched && mobile.length > 0 && !valid;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    setSending(true);
    setError(null);
    try {
      await requestOtp(toE164(mobile));
      navigate("/login/verify", { state: { mobile } });
    } catch (err) {
      setError(err instanceof AuthError ? err.message : "We couldn't send the code. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <AuthLayout footer={<WhatsAppHelp />}>
      <BrandMark />

      <div className="mt-8 text-center">
        <h1 className="text-[1.75rem] leading-9 font-bold tracking-tight text-ink">Welcome back 👋</h1>
        <p className="mt-1.5 text-base text-ink-muted">Log in with your mobile number</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-5">
        <div>
          <label htmlFor="mobile" className="mb-2 block text-sm font-semibold text-ink">
            Mobile number
          </label>
          <div
            className={cn(
              "flex h-14 items-stretch overflow-hidden rounded-xl border-2 bg-surface-sunken transition",
              "focus-within:border-accent focus-within:bg-surface focus-within:ring-4 focus-within:ring-accent/15",
              showFieldError ? "border-danger" : "border-rule",
            )}
          >
            <span className="m-1.5 flex items-center gap-1.5 rounded-lg bg-accent-soft px-3 text-base font-semibold text-accent-ink select-none">
              <span aria-hidden>🇮🇳</span>+91
            </span>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              autoFocus
              placeholder="98765 43210"
              value={formatMobile(mobile)}
              onChange={(e) => {
                setMobile(sanitizeMobile(e.target.value));
                setError(null);
              }}
              onBlur={() => setTouched(true)}
              aria-invalid={showFieldError || undefined}
              aria-describedby={showFieldError ? "mobile-error" : "mobile-hint"}
              className="min-w-0 flex-1 bg-transparent pr-4 pl-1 text-lg font-medium tracking-wide text-ink tabular-nums placeholder:text-ink-faint focus:outline-none"
            />
          </div>
          {showFieldError ? (
            <p id="mobile-error" className="mt-2 flex items-center gap-1.5 text-sm text-danger">
              <CircleAlert className="h-4 w-4 shrink-0" />
              Enter a valid 10-digit mobile number
            </p>
          ) : (
            <p id="mobile-hint" className="mt-2 text-sm text-ink-faint">
              Use the number registered with your property manager. We'll send a 6-digit code by SMS or WhatsApp.
            </p>
          )}
        </div>

        {error && (
          <div role="alert" className="flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/10 px-3.5 py-3 text-sm text-danger">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <PrimaryButton type="submit" loading={sending} disabled={!valid}>
          {sending ? "Sending OTP…" : "Send OTP"}
        </PrimaryButton>
      </form>
    </AuthLayout>
  );
}
