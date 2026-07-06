import type { AssessmentArea } from "./types";
import { READINESS_SECTIONS } from "./sections";

export const ASSESSMENT_AREAS: AssessmentArea[] = [
  {
    id: "account_opening",
    name: "Account Opening",
    description:
      "New account origination across digital, branch, and contact center channels.",
    questions: [
      {
        id: "account_opening_q1",
        text: "Members or customers must repeat identity or eligibility information when switching channels or steps.",
      },
      {
        id: "account_opening_q2",
        text: "Digital account opening frequently stalls or fails before completion.",
      },
      {
        id: "account_opening_q3",
        text: "Application status is unclear to customers and employees alike.",
      },
      {
        id: "account_opening_q4",
        text: "Internal handoffs during account opening cause delays and confusion.",
      },
    ],
  },
  {
    id: "onboarding",
    name: "Onboarding",
    description:
      "First 90 days after account opening — activation, education, and early engagement.",
    questions: [
      {
        id: "onboarding_q1",
        text: "New customers do not receive consistent guidance on digital enrollment, direct deposit, or card activation.",
      },
      {
        id: "onboarding_q2",
        text: "Welcome communications are fragmented across channels and departments.",
      },
      {
        id: "onboarding_q3",
        text: "Early-life servicing requests require customers to repeat information or start over.",
      },
      {
        id: "onboarding_q4",
        text: "No single team owns the end-to-end new customer journey.",
      },
    ],
  },
  {
    id: "everyday_servicing",
    name: "Everyday Servicing",
    description:
      "Routine transactions, balance inquiries, profile updates, and general support.",
    questions: [
      {
        id: "everyday_servicing_q1",
        text: "Employees rely on multiple systems to resolve a single customer request.",
      },
      {
        id: "everyday_servicing_q2",
        text: "Customers cannot complete routine tasks through self-service digital channels.",
      },
      {
        id: "everyday_servicing_q3",
        text: "Prior interaction context is not available when a customer contacts us again.",
      },
      {
        id: "everyday_servicing_q4",
        text: "Agents spend significant time navigating systems rather than helping customers.",
      },
    ],
  },
  {
    id: "fraud_disputes",
    name: "Fraud & Disputes",
    description:
      "Fraud alerts, card blocks, dispute filing, and investigation status.",
    questions: [
      {
        id: "fraud_disputes_q1",
        text: "Customers cannot easily check the status of a fraud or dispute case without calling.",
      },
      {
        id: "fraud_disputes_q2",
        text: "Fraud and servicing teams provide conflicting information to customers.",
      },
      {
        id: "fraud_disputes_q3",
        text: "Provisional credit timelines and dispute outcomes are unclear to customers.",
      },
      {
        id: "fraud_disputes_q4",
        text: "Authentication steps for fraud-related contacts add friction without clear benefit.",
      },
    ],
  },
  {
    id: "lending_lifecycle",
    name: "Lending Lifecycle",
    description:
      "Application, underwriting, closing, servicing, and payoff across loan products.",
    questions: [
      {
        id: "lending_lifecycle_q1",
        text: "Loan application status is opaque — customers call repeatedly for updates.",
      },
      {
        id: "lending_lifecycle_q2",
        text: "Handoffs between origination, underwriting, and servicing lose customer context.",
      },
      {
        id: "lending_lifecycle_q3",
        text: "Post-close servicing requires customers to repeat verification or switch channels unnecessarily.",
      },
      {
        id: "lending_lifecycle_q4",
        text: "Lending conversations are disconnected from the customer's prior relationship history.",
      },
    ],
  },
  {
    id: "payments",
    name: "Payments",
    description:
      "Transfers, bill pay, ACH, wires, and P2P across channels.",
    questions: [
      {
        id: "payments_q1",
        text: "Payment failures or delays are difficult for customers to understand without agent help.",
      },
      {
        id: "payments_q2",
        text: "Limits, holds, and cut-off times are not clearly communicated before customers initiate payments.",
      },
      {
        id: "payments_q3",
        text: "Wire and high-value transfers require excessive manual steps or branch visits.",
      },
      {
        id: "payments_q4",
        text: "Payment status differs depending on which channel the customer uses.",
      },
    ],
  },
  {
    id: "card_services",
    name: "Card Services",
    description:
      "Card issuance, activation, replacement, limits, and rewards.",
    questions: [
      {
        id: "card_services_q1",
        text: "Card replacement or reissue takes longer than customers expect.",
      },
      {
        id: "card_services_q2",
        text: "Digital card controls are limited, unreliable, or difficult to use.",
      },
      {
        id: "card_services_q3",
        text: "Card inquiries require transfers between internal teams or external partners.",
      },
      {
        id: "card_services_q4",
        text: "Rewards and card benefits information is hard for customers and employees to access.",
      },
    ],
  },
  {
    id: "complaints",
    name: "Complaints",
    description:
      "Formal complaints, escalations, and regulatory response workflows.",
    questions: [
      {
        id: "complaints_q1",
        text: "Complaint intake lacks a single system — issues are tracked in email or spreadsheets.",
      },
      {
        id: "complaints_q2",
        text: "Customers do not receive timely updates on complaint resolution status.",
      },
      {
        id: "complaints_q3",
        text: "Root-cause analysis from complaints rarely leads to journey or system improvements.",
      },
      {
        id: "complaints_q4",
        text: "Escalation paths are unclear to front-line staff and customers.",
      },
    ],
  },
  {
    id: "branch_experience",
    name: "Branch Experience",
    description:
      "In-branch servicing, wait times, appointment scheduling, and omnichannel continuity.",
    questions: [
      {
        id: "branch_experience_q1",
        text: "Branch staff cannot see the same customer history available to contact center agents.",
      },
      {
        id: "branch_experience_q2",
        text: "Wait times or appointment availability do not meet customer expectations.",
      },
      {
        id: "branch_experience_q3",
        text: "Customers who start digitally must restart their request when visiting a branch.",
      },
      {
        id: "branch_experience_q4",
        text: "Customers are directed to branches for issues that could be handled digitally or by phone.",
      },
    ],
  },
  {
    id: "retention",
    name: "Retention",
    description:
      "Customer retention, closure prevention, and win-back across channels.",
    questions: [
      {
        id: "retention_q1",
        text: "At-risk customers are identified late — often only when they request account closure.",
      },
      {
        id: "retention_q2",
        text: "Retention efforts are inconsistent across branch, phone, and digital channels.",
      },
      {
        id: "retention_q3",
        text: "Reasons for customer attrition are not systematically captured or analyzed.",
      },
      {
        id: "retention_q4",
        text: "Win-back outreach is generic and not tied to prior customer friction.",
      },
    ],
  },
];

export const TOTAL_JOURNEY_QUESTIONS = ASSESSMENT_AREAS.reduce(
  (sum, area) => sum + area.questions.length,
  0
);

export const TOTAL_READINESS_QUESTIONS = READINESS_SECTIONS.reduce(
  (sum, section) => sum + section.questions.length,
  0
);

export const TOTAL_LIKERT_QUESTIONS =
  TOTAL_JOURNEY_QUESTIONS + TOTAL_READINESS_QUESTIONS;

export function getAllQuestionIds(): string[] {
  const journeyIds = ASSESSMENT_AREAS.flatMap((a) =>
    a.questions.map((q) => q.id)
  );
  const sectionIds = READINESS_SECTIONS.flatMap((s) =>
    s.questions.map((q) => q.id)
  );
  return [...journeyIds, ...sectionIds];
}
