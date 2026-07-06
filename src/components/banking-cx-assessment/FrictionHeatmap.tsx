import { getHeatmapIntensity } from "@/lib/banking-cx-assessment/scoring";
import type { AreaScore } from "@/lib/banking-cx-assessment/types";

type FrictionHeatmapProps = {
  areaScores: AreaScore[];
};

export function FrictionHeatmap({ areaScores }: FrictionHeatmapProps) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-ink">
          Friction Heatmap
        </h3>
        <p className="mt-1 text-sm text-ink-muted">
          Journey-level friction scores across all assessment areas. Darker
          crimson indicates higher friction.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {areaScores.map((area) => (
          <div
            key={area.areaId}
            className={`flex items-center justify-between rounded-xl border px-4 py-3 ${getHeatmapIntensity(area.score)}`}
          >
            <span className="text-sm font-medium">{area.areaName}</span>
            <span className="text-lg font-bold tabular-nums">
              {area.score.toFixed(1)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-muted">
        <span>Low</span>
        <div className="flex h-3 w-48 overflow-hidden rounded-full">
          <div className="flex-1 bg-emerald-200" />
          <div className="flex-1 bg-amber-200" />
          <div className="flex-1 bg-orange-300" />
          <div className="flex-1 bg-crimson-400" />
        </div>
        <span>High</span>
      </div>
    </div>
  );
}
