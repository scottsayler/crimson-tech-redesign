import Link from "next/link";
import { getResearch } from "@/content/research";
import { ContentBadge } from "@/components/ui/ContentBadge";
import { getResearchBadgeLabel, getResearchCompletionTime } from "@/lib/content-badges";
import type { ContinueReadingItem } from "@/lib/topic-graph";

export function ContinueYourResearch({ items }: { items: ContinueReadingItem[] }) {
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-ink">Continue Your Research</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
        Recommended next reads based on this topic and where you are in the learning path.
      </p>
      <div className="mt-6 grid gap-4">
        {items.map((item) => {
          const article = getResearch(item.slug);

          return (
            <Link
              key={item.slug}
              href={`/research/${item.slug}`}
              className="rounded-xl border border-stone-200 bg-white p-5 transition-colors hover:border-crimson/30"
            >
              {article ? (
                <ContentBadge
                  label={getResearchBadgeLabel(article.type)}
                  completionTime={getResearchCompletionTime(article)}
                />
              ) : null}
              <h3 className={`font-semibold text-ink ${article ? "mt-2" : ""}`}>{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.rationale}</p>
              <span className="mt-3 inline-block text-sm font-medium text-crimson">
                Read next →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
