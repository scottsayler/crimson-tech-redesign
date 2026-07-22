import Link from "next/link";
import { AssessmentWizard } from "@/components/banking-cx-assessment/AssessmentWizard";
import { PrivacyDisclaimer } from "@/components/banking-cx-assessment/PrivacyDisclaimer";
import { AssessmentProfiles } from "@/components/decision-center/AssessmentProfiles";
import { CTABand } from "@/components/sections/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getDecisionCenterAssessment } from "@/content/decision-center";
import { TOTAL_LIKERT_QUESTIONS } from "@/lib/banking-cx-assessment/areas";
import {
  buildBreadcrumbList,
  buildSchemaGraph,
  buildWebApplication,
} from "@/lib/schema";
import { createMetadata } from "@/lib/seo";

const catalog = getDecisionCenterAssessment("banking-cx-friction-assessment");
const assessmentPath = "/decision-center/banking-cx-friction-assessment";

export const metadata = createMetadata({
  title: catalog?.title ?? "Banking CX Friction Assessment",
  description:
    catalog?.description ??
    "Evaluate operational friction across ten customer journeys before CCaaS, CRM, or AI investments.",
  path: assessmentPath,
});

export default function BankingCxFrictionAssessmentPage() {
  if (!catalog) {
    return null;
  }

  return (
    <>
      <JsonLd
        data={buildSchemaGraph([
          buildWebApplication({
            name: catalog.title,
            description: catalog.description,
            path: assessmentPath,
          }),
          buildBreadcrumbList([
            { name: "Home", path: "/" },
            { name: "Decision Center", path: "/decision-center" },
            { name: catalog.title, path: assessmentPath },
          ]),
        ])}
      />
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
          <div className="mb-8 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-md sm:mb-10">
            <div className="border-b-4 border-crimson px-6 py-8 text-center sm:px-10 sm:py-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-crimson">
                Crimson CX Diagnostic
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-ink-muted sm:text-lg">
                {TOTAL_LIKERT_QUESTIONS} questions across 10 journeys, governance, AI readiness,
                and executive alignment
              </p>
              <p className="mt-2 text-sm font-semibold text-ink-muted">
                Estimated time: ~15 minutes
              </p>
            </div>
            <div className="px-6 py-4 sm:px-10">
              <PrivacyDisclaimer compact />
            </div>
          </div>

          <AssessmentWizard />
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
