import type { AssessmentResult } from "./types";

export const ASSESSMENT_RESULT_KEY = "crimson-tech:banking-cx-assessment-result";

export function saveAssessmentResult(result: AssessmentResult): void {
  sessionStorage.setItem(ASSESSMENT_RESULT_KEY, JSON.stringify(result));
}

export function loadAssessmentResult(): AssessmentResult | null {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem(ASSESSMENT_RESULT_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AssessmentResult;
  } catch {
    return null;
  }
}

export function clearAssessmentResult(): void {
  sessionStorage.removeItem(ASSESSMENT_RESULT_KEY);
}
