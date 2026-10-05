import { CheckCircle2 } from "lucide-react";
import { createPortal } from "react-dom";
import type { OnboardingDraft } from "../../data/onboarding";

export function ActivateConfirmModal({ draft, onClose, onConfirm }: { draft: OnboardingDraft; onClose: () => void; onConfirm: () => void }) {
  const verifiedKyc = draft.kycDocs.filter((d) => d.status === "Verified").length;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl border border-rule bg-surface shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="px-5 pt-5">
          <h2 className="text-sm font-semibold text-ink">Activate Tenancy?</h2>
          <p className="mt-1 text-sm text-ink-muted">
            This will mark unit <b className="text-ink">{draft.unitCode}</b> as Occupied, start the rent schedule from{" "}
            <b className="text-ink">{draft.startDate}</b>, and send a welcome message to the tenant on WhatsApp.
          </p>
        </div>

        <div className="mx-5 my-4 flex flex-col gap-1.5 rounded-lg bg-surface-sunken px-3.5 py-3 text-sm">
          <ChecklistRow label="KYC verified" ok={verifiedKyc === draft.kycDocs.length} />
          <ChecklistRow label="Agreement signed" ok={draft.agreementStatus === "Signed" || draft.agreementStatus === "Uploaded"} />
          <ChecklistRow label="Inspection recorded" ok={draft.inventory.length > 0} />
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Go Back
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink"
          >
            Activate Tenancy
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function ChecklistRow({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2 className={`h-4 w-4 ${ok ? "text-ok" : "text-ink-faint"}`} strokeWidth={2} />
      <span className={ok ? "text-ink" : "text-ink-faint"}>{label}</span>
    </div>
  );
}
