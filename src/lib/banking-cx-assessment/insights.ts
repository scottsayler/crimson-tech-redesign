import type { AreaScore, AssessmentScores, QuestionScore } from "./types";

const JOURNEY_THEMES: Record<string, string[]> = {
  account_opening: ["Context Loss", "Organizational Fragmentation"],
  onboarding: ["Journey Ownership", "Organizational Fragmentation"],
  everyday_servicing: [
    "Agent Swivel Chair",
    "Context Loss",
    "Siloed Data",
  ],
  fraud_disputes: ["Siloed Data", "Batch Latency", "Context Loss"],
  lending_lifecycle: [
    "Organizational Fragmentation",
    "Context Loss",
    "Batch Latency",
  ],
  payments: ["Batch Latency", "Siloed Data"],
  card_services: ["Agent Swivel Chair", "Organizational Fragmentation"],
  complaints: ["Journey Ownership", "Organizational Fragmentation"],
  branch_experience: ["Context Loss", "Siloed Data"],
  retention: ["Journey Ownership", "Organizational Fragmentation"],
};

export function generatePriorityAreas(
  scores: AssessmentScores,
  topFriction: AreaScore[],
  governanceGaps: QuestionScore[],
  aiReadinessGaps: QuestionScore[]
): string[] {
  const priorities: string[] = [];

  for (const area of topFriction) {
    const themes = JOURNEY_THEMES[area.areaId] ?? ["Customer Friction"];
    priorities.push(
      `${area.areaName}: Elevated friction suggests ${themes.join(", ").toLowerCase()} may be limiting this journey. Focus on end-to-end ownership and data continuity before adding new capabilities.`
    );
  }

  for (const gap of governanceGaps.slice(0, 2)) {
    priorities.push(
      `Governance gap: "${truncate(gap.text)}" scored ${gap.score.toFixed(1)}/5. Strengthen cross-functional journey governance and shared accountability before major technology decisions.`
    );
  }

  if (scores.aiReadinessScore < 3.5 && aiReadinessGaps.length > 0) {
    priorities.push(
      `AI readiness: "${truncate(aiReadinessGaps[0].text)}" indicates foundational gaps. Address data reliability, knowledge access, and AI governance before expanding automation investments.`
    );
  }

  if (scores.technologyComplexityScore >= 4) {
    priorities.push(
      "Technology complexity: A siloed or partially integrated data environment increases integration risk across CCaaS, CRM, and core systems. Prioritize data unification and real-time context before layering new tools."
    );
  }

  if (scores.executiveAlignmentScore < 3.5) {
    priorities.push(
      "Executive alignment: Leadership may not share a common view of friction sources or CX modernization priorities. Align on journey outcomes and measurement before committing to platform changes."
    );
  }

  if (scores.cxMaturityScore >= 4) {
    priorities.push(
      "Your institution shows relative strength across friction, governance, and readiness dimensions. Focus on sustaining momentum in your highest-friction journeys rather than broad platform changes."
    );
  }

  return priorities.slice(0, 6);
}

function truncate(text: string, max = 80): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 3) + "...";
}

export function getAiReadinessNarrative(score: number): string {
  if (score >= 4) {
    return "Your institution shows strong foundational readiness for AI and automation. Focus on prioritizing use cases tied to your highest-friction journeys rather than broad deployment.";
  }
  if (score >= 3) {
    return "AI readiness is developing. Data access, employee knowledge tools, and governance should be strengthened in parallel with any AI expansion.";
  }
  return "AI readiness gaps may limit the impact of automation investments. Address siloed data, knowledge access, and governance before scaling AI initiatives.";
}
