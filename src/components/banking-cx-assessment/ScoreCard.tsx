import { getCapabilityLevel, getFrictionLevel } from "@/lib/banking-cx-assessment/scoring";

type ScoreCardProps = {
  score: number;
  label: string;
  variant?: "friction" | "capability" | "complexity";
  description?: string;
};

export function ScoreCard({
  score,
  label,
  variant = "capability",
  description,
}: ScoreCardProps) {
  const level =
    variant === "friction" || variant === "complexity"
      ? getFrictionLevel(score)
      : getCapabilityLevel(score);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wider text-ink-muted">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold tabular-nums text-ink">
        {score.toFixed(1)}
        <span className="text-lg font-normal text-ink-muted"> / 5</span>
      </p>
      <p className={`mt-1 text-sm font-medium ${level.colorClass}`}>
        {level.label}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-ink-muted">
        {description ?? level.description}
      </p>
    </div>
  );
}
