import { useState } from "react";

/** Current time in ms, captured once per mount (keeps render pure). */
export function useNow(): number {
  const [now] = useState(() => Date.now());
  return now;
}
