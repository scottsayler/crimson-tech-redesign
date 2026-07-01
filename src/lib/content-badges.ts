import type { Tool, ToolInteractiveType } from "@/content/tools";
import type { Research, ResearchType } from "@/content/research";

export type ContentBadgeKind =
  | ResearchType
  | "calculator"
  | "assessment"
  | "playbook"
  | "executive-brief"
  | "decision-matrix"
  | "executive-checklist"
  | "workbook"
  | "planning-tool";

/** Short labels for badges and chips across the site. */
export const contentBadgeLabels: Record<ContentBadgeKind, string> = {
  "problem-page": "Problem",
  "buying-guide": "Buying Guide",
  "industry-guide": "Industry Guide",
  "technology-guide": "Guide",
  "vendor-comparison": "Comparison",
  "decision-framework": "Decision Guide",
  checklist: "Checklist",
  calculator: "Calculator",
  assessment: "Assessment",
  playbook: "Playbook",
  "executive-brief": "Executive Brief",
  "decision-matrix": "Decision Matrix",
  "executive-checklist": "Executive Checklist",
  workbook: "Workbook",
  "planning-tool": "Planning Tool",
};

/** Preserved hub page titles and SEO metadata — not used on badges. */
export const researchTypeHubTitles: Record<ResearchType, string> = {
  "problem-page": "Problem Page",
  "buying-guide": "Buying Guide",
  "industry-guide": "Industry Guide",
  "technology-guide": "Technology Guide",
  "vendor-comparison": "Vendor Comparison",
  "decision-framework": "Decision Framework",
  checklist: "Checklist",
};

/** @deprecated Use contentBadgeLabels or getResearchBadgeLabel instead. */
export const researchTypeBadgeLabels: Record<ResearchType, string> = {
  "problem-page": contentBadgeLabels["problem-page"],
  "buying-guide": contentBadgeLabels["buying-guide"],
  "industry-guide": contentBadgeLabels["industry-guide"],
  "technology-guide": contentBadgeLabels["technology-guide"],
  "vendor-comparison": contentBadgeLabels["vendor-comparison"],
  "decision-framework": contentBadgeLabels["decision-framework"],
  checklist: contentBadgeLabels.checklist,
};

const researchTypeDefaultMinutes: Record<ResearchType, number> = {
  "problem-page": 6,
  "buying-guide": 8,
  "industry-guide": 10,
  "technology-guide": 8,
  "vendor-comparison": 8,
  "decision-framework": 10,
  checklist: 5,
};

const toolInteractiveDefaultMinutes: Record<ToolInteractiveType, string> = {
  calculator: "2 min",
  assessment: "5 min",
};

export function formatResearchCompletionTime(
  type: ResearchType,
  minutes: number
): string {
  if (type === "checklist") return `${minutes} min`;
  return `${minutes} min read`;
}

export function getResearchBadgeLabel(type: ResearchType): string {
  return contentBadgeLabels[type];
}

export function getResearchCompletionTime(item: Research): string {
  if (item.readingTime) return item.readingTime;
  return getResearchTypeDefaultCompletionTime(item.type);
}

export function getResearchTypeDefaultCompletionTime(type: ResearchType): string {
  return formatResearchCompletionTime(type, researchTypeDefaultMinutes[type]);
}

export function getToolBadgeLabel(tool: Tool): string {
  if (tool.interactiveType === "calculator") return contentBadgeLabels.calculator;
  if (tool.interactiveType === "assessment") return contentBadgeLabels.assessment;
  if (tool.hubSection === "planning-tools") return contentBadgeLabels["planning-tool"];
  if (tool.hubSection === "decision-guides") return contentBadgeLabels["decision-framework"];
  return contentBadgeLabels.calculator;
}

export function getToolCompletionTime(tool: Tool): string {
  return tool.completionTime ?? toolInteractiveDefaultMinutes[tool.interactiveType];
}

export function getContentBadgeLabel(kind: ContentBadgeKind): string {
  return contentBadgeLabels[kind];
}

export function formatContentBadgeText(label: string, completionTime?: string): string {
  if (!completionTime) return label;
  return `${label} • ${completionTime}`;
}
