import type { CategoryScore } from "@/lib/assessments/types";
import { getFrictionTier, frictionTierStyles } from "./friction-tier";

type JourneyScoreChartProps = {
  scores: CategoryScore[];
  emphasizedIds?: Set<string>;
};

export function JourneyScoreChart({ scores, emphasizedIds }: JourneyScoreChartProps) {
  const sorted = [...scores].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-4">
      {sorted.map((item) => {
        const tier = getFrictionTier(item.score);
        const styles = frictionTierStyles[tier.tier];
        const emphasized = emphasizedIds?.has(item.id);

        return (
          <div
            key={item.id}
            className={`rounded-lg border p-4 ${styles.border} ${styles.bg} ${
              emphasized ? "ring-1 ring-crimson/20" : ""
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-medium text-ink">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${styles.badge} rounded-full px-2 py-0.5`}>
                  {tier.label}
                </span>
                <span className={`text-lg font-semibold ${styles.text}`}>{item.score}</span>
              </div>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/80">
              <div
                className={`h-full rounded-full transition-all duration-500 ${styles.bar}`}
                style={{ width: `${item.score}%` }}
                role="progressbar"
                aria-valuenow={item.score}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${item.label} friction score`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
