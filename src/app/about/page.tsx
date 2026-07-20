import { CTABand } from "@/components/sections/CTABand";
import { ContextualLinks } from "@/components/sections/ContextualLinks";
import { CredibilityBar } from "@/components/sections/CredibilityBar";
import { EngagementStandards } from "@/components/sections/EngagementStandards";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { AdvisorProse } from "@/components/sections/AdvisorProse";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  aboutWhatWeAre,
  engagementFundingFaq,
  engagementTypes,
  founderProfile,
  independenceProof,
  originStory,
} from "@/content/credibility";
import { solutions } from "@/content/solutions";
import { getFeaturedResearch } from "@/lib/relationships";
import { createMetadata } from "@/lib/seo";

const aboutHero = {
  observation:
    "Crimson Technology is led by Scott Sayler and a network of specialists who have guided platform decisions through selection and go-live.",
  whyItMatters:
    "Technology buying decisions affect operations for years and require production experience, not only presentation experience.",
  recommendation:
    "Work with us when you need principal-led evaluation support grounded in documented requirements and a transparent methodology.",
};

export const metadata = createMetadata({
  title: "About",
  description:
    "Scott Sayler—independent technology advisory for UCaaS, CCaaS, connectivity, and contact center evaluations.",
  path: "/about",
});

export default function AboutPage() {
  const featuredResearch = getFeaturedResearch(3);

  return (
    <>
      <Section className="!pb-12">
        <SectionHeader as="h1" eyebrow="About" title="About Crimson Technology" />
        <AdvisorProse prose={aboutHero} className="mt-6 max-w-3xl" />
      </Section>

      <CredibilityBar />

      <Section variant="muted" className="!py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-ink">What we are</h2>
            <AdvisorProse prose={aboutWhatWeAre} className="mt-4" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-ink">How we operate</h2>
            <ul className="mt-4 space-y-3">
              {independenceProof.map((item) => (
                <li key={item} className="flex gap-3 text-ink-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-semibold text-ink">{founderProfile.name}</h2>
            <p className="mt-1 text-ink-muted">{founderProfile.title}</p>
            <AdvisorProse prose={founderProfile.prose} className="mt-6" />
            <AdvisorProse prose={originStory} className="mt-6" />
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-ink">Track record</h3>
            <ul className="mt-4 space-y-3">
              {founderProfile.credentials.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm text-ink-muted leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeader
          title="What you get when you engage us"
          description="Decision-ready deliverables from a principal advisor."
        />
        <EngagementStandards />
      </Section>

      <Section>
        <SectionHeader
          title="How an evaluation runs"
          description="Documented deliverables at each stage."
        />
        <ProcessSteps detailed />
      </Section>

      <Section variant="muted">
        <SectionHeader
          title="Engagement types"
          description="Scoped to the decision in front of you."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {engagementTypes.map((model) => (
            <div
              key={model.title}
              className="rounded-lg border border-stone-200 bg-white p-6"
            >
              <h3 className="text-lg font-semibold text-ink">{model.title}</h3>
              <AdvisorProse
                prose={model.prose}
                compact
                className="mt-2 text-sm"
              />
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          title="Engagement funding"
          description="Independent in how recommendations are made. Flexible in how engagements are funded."
        />
        <dl className="mx-auto mt-8 max-w-3xl space-y-8">
          {engagementFundingFaq.map((item) => (
            <div key={item.question}>
              <dt className="text-lg font-semibold text-ink">{item.question}</dt>
              <dd className="mt-2 text-ink-muted leading-relaxed">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <ContextualLinks research={featuredResearch} solutions={solutions.slice(0, 3)} />

      <CTABand />
    </>
  );
}
