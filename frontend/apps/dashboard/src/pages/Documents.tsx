import { Archive, ChevronRight, CloudCheck, FileStack, UploadCloud } from "lucide-react";
import { useState } from "react";
import { DocumentPreviewModal } from "../components/documents/DocumentPreviewModal";
import { DocumentsTable } from "../components/documents/DocumentsTable";
import { TemplatesGrid } from "../components/documents/TemplatesGrid";
import { UploadDocumentModal } from "../components/documents/UploadDocumentModal";
import { VaultStatTiles } from "../components/documents/VaultStatTiles";
import { docTemplates, vaultDocuments, type VaultDocument } from "../data/documents";
import { cn } from "../lib/utils";

type DocsTab = "all" | "templates";

export function Documents() {
  const [tab, setTab] = useState<DocsTab>("all");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<VaultDocument | null>(null);

  return (
    <div className="mx-auto flex max-w-[1700px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
            <span>Portfolio Operations</span>
            <ChevronRight className="h-3 w-3" strokeWidth={2} />
            <span className="text-accent">Asset &amp; Legal Vault</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Documents</h1>
          <p className="mt-0.5 text-sm text-ink-faint">
            {vaultDocuments.length} documents stored <span className="text-ink-faint">·</span> Encrypted cloud vault with automated OCR, e-Sign tracking, and expiry alerts
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" className="flex h-9 items-center gap-1.5 rounded-lg border border-rule bg-surface px-3.5 text-sm font-medium text-ink hover:bg-surface-sunken">
            <Archive className="h-4 w-4 text-ink-muted" strokeWidth={2} />
            Bulk Export / Audit ZIP
          </button>
          <button type="button" onClick={() => setUploadOpen(true)} className="flex h-9 items-center gap-1.5 rounded-lg bg-accent px-3.5 text-sm font-semibold text-white hover:bg-accent-ink">
            <UploadCloud className="h-4 w-4" strokeWidth={2} />
            Upload Document
          </button>
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-2 border-b border-rule pb-0 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTab("all")}
            className={cn(
              "flex items-center gap-2 border-b-2 px-3 pb-3 text-sm font-semibold transition-colors",
              tab === "all" ? "border-accent text-accent" : "border-transparent text-ink-muted hover:text-ink",
            )}
          >
            <FileStack className="h-[18px] w-[18px]" strokeWidth={2} />
            All Documents
            <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", tab === "all" ? "bg-accent-soft text-accent-ink" : "bg-surface-sunken text-ink-muted")}>
              {vaultDocuments.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setTab("templates")}
            className={cn(
              "flex items-center gap-2 border-b-2 px-3 pb-3 text-sm font-semibold transition-colors",
              tab === "templates" ? "border-accent text-accent" : "border-transparent text-ink-muted hover:text-ink",
            )}
          >
            <FileStack className="h-[18px] w-[18px]" strokeWidth={2} />
            Legal Templates
            <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium", tab === "templates" ? "bg-accent-soft text-accent-ink" : "bg-surface-sunken text-ink-muted")}>
              {docTemplates.length}
            </span>
          </button>
        </div>
        <div className="hidden items-center gap-2 pb-2 text-xs text-ink-muted sm:flex">
          <CloudCheck className="h-4 w-4 text-accent" strokeWidth={2} />
          <span>2.1 GB of 10 GB Vault Tier</span>
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-sunken">
            <div className="h-full w-[21%] rounded-full bg-accent" />
          </div>
        </div>
      </div>

      {tab === "all" ? (
        <div className="flex flex-col gap-4">
          <VaultStatTiles />
          <DocumentsTable onPreview={setPreviewDoc} />
        </div>
      ) : (
        <TemplatesGrid onNewTemplate={() => {}} />
      )}

      {uploadOpen && <UploadDocumentModal onClose={() => setUploadOpen(false)} onUpload={() => {}} />}
      {previewDoc && <DocumentPreviewModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />}
    </div>
  );
}
