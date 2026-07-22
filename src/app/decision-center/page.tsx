import Link from "next/link";
import { AssessmentCard } from "@/components/decision-center/AssessmentCard";
import { CTABand } from "@/components/sections/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolCard } from "@/components/tools/ToolCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  getAvailableDecisionCenterAssessments,
  getFeaturedDecisionCenterAssessments,
} from "@/content/decision-center";
import {
  TOOL_HUB_SECTIONS,
  getFeaturedTools,
  getToolsByHubSection,
  tools,
} from "@/content/tools";
import {
  buildBreadcrumbList,
  buildCollectionPage,
  buildSchemaGraph,
} from "@/lib/schema";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Decision Center",
  description:
    "Assessments, calculators, and planning resources that help leadership teams evaluate their environment before vendor selection.",
  path: "/decision-center",
});

export default function DecisionCenterPage() {
  const featuredAssessments = getFeaturedDecisionCenterAssessments();
  const availableAssessments = getAvailableDecisionCenterAssessments();
  const remainingAssessments = availableAssessments.filter(
    (assessment) => !featuredAssessments.some((item) => item.slug === assessment.slug),
  );
  const featuredTools = getFeaturedTools();
  const featuredToolSlugs = new Set(featuredTools.map((tool) => tool.slug));
  const interactiveCount = availableAssessments.length + tools.length;

  return (
    <>
      <JsonLd
        data={buildSchemaGraph([
          buildCollectionPage({
            name: "Decision Center",
            description:
              "Assessments, calculators, and planning resources that help leadership teams evaluate their environment before vendor selection.",
            path: "/decision-center",
          }),
          buildBreadcrumbList([
            { name: "Home", path: "/" },
            { name: "Decision Center", path: "/decision-center" },
          ]),
        ])}
      />
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f4_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <Container className="relative">
          <p className="text-sm font-semibold uppercase tracking-wider text-crimson">
            Decision Center
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-ink md:text-5xl lg:text-6xl">
            Assess, calculate, and prepare before vendor selection
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-muted md:text-xl">
            The Decision Center holds interactive assessments, calculators, and
            planning resources that help you evaluate your current environment
            before engaging vendors.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-ink-muted">
            <span className="rounded-full border border-stone-200 bg-white px-4 py-2">
              {interactiveCount} interactive resource
              {interactiveCount === 1 ? "" : "s"}
            </span>
            <Link
              href="/research"
              className="rounded-full border border-stone-200 bg-white px-4 py-2 font-medium text-crimson hover:border-crimson/30"
            >
              Browse research →
            </Link>
          </div>
        </Container>
      </section>

      <Section variant="muted">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-crimson">
              How it fits
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              Research explains the decision. The Decision Center helps you evaluate your situation.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Use assessments and calculators to score operational friction,
              quantify risk or savings, and prepare decision inputs. Then use
              Research guides for context, criteria, and tradeoffs.
            </p>
          </div>
        </Container>
      </Section>

      {featuredAssessments.length > 0 || featuredTools.length > 0 ? (
        <Section>
          <Container>
            <p className="text-sm font-semibold uppercase tracking-wider text-crimson">
              Start here
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              Featured resources
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {featuredAssessments.map((assessment) => (
                <AssessmentCard
                  key={assessment.slug}
                  assessment={assessment}
                  featured
                />
              ))}
              {featuredTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {remainingAssessments.length > 0 ? (
        <Section variant="muted">
          <Container>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              More assessments
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
              Structured diagnostics that surface friction, readiness gaps, and
              modernization priorities before vendor evaluation.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {remainingAssessments.map((assessment) => (
                <AssessmentCard key={assessment.slug} assessment={assessment} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {TOOL_HUB_SECTIONS.map((section, index) => {
        const sectionTools = getToolsByHubSection(section.id).filter(
          (tool) => !featuredToolSlugs.has(tool.slug),
        );
        if (sectionTools.length === 0) return null;

        return (
          <Section
            key={section.id}
            variant={index % 2 === 0 ? "default" : "muted"}
          >
            <Container>
              <h2 className="text-2xl font-semibold tracking-tight text-ink">
                {section.title}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
                {section.description.replace(/ — /g, ". ").replace(/—/g, ". ")}
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
        title="Need help interpreting results"
        description="Share your assessment scores or calculator outputs. Scott can help validate assumptions and turn them into decision criteria."
        primaryLabel="Schedule a Conversation"
        primaryHref="/contact"
        secondaryLabel="Browse Research"
        secondaryHref="/research"
      />
    </>
  );
}
