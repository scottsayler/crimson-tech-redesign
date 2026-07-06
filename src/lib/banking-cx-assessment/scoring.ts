import { ASSESSMENT_AREAS } from "./areas";
import {
  AI_READINESS_SECTION,
  EXECUTIVE_ALIGNMENT_SECTION,
  GOVERNANCE_SECTION,
} from "./sections";
import type {
  AreaScore,
  AssessmentResponses,
  AssessmentScores,
  AssessmentSubmission,
  QuestionScore,
  TechnologyProfile,
} from "./types";

export function calculateAreaScores(
  responses: AssessmentResponses
): AreaScore[] {
  return ASSESSMENT_AREAS.map((area) => ({
    areaId: area.id,
    areaName: area.name,
    score: roundScore(averageScores(area.questions.map((q) => responses[q.id]))),
    questionCount: area.questions.length,
  }));
}

export function calculateCxFrictionScore(responses: AssessmentResponses): number {
  const scores = ASSESSMENT_AREAS.flatMap((area) =>
    area.questions.map((q) => responses[q.id])
  ).filter((v): v is number => typeof v === "number");

  return roundScore(averageScores(scores));
}

export function calculateSectionScore(
  responses: AssessmentResponses,
  questionIds: string[]
): number {
  const scores = questionIds
    .map((id) => responses[id])
    .filter((v): v is number => typeof v === "number");

  return roundScore(averageScores(scores));
}

export function calculateGovernanceScore(responses: AssessmentResponses): number {
  return calculateSectionScore(
    responses,
    GOVERNANCE_SECTION.questions.map((q) => q.id)
  );
}

export function calculateAiReadinessScore(
  responses: AssessmentResponses
): number {
  return calculateSectionScore(
    responses,
    AI_READINESS_SECTION.questions.map((q) => q.id)
  );
}

export function calculateExecutiveAlignmentScore(
  responses: AssessmentResponses
): number {
  return calculateSectionScore(
    responses,
    EXECUTIVE_ALIGNMENT_SECTION.questions.map((q) => q.id)
  );
}

export function calculateTechnologyComplexityScore(
  technology: TechnologyProfile
): number {
  const envScores: Record<string, number> = {
    mostly_siloed: 5,
    partially_integrated: 3.5,
    mostly_unified: 2,
    realtime_unified: 1,
  };

  let score = technology.dataEnvironment
    ? (envScores[technology.dataEnvironment] ?? 3)
    : 3;

  const notSureCount = [
    technology.ccaasPlatform,
    technology.crmPlatform,
    technology.corePlatform,
  ].filter((v) => v === "not_sure").length;

  score += notSureCount * 0.25;

  const aiCount = technology.aiTechnologies.filter((t) => t !== "none").length;
  if (
    technology.dataEnvironment === "mostly_siloed" &&
    aiCount >= 3
  ) {
    score += 0.5;
  }

  return roundScore(Math.min(score, 5));
}

export function calculateCxMaturityScore(scores: {
  cxFrictionScore: number;
  governanceScore: number;
  aiReadinessScore: number;
  executiveAlignmentScore: number;
  technologyComplexityScore: number;
}): number {
  const frictionInverted = 6 - scores.cxFrictionScore;
  const complexityInverted = 6 - scores.technologyComplexityScore;

  return roundScore(
    (frictionInverted +
      scores.governanceScore +
      scores.aiReadinessScore +
      scores.executiveAlignmentScore +
      complexityInverted) /
      5
  );
}

export function calculateAllScores(
  submission: Pick<AssessmentSubmission, "responses" | "technology">
): AssessmentScores {
  const cxFrictionScore = calculateCxFrictionScore(submission.responses);
  const governanceScore = calculateGovernanceScore(submission.responses);
  const aiReadinessScore = calculateAiReadinessScore(submission.responses);
  const executiveAlignmentScore = calculateExecutiveAlignmentScore(
    submission.responses
  );
  const technologyComplexityScore = calculateTechnologyComplexityScore(
    submission.technology
  );

  const partial = {
    cxFrictionScore,
    governanceScore,
    aiReadinessScore,
    executiveAlignmentScore,
    technologyComplexityScore,
  };

  return {
    ...partial,
    cxMaturityScore: calculateCxMaturityScore(partial),
  };
}

export function getHighestFrictionAreas(
  areaScores: AreaScore[],
  limit = 3
): AreaScore[] {
  return [...areaScores].sort((a, b) => b.score - a.score).slice(0, limit);
}

export function getLowestScoringQuestions(
  responses: AssessmentResponses,
  questions: { id: string; text: string }[],
  limit = 3
): QuestionScore[] {
  return questions
    .map((q) => ({
      questionId: q.id,
      text: q.text,
      score: responses[q.id] ?? 0,
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, limit);
}

export function getFrictionLevel(score: number): {
  label: string;
  description: string;
  colorClass: string;
  bgClass: string;
} {
  if (score <= 2) {
    return {
      label: "Low",
      description: "Friction is manageable with targeted improvements.",
      colorClass: "text-emerald-700",
      bgClass: "bg-emerald-500",
    };
  }
  if (score <= 3) {
    return {
      label: "Moderate",
      description: "Noticeable friction that warrants journey-level attention.",
      colorClass: "text-amber-700",
      bgClass: "bg-amber-400",
    };
  }
  if (score <= 4) {
    return {
      label: "High",
      description: "Significant customer pain — prioritize for remediation.",
      colorClass: "text-orange-700",
      bgClass: "bg-orange-500",
    };
  }
  return {
    label: "Severe",
    description: "Systemic friction requiring executive-level intervention.",
    colorClass: "text-crimson",
    bgClass: "bg-crimson",
  };
}

export function getCapabilityLevel(score: number): {
  label: string;
  description: string;
  colorClass: string;
} {
  if (score >= 4) {
    return {
      label: "Strong",
      description: "Solid foundation in this dimension.",
      colorClass: "text-emerald-700",
    };
  }
  if (score >= 3) {
    return {
      label: "Developing",
      description: "Progress underway but gaps remain.",
      colorClass: "text-amber-700",
    };
  }
  return {
    label: "Needs Attention",
    description: "Significant gaps that may limit CX outcomes.",
    colorClass: "text-crimson",
  };
}

export function getHeatmapIntensity(score: number): string {
  if (score <= 1.5) return "bg-emerald-100 border-emerald-200 text-emerald-800";
  if (score <= 2.5) return "bg-emerald-50 border-emerald-200 text-emerald-900";
  if (score <= 3) return "bg-amber-50 border-amber-200 text-amber-900";
  if (score <= 3.5) return "bg-amber-100 border-amber-300 text-amber-900";
  if (score <= 4) return "bg-orange-100 border-orange-300 text-orange-900";
  if (score <= 4.5) return "bg-red-100 border-red-300 text-red-900";
  return "bg-crimson-100 border-crimson-300 text-crimson-900";
}

export function validateResponses(
  responses: AssessmentResponses,
  requiredIds: string[]
): { valid: boolean; missing: string[] } {
  const missing = requiredIds.filter((id) => {
    const value = responses[id];
    return typeof value !== "number" || value < 1 || value > 5;
  });

  return { valid: missing.length === 0, missing };
}

function averageScores(scores: (number | undefined)[]): number {
  const valid = scores.filter((v): v is number => typeof v === "number");
  if (valid.length === 0) return 0;
  return valid.reduce((sum, s) => sum + s, 0) / valid.length;
}

function roundScore(score: number): number {
  return Math.round(score * 100) / 100;
}
