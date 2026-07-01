import Link from "next/link";
import { ToolEditorial, ToolEditorialFooter } from "@/components/tools/ToolEditorial";
import { ToolInteractive } from "@/components/tools/ToolInteractive";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ContentBadge } from "@/components/ui/ContentBadge";
import type { Tool } from "@/content/tools";
import {
  contentBadgeLabels,
  getToolBadgeLabel,
  getToolCompletionTime,
} from "@/lib/content-badges";

export function ToolPageLayout({ tool }: { tool: Tool }) {
  const interactiveLabel =
    tool.interactiveType === "assessment"
      ? contentBadgeLabels.assessment
      : contentBadgeLabels.calculator;

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
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
            <ContentBadge
              label={getToolBadgeLabel(tool)}
              completionTime={getToolCompletionTime(tool)}
            />
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
            {interactiveLabel}
          </h2>
          <ToolInteractive tool={tool} />
        </Container>
      </Section>

      <ToolEditorialFooter tool={tool} />
    </>
  );
}
