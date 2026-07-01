import { getResearch, researchTypeLabels } from "@/content/research";
import { getTool } from "@/content/tools";
import type { AssessmentDefinition, AssessmentPriority } from "@/lib/assessments/types";
import { contentBadgeLabels, getToolBadgeLabel } from "@/lib/content-badges";

export type ClassifiedLink = {
  href: string;
  title: string;
  description: string;
  typeLabel?: string;
};

export type ClassifiedRecommendations = {
  nextSteps: ClassifiedLink[];
  research: ClassifiedLink[];
  decisionGuides: ClassifiedLink[];
  tools: ClassifiedLink[];
};

function uniqueLinks(links: ClassifiedLink[]): ClassifiedLink[] {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

function classifyHref(
  href: string,
  title: string,
  description: string
): ClassifiedLink & { bucket: keyof Omit<ClassifiedRecommendations, "nextSteps"> } {
  if (href.startsWith("/tools/")) {
    const slug = href.replace("/tools/", "");
    const tool = getTool(slug);

    return {
      href,
      title,
      description,
      typeLabel: tool ? getToolBadgeLabel(tool) : contentBadgeLabels.calculator,
      bucket: "tools",
    };
  }

  if (href.startsWith("/research/")) {
    const slug = href.replace("/research/", "");
    const item = getResearch(slug);
    const type = item?.type;

    if (type === "decision-framework") {
      return {
        href,
        title,
        description,
        typeLabel: researchTypeLabels[type],
        bucket: "decisionGuides",
      };
    }

    return {
      href,
      title,
      description,
      typeLabel: type ? researchTypeLabels[type] : undefined,
      bucket: "research",
    };
  }

  return {
    href,
    title,
    description,
    bucket: "research",
  };
}

export function classifyRecommendations(
  priorities: AssessmentPriority[]
): ClassifiedRecommendations {
  const nextSteps: ClassifiedLink[] = priorities.map((priority) => ({
    href: priority.href,
    title: priority.title,
    description: priority.reason,
  }));

  const research: ClassifiedLink[] = [];
  const decisionGuides: ClassifiedLink[] = [];
  const tools: ClassifiedLink[] = [];

  for (const priority of priorities) {
    const classified = classifyHref(priority.href, priority.title, priority.reason);
    if (classified.bucket === "tools") tools.push(classified);
    else if (classified.bucket === "decisionGuides") decisionGuides.push(classified);
    else research.push(classified);
  }

  return {
    nextSteps: uniqueLinks(nextSteps),
    research: uniqueLinks(research),
    decisionGuides: uniqueLinks(decisionGuides),
    tools: uniqueLinks(tools),
  };
}

export function buildClassifiedRecommendations(
  definition: AssessmentDefinition,
  priorities: AssessmentPriority[]
): ClassifiedRecommendations {
  const classified = classifyRecommendations(priorities);
  const seen = new Set<string>([
    ...classified.nextSteps.map((item) => item.href),
    ...classified.research.map((item) => item.href),
    ...classified.decisionGuides.map((item) => item.href),
    ...classified.tools.map((item) => item.href),
  ]);

  const research = [...classified.research];
  const decisionGuides = [...classified.decisionGuides];
  const tools = [...classified.tools];

  for (const item of Object.values(definition.relatedContent)) {
    if (seen.has(item.href)) continue;
    seen.add(item.href);

    const link = classifyHref(item.href, item.title, item.description);
    if (link.bucket === "tools") tools.push(link);
    else if (link.bucket === "decisionGuides") decisionGuides.push(link);
    else research.push(link);
  }

  return {
    nextSteps: classified.nextSteps,
    research: uniqueLinks(research),
    decisionGuides: uniqueLinks(decisionGuides),
    tools: uniqueLinks(tools),
  };
}
