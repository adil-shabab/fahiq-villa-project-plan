import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ActivateConfirmModal } from "../components/onboarding/ActivateConfirmModal";
import { Step1Applicant } from "../components/onboarding/steps/Step1Applicant";
import { Step2Kyc } from "../components/onboarding/steps/Step2Kyc";
import { Step3Terms } from "../components/onboarding/steps/Step3Terms";
import { Step4Agreement } from "../components/onboarding/steps/Step4Agreement";
import { Step5Inspection } from "../components/onboarding/steps/Step5Inspection";
import { Step6Review } from "../components/onboarding/steps/Step6Review";
import { Stepper } from "../components/onboarding/Stepper";
import { createEmptyDraft, inProgressOnboardings, onboardingSteps, recentlyCompleted } from "../data/onboarding";
import { properties } from "../data/properties";

export function OnboardingWizard() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === "new";

  const existingRecord = useMemo(
    () => [...inProgressOnboardings, ...recentlyCompleted].find((r) => r.id === id),
    [id],
  );

  const availableUnits = useMemo(
    () =>
      properties.flatMap((p) =>
        p.units.filter((u) => u.status === "Available").map((u) => ({ ...u, propertyName: p.name, propertyId: p.id })),
      ),
    [],
  );

  const [selectedUnit, setSelectedUnit] = useState<(typeof availableUnits)[number] | null>(
    existingRecord ? { id: "resume", code: existingRecord.unitCode, floor: "", type: "", rent: 0, status: "Available", propertyName: existingRecord.propertyName, propertyId: "" } : null,
  );

  const [draft, setDraft] = useState(() =>
    existingRecord
      ? { ...createEmptyDraft(existingRecord.unitCode, existingRecord.propertyName, 0, 0), fullName: existingRecord.applicantName }
      : createEmptyDraft("", "", 0, 0),
  );
  const [stepIndex, setStepIndex] = useState(existingRecord ? Math.min(existingRecord.stepIndex, onboardingSteps.length - 1) : 0);
  const [showActivate, setShowActivate] = useState(false);

  function patch(p: Partial<typeof draft>) {
    setDraft((prev) => ({ ...prev, ...p }));
  }

  function pickUnit(unit: (typeof availableUnits)[number]) {
    setSelectedUnit(unit);
    setDraft(createEmptyDraft(unit.code, unit.propertyName, unit.rent, unit.rent * 2));
  }

  // Gate: new onboarding requires picking a unit first
  if (isNew && !selectedUnit) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
        <Link to="/onboarding" className="flex w-fit items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
          Onboarding
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Start Onboarding</h1>
          <p className="mt-0.5 text-sm text-ink-faint">Choose a vacant unit to begin onboarding a new tenant</p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {availableUnits.map((unit) => (
            <button
              key={unit.id}
              type="button"
              onClick={() => pickUnit(unit)}
              className="rounded-xl border border-rule bg-surface p-4 text-left shadow-sm hover:border-accent hover:shadow-md"
            >
              <p className="text-sm font-semibold text-ink">{unit.code} &middot; {unit.type}</p>
              <p className="mt-0.5 text-xs text-ink-faint">{unit.propertyName}</p>
              <p className="mt-2 text-sm font-medium tabular-nums text-accent-ink">₹{unit.rent.toLocaleString("en-IN")}/mo</p>
            </button>
          ))}
          {availableUnits.length === 0 && <p className="text-sm text-ink-faint">No vacant units available right now.</p>}
        </div>
      </div>
    );
  }

  const stepName = onboardingSteps[stepIndex];
  const isLastStep = stepIndex === onboardingSteps.length - 1;

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <Link to="/onboarding" className="flex w-fit items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        Onboarding
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">
            {isNew ? "Add New Onboarding" : `Onboarding · ${draft.fullName || existingRecord?.applicantName}`}
          </h1>
          <p className="mt-0.5 text-sm text-ink-faint">
            {draft.unitCode} &middot; {draft.propertyName}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-rule bg-surface px-5 py-4">
        <Stepper activeIndex={stepIndex} />
      </div>

      <div className="rounded-xl border border-rule bg-surface p-5">
        <h2 className="mb-4 text-base font-semibold text-ink">{stepName}</h2>
        {stepName === "Applicant" && <Step1Applicant draft={draft} onChange={patch} />}
        {stepName === "KYC" && <Step2Kyc draft={draft} onChange={patch} />}
        {stepName === "Terms" && <Step3Terms draft={draft} onChange={patch} />}
        {stepName === "Agreement" && <Step4Agreement draft={draft} onChange={patch} />}
        {stepName === "Inspection" && <Step5Inspection draft={draft} onChange={patch} />}
        {stepName === "Review" && <Step6Review draft={draft} />}
      </div>

      <div className="flex items-center justify-between">
        <div>
          {stepIndex > 0 && (
            <button
              type="button"
              onClick={() => setStepIndex((s) => s - 1)}
              className="rounded-lg border border-rule px-3.5 py-2 text-sm font-medium text-ink hover:border-rule-strong"
            >
              &larr; Back
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate("/onboarding")}
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken"
          >
            Save &amp; Exit
          </button>
          {!isLastStep ? (
            <button
              type="button"
              onClick={() => setStepIndex((s) => s + 1)}
              className="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink"
            >
              Next: {onboardingSteps[stepIndex + 1]} &rarr;
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowActivate(true)}
              className="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink"
            >
              Activate Tenancy
            </button>
          )}
        </div>
      </div>

      {showActivate && (
        <ActivateConfirmModal
          draft={draft}
          onClose={() => setShowActivate(false)}
          onConfirm={() => navigate("/onboarding")}
        />
      )}
    </div>
  );
}
