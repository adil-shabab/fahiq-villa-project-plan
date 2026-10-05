import { MoreHorizontal } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "../../lib/useClickOutside";

export interface MenuAction {
  label: string;
  onSelect: () => void;
  tone?: "default" | "danger";
}

export function DropdownMenu({ actions, trigger }: { actions: MenuAction[]; trigger?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; right: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside([triggerRef, menuRef], () => setOpen(false));

  function handleOpen() {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
    }
    setOpen((o) => !o);
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleOpen}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-faint hover:bg-surface-sunken hover:text-ink"
        aria-label="Row actions"
      >
        {trigger ?? <MoreHorizontal className="h-4 w-4" strokeWidth={2} />}
      </button>

      {open &&
        position &&
        createPortal(
          <div
            ref={menuRef}
            style={{ position: "fixed", top: position.top, right: position.right }}
            className="z-50 w-48 overflow-hidden rounded-lg border border-rule bg-surface py-1 shadow-lg"
          >
            {actions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => {
                  action.onSelect();
                  setOpen(false);
                }}
                className={`block w-full whitespace-nowrap px-3.5 py-2 text-left text-sm hover:bg-surface-sunken ${
                  action.tone === "danger" ? "text-danger" : "text-ink"
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}
