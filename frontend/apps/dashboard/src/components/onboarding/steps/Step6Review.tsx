import { AlertTriangle, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import type { OnboardingDraft } from "../../../data/onboarding";
import { formatINR } from "../../../lib/format";
import { cn } from "../../../lib/utils";

export function Step6Review({ draft }: { draft: OnboardingDraft }) {
  const verifiedKyc = draft.kycDocs.filter((d) => d.status === "Verified").length;
  const checklist = [
    { label: "Applicant details captured", ok: Boolean(draft.fullName && draft.phone) },
    { label: `KYC verified (${verifiedKyc}/${draft.kycDocs.length})`, ok: verifiedKyc === draft.kycDocs.length },
    { label: "Lease terms set", ok: draft.rent > 0 && draft.deposit > 0 },
    { label: "Agreement handled", ok: draft.agreementMethod === "skip" || draft.agreementStatus === "Signed" || draft.agreementStatus === "Uploaded" },
    { label: "Opening meter readings recorded", ok: Boolean(draft.openingElectricityReading) },
  ];
  const allOk = checklist.every((c) => c.ok);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SummaryCard title="Applicant">
          <Row label="Name" value={draft.fullName || "—"} />
          <Row label="Phone" value={draft.phone || "—"} />
          <Row label="Occupation" value={draft.occupation} />
          <Row label="Co-occupants" value={String(draft.coOccupants.length)} />
        </SummaryCard>

        <SummaryCard title="KYC">
          {draft.kycDocs.map((d) => (
            <Row key={d.type} label={d.type} value={d.status} />
          ))}
        </SummaryCard>

        <SummaryCard title="Lease Terms">
          <Row label="Rent" value={formatINR(draft.rent)} />
          <Row label="Deposit" value={formatINR(draft.deposit)} />
          <Row label="Start Date" value={draft.startDate || "—"} />
          <Row label="Due Day" value={String(draft.dueDay)} />
        </SummaryCard>

        <SummaryCard title="Agreement &amp; Inspection">
          <Row label="Agreement" value={draft.agreementStatus} />
          <Row label="Inventory items" value={String(draft.inventory.length)} />
          <Row label="Electricity reading" value={draft.openingElectricityReading || "—"} />
        </SummaryCard>
      </div>

      <div className="rounded-xl border border-rule bg-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-ink">Final Checklist</h3>
        <ul className="flex flex-col gap-2">
          {checklist.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-sm">
              {item.ok ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-ok" strokeWidth={2} />
              ) : (
                <AlertTriangle className="h-4 w-4 shrink-0 text-warn" strokeWidth={2} />
              )}
              <span className={cn(item.ok ? "text-ink" : "text-warn")}>{item.label}</span>
            </li>
          ))}
        </ul>
        {!allOk && <p className="mt-3 text-xs text-ink-faint">You can still activate with warnings, but resolve these when possible.</p>}
      </div>
    </div>
  );
}

function SummaryCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-rule bg-surface p-4">
      <h3 className="mb-2 text-sm font-semibold text-ink">{title}</h3>
      <dl className="flex flex-col gap-1.5">{children}</dl>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <dt className="text-ink-faint">{label}</dt>
      <dd className="font-medium text-ink">{value}</dd>
    </div>
  );
}
