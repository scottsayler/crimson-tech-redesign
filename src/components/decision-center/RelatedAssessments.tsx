import Link from "next/link";
import {
  getDecisionCenterAssessment,
  ASSESSMENT_CATEGORY_LABELS,
} from "@/content/decision-center";
import { ContentBadge } from "@/components/ui/ContentBadge";

type RelatedAssessmentLink = {
  slug: string;
  label: string;
};

export function RelatedAssessments({ items }: { items: RelatedAssessmentLink[] }) {
  const resolved = items
    .map((item) => {
      const assessment = getDecisionCenterAssessment(item.slug);
      if (!assessment) return null;
      return { ...item, assessment };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (resolved.length === 0) return null;

  return (
    <div className="rounded-xl border border-crimson/15 bg-crimson-50 p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-crimson">
        Decision Center
      </p>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted">
        Understand your environment before evaluating vendors. These assessments identify operational
        friction and modernization priorities.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {resolved.map((item) => (
          <Link
            key={item.slug}
            href={`/decision-center/${item.slug}`}
            className="flex flex-col rounded-lg border border-crimson/20 bg-white p-4 transition-colors hover:border-crimson/40"
          >
            <ContentBadge
              label={ASSESSMENT_CATEGORY_LABELS[item.assessment.category]}
              completionTime={item.assessment.completionTime}
            />
            <span className="mt-3 text-sm font-semibold text-ink">{item.label}</span>
            <span className="mt-2 text-sm text-crimson">Start assessment →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
