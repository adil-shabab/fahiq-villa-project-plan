import { ArrowLeft, Download, Share2, ShieldCheck, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PrimaryButton } from "../components/auth/PrimaryButton";
import { documentText } from "../data/documents";
import { downloadText, shareText } from "../lib/download";
import { findDocument, usePortalState } from "../lib/store";

const updatedFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" });
const iconBtn =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-muted transition hover:bg-surface-sunken hover:text-ink focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none disabled:opacity-40";

/**
 * Full-screen document viewer (docs/19 Page 5). Renders the mock document as a page; with the
 * backend this shows the signed-URL PDF/image. Pinch-zoom works natively; the buttons are for
 * one-handed use and desktop.
 */
export function DocumentViewer() {
  const { docId = "" } = useParams();
  const navigate = useNavigate();
  const state = usePortalState();
  const doc = findDocument(state, docId);
  const [zoom, setZoom] = useState(1);

  const back = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate("/documents", { replace: true }));

  if (!doc) {
    return (
      <div className="flex flex-col gap-4">
        <button type="button" onClick={back} aria-label="Back" className={`${iconBtn} -ml-2`}>
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="rounded-2xl border border-rule bg-surface px-6 py-10 text-center">
          <p className="text-lg font-bold text-ink">Document not found</p>
          <Link to="/documents" className="mt-2 inline-block text-sm font-semibold text-accent hover:underline">
            Back to documents
          </Link>
        </div>
      </div>
    );
  }

  const fileName = doc.fileName.replace(/\.pdf$/, ".txt");

  return (
    <div className="flex flex-col gap-3 pb-20">
      <header className="flex items-center gap-1">
        <button type="button" onClick={back} aria-label="Back" className={`${iconBtn} -ml-2`}>
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="min-w-0 flex-1 truncate text-lg font-bold tracking-tight text-ink">{doc.title}</h1>
        <button type="button" onClick={() => shareText(doc.title, documentText(doc))} aria-label="Share" className={iconBtn}>
          <Share2 className="h-5 w-5" />
        </button>
      </header>

      <div className="flex items-center justify-between text-xs text-ink-faint">
        <span>
          {doc.sizeLabel} · Updated {updatedFmt.format(new Date(`${doc.updatedAt}T00:00:00`))}
        </span>
        <span className="flex items-center gap-0.5" aria-label="Zoom">
          <button type="button" onClick={() => setZoom((z) => Math.max(1, z - 0.25))} disabled={zoom <= 1} aria-label="Zoom out" className={iconBtn}>
            <ZoomOut className="h-5 w-5" />
          </button>
          <span className="w-10 text-center font-semibold tabular-nums" aria-live="polite">
            {Math.round(zoom * 100)}%
          </span>
          <button type="button" onClick={() => setZoom((z) => Math.min(2, z + 0.25))} disabled={zoom >= 2} aria-label="Zoom in" className={iconBtn}>
            <ZoomIn className="h-5 w-5" />
          </button>
        </span>
      </div>

      <div className="-mx-4 overflow-auto bg-surface-sunken px-4 py-4" style={{ touchAction: "pan-x pan-y pinch-zoom" }}>
        <article
          className="mx-auto origin-top-left rounded-md bg-white px-6 py-7 text-[#1b2420] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_10px_30px_-12px_rgba(0,0,0,0.25)]"
          style={{ width: `${zoom * 100}%`, fontSize: `${zoom * 0.8125}rem` }}
        >
          <div className="mb-5 flex items-center justify-between border-b border-[#dcded7] pb-3">
            <span className="flex items-center gap-1.5 font-extrabold text-[#0f5c4d]">
              <ShieldCheck className="h-[1.4em] w-[1.4em]" />
              Fahiq
            </span>
            <span className="text-[0.85em] text-[#6b756d]">{doc.fileName}</span>
          </div>
          {doc.sections.map((s, i) => (
            <section key={i} className="mb-4">
              {s.heading && <h2 className="mb-1 text-[0.85em] font-bold tracking-wide text-[#0f5c4d] uppercase">{s.heading}</h2>}
              {s.lines.map((l, j) => (
                <p key={j} className={i === 0 && !s.heading && j === 0 ? "text-[1.25em] font-bold" : "leading-relaxed"}>
                  {l}
                </p>
              ))}
            </section>
          ))}
        </article>
      </div>

      <div className="fixed inset-x-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-30 mx-auto max-w-[448px]">
        {/* Mock: saves a text copy until the backend serves the real file via a signed URL. */}
        <PrimaryButton type="button" onClick={() => downloadText(fileName, documentText(doc))} className="shadow-[0_12px_28px_-12px_rgba(15,92,77,0.55)]">
          <Download className="h-5 w-5" />
          Download
        </PrimaryButton>
      </div>
    </div>
  );
}
