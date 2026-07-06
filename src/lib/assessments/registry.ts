import type { AssessmentDefinition } from "@/lib/assessments/types";
import { networkAssessment } from "@/content/assessments/network-assessment";

const assessments: AssessmentDefinition[] = [networkAssessment];

const bySlug = new Map(
  assessments
    .filter((item) => item.slug)
    .map((item) => [item.slug as string, item])
);

const byToolSlug = new Map(
  assessments
    .filter((item) => item.toolSlug)
    .map((item) => [item.toolSlug as string, item])
);

export function getAllAssessments(): AssessmentDefinition[] {
  return assessments;
}

export function getAssessmentBySlug(slug: string): AssessmentDefinition | undefined {
  return bySlug.get(slug);
}

export function getAssessmentByToolSlug(toolSlug: string): AssessmentDefinition | undefined {
  return byToolSlug.get(toolSlug);
}
