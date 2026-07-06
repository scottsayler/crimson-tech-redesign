import Link from "next/link";
import { ContextualLinks } from "@/components/sections/ContextualLinks";
import { CTABand } from "@/components/sections/CTABand";
import { ResearchHubListingCard } from "@/components/sections/ResearchHubListingCard";
import { ResearchTypeNav } from "@/components/sections/ResearchTypeNav";
import { Section } from "@/components/ui/Section";
import {
  getResearchByTypeSorted,
  researchTypeDescriptions,
  type ResearchType,
} from "@/content/research";
import { researchTypeHubTitles } from "@/lib/content-badges";
import {
  getFeaturedResearchForType,
  getRelatedIndustriesForResearchType,
  getRelatedSolutionsForResearchType,
} from "@/lib/relationships";

export function ResearchTypeHubPage({ type }: { type: ResearchType }) {
  const items = getResearchByTypeSorted(type);
  const relatedSolutions = getRelatedSolutionsForResearchType(type);
  const relatedIndustries = getRelatedIndustriesForResearchType(type);
  const featuredResearch = getFeaturedResearchForType(type, 3).filter(
    (item) => !items.some((entry) => entry.slug === item.slug),
  );

  return (
    <>
      <Section className="!pb-8">
        <Link
          href="/research"
          className="text-sm font-medium text-crimson hover:text-crimson-dark"
        >
          ← Insights
        </Link>
        <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-crimson">
          Insights
        </p>
        <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {researchTypeHubTitles[type]}
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-ink-muted leading-relaxed">
          {researchTypeDescriptions[type]}
        </p>
        <p className="mt-4 text-sm text-ink-muted">
          {items.length} {items.length === 1 ? "publication" : "publications"}
        </p>
      </Section>

      <Section variant="muted" className="!py-12">
        <ResearchTypeNav activeType={type} />

        {items.length > 0 ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {items.map((item) => (
              <ResearchHubListingCard key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg border border-dashed border-stone-300 bg-white p-8 md:p-12">
            <h2 className="text-xl font-semibold text-ink">New research coming soon</h2>
            <p className="mt-3 max-w-2xl text-sm text-ink-muted leading-relaxed">
              This library is being expanded. Check back for new{" "}
              {researchTypeHubTitles[type].toLowerCase()} insights from Crimson Technology.
            </p>
            <Link
              href="/research"
              className="mt-6 inline-block text-sm font-medium text-crimson hover:text-crimson-dark"
            >
              Browse all insights →
            </Link>
          </div>
        )}
      </Section>

      <ContextualLinks
        research={featuredResearch}
        solutions={relatedSolutions}
        industries={relatedIndustries}
      />

      <CTABand />
    </>
  );
}
