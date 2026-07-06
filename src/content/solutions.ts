import type { AdvisorProse } from "./prose";
import { proseToText } from "./prose";

export type Solution = {
  slug: string;
  title: string;
  shortDescription: string;
  prose: AdvisorProse;
  description: string;
  helpsWith: string[];
  typicalSituations: string[];
  evaluationAreas?: string[];
};

function solution(
  data: Omit<Solution, "description"> & { prose: AdvisorProse },
): Solution {
  return { ...data, description: proseToText(data.prose) };
}

export const solutions: Solution[] = [
  solution({
    slug: "technology-advisory",
    title: "Technology Advisory",
    shortDescription:
      "Independent guidance before you sign a contract, renew a platform, or expand an AI program.",
    prose: {
      observation:
        "In most evaluations we join, the team has already seen strong demos—but integration requirements, contract terms, and rollout constraints are still undefined.",
      whyItMatters:
        "Without a shared requirements baseline, stakeholders debate platforms instead of outcomes, and expensive rework shows up after signature.",
      recommendation:
        "Start with a written evaluation framework, then run vendor demos against your real workflows and decision criteria.",
    },
    evaluationAreas: [
      "Connectivity",
      "Managed Networks",
      "SD-WAN",
      "UCaaS",
      "CCaaS",
      "AI Platforms",
      "Workflow Automation",
      "Cloud",
      "Security",
      "Customer Experience Technology",
    ],
    helpsWith: [
      "Vendor scorecards tied to operational requirements",
      "Renewal reviews covering usage, escalators, and alternatives",
      "Executive alignment when IT, operations, and finance see the decision differently",
      "Build vs. buy analysis based on delivery capacity",
      "Contract review for SLAs, services scope, and license true-ups",
    ],
    typicalSituations: [
      "Three finalists selected, but no clear criteria for choosing one",
      "Platform renewal due in 90 days with open questions on fit",
      "AI initiatives active in pilot, but none approved for production",
      "Prior migration overran timeline and budget",
    ],
  }),
  solution({
    slug: "connectivity-infrastructure",
    title: "Connectivity & Infrastructure",
    shortDescription:
      "Carriers, SD-WAN, failover, and managed network contracts reviewed against what runs in your locations.",
    prose: {
      observation:
        "Connectivity issues often begin with inventory gaps: circuits still billing at closed sites, failover paths not tested, and site designs that vary by location.",
      whyItMatters:
        "When inventory and failover are unclear, architecture decisions are made on incomplete data, and outages become harder to prevent.",
      recommendation:
        "Complete a location-by-location audit first, then compare carrier and SD-WAN options against tested failover requirements.",
    },
    helpsWith: [
      "Carrier contract audits mapped to active locations",
      "SD-WAN design reviews against real traffic patterns",
      "Failover testing plans with documented recovery steps",
      "Standardized site templates for multi-location rollouts",
      "Managed vs. self-operated network comparisons based on staffing",
    ],
    typicalSituations: [
      "Peak-hour outages with unclear failover behavior",
      "Renewal cycle with rising costs and poor circuit visibility",
      "New locations opening with inconsistent network designs",
      "Pilot architecture working in lab but not in production sites",
    ],
  }),
  solution({
    slug: "communications-collaboration",
    title: "Communications & Collaboration",
    shortDescription:
      "UCaaS, CCaaS, Teams, and contact center platforms selected on integration fit and rollout readiness.",
    prose: {
      observation:
        "Communications evaluations usually look strong in demo environments, then expose gaps in CRM integration, WFM connectivity, and e911 requirements during implementation.",
      whyItMatters:
        "These gaps drive agent friction, delayed go-live dates, and higher support load after launch.",
      recommendation:
        "Test each finalist against your call flows, integration points, and compliance requirements before final selection.",
    },
    helpsWith: [
      "UCaaS comparisons across Teams, RingCentral, Zoom, Cisco, and similar platforms",
      "CCaaS scoring for agent desktop, WFM, and CRM integration",
      "On-prem to cloud migration plans with rollback options",
      "Teams voice design including PSTN, E911, and routing",
      "Demo scripts written from your operational scenarios",
    ],
    typicalSituations: [
      "PBX end-of-life date set while platform decision remains open",
      "Rising handle times and agent complaints about desktop complexity",
      "Pilot stalled due to unscoped WFM integration",
      "Leadership requesting a realistic migration plan after a prior delay",
    ],
  }),
  solution({
    slug: "ai-workflow-automation",
    title: "AI & Workflow Automation",
    shortDescription:
      "Move AI from pilot discussions to production workflows your teams can operate.",
    prose: {
      observation:
        "Many organizations have multiple AI experiments running, but adoption, governance, and workflow design are not yet aligned for production use.",
      whyItMatters:
        "Without prioritization and governance, AI spend grows while operational impact stays limited.",
      recommendation:
        "Prioritize a small set of high-impact use cases, define approval criteria, and deploy one production workflow before expanding scope.",
    },
    helpsWith: [
      "Use case prioritization by impact and feasibility",
      "Contact center AI testing on your call recordings",
      "Workflow automation for repetitive handoffs",
      "Governance frameworks for legal and compliance review",
      "Build vs. buy decisions for bundled vs. standalone AI tools",
    ],
    typicalSituations: [
      "Several pilots active with no production deployment",
      "New AI features available, but agent accuracy concerns remain",
      "Manual cross-department workflows creating daily delays",
      "Legal and IT needing a shared AI approval process",
    ],
  }),
  solution({
    slug: "customer-experience",
    title: "Customer Experience",
    shortDescription:
      "Identify where customer journeys break in daily operations, then align technology to fix those handoffs.",
    prose: {
      observation:
        "CX improvements often stall when branch, digital, and contact center teams use different systems without shared customer context.",
      whyItMatters:
        "Customers repeat information, handle times increase, and service quality varies by channel even when individual metrics look stable.",
      recommendation:
        "Map the highest-friction handoffs first, then select CX and contact center technology that supports those specific fixes.",
    },
    helpsWith: [
      "Cross-channel friction analysis based on real workflows",
      "Branch and contact center integration planning",
      "Consistent service design across phone, chat, and digital",
      "Technology selection tied to operational KPIs",
      "Change plans covering staffing, training, and adoption",
    ],
    typicalSituations: [
      "Online activity not visible to phone agents",
      "NPS decline without clear channel-level diagnosis",
      "RFP requirements disconnected from frontline workflow reality",
      "Strong contact center metrics with persistent repeat-contact complaints",
    ],
  }),
  solution({
    slug: "digital-products",
    title: "Digital Products",
    shortDescription:
      "Websites and applications designed, built, and operated by the same team that leads your evaluations.",
    prose: {
      observation:
        "Organizations frequently receive strong advisory recommendations but still need a partner who can deliver and operate the product after launch.",
      whyItMatters:
        "When design, architecture, and implementation are disconnected, delivery risk shifts to your internal team at the worst time.",
      recommendation:
        "Define architecture and operating requirements upfront, then build in phased releases with production metrics from day one.",
    },
    helpsWith: [
      "Customer-facing applications with maintainable architecture",
      "Data and analytics pipelines tied to business decisions",
      "Product roadmaps aligned to operational capacity",
      "Technical design completed before development starts",
      "Launch support through initial production stabilization",
    ],
    typicalSituations: [
      "Need to build, not just evaluate, a new digital product",
      "Prior delivery difficult for internal teams to maintain",
      "Preference for one accountable partner across strategy and execution",
    ],
  }),
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
