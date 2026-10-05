import { ArrowLeft, CircleAlert, CircleCheck } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/auth/AuthLayout";
import { OtpInput } from "../components/auth/OtpInput";
import { PrimaryButton } from "../components/auth/PrimaryButton";
import { WhatsAppHelp } from "../components/auth/WhatsAppHelp";
import { AuthError, DEMO_OTP, OTP_LENGTH, RESEND_SECONDS, requestOtp, verifyOtp } from "../lib/auth";
import { formatMobile, toE164 } from "../lib/phone";

function formatCountdown(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export function VerifyOtp() {
  const navigate = useNavigate();
  const mobile = (useLocation().state as { mobile?: string } | null)?.mobile;

  const [code, setCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft]);

  // Reached directly (refresh / deep link) without a number: start over.
  if (!mobile) return <Navigate to="/login" replace />;
  const phone = mobile;

  async function handleVerify(e?: FormEvent) {
    e?.preventDefault();
    if (code.length !== OTP_LENGTH || verifying) return;
    setVerifying(true);
    setError(null);
    setNotice(null);
    try {
      await verifyOtp(toE164(phone), code);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof AuthError ? err.message : "Something went wrong. Please try again.");
      setCode("");
    } finally {
      setVerifying(false);
    }
  }

  async function handleResend() {
    setResending(true);
    setError(null);
    try {
      await requestOtp(toE164(phone));
      setCode("");
      setSecondsLeft(RESEND_SECONDS);
      setNotice("A new code is on its way.");
    } catch (err) {
      setError(err instanceof AuthError ? err.message : "We couldn't resend the code. Please try again.");
    } finally {
      setResending(false);
    }
  }

  return (
    <AuthLayout footer={<WhatsAppHelp />}>
      <Link
        to="/login"
        state={{ mobile: phone }}
        className="-mt-1 -ml-1 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-muted transition hover:bg-surface-sunken hover:text-ink focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none"
        aria-label="Back to login"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>

      <div className="mt-3">
        <h1 className="text-xl leading-7 font-bold tracking-tight text-ink">Enter the code we sent to</h1>
        <p className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-xl font-semibold text-ink tabular-nums">+91 {formatMobile(phone)}</span>
          <Link
            to="/login"
            state={{ mobile: phone }}
            className="text-sm font-semibold text-accent underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
          >
            Change number
          </Link>
        </p>
      </div>

      <form onSubmit={handleVerify} className="mt-8 flex flex-col gap-5">
        <OtpInput
          value={code}
          length={OTP_LENGTH}
          onChange={(next) => {
            setCode(next);
            setError(null);
          }}
          invalid={!!error}
          disabled={verifying}
          autoFocus
        />

        <div className="min-h-6 text-center text-sm" aria-live="polite">
          {secondsLeft > 0 ? (
            <span className="text-ink-muted">
              Resend code in <span className="font-semibold text-ink tabular-nums">{formatCountdown(secondsLeft)}</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="inline-flex min-h-11 items-center px-2 font-semibold text-accent underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none disabled:opacity-60"
            >
              {resending ? "Sending…" : "Resend OTP"}
            </button>
          )}
        </div>

        {error && (
          <div role="alert" className="flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/10 px-3.5 py-3 text-sm text-danger">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </div>
        )}
        {notice && !error && (
          <div role="status" className="flex items-start gap-2 rounded-xl border border-ok/30 bg-ok/10 px-3.5 py-3 text-sm text-ok">
            <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" />
            {notice}
          </div>
        )}

        <PrimaryButton type="submit" loading={verifying} disabled={code.length !== OTP_LENGTH}>
          {verifying ? "Verifying…" : "Verify & Continue"}
        </PrimaryButton>

        {import.meta.env.DEV && (
          <p className="text-center text-xs text-ink-faint">
            Dev mode: use code <span className="font-mono font-semibold text-ink-muted">{DEMO_OTP}</span>
          </p>
        )}
      </form>
    </AuthLayout>
  );
}
