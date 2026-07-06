import type { AdvisorProse } from "./prose";
import { proseToText } from "./prose";

export type Project = {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  prose: AdvisorProse;
  description: string;
  highlights: string[];
  outcomes?: string[];
  externalUrl?: string;
  featured?: boolean;
};

function project(
  data: Omit<Project, "description"> & { prose: AdvisorProse },
): Project {
  return { ...data, description: proseToText(data.prose) };
}

export const projects: Project[] = [
  project({
    slug: "cfbverdict",
    title: "CFBVerdict",
    category: "Digital Product",
    shortDescription:
      "A live sports analytics platform built to demonstrate end-to-end product delivery.",
    prose: {
      observation:
        "CFBVerdict was developed as a production platform with its own data pipeline, analytics layer, and customer-facing application.",
      whyItMatters:
        "Live product delivery demonstrates implementation capability beyond advisory deliverables.",
      recommendation:
        "Use CFBVerdict as a reference point for architecture discipline and production execution approach.",
    },
    highlights: [
      "Product strategy and positioning defined before build",
      "Data architecture built for production ingestion volumes",
      "Customer-facing application deployed and operating",
      "Same leadership team across advisory and product delivery",
    ],
    outcomes: [
      "Live platform at cfbverdict.com with active users",
      "End-to-end pipeline from ingestion to analytics and UI",
      "Demonstrated advisory-to-execution capability",
    ],
    externalUrl: "https://cfbverdict.com",
    featured: true,
  }),
  project({
    slug: "vendor-evaluation-advisory",
    title: "Multi-Location Vendor Evaluation",
    category: "Advisory Engagement",
    shortDescription:
      "UCaaS selection aligned between IT and operations for a multi-location operator.",
    prose: {
      observation:
        "The client had three UCaaS proposals and different priorities between IT and operations teams.",
      whyItMatters:
        "Without a shared decision framework, renewal deadlines increase selection risk and internal conflict.",
      recommendation:
        "Adopt a weighted scoring model and select the platform with the strongest integration fit.",
    },
    highlights: [
      "Requirements approved by IT and operations before demos",
      "Demo scripts based on real call flows",
      "Weighted scoring tied to operational priorities",
      "Contract review for renewal and services terms",
    ],
    outcomes: [
      "Finalist list reduced from five to two in six weeks",
      "Scoring model adopted for future evaluations",
      "Platform selected on CRM integration fit",
    ],
  }),
  project({
    slug: "contact-center-transformation",
    title: "Contact Center Modernization",
    category: "CX Transformation",
    shortDescription:
      "Legacy ACD to CCaaS migration planned to protect peak-period service levels.",
    prose: {
      observation:
        "The contact center was operating on legacy ACD and WFM tools while evaluating multiple CCaaS options.",
      whyItMatters:
        "A direct cutover during peak season would have created service disruption and agent instability.",
      recommendation:
        "Execute a phased migration plan based on agent desktop fit and pre-contract WFM integration scope.",
    },
    highlights: [
      "Operational assessment focused on agent workflow friction",
      "CCaaS shortlist based on desktop and WFM integration",
      "Phased cutover windows with rollback planning",
      "WFM requirements included before contract execution",
    ],
    outcomes: [
      "Vendor list narrowed from five to two using fit scoring",
      "Migration schedule aligned to low-risk operational windows",
      "WFM integration scope defined in contract terms",
    ],
  }),
  project({
    slug: "ai-workflow-modernization",
    title: "AI Workflow Modernization",
    category: "AI & Workflow",
    shortDescription:
      "AI program refocused from multiple pilots to one production workflow.",
    prose: {
      observation:
        "The organization had four AI initiatives active, but none had completed compliance review for production deployment.",
      whyItMatters:
        "Continuing broad pilot expansion would increase spend without improving daily operations.",
      recommendation:
        "Prioritize one high-impact use case, approve governance criteria, and deploy it to production first.",
    },
    highlights: [
      "Pilot portfolio reviewed for usage and feasibility",
      "Use cases prioritized by impact and approval path",
      "Governance framework approved by legal and compliance",
      "First production workflow launched within engagement timeline",
    ],
    outcomes: [
      "Pilot scope reduced and reprioritized",
      "Governance model adopted for future AI initiatives",
      "After-call summarization deployed for contact center agents",
    ],
  }),
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
