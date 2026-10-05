import { ChevronRight, Download, Eye, FileSignature, FileText, PenLine } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../components/auth/PrimaryButton";
import { KycPill } from "../components/documents/KycPill";
import { ReuploadKycSheet } from "../components/documents/ReuploadKycSheet";
import { Toast } from "../components/ui/Toast";
import { documentText, type KycDocument } from "../data/documents";
import { downloadText } from "../lib/download";
import { signAgreement, usePortalState } from "../lib/store";

const signedFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" });

const secondaryBtn =
  "flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-accent text-base font-semibold text-accent transition hover:bg-accent-soft focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none";

export function Documents() {
  const { agreement, kyc, sharedDocs } = usePortalState();
  const [reupload, setReupload] = useState<KycDocument | null>(null);
  const [signing, setSigning] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const signed = agreement.status === "signed";

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl leading-8 font-bold tracking-tight text-ink">Documents</h1>

      <section aria-labelledby="agreement-heading">
        <h2 id="agreement-heading" className="mb-3 text-base font-bold tracking-tight text-ink">
          My Agreement
        </h2>
        <div className="rounded-2xl border border-rule bg-surface p-4">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <FileSignature className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-base font-semibold text-ink">{agreement.document.title}</p>
              <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-ink-faint">
                {signed ? (
                  <>
                    <span className="inline-flex rounded-full bg-ok/12 px-2.5 py-0.5 font-semibold text-ok">Signed</span>
                    {agreement.signedAt && `on ${signedFmt.format(new Date(`${agreement.signedAt}T00:00:00`))}`}
                  </>
                ) : (
                  <span className="inline-flex rounded-full bg-warn/12 px-2.5 py-0.5 font-semibold text-warn">Awaiting Signature</span>
                )}
              </p>
            </div>
          </div>
          {signed ? (
            <div className="mt-4 flex gap-2.5">
              <Link to={`/documents/${agreement.document.id}`} className={secondaryBtn}>
                <Eye className="h-5 w-5" />
                View
              </Link>
              <button type="button" className={secondaryBtn} onClick={() => downloadText(agreement.document.fileName.replace(/\.pdf$/, ".txt"), documentText(agreement.document))}>
                <Download className="h-5 w-5" />
                Download
              </button>
            </div>
          ) : (
            <PrimaryButton
              type="button"
              className="mt-4"
              loading={signing}
              onClick={async () => {
                setSigning(true);
                try {
                  await signAgreement();
                  setToast("Agreement signed. A copy has been sent on WhatsApp.");
                } finally {
                  setSigning(false);
                }
              }}
            >
              <PenLine className="h-5 w-5" />
              {signing ? "Opening e-sign…" : "Sign Now"}
            </PrimaryButton>
          )}
        </div>
      </section>

      <section aria-labelledby="kyc-heading">
        <h2 id="kyc-heading" className="mb-3 text-base font-bold tracking-tight text-ink">
          My KYC Documents
        </h2>
        <ul className="divide-y divide-rule overflow-hidden rounded-2xl border border-rule bg-surface">
          {kyc.map((k) => (
            <li key={k.type} className="flex items-start gap-3 px-4 py-3.5">
              <img src={k.thumbnail} alt="" className="h-11 w-16 shrink-0 rounded-md border border-rule object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-ink">{k.label}</p>
                  <KycPill status={k.status} />
                </div>
                {k.numberMasked && <p className="text-xs text-ink-faint tabular-nums">{k.numberMasked}</p>}
                {k.status === "pending" && <p className="text-xs text-ink-faint">Under review by your property manager</p>}
                {k.status === "rejected" && (
                  <>
                    <p className="mt-0.5 text-xs text-danger">{k.rejectionReason}</p>
                    <button
                      type="button"
                      onClick={() => setReupload(k)}
                      className="mt-1 -ml-1 inline-flex min-h-9 items-center px-1 text-sm font-semibold text-danger underline underline-offset-4 focus-visible:ring-4 focus-visible:ring-danger/20 focus-visible:outline-none"
                    >
                      Re-upload
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="shared-heading">
        <h2 id="shared-heading" className="mb-3 text-base font-bold tracking-tight text-ink">
          Shared Documents
        </h2>
        <ul className="divide-y divide-rule overflow-hidden rounded-2xl border border-rule bg-surface">
          {sharedDocs.map((d) => (
            <li key={d.id}>
              <Link
                to={`/documents/${d.id}`}
                className="flex min-h-16 items-center gap-3 px-4 py-3 transition hover:bg-surface-sunken focus-visible:bg-surface-sunken focus-visible:outline-none"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-danger/10 text-danger">
                  <FileText className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-ink">{d.fileName}</span>
                  <span className="block text-xs text-ink-faint">{d.sizeLabel}</span>
                </span>
                <ChevronRight className="h-5 w-5 shrink-0 text-ink-faint" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {reupload && (
        <ReuploadKycSheet
          key={reupload.type}
          doc={reupload}
          onClose={() => setReupload(null)}
          onSubmitted={(label) => {
            setReupload(null);
            setToast(`${label} submitted for review.`);
          }}
        />
      )}
      <Toast message={toast} onDone={() => setToast(null)} />
    </div>
  );
}
