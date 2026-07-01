import { getScoreTier, scoreTierStyles } from "./score-tier";

type CategoryScorecardProps = {
  label: string;
  description?: string;
  score: number;
  emphasized?: boolean;
};

export function CategoryScorecard({
  label,
  description,
  score,
  emphasized,
}: CategoryScorecardProps) {
  const tier = getScoreTier(score);
  const styles = scoreTierStyles[tier.tier];

  return (
    <article
      className={`rounded-xl border p-5 transition-shadow ${styles.border} ${styles.bg} ${
        emphasized ? "ring-1 ring-crimson/20" : ""
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-ink">{label}</h4>
          {description ? (
            <p className="mt-1 text-xs leading-relaxed text-ink-muted">{description}</p>
          ) : null}
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge}`}
        >
          {tier.label}
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <p className={`text-3xl font-semibold tracking-tight ${styles.text}`}>{score}</p>
        <p className="max-w-[14rem] text-right text-xs leading-relaxed text-ink-muted">
          {tier.description}
        </p>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/80">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            tier.tier === "excellent"
              ? "bg-emerald-600"
              : tier.tier === "good"
                ? "bg-sky-600"
                : tier.tier === "needs-attention"
                  ? "bg-amber-500"
                  : "bg-crimson"
          }`}
          style={{ width: `${score}%` }}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${label} score`}
        />
      </div>
    </article>
  );
}
