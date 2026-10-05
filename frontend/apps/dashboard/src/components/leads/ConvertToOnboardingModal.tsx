import { ArrowRight } from "lucide-react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import type { Lead } from "../../data/leads";
import { Avatar } from "../ui/Avatar";

export function ConvertToOnboardingModal({ lead, onClose, onConfirm }: { lead: Lead; onClose: () => void; onConfirm: () => void }) {
  const navigate = useNavigate();

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl border border-rule bg-surface shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="px-5 pt-5">
          <h2 className="text-sm font-semibold text-ink">Convert to Onboarding</h2>
          <p className="mt-1 text-sm text-ink-muted">
            This will start a new tenant onboarding using this lead&apos;s details. The lead will be marked Won.
          </p>
        </div>

        <div className="mx-5 my-4 flex items-center gap-3 rounded-lg border border-rule bg-surface-sunken px-3.5 py-3">
          <Avatar initials={lead.name.split(" ").map((p) => p[0]).join("").slice(0, 2)} />
          <div>
            <p className="text-sm font-medium text-ink">{lead.name}</p>
            <p className="text-xs text-ink-faint">
              {lead.phone} &middot; {lead.interestedUnit}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-surface-sunken">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
              navigate("/onboarding");
            }}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white hover:bg-accent-ink"
          >
            Start Onboarding
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
