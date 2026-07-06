import Link from "next/link";
import { AssessmentCard } from "@/components/decision-center/AssessmentCard";
import { CTABand } from "@/components/sections/CTABand";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  getAvailableDecisionCenterAssessments,
  getFeaturedDecisionCenterAssessments,
} from "@/content/decision-center";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Decision Center",
  description:
    "Assess operational friction, technology gaps, and modernization priorities before engaging vendors. Executive diagnostics for banks, credit unions, and multi-location operators.",
  path: "/decision-center",
});

export default function DecisionCenterPage() {
  const featured = getFeaturedDecisionCenterAssessments();
  const available = getAvailableDecisionCenterAssessments();

  return (
    <>
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f4_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <Container className="relative">
          <p className="text-sm font-semibold uppercase tracking-wider text-crimson">
            Decision Center
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-ink md:text-5xl lg:text-6xl">
            Before evaluating technology…
            <br />
            <span className="text-crimson">Evaluate your environment.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-muted md:text-xl">
            Our assessments help leadership teams identify operational friction, technology gaps,
            and modernization priorities before engaging vendors.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-ink-muted">
            <span className="rounded-full border border-stone-200 bg-white px-4 py-2">
              {available.length} assessment{available.length === 1 ? "" : "s"} available
            </span>
            <Link
              href="/research"
              className="rounded-full border border-stone-200 bg-white px-4 py-2 font-medium text-crimson hover:border-crimson/30"
            >
              Explore insights →
            </Link>
          </div>
        </Container>
      </section>

      <Section variant="muted">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-crimson">
              How it works
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              Research explains problems. Assessments identify them. Services solve them.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Each assessment scores your current environment across structured dimensions—customer
              journeys, operational readiness, or infrastructure maturity—then surfaces priorities
              aligned to your results.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { step: "Research", description: "Understand the problem landscape" },
              { step: "Assessment", description: "Score friction in your environment" },
              { step: "Conversation", description: "Interpret results with an advisor" },
            ].map((item, index) => (
              <div
                key={item.step}
                className="rounded-xl border border-stone-200 bg-white p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-crimson">
                  Step {index + 1}
                </p>
                <p className="mt-2 text-lg font-semibold text-ink">{item.step}</p>
                <p className="mt-2 text-sm text-ink-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {featured.length > 0 ? (
        <Section>
          <Container>
            <p className="text-sm font-semibold uppercase tracking-wider text-crimson">
              Start here
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              Featured assessments
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {featured.map((assessment) => (
                <AssessmentCard key={assessment.slug} assessment={assessment} featured />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {available.length > 0 ? (
        <Section variant="muted">
          <Container>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">All assessments</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
              Executive diagnostics designed to surface operational friction before vendor
              evaluation.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {available.map((assessment) => (
                <AssessmentCard key={assessment.slug} assessment={assessment} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CTABand
        title="Want help interpreting assessment results?"
        description="Schedule a conversation to review your scores, validate observations, and discuss practical next steps."
        primaryLabel="Schedule a Conversation"
        primaryHref="/contact"
        secondaryLabel="Explore Services"
        secondaryHref="/solutions"
      />
    </>
  );
}
