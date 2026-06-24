import Link from "next/link";
import { CTABand } from "@/components/sections/CTABand";
import { InsightCard } from "@/components/sections/InsightCard";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { insights } from "@/content/insights";
import { projects } from "@/content/projects";
import { services } from "@/content/services";

const pillars = [
  {
    title: "Problem first",
    description:
      "We start with the business and operational reality, not a product catalog.",
  },
  {
    title: "Vendor fit, not vendor favor",
    description:
      "We help you compare options honestly and avoid expensive mismatches.",
  },
  {
    title: "Implementation realism",
    description:
      "We clarify what rollout, integration, and adoption actually require.",
  },
  {
    title: "Defined success",
    description:
      "We align stakeholders on outcomes before contracts and timelines lock in.",
  },
];

const outcomes = [
  "Vendor-neutral guidance grounded in operations, not sales demos",
  "Practical roadmaps that account for people, process, and technology",
  "Hands-on execution when you need more than a slide deck",
];

export default function HomePage() {
  const featuredProjects = [
    ...projects.filter((p) => p.featured),
    ...projects.filter((p) => !p.featured),
  ].slice(0, 3);
  const latestInsights = insights.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f4_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <Container className="relative">
          <p className="text-sm font-semibold uppercase tracking-wider text-crimson">
            Independent Technology Advisory
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-ink md:text-5xl lg:text-6xl">
            Technology decisions are harder than ever.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted leading-relaxed md:text-xl">
            We help organizations evaluate, simplify, modernize, and execute
            technology initiatives—without vendor confusion, platform chaos, or
            endless AI hype.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact">Start a Conversation</Button>
            <Button href="/services" variant="outline">
              Explore Services
            </Button>
          </div>
          <p className="mt-10 text-sm text-ink-muted">
            Technology advisory · AI &amp; workflow automation · Customer experience ·
            Connectivity &amp; infrastructure
          </p>
        </Container>
      </section>

      {/* What We Do */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              title="Clarity before commitment. Execution after the decision."
            />
            <p className="text-ink-muted leading-relaxed">
              Crimson Technology is an independent advisory and digital execution
              partner. We sit at the intersection of strategy, operations, and
              technology—helping leadership teams understand what problem actually
              exists, which options matter, and what it takes to deliver results.
            </p>
            <p className="mt-4 text-ink-muted leading-relaxed">
              Whether you are evaluating communications platforms, modernizing
              infrastructure, exploring AI, improving customer experience, or
              launching a digital product, we turn complexity into a structured
              path forward.
            </p>
          </div>
          <ul className="space-y-4">
            {outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex gap-3 rounded-lg border border-stone-200 bg-stone-50 p-4"
              >
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-crimson" />
                <span className="text-ink leading-relaxed">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Areas of Expertise */}
      <Section variant="muted">
        <SectionHeader
          eyebrow="Where we help"
          title="Areas of expertise"
          description="Broad capability. Focused advice. One accountable partner."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      {/* Crimson CX */}
      <Section variant="crimson">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Flagship Practice"
              title="Crimson CX — customer experience advisory for financial institutions"
            />
            <p className="text-ink-muted leading-relaxed">
              Banks and credit unions face a familiar challenge: more vendors, more
              channels, and more pressure to modernize—while day-to-day operations
              still have to run. Crimson CX helps institutions move from confusion
              and vendor noise to structured decisions on contact centers, AI
              readiness, workflow automation, and operational transformation.
            </p>
            <p className="mt-4 text-sm text-ink-muted">
              Crimson CX is a specialized practice within Crimson Technology—not our
              only focus.
            </p>
            <div className="mt-8">
              <Button href="/crimson-cx">Explore Crimson CX</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              "CCaaS strategy",
              "AI readiness",
              "Workflow automation",
              "Vendor evaluation",
              "CX friction analysis",
              "Contact center transformation",
            ].map((topic) => (
              <div
                key={topic}
                className="rounded-lg border border-crimson/10 bg-white p-4 text-sm font-medium text-ink"
              >
                {topic}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Featured Projects */}
      <Section>
        <SectionHeader
          eyebrow="Proof in execution"
          title="Featured projects"
          description="Advisory work builds confidence. Built products prove we can deliver."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="text-sm font-medium text-crimson hover:text-crimson-dark"
          >
            View all projects →
          </Link>
        </div>
      </Section>

      {/* Why Independent */}
      <Section variant="muted">
        <SectionHeader
          title="We are not tied to a single platform. That is the point."
          description="Our job is to help you avoid expensive technology mistakes—not to sell you another platform."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-lg border border-stone-200 bg-white p-6"
            >
              <h3 className="text-lg font-semibold text-ink">{pillar.title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* How We Work */}
      <Section>
        <SectionHeader
          eyebrow="Our approach"
          title="A disciplined path from uncertainty to outcomes"
        />
        <ProcessSteps />
      </Section>

      {/* Insights */}
      <Section variant="muted">
        <SectionHeader
          eyebrow="Perspectives"
          title="Insights for technology leaders"
          description="Practical thinking on advisory, CX, AI, communications, and execution—without the buzzwords."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestInsights.map((insight) => (
            <InsightCard key={insight.slug} insight={insight} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="/insights" variant="outline">
            View all insights
          </Button>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
