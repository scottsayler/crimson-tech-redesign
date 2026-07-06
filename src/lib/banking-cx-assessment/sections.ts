import type { QuestionSection } from "./types";

export const GOVERNANCE_SECTION: QuestionSection = {
  id: "governance",
  name: "Governance",
  description:
    "How your institution governs customer experience across departments and journeys.",
  questions: [
    {
      id: "governance_q1",
      text: "There is clear executive ownership of customer experience.",
    },
    {
      id: "governance_q2",
      text: "Customer journey performance is reviewed across departments.",
    },
    {
      id: "governance_q3",
      text: "Customer feedback drives technology and process improvements.",
    },
    {
      id: "governance_q4",
      text: "Major customer journeys have documented owners.",
    },
    {
      id: "governance_q5",
      text: "Customer experience metrics are shared across departments.",
    },
  ],
};

export const AI_READINESS_SECTION: QuestionSection = {
  id: "ai_readiness",
  name: "AI Readiness",
  description:
    "Your institution's readiness to adopt AI and automation in customer-facing operations.",
  questions: [
    {
      id: "ai_readiness_q1",
      text: "Our customer data is reliable enough to support AI initiatives.",
    },
    {
      id: "ai_readiness_q2",
      text: "Customer information is accessible across systems when needed.",
    },
    {
      id: "ai_readiness_q3",
      text: "We have defined governance for AI usage.",
    },
    {
      id: "ai_readiness_q4",
      text: "Employees can easily find information needed to help customers.",
    },
    {
      id: "ai_readiness_q5",
      text: "We have a clear roadmap for AI and automation investments.",
    },
  ],
};

export const EXECUTIVE_ALIGNMENT_SECTION: QuestionSection = {
  id: "executive_alignment",
  name: "Executive Alignment",
  description:
    "Leadership alignment on customer experience as a strategic priority.",
  questions: [
    {
      id: "executive_q1",
      text: "Customer experience is a strategic priority for leadership.",
    },
    {
      id: "executive_q2",
      text: "Technology investments are aligned to customer journey outcomes.",
    },
    {
      id: "executive_q3",
      text: "We can clearly identify our biggest sources of customer friction.",
    },
    {
      id: "executive_q4",
      text: "We can measure the impact of customer experience improvements.",
    },
    {
      id: "executive_q5",
      text: "We have a roadmap for customer experience modernization.",
    },
  ],
};

export const READINESS_SECTIONS = [
  GOVERNANCE_SECTION,
  AI_READINESS_SECTION,
  EXECUTIVE_ALIGNMENT_SECTION,
] as const;
