import type { AdvisorProse as AdvisorProseType } from "@/content/prose";

export function AdvisorProse({
  prose,
  className = "text-ink-muted leading-relaxed",
  compact = false,
}: {
  prose: AdvisorProseType;
  className?: string;
  compact?: boolean;
}) {
  const spacing = compact ? "space-y-2" : "space-y-4";
  const recClass = compact
    ? "font-medium text-ink text-sm"
    : "font-medium text-ink";

  return (
    <div className={`${spacing} ${className}`}>
      <p>{prose.observation}</p>
      <p>{prose.whyItMatters}</p>
      <p className={recClass}>{prose.recommendation}</p>
    </div>
  );
}
