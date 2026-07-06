import { CTABand } from "@/components/sections/CTABand";
import { ContextualLinks } from "@/components/sections/ContextualLinks";
import { PrincipalAdvisor } from "@/components/sections/PrincipalAdvisor";
import { AdvisorProse } from "@/components/sections/AdvisorProse";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  crimsonCxAudiences,
  crimsonCxContext,
  crimsonCxHero,
  crimsonCxPracticeNote,
  crimsonCxProblems,
  crimsonCxTopics,
} from "@/content/crimson-cx";
import { getIndustry } from "@/content/industries";
import {
  getResearchForPractice,
  getSolutionsForIndustrySlug,
} from "@/lib/relationships";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Crimson CX",
  description:
    "CCaaS evaluations, contact center migrations, and AI adoption for banks and credit unions—with compliance tested before you sign.",
  path: "/crimson-cx",
});

export default function CrimsonCXPage() {
  const relatedResearch = getResearchForPractice("crimson-cx");
  const relatedSolutions = getSolutionsForIndustrySlug("financial-services");
  const financialServices = getIndustry("financial-services");

  return (
    <>
      <Section className="!pb-12" variant="crimson">
        <SectionHeader
          eyebrow="Practice Area · Crimson Technology"
          title="CCaaS, contact centers, and CX technology for banks and credit unions"
        />
        <AdvisorProse prose={crimsonCxHero} className="mt-6 max-w-3xl" />
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-ink">What we see in these evaluations</h2>
            <AdvisorProse prose={crimsonCxContext} className="mt-4" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-ink">Common starting points</h2>
            <ul className="mt-4 space-y-3">
              {crimsonCxProblems.map((problem) => (
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
          title="What we evaluate"
          description="Specific decisions within contact center and CX technology programs."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {crimsonCxTopics.map((topic) => (
            <div
              key={topic}
              className="rounded-lg border border-stone-200 bg-white p-5 text-sm text-ink leading-relaxed"
            >
              {topic}
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-ink">Who we talk to</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {crimsonCxAudiences.map((role) => (
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
            <AdvisorProse prose={crimsonCxPracticeNote} className="mt-4" />
          </div>
        </div>
      </Section>

      <Section variant="muted">
        <PrincipalAdvisor compact />
      </Section>

      <ContextualLinks
        research={relatedResearch}
        solutions={relatedSolutions}
        industries={financialServices ? [financialServices] : []}
      />

      <CTABand
        title="CCaaS renewal, migration, or AI decision coming up?"
        description="Share your timeline and finalists. We will tell you whether we can help."
      />
    </>
  );
}
