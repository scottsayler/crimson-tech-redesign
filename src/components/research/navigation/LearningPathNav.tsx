import Link from "next/link";
import { getResearch } from "@/content/research";
import { ContentBadge } from "@/components/ui/ContentBadge";
import { contentBadgeLabels } from "@/lib/content-badges";
import type { LearningPathContext } from "@/lib/topic-graph";

export function LearningPathNav({
  context,
  currentSlug,
}: {
  context: LearningPathContext;
  currentSlug: string;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 md:p-8">
      <ContentBadge label={contentBadgeLabels.playbook} />
      <h2 className="mt-2 text-2xl font-semibold text-ink">{context.path.title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
        {context.path.description}
      </p>
      <ol className="mt-6 space-y-3">
        {context.path.steps.map((step, index) => {
          const article = getResearch(step.slug);
          if (!article) return null;

          const isCurrent = step.slug === currentSlug;

          return (
            <li key={step.slug}>
              <Link
                href={`/research/${step.slug}`}
                className={`flex gap-4 rounded-xl border p-4 transition-colors ${
                  isCurrent
                    ? "border-crimson/30 bg-crimson-50"
                    : "border-stone-200 hover:border-crimson/20 hover:bg-stone-50"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    isCurrent ? "bg-crimson text-white" : "bg-stone-100 text-ink"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="min-w-0">
                  <span className="block font-medium text-ink">{article.title}</span>
                  {!isCurrent ? (
                    <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                      {step.rationale}
                    </span>
                  ) : (
                    <span className="mt-1 block text-sm font-medium text-crimson">
                      You are here
                    </span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
