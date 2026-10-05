import { Construction } from "lucide-react";

export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex h-full min-h-[60vh] flex-col items-center justify-center gap-3 px-4 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent-ink">
        <Construction className="h-6 w-6" strokeWidth={2} />
      </span>
      <h1 className="text-xl font-bold text-ink">{title}</h1>
      <p className="max-w-sm text-sm text-ink-faint">
        This screen hasn&apos;t been built yet in the prototype. Ask for it by name and it'll be the next one added.
      </p>
    </div>
  );
}
