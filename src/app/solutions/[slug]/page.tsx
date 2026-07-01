import { notFound } from "next/navigation";
import { ContextualLinks } from "@/components/sections/ContextualLinks";
import { CTABand } from "@/components/sections/CTABand";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
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
        <p className="mt-6 max-w-3xl text-lg text-ink-muted leading-relaxed">
          {solution.description}
        </p>
      </Section>

      <Section variant="muted" className="!py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-ink">What we help with</h2>
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
            <h2 className="text-2xl font-semibold text-ink">When to call</h2>
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

      <Section>
        <h2 className="text-2xl font-semibold text-ink">How we approach it</h2>
        <div className="mt-8">
          <ProcessSteps />
        </div>
      </Section>

      <Section variant="muted">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-semibold text-ink">
              Independent advice. No platform bias.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-ink-muted">
              We are not tied to a single vendor. Our only incentive is helping you
              make the right decision for your organization.
            </p>
          </div>
          <Button href="/contact">Discuss this service</Button>
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
