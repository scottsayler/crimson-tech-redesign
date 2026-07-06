import { getCapabilityLevel, getFrictionLevel } from "@/lib/banking-cx-assessment/scoring";

type ScoreGaugeProps = {
  score: number;
  label?: string;
  size?: "sm" | "lg";
  variant?: "friction" | "capability";
};

export function ScoreGauge({
  score,
  label = "Overall Score",
  size = "lg",
  variant = "capability",
}: ScoreGaugeProps) {
  const level =
    variant === "friction"
      ? getFrictionLevel(score)
      : getCapabilityLevel(score);

  const percentage = (score / 5) * 100;

  return (
    <div
      className={`rounded-2xl border border-stone-200 bg-white p-6 shadow-sm ${
        size === "lg" ? "text-center" : ""
      }`}
    >
      <p className="text-sm font-medium uppercase tracking-wider text-ink-muted">
        {label}
      </p>
      <div
        className={`mt-4 flex items-center gap-6 ${
          size === "lg" ? "flex-col" : "flex-row"
        }`}
      >
        <div
          className={`relative flex items-center justify-center rounded-full border-4 border-stone-100 ${
            size === "lg" ? "h-36 w-36" : "h-20 w-20"
          }`}
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-slate-100"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 2.64} 264`}
              className="text-crimson"
            />
          </svg>
          <div className="relative">
            <span
              className={`font-semibold text-ink ${
                size === "lg" ? "text-4xl" : "text-2xl"
              }`}
            >
              {score.toFixed(1)}
            </span>
            <span className="block text-xs text-ink-muted">/ 5.0</span>
          </div>
        </div>
        <div className={size === "lg" ? "text-center" : ""}>
          <p className={`text-lg font-semibold ${level.colorClass}`}>
            {level.label}
          </p>
          <p className="mt-1 max-w-xs text-sm leading-relaxed text-ink-muted">
            {level.description}
          </p>
        </div>
      </div>
    </div>
  );
}
