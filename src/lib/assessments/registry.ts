import type { AssessmentDefinition } from "@/lib/assessments/types";
import { networkAssessment } from "@/content/assessments/network-assessment";

const assessments: AssessmentDefinition[] = [networkAssessment];

const byToolSlug = new Map(assessments.map((item) => [item.toolSlug, item]));

export function getAllAssessments(): AssessmentDefinition[] {
  return assessments;
}

export function getAssessmentByToolSlug(toolSlug: string): AssessmentDefinition | undefined {
  return byToolSlug.get(toolSlug);
}
