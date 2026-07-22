import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { ContentBadge } from "@/components/ui/ContentBadge";
import { getTopicCluster } from "@/content/topic-clusters";
import type { Research } from "@/content/research";
import { getResearchBadgeLabel, getResearchCompletionTime } from "@/lib/content-badges";
import { getTopicClusterArticlesByCategory } from "@/lib/topic-clusters";

function LibraryArticleLink({ item }: { item: Research }) {
  return (
    <Link
      href={`/research/${item.slug}`}
      className="group rounded-xl border border-stone-200 bg-white p-5 transition-colors hover:border-crimson/30"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-ink group-hover:text-crimson">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted line-clamp-2">
            {item.excerpt}
          </p>
        </div>
        <ContentBadge
          className="shrink-0 text-right"
          label={getResearchBadgeLabel(item.type)}
          completionTime={getResearchCompletionTime(item)}
        />
      </div>
    </Link>
  );
}

export function TopicClusterLibrary({
  clusterSlug,
  variant = "default",
}: {
  clusterSlug: string;
  variant?: "default" | "muted";
}) {
  const cluster = getTopicCluster(clusterSlug);
  if (!cluster) return null;

  const grouped = getTopicClusterArticlesByCategory(clusterSlug);
  if (grouped.length === 0) return null;

  return (
    <Section variant={variant} className="!py-12 md:!py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-crimson">
          Read
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
          {cluster.title}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ink-muted">
          {cluster.description}
        </p>
      </div>

      <div className="mt-10 space-y-12">
        {grouped.map(({ category, articles }) => (
          <section key={category.label}>
            <h3 className="text-xl font-semibold text-ink">{category.label}</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {articles.map((item) => (
                <LibraryArticleLink key={item.slug} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </Section>
  );
}
