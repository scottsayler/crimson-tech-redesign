import { getFrictionLevel } from "@/lib/banking-cx-assessment/scoring";
import type { AreaScore } from "@/lib/banking-cx-assessment/types";

type FrictionRankingProps = {
  areas: AreaScore[];
  title?: string;
};

export function FrictionRanking({
  areas,
  title = "Highest Friction Areas",
}: FrictionRankingProps) {
  const maxScore = Math.max(...areas.map((a) => a.score), 1);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-ink-muted">
        Priority journeys ranked by average friction score.
      </p>

      <ol className="mt-6 space-y-4">
        {areas.map((area, index) => {
          const level = getFrictionLevel(area.score);
          const width = (area.score / maxScore) * 100;

          return (
            <li key={area.areaId}>
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="font-medium text-ink-muted">
                    {area.areaName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-medium uppercase ${level.colorClass}`}
                  >
                    {level.label}
                  </span>
                  <span className="text-sm font-bold tabular-nums text-ink">
                    {area.score.toFixed(1)}
                  </span>
                </div>
              </div>
              <div className="ml-10 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all ${level.bgClass}`}
                  style={{ width: `${width}%` }}
                />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
