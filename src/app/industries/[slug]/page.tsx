import { notFound } from "next/navigation";
import { IndustryLibrary } from "@/components/research/navigation/IndustryLibrary";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { RelatedAssessments } from "@/components/decision-center/RelatedAssessments";
import {
  RelatedResearchSection,
  RelatedSolutionsSection,
} from "@/components/sections/ContextualLinks";
import { CTABand } from "@/components/sections/CTABand";
import { AdvisorProse } from "@/components/sections/AdvisorProse";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getIndustry, industries } from "@/content/industries";
import { getIndustryLibrary } from "@/content/industry-libraries";
import { getSolution } from "@/content/solutions";
import { getResearchForIndustry } from "@/lib/relationships";
import { createMetadata } from "@/lib/seo";

const DEFAULT_RESOURCES_TITLE = "Related reading";
const DEFAULT_RESOURCES_DESCRIPTION =
  "Guides and checklists from evaluations in this sector.";
const INDUSTRY_SERVICES_TITLE = "What we evaluate here";
const DEFAULT_SERVICES_DESCRIPTION =
  "Platform selections, renewals, and migrations we've run in similar environments.";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  return createMetadata({
    title: industry.title,
    description: industry.shortDescription,
    path: `/industries/${slug}`,
  });
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const relatedServices = industry.relatedServices
    .map((s) => getSolution(s))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));
  const library = getIndustryLibrary(slug);
  const relatedResearch = getResearchForIndustry(slug);

  return (
    <>
      <Section className="!pb-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-crimson">
          Industries
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {industry.title}
        </h1>
        <AdvisorProse prose={industry.prose} className="mt-6 max-w-3xl text-lg" />
        {slug === "financial-services" && (
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/crimson-cx">Explore Crimson CX</Button>
            <Button href="/decision-center/banking-cx-friction-assessment" variant="outline">
              Take CX Friction Assessment
            </Button>
          </div>
        )}
      </Section>

      <Section variant="muted" className="!py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-ink">What we keep seeing</h2>
            <ul className="mt-4 space-y-3">
              {industry.challenges.map((item) => (
                <li key={item} className="flex gap-3 text-ink-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-ink">What we do about it</h2>
            <ul className="mt-4 space-y-3">
              {industry.howWeHelp.map((item) => (
                <li key={item} className="flex gap-3 text-ink-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {industry.relatedAssessments && industry.relatedAssessments.length > 0 ? (
        <Section variant="muted" className="!py-12">
          <RelatedAssessments items={industry.relatedAssessments} />
        </Section>
      ) : null}

      {industry.relatedTools && industry.relatedTools.length > 0 ? (
        <Section variant="muted" className="!py-12">
          <RelatedTools items={industry.relatedTools} />
        </Section>
      ) : null}

      {library ? (
        <IndustryLibrary industrySlug={slug} variant="default" />
      ) : (
        <RelatedResearchSection
          items={relatedResearch}
          variant="default"
          title={industry.resourcesTitle ?? DEFAULT_RESOURCES_TITLE}
          description={
            industry.resourcesDescription ?? DEFAULT_RESOURCES_DESCRIPTION
          }
        />
      )}

      <RelatedSolutionsSection
        items={relatedServices}
        variant={library ? "muted" : "default"}
        showViewAll={false}
        title={INDUSTRY_SERVICES_TITLE}
        description={industry.servicesDescription ?? DEFAULT_SERVICES_DESCRIPTION}
      />

      <CTABand />
    </>
  );
}
