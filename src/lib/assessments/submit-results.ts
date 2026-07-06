import type { AssessmentResults } from "./types";

export type AssessmentResultsSubmission = {
  assessmentId: string;
  assessmentName: string;
  results: AssessmentResults;
  durationSeconds?: number;
  name?: string;
  email?: string;
  organization?: string;
};

function buildHighFrictionAreas(results: AssessmentResults, isFriction: boolean): string[] {
  const sorted = [...results.categoryScores].sort((a, b) =>
    isFriction ? b.score - a.score : a.score - b.score
  );

  return sorted.slice(0, 3).map((item) => item.label);
}

function buildStrengthLabels(results: AssessmentResults): string[] {
  return results.strengths.map((item) => item.label);
}

export async function submitAssessmentResults({
  assessmentId,
  assessmentName,
  results,
  durationSeconds,
  name,
  email,
  organization,
  scoreMode = "maturity",
}: AssessmentResultsSubmission & { scoreMode?: "maturity" | "friction" }): Promise<void> {
  const journeyScores = Object.fromEntries(
    results.categoryScores.map((item) => [item.label, item.score])
  );

  const payload = {
    assessmentId,
    assessmentName,
    overallScore: results.overallScore,
    maturityLevel: results.maturityLevel,
    journeyScores,
    highFrictionAreas: buildHighFrictionAreas(results, scoreMode === "friction"),
    strengths: buildStrengthLabels(results),
    durationSeconds,
    timestamp: new Date().toISOString(),
    name,
    email,
    organization,
  };

  try {
    const response = await fetch("/api/assessment-results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn("Assessment results submission failed:", response.status);
    }
  } catch (error) {
    console.warn("Assessment results submission failed:", error);
  }
}
