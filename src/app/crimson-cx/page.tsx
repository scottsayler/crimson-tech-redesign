import { CTABand } from "@/components/sections/CTABand";
import { ContextualLinks } from "@/components/sections/ContextualLinks";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getIndustry } from "@/content/industries";
import {
  getResearchForPractice,
  getSolutionsForIndustrySlug,
} from "@/lib/relationships";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Crimson CX",
  description:
    "Crimson CX helps banks and credit unions navigate customer experience, AI, contact center modernization, and operational transformation.",
  path: "/crimson-cx",
});

const problems = [
  "Siloed systems and disconnected customer journeys",
  "Operational friction and lack of visibility across channels",
  "Workflow breakdowns between front office, back office, and IT",
  "CCaaS and AI evaluations that never reach production",
  "Vendor demos that do not reflect real-world performance",
];

const topics = [
  "CCaaS strategy",
  "AI readiness",
  "Workflow automation",
  "Vendor evaluation",
  "CX friction analysis",
  "Operational modernization",
  "Contact center transformation",
];

const audiences = [
  "CIO",
  "COO",
  "VP Customer Experience",
  "Contact Center Leaders",
  "Digital Leaders",
];

export default function CrimsonCXPage() {
  const relatedResearch = getResearchForPractice("crimson-cx");
  const relatedSolutions = getSolutionsForIndustrySlug("financial-services");
  const financialServices = getIndustry("financial-services");

  return (
    <>
      <Section className="!pb-12" variant="crimson">
        <SectionHeader
          eyebrow="Flagship Practice · Crimson Technology"
          title="Customer experience advisory for banks and credit unions"
          description="Crimson CX helps financial institutions navigate contact center modernization, AI adoption, and operational transformation—with structured decisions instead of vendor noise."
        />
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-ink">The challenge</h2>
            <p className="mt-4 text-ink-muted leading-relaxed">
              Financial institutions face more vendors, more channels, and more
              pressure to modernize—while day-to-day operations still have to run.
              Technology decisions that should create clarity often create more
              confusion.
            </p>
            <p className="mt-4 text-ink-muted leading-relaxed">
              Crimson CX exists to help institutions move from vendor noise to
              structured decisions. We understand the intersection of customer
              experience, compliance, operations, and technology—because that is
              where most transformation initiatives succeed or fail.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-ink">Problems we address</h2>
            <ul className="mt-4 space-y-3">
              {problems.map((problem) => (
                <li key={problem} className="flex gap-3 text-ink-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                  {problem}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeader
          title="How we help"
          description="Structured advisory focused on decisions that stick and implementations that work."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <div
              key={topic}
              className="rounded-lg border border-stone-200 bg-white p-5 text-sm font-medium text-ink"
            >
              {topic}
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-ink">Who we work with</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {audiences.map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-ink"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-ink">Part of Crimson Technology</h2>
            <p className="mt-4 text-ink-muted leading-relaxed">
              Crimson CX is a specialized practice within Crimson Technology. While
              financial services customer experience is a flagship focus, our broader
              capabilities span technology advisory, communications, AI, infrastructure,
              and digital product development.
            </p>
            <p className="mt-4 text-ink-muted leading-relaxed">
              This means your CX transformation benefits from depth in contact
              centers and customer experience—backed by the breadth to address
              connectivity, collaboration, and digital execution when those matter
              too.
            </p>
          </div>
        </div>
      </Section>

      <ContextualLinks
        research={relatedResearch}
        solutions={relatedSolutions}
        industries={financialServices ? [financialServices] : []}
      />

      <CTABand
        title="Discuss your CX priorities"
        description="Tell us where your institution is stuck—vendor evaluation, contact center modernization, AI readiness, or operational friction. We will help you find the path forward."
      />
    </>
  );
}
