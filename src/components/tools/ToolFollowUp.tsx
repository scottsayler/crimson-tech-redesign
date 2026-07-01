import Link from "next/link";
import type { AssessmentPriority } from "@/lib/assessments/types";
import { ExecutiveResources } from "@/components/research/primitives/ExecutiveResources";
import { CTABand } from "@/components/sections/CTABand";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getResearch } from "@/content/research";
import type { Tool } from "@/content/tools";
import {
  getExecutiveResources,
  uniqueExecutiveResources,
} from "@/lib/executive-resources";

type ToolFollowUpProps = {
  tool: Tool;
  assessmentPriorities?: AssessmentPriority[];
};

function uniquePriorities(items: AssessmentPriority[]): AssessmentPriority[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  });
}

export function ToolFollowUp({ tool, assessmentPriorities = [] }: ToolFollowUpProps) {
  const researchItems = tool.relatedResearch
    .map((slug) => getResearch(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const priorityLinks =
    assessmentPriorities.length > 0
      ? uniquePriorities(assessmentPriorities).map((priority) => ({
          href: priority.href,
          title: priority.title,
          description: priority.reason,
        }))
      : researchItems.map((item) => ({
          href: `/research/${item.slug}`,
          title: item.title,
          description: item.excerpt,
        }));

  const executiveResources = uniqueExecutiveResources(
    researchItems.flatMap((item) => getExecutiveResources(item))
  );

  return (
    <>
      <Section className="!pt-12 md:!pt-16">
        <SectionHeader
          eyebrow="Next steps"
          title="Recommended research"
          description="Continue with guides matched to your results and decision context."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {priorityLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col rounded-lg border border-stone-200 bg-white p-5 transition-all hover:border-crimson/30 hover:shadow-md"
            >
              <h3 className="text-base font-semibold text-ink group-hover:text-crimson">
                {link.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-ink-muted leading-relaxed line-clamp-3">
                {link.description}
              </p>
              <span className="mt-4 text-sm font-medium text-crimson">Continue →</span>
            </Link>
          ))}
        </div>
      </Section>

      {executiveResources.length > 0 ? (
        <Section variant="muted" className="!py-12 md:!py-16">
          <ExecutiveResources resources={executiveResources} />
        </Section>
      ) : null}

      <CTABand
        title="Talk with Scott"
        description="Share what you learned from this tool. We will help you validate assumptions, prioritize next steps, and decide whether independent advisory makes sense for your situation."
        primaryLabel="Schedule a Conversation"
        primaryHref="/contact"
      />
    </>
  );
}
