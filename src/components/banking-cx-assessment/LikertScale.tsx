import { LIKERT_SCALE } from "@/lib/banking-cx-assessment/constants";

type LikertScaleProps = {
  value: number | undefined;
  onChange: (value: number) => void;
  name: string;
  variant?: "friction" | "capability";
};

export function LikertScale({
  value,
  onChange,
  name,
  variant = "friction",
}: LikertScaleProps) {
  const footer =
    variant === "friction"
      ? { left: "Minimal friction", right: "Severe friction" }
      : { left: "Disagree", right: "Agree" };

  return (
    <div className="space-y-3">
      <div
        className="grid grid-cols-5 gap-1.5 sm:gap-2"
        role="radiogroup"
        aria-label={name}
      >
        {LIKERT_SCALE.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={`flex min-h-[3.25rem] flex-col items-center justify-center rounded-lg border px-1 py-2 text-center transition-all sm:min-h-[4.5rem] sm:px-2 sm:py-3 ${
                selected
                  ? "border-crimson bg-crimson-50 ring-2 ring-crimson/20"
                  : "border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50"
              }`}
            >
              <span
                className={`text-base font-semibold sm:text-lg ${
                  selected ? "text-crimson" : "text-ink-muted"
                }`}
              >
                {option.value}
              </span>
              <span
                className={`mt-0.5 hidden text-[10px] leading-tight sm:mt-1 sm:block ${
                  selected ? "font-semibold text-crimson" : "font-medium text-ink-muted"
                }`}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex justify-between px-0.5 text-[11px] font-medium text-ink-muted sm:text-xs">
        <span>{footer.left}</span>
        <span className="hidden sm:inline">Neutral</span>
        <span>{footer.right}</span>
      </div>
    </div>
  );
}
