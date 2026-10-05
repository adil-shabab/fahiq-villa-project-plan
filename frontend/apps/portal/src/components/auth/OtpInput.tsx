import { useEffect, useLayoutEffect, useRef, type ClipboardEvent, type KeyboardEvent } from "react";
import { cn } from "../../lib/utils";

interface Props {
  value: string;
  onChange: (value: string) => void;
  length: number;
  invalid?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
}

/** Six large digit boxes: auto-advance, backspace-to-previous, arrow keys, paste and SMS autofill. */
export function OtpInput({ value, onChange, length, invalid, disabled, autoFocus }: Props) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  // Latest value for focus handlers that fire before React re-renders.
  const valueRef = useRef(value);
  useLayoutEffect(() => {
    valueRef.current = value;
  });
  // Inputs are disabled while verifying, which drops focus. When they come back empty
  // (e.g. after a wrong code), put the cursor back in the first box.
  useEffect(() => {
    if (!disabled && valueRef.current === "") refs.current[0]?.focus();
  }, [disabled]);

  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  function focusBox(index: number) {
    const box = refs.current[Math.max(0, Math.min(length - 1, index))];
    box?.focus();
    box?.select();
  }

  function write(index: number, incoming: string) {
    const clean = incoming.replace(/\D/g, "");
    if (!clean) return;
    // One digit replaces this box in place; several (paste / SMS autofill) fill from here onwards.
    const next =
      clean.length === 1
        ? (value.slice(0, index) + clean + value.slice(index + 1)).slice(0, length)
        : (value.slice(0, index) + clean).slice(0, length);
    valueRef.current = next;
    onChange(next);
    focusBox(Math.min(index + clean.length, length - 1));
  }

  function handleChange(index: number, raw: string) {
    // Typing over a filled box gives two characters; keep the one that was just typed.
    const old = digits[index];
    const typed = raw.length === 2 && old ? (raw[0] === old ? raw[1] : raw[0]) : raw;
    write(index, typed);
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[index]) {
        onChange(value.slice(0, index) + value.slice(index + 1));
      } else if (index > 0) {
        onChange(value.slice(0, index - 1) + value.slice(index));
        focusBox(index - 1);
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusBox(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      focusBox(index + 1);
    }
  }

  function handlePaste(index: number, e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    write(index, e.clipboardData.getData("text"));
  }

  return (
    <div className="flex justify-between gap-2 sm:gap-2.5" role="group" aria-label="One-time password">
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={i === 0 ? "one-time-code" : "off"}
                    aria-label={`Digit ${i + 1} of ${length}`}
          aria-invalid={invalid || undefined}
          autoFocus={autoFocus && i === 0}
          disabled={disabled}
          value={digit}
          // Only boxes up to the first empty one are reachable, so digits always fill left-to-right.
          onFocus={() => {
            if (i > valueRef.current.length) focusBox(valueRef.current.length);
          }}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={(e) => handlePaste(i, e)}
          className={cn(
            "otp-digit h-14 w-full min-w-0 rounded-xl border-2 bg-surface-sunken text-center font-mono text-2xl font-semibold text-ink tabular-nums caret-accent transition",
            "focus:border-accent focus:bg-surface focus:outline-none focus:ring-4 focus:ring-accent/15",
            digit && !invalid && "border-accent/50 bg-surface",
            !digit && !invalid && "border-rule",
            invalid && "border-danger bg-surface",
            disabled && "opacity-60",
          )}
        />
      ))}
    </div>
  );
}
