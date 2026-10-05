import { useEffect, type RefObject } from "react";

/** Fires `onOutside` on a pointerdown that lands outside every given ref's element. */
export function useClickOutside(refs: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[], onOutside: () => void) {
  const refList = Array.isArray(refs) ? refs : [refs];

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      const isInside = refList.some((ref) => ref.current && ref.current.contains(target));
      if (!isInside) onOutside();
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onOutside, ...refList]);
}
