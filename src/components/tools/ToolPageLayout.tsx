import Link from "next/link";
import { ToolEditorial, ToolEditorialFooter } from "@/components/tools/ToolEditorial";
import { ToolInteractive } from "@/components/tools/ToolInteractive";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Tool } from "@/content/tools";

const HUB_SECTION_LABELS: Record<Tool["hubSection"], string> = {
  assessments: "Assessment",
  calculators: "Calculator",
  "planning-tools": "Planning Tool",
  "decision-guides": "Decision Guide",
};

export function ToolPageLayout({ tool }: { tool: Tool }) {
  return (
    <>
      <Section className="!pb-10 md:!pb-12">
        <Container>
          <Link
            href="/tools"
            className="text-sm font-medium text-crimson hover:text-crimson-dark"
          >
            ← Technology Decision Center
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-crimson">
              {HUB_SECTION_LABELS[tool.hubSection]}
            </span>
            <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-ink-muted">
              {tool.completionTime}
            </span>
            {tool.industry ? (
              <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-ink-muted">
                {tool.industry}
              </span>
            ) : null}
          </div>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            {tool.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-ink-muted leading-relaxed">
            {tool.description}
          </p>
          <p className="mt-4 text-sm text-ink-muted">
            <span className="font-medium text-ink">Who it&apos;s for:</span>{" "}
            {tool.audience.join(" · ")}
          </p>
        </Container>
      </Section>

      <ToolEditorial tool={tool} />

      <Section className="!pt-0 !pb-12 md:!pb-16">
        <Container>
          <h2 className="mb-8 text-2xl font-semibold tracking-tight text-ink">
            {tool.interactiveType === "assessment" ? "Assessment" : "Calculator"}
          </h2>
          <ToolInteractive tool={tool} />
        </Container>
      </Section>

      <ToolEditorialFooter tool={tool} />
    </>
  );
}
