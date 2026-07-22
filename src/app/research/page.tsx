import Link from "next/link";
import { ContextualLinks } from "@/components/sections/ContextualLinks";
import { CTABand } from "@/components/sections/CTABand";
import { ResearchCard } from "@/components/sections/ResearchCard";
import { ResearchTypeNav } from "@/components/sections/ResearchTypeNav";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { industries } from "@/content/industries";
import { topicClusters } from "@/content/topic-clusters";
import {
  RESEARCH_TYPES,
  getResearchHubPath,
  getResearchSortedByDate,
  getResearchTypeCount,
  research,
  researchTypeDescriptions,
} from "@/content/research";
import { solutions } from "@/content/solutions";
import { ContentBadge } from "@/components/ui/ContentBadge";
import {
  getResearchBadgeLabel,
  getResearchTypeDefaultCompletionTime,
} from "@/lib/content-badges";
import {
  buildBreadcrumbList,
  buildCollectionPage,
  buildSchemaGraph,
} from "@/lib/schema";
import { getTopicClusterArticles } from "@/lib/topic-clusters";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Research",
  description:
    "Practical decision guides, field analysis, and technology education from evaluations Crimson Technology has run with operating teams.",
  path: "/research",
});

export default function ResearchPage() {
  const featuredItems = research.filter((item) => item.featured);
  const featuredSlugs = new Set(featuredItems.map((item) => item.slug));
  const libraryItems = getResearchSortedByDate().filter(
    (item) => !featuredSlugs.has(item.slug),
  );

  return (
    <>
      <JsonLd
        data={buildSchemaGraph([
          buildCollectionPage({
            name: "Research",
            description:
              "Practical decision guides, field analysis, and technology education from evaluations Crimson Technology has run with operating teams.",
            path: "/research",
          }),
          buildBreadcrumbList([
            { name: "Home", path: "/" },
            { name: "Research", path: "/research" },
          ]),
        ])}
      />
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f4_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <Container className="relative">
          <p className="text-sm font-semibold uppercase tracking-wider text-crimson">
            Research
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-ink md:text-5xl lg:text-6xl">
            Decision guides from real evaluations
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-muted md:text-xl">
            Research covers practical guides, problem analysis, technology
            explainers, and field notes that help buyers understand tradeoffs and
            decision criteria before vendor selection.
          </p>
          <div className="mt-8">
            <Button href="/decision-center" variant="outline">
              Open the Decision Center
            </Button>
          </div>
        </Container>
      </section>

      {featuredItems.length > 0 ? (
        <Section variant="muted">
          <SectionHeader
            eyebrow="Featured"
            title="Start here"
            description="Guides and write-ups we would send a colleague facing the same decision."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {featuredItems.map((item, index) => (
              <div
                key={item.slug}
                className={
                  index === 0 && featuredItems.length > 1 ? "lg:col-span-2" : ""
                }
              >
                <ResearchCard item={item} featured={index === 0} />
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      <Section>
        <SectionHeader
          eyebrow="Decision areas"
          title="Organized by major decisions"
          description="Topic hubs that group related research around recurring technology decisions."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {topicClusters.map((cluster) => {
            const articleCount = getTopicClusterArticles(cluster.slug).length;

            return (
              <Link
                key={cluster.slug}
                href={`/research/topics/${cluster.slug}`}
                className="group flex flex-col rounded-lg border border-stone-200 bg-white p-5 transition-all hover:border-crimson/30 hover:shadow-md"
              >
                <h3 className="font-semibold text-ink group-hover:text-crimson">
                  {cluster.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted line-clamp-3">
                  {cluster.description}
                </p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="text-xs text-ink-muted">
                    {articleCount} {articleCount === 1 ? "article" : "articles"}
                  </span>
                  <span className="text-xs font-medium text-crimson">
                    Explore →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        <Link
          href="/research/topics"
          className="mt-6 inline-block text-sm font-medium text-crimson hover:text-crimson-dark"
        >
          View all decision areas →
        </Link>
      </Section>

      <Section variant="muted">
        <SectionHeader
          eyebrow="Browse"
          title="By format"
          description="Checklists for active evaluations. Buying guides for platform decisions. Problem pages for when the issue is still being framed."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {RESEARCH_TYPES.map((researchType) => {
            const count = getResearchTypeCount(researchType);
            return (
              <Link
                key={researchType}
                href={getResearchHubPath(researchType)}
                className="group flex flex-col rounded-lg border border-stone-200 bg-white p-5 transition-all hover:border-crimson/30 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-2">
                  <ContentBadge
                    label={getResearchBadgeLabel(researchType)}
                    completionTime={getResearchTypeDefaultCompletionTime(
                      researchType,
                    )}
                  />
                  <span className="shrink-0 rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-ink-muted">
                    {count}
                  </span>
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                  {researchTypeDescriptions[researchType]}
                </p>
                <span className="mt-4 text-xs font-medium text-crimson">
                  Browse →
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Library"
          title="All research"
          description="Published guides and analysis, newest first."
        />
        <ResearchTypeNav />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {libraryItems.map((item) => (
            <ResearchCard key={item.slug} item={item} />
          ))}
        </div>
      </Section>

      <Section variant="muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            Ready to evaluate your environment
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Assessments and calculators live in the Decision Center. Use them to
            score friction, quantify impact, and prepare decision inputs.
          </p>
          <div className="mt-8">
            <Button href="/decision-center">Open the Decision Center</Button>
          </div>
        </div>
      </Section>

      <ContextualLinks
        solutions={solutions.slice(0, 3)}
        industries={industries.slice(0, 3)}
      />

      <CTABand />
    </>
  );
}
