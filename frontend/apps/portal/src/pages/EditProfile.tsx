import { BadgeCheck, Camera, CircleAlert, Info, Plus, Trash2 } from "lucide-react";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { PrimaryButton } from "../components/auth/PrimaryButton";
import { OtpInput } from "../components/auth/OtpInput";
import { BackHeader } from "../components/ui/BackHeader";
import { Toast } from "../components/ui/Toast";
import type { Profile, VehicleType } from "../data/profile";
import { AuthError, DEMO_OTP, OTP_LENGTH, requestOtp, verifyPhoneChange } from "../lib/auth";
import { fileToDataUrl } from "../lib/files";
import { formatMobile, isValidMobile, sanitizeMobile, toE164 } from "../lib/phone";
import { saveProfile, usePortalState } from "../lib/store";
import { cn } from "../lib/utils";

const MAX_VEHICLES = 3;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputClass =
  "h-12 rounded-xl border-2 bg-surface-sunken px-3.5 text-base text-ink placeholder:text-ink-faint focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/15 focus:outline-none";

function Field({ label, error, children, htmlFor, hint }: { label: string; error?: string | null; children: ReactNode; htmlFor: string; hint?: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-danger">
          <CircleAlert className="h-4 w-4 shrink-0" />
          {error}
        </p>
      ) : (
        hint
      )}
    </div>
  );
}

function PhoneInput({ id, value, onChange, invalid }: { id: string; value: string; onChange: (v: string) => void; invalid: boolean }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-base font-semibold text-ink-muted">+91</span>
      <input
        id={id}
        type="tel"
        inputMode="numeric"
        value={formatMobile(value)}
        onChange={(e) => onChange(sanitizeMobile(e.target.value))}
        aria-invalid={invalid || undefined}
        className={cn(inputClass, "w-full pl-13 tabular-nums", invalid ? "border-danger" : "border-rule")}
      />
    </div>
  );
}

type PhoneStep = "idle" | "sending" | "code" | "verifying";

