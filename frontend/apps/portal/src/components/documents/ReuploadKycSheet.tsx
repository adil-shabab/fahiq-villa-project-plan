import { Camera, CircleAlert, ImageUp, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import type { KycDocument } from "../../data/documents";
import { reuploadKyc } from "../../lib/store";
import { PrimaryButton } from "../auth/PrimaryButton";
import { BottomSheet } from "../ui/BottomSheet";

const MAX_BYTES = 8 * 1024 * 1024;

interface Props {
  doc: KycDocument | null;
  onClose: () => void;
  onSubmitted: (label: string) => void;
}

export function ReuploadKycSheet({ doc, onClose, onSubmitted }: Props) {
  const [file, setFile] = useState<{ file: File; url: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => () => {
    if (file) URL.revokeObjectURL(file.url);
  }, [file]);

  if (!doc) return null;

  function pick(f: File | undefined) {
    if (!f) return;
    if (!f.type.startsWith("image/") && f.type !== "application/pdf") {
      setError("Please choose a photo or a PDF.");
      return;
    }
    if (f.size > MAX_BYTES) {
      setError("That file is over 8 MB. Please choose a smaller one.");
      return;
    }
    setError(null);
    setFile({ file: f, url: URL.createObjectURL(f) });
  }

  async function submit() {
    if (!file || !doc) return;
    setSubmitting(true);
    try {
      await reuploadKyc(doc.type, file.file);
      onSubmitted(doc.label);
    } catch {
      setError("Upload failed. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <BottomSheet
      open
      onClose={submitting ? () => {} : onClose}
      title={`Re-upload ${doc.label}`}
      footer={
        <PrimaryButton type="button" onClick={submit} disabled={!file} loading={submitting}>
          {submitting ? "Uploading…" : "Submit for Review"}
        </PrimaryButton>
      }
    >
      {doc.rejectionReason && (
        <div className="flex items-start gap-2 rounded-xl border border-warn/30 bg-warn/10 px-3.5 py-3 text-sm text-warn">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          {doc.rejectionReason}
        </div>
      )}

      {file ? (
        <div className="mt-4 flex flex-col items-center gap-3 rounded-2xl border border-rule bg-surface-sunken p-4">
          {file.file.type.startsWith("image/") ? (
            <img src={file.url} alt={`New ${doc.label} upload`} className="max-h-56 rounded-lg object-contain" />
          ) : (
            <p className="py-8 text-sm font-semibold text-ink">{file.file.name}</p>
          )}
          <label className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 px-2 text-sm font-semibold text-accent has-[:focus-visible]:underline">
            <RefreshCw className="h-4 w-4" />
            Choose a different file
            <input type="file" accept="image/*,application/pdf" className="sr-only" onChange={(e) => pick(e.target.files?.[0])} />
          </label>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-rule-strong text-sm font-semibold text-ink-muted transition hover:border-accent hover:text-accent has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent/20">
            <Camera className="h-7 w-7" />
            Take photo
            <input type="file" accept="image/*" capture="environment" className="sr-only" onChange={(e) => pick(e.target.files?.[0])} />
          </label>
          <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-rule-strong text-sm font-semibold text-ink-muted transition hover:border-accent hover:text-accent has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent/20">
            <ImageUp className="h-7 w-7" />
            From gallery
            <input type="file" accept="image/*,application/pdf" className="sr-only" onChange={(e) => pick(e.target.files?.[0])} />
          </label>
        </div>
      )}

      <p className="mt-3 text-xs text-ink-faint">JPG, PNG or PDF up to 8 MB. Make sure all four corners and the text are clearly visible.</p>
      {error && (
        <p role="alert" className="mt-3 flex items-center gap-1.5 text-sm text-danger">
          <CircleAlert className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}
    </BottomSheet>
  );
}
