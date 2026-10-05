import { CheckCircle2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Stepper } from "../components/onboarding/Stepper";
import { inProgressOnboardings, recentlyCompleted } from "../data/onboarding";
import { Avatar } from "../components/ui/Avatar";

export function OnboardingList() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Onboarding</h1>
          <p className="mt-0.5 text-sm text-ink-faint">{inProgressOnboardings.length} in progress</p>
        </div>
        <Link
          to="/onboarding/new"
          className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Start Onboarding
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {inProgressOnboardings.map((record) => (
          <Link
            key={record.id}
            to={`/onboarding/${record.id}`}
            className="flex flex-col gap-4 rounded-xl border border-rule bg-surface p-4 shadow-sm hover:border-rule-strong hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <Avatar initials={record.avatarInitials} />
              <div>
                <p className="text-sm font-semibold text-ink">{record.applicantName}</p>
                <p className="text-xs text-ink-faint">
                  {record.unitCode} &middot; {record.propertyName}
                </p>
              </div>
            </div>
            <div className="min-w-0 flex-1 sm:px-6">
              <Stepper activeIndex={record.stepIndex} />
            </div>
            <div className="flex items-center gap-3 text-xs text-ink-faint">
              <span>Started {new Date(record.startedOn).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
              <Avatar initials={record.assignedTo.split(" ").map((p) => p[0]).join("")} size="sm" />
              <span className="rounded-lg border border-rule px-3 py-1.5 font-medium text-ink">Continue</span>
            </div>
          </Link>
        ))}
        {inProgressOnboardings.length === 0 && <p className="py-10 text-center text-sm text-ink-faint">No onboardings in progress.</p>}
      </div>

      {recentlyCompleted.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-faint">Recently Completed</h2>
          <div className="flex flex-col gap-2">
            {recentlyCompleted.map((record) => (
              <div key={record.id} className="flex items-center justify-between rounded-xl border border-rule bg-surface-sunken/60 p-4">
                <div className="flex items-center gap-3">
                  <Avatar initials={record.avatarInitials} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-ink">{record.applicantName}</p>
                    <p className="text-xs text-ink-faint">
                      {record.unitCode} &middot; {record.propertyName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-ok">
                  <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                  Completed
                  <Link to={`/tenancies`} className="ml-2 text-accent hover:text-accent-ink">
                    View Tenancy &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
