export type AssessmentCategory =
  | "customer-experience"
  | "communications"
  | "ai-readiness"
  | "infrastructure"
  | "vendor-evaluation";

export type DecisionCenterAssessment = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: AssessmentCategory;
  completionTime: string;
  audience: string[];
  industries: string[];
  practiceSlug?: string;
  relatedProjectSlugs?: string[];
  featured?: boolean;
  available: boolean;
};

export const ASSESSMENT_CATEGORY_LABELS: Record<AssessmentCategory, string> = {
  "customer-experience": "Customer Experience",
  communications: "Communications",
  "ai-readiness": "AI Readiness",
  infrastructure: "Infrastructure",
  "vendor-evaluation": "Vendor Evaluation",
};

export const decisionCenterAssessments: DecisionCenterAssessment[] = [
  {
    slug: "banking-cx-friction-assessment",
    title: "Banking CX Friction Assessment",
    subtitle:
      "Evaluate operational friction across ten customer journeys before CCaaS, CRM, or AI investments.",
    description:
      "A structured diagnostic for banks and credit unions. Score friction across account opening, digital banking, card services, lending, fraud, and escalation paths—then prioritize modernization based on where customers and agents lose time.",
    category: "customer-experience",
    completionTime: "12–15 min",
    audience: ["CIO", "COO", "VP Customer Experience", "Contact Center Leaders"],
    industries: ["financial-services"],
    practiceSlug: "crimson-cx",
    relatedProjectSlugs: ["contact-center-transformation", "ai-workflow-modernization"],
    featured: true,
    available: true,
  },
];

export function getDecisionCenterAssessment(slug: string): DecisionCenterAssessment | undefined {
  return decisionCenterAssessments.find((item) => item.slug === slug);
}

export function getFeaturedDecisionCenterAssessments(): DecisionCenterAssessment[] {
  return decisionCenterAssessments.filter((item) => item.featured && item.available);
}

export function getAvailableDecisionCenterAssessments(): DecisionCenterAssessment[] {
  return decisionCenterAssessments.filter((item) => item.available);
}
