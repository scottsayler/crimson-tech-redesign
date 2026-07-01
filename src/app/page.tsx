import Link from "next/link";
import { CTABand } from "@/components/sections/CTABand";
import { ResearchCard } from "@/components/sections/ResearchCard";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { industries } from "@/content/industries";
import { solutions } from "@/content/solutions";
import { getFeaturedResearch } from "@/lib/relationships";

const missionGaps = [
  "The real business problem",
  "Organizational readiness",
  "Integration impacts",
  "Long-term operational complexity",
];

const capabilities = [
  {
    title: "Advisory",
    description:
      "Independent guidance for evaluating technology strategy, vendors, and long-term investments.",
    href: "/solutions",
    cta: "Explore advisory",
  },
  {
    title: "Research",
    description:
      "Crimson Signal Research provides buying guides, problem libraries, industry insights, technology evaluations, and decision frameworks.",
    href: "/research",
    cta: "Explore research",
  },
  {
    title: "Execution",
    description:
      "When implementation is needed, we help connect organizations with trusted technology partners while remaining focused on the client's outcomes.",
    href: "/contact",
    cta: "Talk with us",
  },
];

const differentiators = [
  {
    title: "Independent",
    description:
      "No vendor commissions. No platform bias. Advice aligned to your outcomes.",
  },
  {
    title: "Vendor Neutral",
    description:
      "We evaluate options on fit—not on who funds the recommendation.",
  },
  {
    title: "Research Driven",
    description:
      "Published research and decision frameworks inform every engagement.",
  },
  {
    title: "Outcome Focused",
    description:
      "Decisions are measured by operational results, not slide decks or demos.",
  },
];

export default function HomePage() {
  const featuredResearch = getFeaturedResearch(3);

  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f4_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <Container className="relative">
          <p className="text-sm font-semibold uppercase tracking-wider text-crimson">
            Independent Technology Advisory &amp; Research
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-ink md:text-5xl lg:text-6xl">
            Helping Organizations Make Better Technology Decisions
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-ink-muted leading-relaxed md:text-xl">
            Crimson Technology is an independent technology advisory firm helping
            organizations navigate communications, networking, AI, collaboration,
            customer experience, security, and digital infrastructure through
            research, strategic guidance, and vendor-neutral expertise.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/research">Explore Research</Button>
            <Button href="/contact" variant="outline">
              Talk With Us
            </Button>
          </div>
        </Container>
      </section>

      {/* 2. Mission */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader title="Technology decisions shouldn't start with vendors." />
            <p className="text-ink-muted leading-relaxed">
              Organizations often evaluate technology before fully understanding
              what they are solving for. Crimson Technology helps leadership teams
              answer the foundational questions first—so vendor conversations,
              platform selections, and investments follow clarity, not urgency.
            </p>
          </div>
          <ul className="space-y-4">
            {missionGaps.map((gap) => (
              <li
                key={gap}
                className="flex gap-3 rounded-lg border border-stone-200 bg-stone-50 p-4"
              >
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-crimson" />
                <span className="text-ink leading-relaxed">{gap}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 3. Three Capability Cards */}
      <Section variant="muted">
        <SectionHeader
          eyebrow="How we help"
          title="Advisory, research, and execution—connected"
          description="Authority through research. Clarity through advisory. Progress through trusted partners when implementation is required."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {capabilities.map((capability) => (
            <Link
              key={capability.title}
              href={capability.href}
              className="group flex flex-col rounded-lg border border-stone-200 bg-white p-6 transition-all hover:border-crimson/30 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-ink group-hover:text-crimson">
                {capability.title}
              </h3>
              <p className="mt-3 flex-1 text-sm text-ink-muted leading-relaxed">
                {capability.description}
              </p>
              <span className="mt-4 text-sm font-medium text-crimson">
                {capability.cta} →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 4. Featured Research */}
      <Section>
        <SectionHeader
          eyebrow="Crimson Signal Research"
          title="Featured research"
          description="Buying guides, decision frameworks, and technology analysis to inform your next move."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredResearch.map((item) => (
            <ResearchCard key={item.slug} item={item} />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href="/research">Explore Research</Button>
          <Link
            href="/research"
            className="text-sm font-medium text-crimson hover:text-crimson-dark"
          >
            View all research →
          </Link>
        </div>
      </Section>

      {/* 5. Areas of Expertise */}
      <Section variant="muted">
        <SectionHeader
          eyebrow="Advisory expertise"
          title="Areas of expertise"
          description="Vendor-neutral guidance across the technology domains where organizations face the hardest decisions."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <ServiceCard key={solution.slug} service={solution} />
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/solutions"
            className="text-sm font-medium text-crimson hover:text-crimson-dark"
          >
            View all advisory areas →
          </Link>
        </div>
      </Section>

      {/* 6. Industries */}
      <Section>
        <SectionHeader
          eyebrow="Industries"
          title="Sector context matters"
          description="Technology decisions play out differently across industries. We bring sector-specific perspective to every engagement."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group rounded-lg border border-stone-200 bg-white p-6 transition-all hover:border-crimson/30 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-ink group-hover:text-crimson">
                {industry.title}
              </h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                {industry.shortDescription}
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-crimson">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/industries"
            className="text-sm font-medium text-crimson hover:text-crimson-dark"
          >
            View all industries →
          </Link>
        </div>
      </Section>

      {/* 7. Why Crimson Technology */}
      <Section variant="muted">
        <SectionHeader
          title="Why Crimson Technology"
          description="Built for executives who need independent perspective—not another vendor pitch."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-stone-200 bg-white p-6"
            >
              <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 8. Final CTA */}
      <CTABand
        title="Let's make your next technology decision your best one."
        description=""
        primaryLabel="Start a Conversation"
        primaryHref="/contact"
        secondaryLabel="Explore Research"
        secondaryHref="/research"
      />
    </>
  );
}
