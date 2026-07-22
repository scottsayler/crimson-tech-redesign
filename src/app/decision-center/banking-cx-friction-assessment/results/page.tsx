import Link from "next/link";
import { AssessmentResults } from "@/components/banking-cx-assessment/AssessmentResults";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  buildBreadcrumbList,
  buildSchemaGraph,
  buildWebPage,
} from "@/lib/schema";
import { createMetadata } from "@/lib/seo";

const path = "/decision-center/banking-cx-friction-assessment/results";

export const metadata = createMetadata({
  title: "Assessment Results",
  description: "Your Banking CX Friction Assessment results and journey heatmap.",
  path,
  index: false,
});

export default function BankingCxFrictionResultsPage() {
  return (
    <>
      <JsonLd
        data={buildSchemaGraph([
          buildWebPage({
            name: "Banking CX Friction Assessment Results",
            description:
              "Your Banking CX Friction Assessment results and journey heatmap.",
            path,
          }),
          buildBreadcrumbList([
            { name: "Home", path: "/" },
            { name: "Decision Center", path: "/decision-center" },
            {
              name: "Banking CX Friction Assessment",
              path: "/decision-center/banking-cx-friction-assessment",
            },
            { name: "Results", path },
          ]),
        ])}
      />
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
