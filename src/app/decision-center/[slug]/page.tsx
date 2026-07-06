import { notFound } from "next/navigation";
import Link from "next/link";
import { AssessmentRunner } from "@/components/decision-center/AssessmentRunner";
import { AssessmentProfiles } from "@/components/decision-center/AssessmentProfiles";
import { CTABand } from "@/components/sections/CTABand";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  decisionCenterAssessments,
  getDecisionCenterAssessment,
} from "@/content/decision-center";
import { getAssessmentBySlug } from "@/lib/assessments";
import { createMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return decisionCenterAssessments
    .filter((item) => item.available)
    .map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const assessment = getDecisionCenterAssessment(slug);
  if (!assessment) return {};

  return createMetadata({
    title: assessment.title,
    description: assessment.description,
    path: `/decision-center/${slug}`,
  });
}

export default async function DecisionCenterAssessmentPage({ params }: Props) {
  const { slug } = await params;
  const catalog = getDecisionCenterAssessment(slug);
  const definition = getAssessmentBySlug(slug);

  if (!catalog || !definition || !catalog.available) {
    notFound();
  }

  return (
    <>
      <Section className="!pb-8">
        <Container>
          <Link
            href="/decision-center"
            className="text-sm font-medium text-crimson hover:text-crimson-dark"
          >
            ← Decision Center
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-crimson">
            Executive Assessment
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-ink md:text-4xl lg:text-5xl">
            {catalog.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-muted">
            {catalog.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {catalog.audience.map((role) => (
              <span
                key={role}
                className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs text-ink-muted"
              >
                {role}
              </span>
            ))}
          </div>

          <AssessmentProfiles assessment={catalog} />
        </Container>
      </Section>

      <Section variant="muted" className="!pt-0">
        <Container>
          <AssessmentRunner definition={definition} />
        </Container>
      </Section>

      <CTABand
        title="Questions about your results?"
        description="Schedule a conversation to interpret your journey scores and discuss next steps."
        primaryLabel="Schedule a Conversation"
        primaryHref="/contact"
      />
    </>
  );
}
