import Link from "next/link";
import { CTABand } from "@/components/sections/CTABand";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { topicClusters } from "@/content/topic-clusters";
import { getTopicClusterArticles } from "@/lib/topic-clusters";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Decision Areas",
  description:
    "Topic clusters organizing research, tools, and advisory context around major technology decisions.",
  path: "/research/topics",
});

export default function TopicClustersPage() {
  return (
    <>
      <Section className="!pb-10 md:!pb-12">
        <Link
          href="/research"
          className="text-sm font-medium text-crimson hover:text-crimson-dark"
        >
          ← Insights
        </Link>
        <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-crimson">
          Decision areas
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          From research to decisions
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-muted">
          Organized paths through related evaluations, frameworks, and tools—so you
          can move from understanding the problem to making a defensible choice.
        </p>
      </Section>

      <Section variant="muted">
        <SectionHeader
          eyebrow="Browse"
          title="Major decision areas"
          description="Each cluster groups related research, services, projects, and calculators around a recurring technology decision."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {topicClusters.map((cluster) => {
            const articleCount = getTopicClusterArticles(cluster.slug).length;

            return (
              <Link
                key={cluster.slug}
                href={`/research/topics/${cluster.slug}`}
                className="group flex flex-col rounded-xl border border-stone-200 bg-white p-6 transition-all hover:border-crimson/30 hover:shadow-md"
              >
                <h2 className="text-xl font-semibold text-ink group-hover:text-crimson">
                  {cluster.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                  {cluster.description}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-ink-muted">
                    {articleCount} {articleCount === 1 ? "article" : "articles"}
                  </span>
                  <span className="text-sm font-medium text-crimson">
                    Explore →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <CTABand />
    </>
  );
}
