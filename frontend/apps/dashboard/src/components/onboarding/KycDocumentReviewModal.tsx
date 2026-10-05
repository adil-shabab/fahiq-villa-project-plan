import { FileCheck, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import type { KycDoc } from "../../data/onboarding";

export function KycDocumentReviewModal({
  doc,
  onClose,
  onVerify,
  onReject,
}: {
  doc: KycDoc;
  onClose: () => void;
  onVerify: () => void;
  onReject: (reason: string) => void;
}) {
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="flex w-full max-w-lg overflow-hidden rounded-2xl border border-rule bg-surface shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex h-72 w-1/2 items-center justify-center bg-surface-sunken">
          <FileCheck className="h-14 w-14 text-ink-faint" strokeWidth={1.25} />
        </div>
        <div className="flex w-1/2 flex-col">
          <div className="flex items-center justify-between border-b border-rule px-4 py-3">
            <h2 className="text-sm font-semibold text-ink">{doc.type}</h2>
            <button type="button" onClick={onClose} className="text-ink-faint hover:text-ink" aria-label="Close">
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
          <div className="flex-1 px-4 py-3 text-sm text-ink-muted">
            <p>Uploaded document preview.</p>
            <p className="mt-2 text-xs text-ink-faint">ID number: XXXX-XXXX-1234</p>
            {rejecting && (
              <label className="mt-3 block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">Reason</span>
                <textarea className="field resize-none" rows={2} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Why is this rejected?" />
              </label>
            )}
          </div>
          <div className="flex gap-2 border-t border-rule p-3">
            {!rejecting ? (
              <>
                <button
                  type="button"
                  onClick={() => setRejecting(true)}
                  className="flex-1 rounded-lg bg-danger/10 py-2 text-sm font-medium text-danger hover:bg-danger/20"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onVerify();
                    onClose();
                  }}
                  className="flex-1 rounded-lg bg-ok/10 py-2 text-sm font-medium text-ok hover:bg-ok/20"
                >
                  Verify
                </button>
              </>
            ) : (
              <>
                <button type="button" onClick={() => setRejecting(false)} className="flex-1 rounded-lg py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
                  Back
                </button>
                <button
                  type="button"
                  disabled={!reason.trim()}
                  onClick={() => {
                    onReject(reason);
                    onClose();
                  }}
                  className="flex-1 rounded-lg bg-danger py-2 text-sm font-medium text-white hover:brightness-95 disabled:opacity-50"
                >
                  Confirm Reject
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
