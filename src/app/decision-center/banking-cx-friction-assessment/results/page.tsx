import type { Metadata } from "next";
import Link from "next/link";
import { AssessmentResults } from "@/components/banking-cx-assessment/AssessmentResults";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Assessment Results",
    description: "Your Banking CX Friction Assessment results and journey heatmap.",
    path: "/decision-center/banking-cx-friction-assessment/results",
  }),
  robots: { index: false, follow: false },
};

export default function BankingCxFrictionResultsPage() {
  return (
    <>
      <Section className="!pb-4">
        <Container>
          <Link
            href="/decision-center/banking-cx-friction-assessment"
            className="text-sm font-medium text-crimson hover:text-crimson-dark"
          >
            ← Back to Assessment
          </Link>
        </Container>
      </Section>

      <Section variant="muted" className="!pt-0">
        <Container>
          <AssessmentResults />
        </Container>
      </Section>
    </>
  );
}
