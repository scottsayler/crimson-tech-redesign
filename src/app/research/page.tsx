import Link from "next/link";
import { ContextualLinks } from "@/components/sections/ContextualLinks";
import { CTABand } from "@/components/sections/CTABand";
import { ResearchCard } from "@/components/sections/ResearchCard";
import { ResearchTypeNav } from "@/components/sections/ResearchTypeNav";
import { ToolCard } from "@/components/tools/ToolCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { industries } from "@/content/industries";
import {
  RESEARCH_TYPES,
  getResearchHubPath,
  getResearchSortedByDate,
  getResearchTypeCount,
  research,
  researchTypeDescriptions,
} from "@/content/research";
import { solutions } from "@/content/solutions";
import { getFeaturedTools } from "@/content/tools";
import { ContentBadge } from "@/components/ui/ContentBadge";
import {
  getResearchBadgeLabel,
  getResearchTypeDefaultCompletionTime,
} from "@/lib/content-badges";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Insights",
  description:
    "Technology buying guidance, decision frameworks, and vendor comparisons from Crimson Technology.",
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
      {/* Publication masthead */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f4_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <Container className="relative">
          <p className="text-sm font-semibold uppercase tracking-wider text-crimson">
            Insights
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-ink md:text-5xl lg:text-6xl">
            Notes from real evaluations
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-ink-muted leading-relaxed md:text-xl">
            Checklists, buying guides, and opinions from evaluations we&apos;ve
            actually run—CCaaS vendor selection, POTS replacement, network
            readiness, AI in contact centers.
          </p>
        </Container>
      </section>

      {/* Featured */}
      {featuredItems.length > 0 ? (
        <Section variant="muted">
        <SectionHeader
          eyebrow="Featured"
          title="Start here"
          description="The evaluations and write-ups we'd send a colleague facing the same decision."
        />
          <div className="grid gap-6 lg:grid-cols-2">
            {featuredItems.map((item, index) => (
              <div
                key={item.slug}
                className={index === 0 && featuredItems.length > 1 ? "lg:col-span-2" : ""}
              >
                <ResearchCard item={item} featured={index === 0} />
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Interactive tools */}
      <Section>
        <SectionHeader
          eyebrow="Technology Decision Center"
          title="Run the numbers"
          description="Outage cost per hour, POTS savings, network readiness scores—before you approve the spend."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {getFeaturedTools().map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/tools"
            className="text-sm font-medium text-crimson hover:text-crimson-dark"
          >
            View all tools →
          </Link>
        </div>
      </Section>

      {/* Browse by type */}
      <Section>
        <SectionHeader
          eyebrow="Browse"
          title="By format"
          description="Checklists for active evaluations. Buying guides for platform decisions. Problem pages for when you're not sure what you're solving yet."
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
                    completionTime={getResearchTypeDefaultCompletionTime(researchType)}
                  />
                  <span className="shrink-0 rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-ink-muted">
                    {count}
                  </span>
                </div>
                <p className="mt-2 flex-1 text-sm text-ink-muted leading-relaxed">
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

      {/* All publications */}
      <Section variant="muted">
        <SectionHeader
          eyebrow="Library"
          title="All insights"
          description="Everything we've published—newest first."
        />
        <ResearchTypeNav />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {libraryItems.map((item) => (
            <ResearchCard key={item.slug} item={item} />
          ))}
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
