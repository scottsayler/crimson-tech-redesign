type CalculatorIntroProps = {
  title: string;
  subtitle: string;
  highlights: string[];
  onStart: () => void;
  continueLabel?: string;
};

export function CalculatorIntro({
  title,
  subtitle,
  highlights,
  onStart,
  continueLabel = "Start Calculator",
}: CalculatorIntroProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
      <div className="border-b border-stone-200 bg-gradient-to-br from-crimson-50/80 via-white to-stone-50 px-6 py-10 sm:px-10 sm:py-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-crimson">
          Interactive Calculator
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
          {subtitle}
        </p>
      </div>

      <div className="px-6 py-8 sm:px-10 sm:py-10">
        <ul className="grid gap-3 sm:grid-cols-2">
          {highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-lg border border-stone-200 bg-stone-50/60 px-4 py-3.5 text-sm text-ink"
            >
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-crimson text-[11px] font-bold text-white"
                aria-hidden
              >
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onStart}
            className="rounded-lg bg-crimson px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-crimson-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson/30"
          >
            {continueLabel}
          </button>
          <p className="text-sm text-ink-muted">Results update instantly as you adjust inputs.</p>
        </div>
      </div>
    </div>
  );
}
