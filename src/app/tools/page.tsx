import Link from "next/link";
import { ToolCard } from "@/components/tools/ToolCard";
import { CTABand } from "@/components/sections/CTABand";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  TOOL_HUB_SECTIONS,
  getFeaturedTools,
  getToolsByHubSection,
  tools,
} from "@/content/tools";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Technology Decision Center",
  description:
    "Interactive calculators and assessments for multi-location restaurant operators — quantify outage risk, score network readiness, and prioritize infrastructure investments.",
  path: "/tools",
});

export default function ToolsPage() {
  const featured = getFeaturedTools();

  return (
    <>
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f4_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <Container className="relative">
          <p className="text-sm font-semibold uppercase tracking-wider text-crimson">
            Technology Decision Center
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-ink md:text-5xl lg:text-6xl">
            Interactive tools for smarter technology decisions
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-ink-muted leading-relaxed md:text-xl">
            Quantify outage impact, score network maturity, and turn research into
            actionable next steps — built for restaurant operators, IT leaders, and
            finance teams evaluating infrastructure investments.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-ink-muted">
            <span className="rounded-full border border-stone-200 bg-white px-4 py-2">
              {tools.length} tools available
            </span>
            <Link
              href="/research"
              className="rounded-full border border-stone-200 bg-white px-4 py-2 font-medium text-crimson hover:border-crimson/30"
            >
              Browse Crimson Signal research →
            </Link>
          </div>
        </Container>
      </section>

      {featured.length > 0 ? (
        <Section variant="muted">
          <Container>
            <p className="text-sm font-semibold uppercase tracking-wider text-crimson">
              Start here
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              Featured decision tools
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {featured.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {TOOL_HUB_SECTIONS.map((section) => {
        const sectionTools = getToolsByHubSection(section.id);
        if (sectionTools.length === 0) return null;

        return (
          <Section key={section.id} variant={section.id === "calculators" ? "default" : "muted"}>
            <Container>
              <h2 className="text-2xl font-semibold tracking-tight text-ink">{section.title}</h2>
              <p className="mt-3 max-w-2xl text-base text-ink-muted leading-relaxed">
                {section.description}
              </p>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sectionTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </Container>
          </Section>
        );
      })}

      <CTABand
        title="Need help interpreting the results?"
        description="We help multi-location operators validate assumptions, prioritize investments, and make defensible technology decisions."
      />
    </>
  );
}
