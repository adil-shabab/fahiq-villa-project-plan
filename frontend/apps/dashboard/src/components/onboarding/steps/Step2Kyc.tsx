import { CheckCircle2, Clock, FileImage, XCircle } from "lucide-react";
import { useState } from "react";
import type { KycDoc, OnboardingDraft } from "../../../data/onboarding";
import { cn } from "../../../lib/utils";
import { KycDocumentReviewModal } from "../KycDocumentReviewModal";

const statusConfig = {
  Pending: { icon: Clock, tone: "text-warn bg-warn/10" },
  Verified: { icon: CheckCircle2, tone: "text-ok bg-ok/10" },
  Rejected: { icon: XCircle, tone: "text-danger bg-danger/10" },
};

export function Step2Kyc({ draft, onChange }: { draft: OnboardingDraft; onChange: (patch: Partial<OnboardingDraft>) => void }) {
  const [reviewingIndex, setReviewingIndex] = useState<number | null>(null);
  const verifiedCount = draft.kycDocs.filter((d) => d.status === "Verified").length;

  function updateDoc(index: number, patch: Partial<KycDoc>) {
    const next = [...draft.kycDocs];
    next[index] = { ...next[index], ...patch };
    onChange({ kycDocs: next });
  }

  return (
    <div>
      <p className="mb-4 text-sm text-ink-muted">
        <span className="font-semibold text-ink">{verifiedCount} of {draft.kycDocs.length}</span> documents verified
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {draft.kycDocs.map((doc, i) => {
          const { icon: StatusIcon, tone } = statusConfig[doc.status];
          return (
            <div key={doc.type} className="overflow-hidden rounded-xl border border-rule bg-surface">
              <button
                type="button"
                onClick={() => setReviewingIndex(i)}
                className="flex h-28 w-full items-center justify-center bg-surface-sunken hover:brightness-95"
              >
                <FileImage className="h-8 w-8 text-ink-faint" strokeWidth={1.5} />
              </button>
              <div className="p-3">
                <p className="text-sm font-medium text-ink">{doc.type}</p>
                <span className={cn("mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium", tone)}>
                  <StatusIcon className="h-3 w-3" strokeWidth={2} />
                  {doc.status}
                </span>
                {doc.status === "Rejected" && doc.rejectionReason && <p className="mt-1 text-[11px] text-danger">{doc.rejectionReason}</p>}
              </div>
            </div>
          );
        })}
      </div>

      {reviewingIndex !== null && (
        <KycDocumentReviewModal
          doc={draft.kycDocs[reviewingIndex]}
          onClose={() => setReviewingIndex(null)}
          onVerify={() => updateDoc(reviewingIndex, { status: "Verified", rejectionReason: undefined })}
          onReject={(reason) => updateDoc(reviewingIndex, { status: "Rejected", rejectionReason: reason })}
        />
      )}
    </div>
  );
}