export function EditProfile() {
  const ids = { name: useId(), phone: useId(), email: useId(), ecName: useId(), ecPhone: useId() };
  const { profile } = usePortalState();
  const [draft, setDraft] = useState<Profile>(profile);
  const [touched, setTouched] = useState(false);
  const [phoneStep, setPhoneStep] = useState<PhoneStep>("idle");
  const [code, setCode] = useState("");
  const [verifiedMobile, setVerifiedMobile] = useState(profile.mobile);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const update = (patch: Partial<Profile>) => setDraft((d) => ({ ...d, ...patch }));

  const errors = {
    name: draft.fullName.trim().length < 2 ? "Enter your full name" : null,
    phone: !isValidMobile(draft.mobile) ? "Enter a valid 10-digit mobile number" : null,
    email: draft.email && !EMAIL_RE.test(draft.email.trim()) ? "Enter a valid email address" : null,
    ecPhone: draft.emergencyMobile && !isValidMobile(draft.emergencyMobile) ? "Enter a valid 10-digit mobile number" : null,
  };
  const phoneChanged = draft.mobile !== profile.mobile;
  const phoneVerified = draft.mobile === verifiedMobile;
  const dirty = JSON.stringify(draft) !== JSON.stringify(profile);
  const valid = Object.values(errors).every((e) => !e);
  const canSave = dirty && valid && phoneVerified;

  async function sendCode() {
    setPhoneError(null);
    setPhoneStep("sending");
    try {
      await requestOtp(toE164(draft.mobile));
      setCode("");
      setPhoneStep("code");
    } catch (err) {
      setPhoneError(err instanceof AuthError ? err.message : "Couldn't send the code. Try again.");
      setPhoneStep("idle");
    }
  }

  async function confirmCode(value: string) {
    setPhoneStep("verifying");
    try {
      await verifyPhoneChange(toE164(draft.mobile), value);
      setVerifiedMobile(draft.mobile);
      setPhoneStep("idle");
    } catch (err) {
      setPhoneError(err instanceof AuthError ? err.message : "Verification failed. Try again.");
      setCode("");
      setPhoneStep("code");
    }
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!canSave || saving) return;
    setSaving(true);
    try {
      const clean: Profile = {
        ...draft,
        fullName: draft.fullName.trim(),
        email: draft.email.trim(),
        emergencyName: draft.emergencyName.trim(),
        vehicles: draft.vehicles.filter((v) => v.number.trim()).map((v) => ({ ...v, number: v.number.trim().toUpperCase() })),
      };
      await saveProfile(clean);
      setDraft(clean);
      setToast("Profile updated.");
    } finally {
      setSaving(false);
    }
  }

  const initials = draft.fullName
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5 pb-20">
      <BackHeader title="Edit Profile" fallback="/account" />

      <div className="flex justify-center">
        <div className="relative">
          {draft.photo ? (
            <img src={draft.photo} alt="Profile photo" className="h-24 w-24 rounded-full object-cover" />
          ) : (
            <span className="flex h-24 w-24 items-center justify-center rounded-full bg-accent text-3xl font-bold text-on-accent" aria-hidden>
              {initials || "?"}
            </span>
          )}
          <label className="absolute -right-1 -bottom-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-ground bg-surface text-accent shadow has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent/25">
            <Camera className="h-5 w-5" />
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              aria-label="Change profile photo"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                if (f && f.type.startsWith("image/")) update({ photo: await fileToDataUrl(f) });
              }}
            />
          </label>
        </div>
      </div>

      <Field label="Full Name" htmlFor={ids.name} error={touched || draft.fullName !== profile.fullName ? errors.name : null}>
        <input id={ids.name} value={draft.fullName} onChange={(e) => update({ fullName: e.target.value })} autoComplete="name" className={cn(inputClass, "w-full", errors.name && touched ? "border-danger" : "border-rule")} />
      </Field>

      <Field
        label="Phone Number"
        htmlFor={ids.phone}
        error={(phoneChanged || touched) && errors.phone ? errors.phone : phoneError}
        hint={
          !phoneChanged ? (
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ok">
              <BadgeCheck className="h-4 w-4" />
              Verified · used to log in
            </p>
          ) : phoneVerified ? (
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ok">
              <BadgeCheck className="h-4 w-4" />
              New number verified
            </p>
          ) : null
        }
      >
        <div className="flex gap-2">
          <div className="min-w-0 flex-1">
            <PhoneInput
              id={ids.phone}
              value={draft.mobile}
              invalid={!!errors.phone && phoneChanged}
              onChange={(v) => {
                update({ mobile: v });
                setPhoneError(null);
                setPhoneStep("idle");
              }}
            />
          </div>
          {phoneChanged && !phoneVerified && !errors.phone && phoneStep === "idle" && (
            <button
              type="button"
              onClick={sendCode}
              className="h-12 shrink-0 rounded-xl border-2 border-accent px-4 text-sm font-semibold text-accent transition hover:bg-accent-soft focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none"
            >
              Verify
            </button>
          )}
        </div>
      </Field>

      {phoneChanged && !phoneVerified && (phoneStep === "code" || phoneStep === "verifying" || phoneStep === "sending") && (
        <div className="-mt-2 rounded-2xl border border-rule bg-surface p-4" aria-live="polite">
          {phoneStep === "sending" ? (
            <p className="text-sm text-ink-muted">Sending a code to +91 {formatMobile(draft.mobile)}…</p>
          ) : (
            <>
              <p className="mb-3 text-sm text-ink-muted">
                Enter the 6-digit code sent to <span className="font-semibold text-ink tabular-nums">+91 {formatMobile(draft.mobile)}</span>
              </p>
              <OtpInput
                value={code}
                length={OTP_LENGTH}
                invalid={!!phoneError}
                disabled={phoneStep === "verifying"}
                autoFocus
                onChange={(v) => {
                  setCode(v);
                  setPhoneError(null);
                  if (v.length === OTP_LENGTH) confirmCode(v);
                }}
              />
              <div className="mt-2 flex items-center justify-between text-xs text-ink-faint">
                <span>{phoneStep === "verifying" ? "Verifying…" : import.meta.env.DEV ? `Dev mode: use ${DEMO_OTP}` : ""}</span>
                <button type="button" onClick={sendCode} className="min-h-9 px-1 font-semibold text-accent hover:underline">
                  Resend code
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <Field label="Email" htmlFor={ids.email} error={errors.email}>
        <input id={ids.email} type="email" inputMode="email" autoComplete="email" value={draft.email} onChange={(e) => update({ email: e.target.value })} className={cn(inputClass, "w-full", errors.email ? "border-danger" : "border-rule")} />
      </Field>

      <Field label="Emergency Contact Name" htmlFor={ids.ecName}>
        <input id={ids.ecName} value={draft.emergencyName} onChange={(e) => update({ emergencyName: e.target.value })} className={cn(inputClass, "w-full border-rule")} />
      </Field>

      <Field label="Emergency Contact Phone" htmlFor={ids.ecPhone} error={errors.ecPhone}>
        <PhoneInput id={ids.ecPhone} value={draft.emergencyMobile} invalid={!!errors.ecPhone} onChange={(v) => update({ emergencyMobile: v })} />
      </Field>

      {/* min-w-0: fieldsets default to min-content width and would overflow on narrow phones. */}
      <fieldset className="min-w-0">
        <legend className="mb-1.5 text-sm font-semibold text-ink">
          Vehicle Details <span className="font-normal text-ink-faint">(optional)</span>
        </legend>
        <div className="flex flex-col gap-2">
          {draft.vehicles.map((v, i) => (
            <div key={v.id} className="flex gap-2">
              <select
                aria-label={`Vehicle ${i + 1} type`}
                value={v.type}
                onChange={(e) => update({ vehicles: draft.vehicles.map((x) => (x.id === v.id ? { ...x, type: e.target.value as VehicleType } : x)) })}
                className={cn(inputClass, "w-[7.5rem] shrink-0 border-rule px-2.5 text-sm")}
              >
                <option value="two_wheeler">2-wheeler</option>
                <option value="four_wheeler">4-wheeler</option>
              </select>
              <input
                aria-label={`Vehicle ${i + 1} registration number`}
                value={v.number}
                placeholder="KA 01 AB 1234"
                onChange={(e) => update({ vehicles: draft.vehicles.map((x) => (x.id === v.id ? { ...x, number: e.target.value.toUpperCase() } : x)) })}
                className={cn(inputClass, "min-w-0 flex-1 border-rule uppercase")}
              />
              <button
                type="button"
                aria-label={`Remove vehicle ${i + 1}`}
                onClick={() => update({ vehicles: draft.vehicles.filter((x) => x.id !== v.id) })}
                className="flex h-12 w-11 shrink-0 items-center justify-center rounded-xl text-ink-faint transition hover:bg-danger/10 hover:text-danger focus-visible:ring-4 focus-visible:ring-danger/20 focus-visible:outline-none"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
          {draft.vehicles.length < MAX_VEHICLES && (
            <button
              type="button"
              onClick={() => update({ vehicles: [...draft.vehicles, { id: `v-${Date.now()}`, type: "two_wheeler", number: "" }] })}
              className="flex h-11 items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-rule-strong text-sm font-semibold text-ink-muted transition hover:border-accent hover:text-accent focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none"
            >
              <Plus className="h-4 w-4" />
              Add vehicle
            </button>
          )}
        </div>
      </fieldset>

      <p className="flex items-start gap-2 rounded-xl bg-surface-sunken px-3.5 py-3 text-sm text-ink-muted">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        KYC documents can be updated from the Documents tab.
      </p>

      <div className="fixed inset-x-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-30 mx-auto max-w-[448px]">
        <PrimaryButton type="submit" loading={saving} disabled={!canSave} className="shadow-[0_12px_28px_-12px_rgba(15,92,77,0.55)]">
          {saving ? "Saving…" : phoneChanged && !phoneVerified ? "Verify new number to save" : "Save Changes"}
        </PrimaryButton>
      </div>
      <Toast message={toast} onDone={() => setToast(null)} />
    </form>
  );
}
