import type { AdvisorProse } from "./prose";
import { proseToText } from "./prose";

export type Industry = {
  slug: string;
  title: string;
  shortDescription: string;
  prose: AdvisorProse;
  description: string;
  challenges: string[];
  howWeHelp: string[];
  relatedServices: string[];
  relatedTools?: { slug: string; label: string }[];
  resourcesTitle?: string;
  resourcesDescription?: string;
  servicesDescription?: string;
};

function industry(
  data: Omit<Industry, "description"> & { prose: AdvisorProse },
): Industry {
  return { ...data, description: proseToText(data.prose) };
}

export const industries: Industry[] = [
  industry({
    slug: "financial-services",
    title: "Financial Services",
    shortDescription:
      "CCaaS renewals, contact center integrations, and AI programs with compliance requirements.",
    prose: {
      observation:
        "Financial institutions often evaluate CCaaS and AI platforms while managing strict compliance, audit, and always-on contact center operations.",
      whyItMatters:
        "Missed integration or compliance requirements can delay production rollout and increase regulatory risk.",
      recommendation:
        "Test finalists against core banking integrations, recording policies, and phased migration constraints before contract signature.",
    },
    challenges: [
      "CCaaS renewal approaching with open questions on current platform fit",
      "CRM integration gaps between demo and production agent workflows",
      "AI initiatives awaiting compliance approval for production use",
      "Branch and contact center systems not sharing customer context",
    ],
    howWeHelp: [
      "CCaaS scoring with compliance and integration criteria defined upfront",
      "Operational assessment focused on where agents lose time",
      "AI use case prioritization aligned to legal approval paths",
      "Scenario-based demos using your call flows and data policies",
    ],
    relatedServices: [
      "customer-experience",
      "communications-collaboration",
      "ai-workflow-automation",
      "technology-advisory",
    ],
  }),
  industry({
    slug: "multi-location-businesses",
    title: "Multi-Location Businesses",
    shortDescription:
      "Standardize connectivity, voice, and site technology across locations with different vendors.",
    prose: {
      observation:
        "Multi-location operators frequently discover different carriers, phone systems, and network designs at each site.",
      whyItMatters:
        "Inconsistent site technology increases support effort, outage risk, and renewal complexity.",
      recommendation:
        "Complete a portfolio inventory, define a standard site template, and phase rollout by location readiness.",
    },
    challenges: [
      "No single inventory of circuits, voice platforms, or vendors",
      "UCaaS rollout delayed by site-level network prerequisites",
      "Carrier contracts billing inactive locations",
      "Franchise or site-level technology decisions diverging from standards",
    ],
    howWeHelp: [
      "Location inventory for installed and billed technology",
      "Phased UCaaS and connectivity standardization plans",
      "Carrier contract audit and renewal support",
      "Vendor consolidation analysis across regions",
    ],
    relatedServices: [
      "connectivity-infrastructure",
      "communications-collaboration",
      "technology-advisory",
    ],
  }),
  industry({
    slug: "restaurants",
    title: "Restaurants",
    shortDescription:
      "Store networking, outage risk, internet connectivity, POTS replacement, and multi-location IT.",
    prose: {
      observation:
        "Restaurant operators often experience peak-hour outages that simultaneously affect POS, kitchen routing, and online ordering.",
      whyItMatters:
        "Downtime directly impacts revenue and guest experience, especially during high-volume periods.",
      recommendation:
        "Prioritize store network standardization, tested failover, and a POTS replacement plan tied to site inventory.",
    },
    challenges: [
      "Repeated POS or internet outages during peak hours",
      "New store openings with tight technology deadlines",
      "Rising POTS line costs without complete line inventory",
      "Franchisee network inconsistency across locations",
      "Lean IT teams supporting many sites",
    ],
    howWeHelp: [
      "Carrier and connectivity evaluation for store networks",
      "Failover planning and network standardization",
      "POTS replacement and analog line modernization",
      "Independent advisory for store technology architecture",
    ],
    relatedServices: [
      "connectivity-infrastructure",
      "technology-advisory",
      "customer-experience",
    ],
    relatedTools: [
      { slug: "downtime-cost-calculator", label: "Calculate outage cost" },
      { slug: "network-assessment", label: "Score network readiness" },
      { slug: "pots-savings-calculator", label: "Estimate POTS replacement savings" },
      { slug: "vendor-consolidation-calculator", label: "Estimate vendor consolidation savings" },
    ],
    resourcesTitle: "Restaurant Technology Resources",
    resourcesDescription:
      "Guides and calculators based on store network evaluations and rollout projects.",
    servicesDescription:
      "Carrier audits, POTS replacement planning, and store network standardization.",
  }),
  industry({
    slug: "professional-services",
    title: "Professional Services",
    shortDescription:
      "UCaaS and collaboration platforms for firms that depend on reliable client communication.",
    prose: {
      observation:
        "Professional services firms often run mixed telephony environments while expanding Teams and remote collaboration.",
      whyItMatters:
        "Inconsistent communication tools affect client experience and complicate compliance obligations.",
      recommendation:
        "Evaluate UCaaS options with call recording, e911, and retention requirements validated before selection.",
    },
    challenges: [
      "Partners using different communication systems",
      "Teams chat deployed while voice remains on legacy PBX",
      "Call recording and retention requirements not fully tested in demos",
      "Remote work increasing secure connectivity requirements",
    ],
    howWeHelp: [
      "UCaaS evaluation with compliance-focused scenario testing",
      "Teams voice strategy for PSTN and direct routing",
      "Workflow automation for intake and scheduling",
      "Secure connectivity design for distributed teams",
    ],
    relatedServices: [
      "communications-collaboration",
      "ai-workflow-automation",
      "digital-products",
    ],
  }),
  industry({
    slug: "healthcare",
    title: "Healthcare",
    shortDescription:
      "Patient communication platforms and contact centers with HIPAA and BAA requirements.",
    prose: {
      observation:
        "Healthcare contact centers often coordinate scheduling, billing, and callbacks across systems that were not designed as one workflow.",
      whyItMatters:
        "Disconnected workflows increase wait times and create compliance exposure if communication controls are unclear.",
      recommendation:
        "Include HIPAA, BAA, and EHR integration requirements in finalist scoring before platform selection.",
    },
    challenges: [
      "Callbacks lost between IVR, scheduling, and agent queues",
      "Agents lacking patient context during live interactions",
      "Platform evaluations missing HIPAA and recording retention tests",
      "Legacy telephony with limited cloud migration path",
    ],
    howWeHelp: [
      "Patient communication platform evaluation with compliance criteria",
      "HIPAA and BAA requirements embedded in scoring matrices",
      "EHR and scheduling integration scoped before selection",
      "Phased migration plans that preserve patient access",
    ],
    relatedServices: [
      "communications-collaboration",
      "customer-experience",
      "connectivity-infrastructure",
    ],
  }),
  industry({
    slug: "technology-driven-organizations",
    title: "Technology-Driven Organizations",
    shortDescription:
      "Platform and product decisions with long-term architectural and contract impact.",
    prose: {
      observation:
        "Technology-led organizations often face platform decisions that affect product velocity for multiple years.",
      whyItMatters:
        "Contract lock-in and integration depth can limit roadmap flexibility if not evaluated early.",
      recommendation:
        "Score finalists on architectural fit, API realities, and contract exit terms alongside feature requirements.",
    },
    challenges: [
      "Long-term platform lock-in with limited migration options",
      "Engineering capacity split between product delivery and evaluations",
      "Build vs. buy decisions for bundled AI capabilities",
      "API capabilities differing between demo and production tiers",
    ],
    howWeHelp: [
      "Platform evaluation with exit strategy and contract term analysis",
      "Build vs. buy analysis based on delivery capacity",
      "AI and automation scoped to operational readiness",
      "Digital product architecture and delivery support",
    ],
    relatedServices: [
      "technology-advisory",
      "digital-products",
      "ai-workflow-automation",
    ],
  }),
];

export const featuredIndustrySlugs = [
  "financial-services",
  "multi-location-businesses",
  "restaurants",
  "professional-services",
] as const;

export function getFeaturedIndustries(): Industry[] {
  return featuredIndustrySlugs
    .map((slug) => industries.find((i) => i.slug === slug))
    .filter((i): i is Industry => i !== undefined);
}

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
