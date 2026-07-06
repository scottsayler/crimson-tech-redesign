import { notFound } from "next/navigation";
import { ContextualLinks } from "@/components/sections/ContextualLinks";
import { CTABand } from "@/components/sections/CTABand";
import { EngagementStandards } from "@/components/sections/EngagementStandards";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { AdvisorProse } from "@/components/sections/AdvisorProse";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getSolution, solutions } from "@/content/solutions";
import {
  getIndustriesForSolution,
  getResearchForSolution,
} from "@/lib/relationships";
import { createMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};

  return createMetadata({
    title: solution.title,
    description: solution.shortDescription,
    path: `/solutions/${slug}`,
  });
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const relatedResearch = getResearchForSolution(slug);
  const relatedIndustries = getIndustriesForSolution(slug);

  return (
    <>
      <Section className="!pb-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-crimson">
          Services
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {solution.title}
        </h1>
        <AdvisorProse prose={solution.prose} className="mt-6 max-w-3xl text-lg" />
      </Section>

      <Section variant="muted" className="!py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-ink">What we actually do</h2>
            <ul className="mt-4 space-y-3">
              {solution.helpsWith.map((item) => (
                <li key={item} className="flex gap-3 text-ink-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-ink">When to call us</h2>
            <ul className="mt-4 space-y-3">
              {solution.typicalSituations.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-stone-200 bg-white p-4 text-sm text-ink-muted leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {solution.evaluationAreas ? (
        <Section>
          <h2 className="text-2xl font-semibold text-ink">
            Technologies we help you evaluate
          </h2>
          <p className="mt-4 max-w-3xl text-ink-muted leading-relaxed">
            Categories where integration fit, compliance requirements, and operating
            constraints matter as much as feature breadth.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {solution.evaluationAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-ink"
              >
                {area}
              </span>
            ))}
          </div>
        </Section>
      ) : null}

      <Section variant={solution.evaluationAreas ? "muted" : "default"} className="!py-12">
        <h2 className="text-2xl font-semibold text-ink">How the evaluation runs</h2>
        <p className="mt-4 max-w-3xl text-ink-muted leading-relaxed">
          Requirements before demos. Scoring before shortlists. Contract review
          before signing. Specific deliverables at each stage.
        </p>
        <div className="mt-8">
          <ProcessSteps detailed />
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeader
          title="What you get"
          description="Specific outputs at each stage of the evaluation."
        />
        <EngagementStandards />
      </Section>

      <Section>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-semibold text-ink">
              Independent recommendations
            </h2>
            <p className="mt-2 max-w-xl text-sm text-ink-muted">
              No vendor commissions. Recommendations documented with rationale for
              stakeholder review.
            </p>
          </div>
          <Button href="/contact">Talk about this</Button>
        </div>
      </Section>

      <ContextualLinks
        research={relatedResearch}
        industries={relatedIndustries}
      />

      <CTABand />
    </>
  );
}
