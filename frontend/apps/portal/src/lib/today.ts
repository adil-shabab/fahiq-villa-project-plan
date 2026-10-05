import { useState } from "react";

/** Today's local date as yyyy-mm-dd, captured once per mount (keeps render pure). */
export function useToday(): string {
  const [today] = useState(() => new Date().toLocaleDateString("en-CA"));
  return today;
}
