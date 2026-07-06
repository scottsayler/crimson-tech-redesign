import Link from "next/link";
import type { DecisionCenterAssessment } from "@/content/decision-center";
import { ASSESSMENT_CATEGORY_LABELS } from "@/content/decision-center";
import { ContentBadge } from "@/components/ui/ContentBadge";

type AssessmentCardProps = {
  assessment: DecisionCenterAssessment;
  featured?: boolean;
};

export function AssessmentCard({ assessment, featured }: AssessmentCardProps) {
  return (
    <Link
      href={`/decision-center/${assessment.slug}`}
      className={`group flex flex-col rounded-xl border bg-white p-6 transition-colors hover:border-crimson/30 ${
        featured ? "border-crimson/20 ring-1 ring-crimson/10" : "border-stone-200"
      }`}
    >
      <ContentBadge
        label={ASSESSMENT_CATEGORY_LABELS[assessment.category]}
        completionTime={assessment.completionTime}
      />
      <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink group-hover:text-crimson">
        {assessment.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{assessment.subtitle}</p>
      <span className="mt-4 text-sm font-medium text-crimson">Start assessment →</span>
    </Link>
  );
}
