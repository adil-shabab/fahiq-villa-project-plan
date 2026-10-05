import { FileSignature, Send, Upload } from "lucide-react";
import type { ReactNode } from "react";
import type { OnboardingDraft } from "../../../data/onboarding";
import { formatINR } from "../../../lib/format";
import { cn } from "../../../lib/utils";

export function Step4Agreement({ draft, onChange }: { draft: OnboardingDraft; onChange: (patch: Partial<OnboardingDraft>) => void }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <div className="rounded-xl border border-rule bg-surface p-5">
          <h3 className="mb-3 text-sm font-semibold text-ink">Agreement Preview</h3>
          <div className="max-h-80 overflow-y-auto rounded-lg border border-rule bg-surface-sunken p-4 text-xs leading-relaxed text-ink-muted">
            <p className="mb-2 font-semibold text-ink">RENTAL AGREEMENT</p>
            <p>
              This agreement is made between the Owner and <mark className="bg-accent-soft text-accent-ink">{draft.fullName || "[Tenant Name]"}</mark>{" "}
              for unit <mark className="bg-accent-soft text-accent-ink">{draft.unitCode}</mark>, {draft.propertyName}.
            </p>
            <p className="mt-2">
              The lease commences on <mark className="bg-accent-soft text-accent-ink">{draft.startDate || "[Start Date]"}</mark> at a monthly rent of{" "}
              <mark className="bg-accent-soft text-accent-ink">{formatINR(draft.rent)}</mark>, with a security deposit of{" "}
              <mark className="bg-accent-soft text-accent-ink">{formatINR(draft.deposit)}</mark>.
            </p>
            <p className="mt-2">
              Lock-in period: <mark className="bg-accent-soft text-accent-ink">{draft.lockInMonths} months</mark>. Notice period:{" "}
              <mark className="bg-accent-soft text-accent-ink">{draft.noticePeriodDays} days</mark>. Annual escalation:{" "}
              <mark className="bg-accent-soft text-accent-ink">{draft.escalationPercent}%</mark>.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:col-span-2">
        <OptionCard
          icon={Send}
          title="Send for e-Signature"
          description="Digio e-sign link sent to the applicant's phone"
          selected={draft.agreementMethod === "esign"}
          onSelect={() => onChange({ agreementMethod: "esign" })}
        >
          {draft.agreementMethod === "esign" && (
            <button
              type="button"
              onClick={() => onChange({ agreementStatus: "Awaiting Signature" })}
              className="mt-3 w-full rounded-lg bg-accent py-2 text-xs font-medium text-white hover:bg-accent-ink"
            >
              Send to {draft.phone || "applicant"}
            </button>
          )}
        </OptionCard>

        <OptionCard
          icon={Upload}
          title="Upload Signed Copy"
          description="Upload a scanned, physically signed agreement"
          selected={draft.agreementMethod === "upload"}
          onSelect={() => onChange({ agreementMethod: "upload", agreementStatus: "Uploaded" })}
        />

        <OptionCard
          icon={FileSignature}
          title="Skip for now"
          description="Complete the agreement later from the tenancy page"
          selected={draft.agreementMethod === "skip"}
          onSelect={() => onChange({ agreementMethod: "skip", agreementStatus: "Not sent" })}
        />

        {draft.agreementStatus === "Awaiting Signature" && (
          <div className="flex items-center justify-between rounded-lg bg-warn/10 px-3 py-2 text-xs font-medium text-warn">
            Awaiting Signature
            <button type="button" onClick={() => onChange({ agreementStatus: "Signed" })} className="underline">
              Simulate Signed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function OptionCard({
  icon: Icon,
  title,
  description,
  selected,
  onSelect,
  children,
}: {
  icon: typeof Send;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "rounded-xl border p-4 text-left",
        selected ? "border-accent bg-accent-soft" : "border-rule bg-surface hover:border-rule-strong",
      )}
    >
      <div className="flex items-start gap-3">
        <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", selected ? "bg-accent text-white" : "bg-surface-sunken text-ink-muted")}>
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">{title}</p>
          <p className="mt-0.5 text-xs text-ink-faint">{description}</p>
        </div>
      </div>
      {children}
    </button>
  );
}
