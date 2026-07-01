import Link from "next/link";
import type { Research } from "@/content/research";
import { ContentBadge } from "@/components/ui/ContentBadge";
import { getResearchBadgeLabel, getResearchCompletionTime } from "@/lib/content-badges";
import {
  getIndustriesForResearch,
  getSolutionsForResearch,
} from "@/lib/relationships";

export function ResearchHubListingCard({ item }: { item: Research }) {
  const relatedSolutions = getSolutionsForResearch(item);
  const relatedIndustries = getIndustriesForResearch(item);

  return (
    <article className="flex flex-col rounded-lg border border-stone-200 bg-white p-6 transition-all hover:border-crimson/30 hover:shadow-md">
      <ContentBadge
        label={getResearchBadgeLabel(item.type)}
        completionTime={getResearchCompletionTime(item)}
      />
      <h2 className="mt-3 text-xl font-semibold text-ink">
        <Link href={`/research/${item.slug}`} className="hover:text-crimson">
          {item.title}
        </Link>
      </h2>
      <p className="mt-3 flex-1 text-sm text-ink-muted leading-relaxed">
        {item.excerpt}
      </p>

      {relatedIndustries.length > 0 ? (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Related industries
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {relatedIndustries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="rounded-full border border-stone-200 px-3 py-1 text-xs text-ink-muted transition-colors hover:border-crimson/30 hover:text-crimson"
              >
                {industry.title}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {relatedSolutions.length > 0 ? (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Related solutions
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {relatedSolutions.map((solution) => (
              <Link
                key={solution.slug}
                href={`/solutions/${solution.slug}`}
                className="rounded-full border border-stone-200 px-3 py-1 text-xs text-ink-muted transition-colors hover:border-crimson/30 hover:text-crimson"
              >
                {solution.title}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <Link
        href={`/research/${item.slug}`}
        className="mt-5 text-sm font-medium text-crimson hover:text-crimson-dark"
      >
        Read article →
      </Link>
    </article>
  );
}
