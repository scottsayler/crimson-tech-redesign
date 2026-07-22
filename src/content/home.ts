import type { AdvisorProse } from "./prose";

export type EvaluationArea = {
  title: string;
  prose: AdvisorProse;
  href: string;
};

export type RecentWorkItem = {
  title: string;
  prose: AdvisorProse;
  href: string;
  external?: boolean;
};

export type HomepagePracticePath = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

export type HomepageProofPoint = {
  value: string;
  label: string;
  detail: string;
};

/** Homepage hero and journey copy. Kept here so page.tsx stays structural. */
export const homepageHero = {
  eyebrow: "Independent Technology Advisory",
  title: "Technology decisions you can defend",
  paragraphs: [
    "Crimson Technology helps organizations make high-cost technology decisions with requirements and evaluation criteria documented before vendors enter the conversation.",
    "The work is built for multi-location organizations and financial institutions that need a recommendation they can take through governance with confidence.",
  ],
  primaryCta: { label: "Start a Conversation", href: "/contact" },
  secondaryCta: {
    label: "Explore the decision process",
    href: "#decision-process",
  },
} as const;

export const homepageBuyerContext = {
  title: "Built for complex buying environments",
  paragraphs: [
    "Crimson is best suited for multi-location operators, banks, and credit unions facing renewals, migrations, or platform selections where integration, compliance, and operating constraints matter as much as features.",
    "Engagements often involve connectivity and managed networks, UCaaS and CCaaS, AI and automation, or contact center technology. Those categories matter, but the starting point is always the decision in front of you and the criteria required to make it.",
  ],
} as const;

export const homepageProcess = {
  title: "How an evaluation runs",
  description:
    "Crimson defines requirements and scoring criteria before vendors shape the conversation. The work then moves from current-state assessment through clarification, recommendation design, and implementation support.",
} as const;

export const homepageProof = {
  title: "Experience that shows up in production",
  description:
    "Advisory work is led by operators who have guided platform decisions through selection, cutover, and early production support.",
  points: [
    {
      value: "100+",
      label: "Cloud migrations guided",
      detail: "UCaaS cutovers, CCaaS replacements, and carrier consolidations",
    },
    {
      value: "Operator-led",
      label: "Production experience",
      detail:
        "Planning informed by go-live, adoption, and post-launch support realities",
    },
    {
      value: "Advisory → Execute",
      label: "Through go-live",
      detail:
        "Support continues from selection into implementation and early production",
    },
  ] satisfies HomepageProofPoint[],
  outcomes: [
    "Finalist list reduced from five to two in six weeks",
    "Platform selected on CRM integration fit",
    "WFM integration scope defined in contract terms",
    "After-call summarization deployed for contact center agents",
  ],
} as const;

export const homepagePracticePaths: HomepagePracticePath[] = [
  {
    title: "Multi-location technology",
    description:
      "Connectivity, UCaaS, and store network decisions for operators managing many sites with shared standards and local constraints.",
    href: "/industries/multi-location-businesses",
    linkLabel: "Explore multi-location work",
  },
  {
    title: "Financial services and Crimson CX",
    description:
      "CCaaS, contact center operations, and CX technology evaluations shaped around banking and credit union compliance requirements.",
    href: "/crimson-cx",
    linkLabel: "Explore Crimson CX",
  },
  {
    title: "Research",
    description:
      "Decision guides, problem analysis, and technology education from evaluations already run with operating teams.",
    href: "/research",
    linkLabel: "Explore research",
  },
];

export const homepageIndependence = {
  title: "Independent evaluation. Flexible funding.",
  lead:
    "Recommendations are based on documented business and technical requirements established before vendors are evaluated. The engagement model does not change the evaluation methodology or the criteria used to assess solutions.",
} as const;

export const homepageFinalCta = {
  title: "Discuss an upcoming technology decision",
  description:
    "Share your timeline, constraints, and what is already on the table. Scott responds personally.",
  primaryLabel: "Start a Conversation",
  primaryHref: "/contact",
} as const;

/** Retained content used by earlier homepage layouts; kept for reuse elsewhere. */
export const evaluationAreas: EvaluationArea[] = [
  {
    title: "Connectivity & Internet",
    prose: {
      observation:
        "In multi-site environments, we often find circuits billed at closed locations and failover paths that have not been tested under peak load.",
      whyItMatters:
        "Untested failover and unclear inventory increase outage duration and make renewal negotiations harder to control.",
      recommendation:
        "Run a circuit inventory and failover test plan before selecting carriers or redesigning site connectivity.",
    },
    href: "/solutions/connectivity-infrastructure",
  },
  {
    title: "Voice & UCaaS",
    prose: {
      observation:
        "UCaaS evaluations commonly progress while PBX end-of-life dates are fixed and Teams voice is only partially deployed.",
      whyItMatters:
        "Delayed decisions compress migration windows and increase cutover risk for call routing and integrations.",
      recommendation:
        "Define call-flow and integration requirements first, then evaluate platforms against those scenarios.",
    },
    href: "/solutions/communications-collaboration",
  },
  {
    title: "Contact Centers",
    prose: {
      observation:
        "Contact center teams frequently manage rising handle times with legacy ACD tools while CCaaS pilots run in parallel.",
      whyItMatters:
        "Running dual environments adds cost and keeps agents on fragmented desktops that slow service delivery.",
      recommendation:
        "Document operational pain points, shortlist CCaaS options by agent desktop fit, and plan phased migration windows.",
    },
    href: "/solutions/communications-collaboration",
  },
  {
    title: "AI & Automation",
    prose: {
      observation:
        "Most organizations we assess have multiple AI pilots, but governance and production workflow design are still maturing.",
      whyItMatters:
        "Without clear prioritization, AI investment grows faster than measurable operational improvement.",
      recommendation:
        "Select one production-ready use case, establish approval criteria, and deploy it before expanding scope.",
    },
    href: "/solutions/ai-workflow-automation",
  },
  {
    title: "Cloud Infrastructure",
    prose: {
      observation:
        "SD-WAN and managed network proposals often look complete on paper while production sites still rely on single-path connectivity.",
      whyItMatters:
        "Architecture gaps show up as recurring site outages and higher long-term network operating effort.",
      recommendation:
        "Map production traffic flows first, then compare SD-WAN and managed service options against tested redundancy needs.",
    },
    href: "/solutions/connectivity-infrastructure",
  },
  {
    title: "Customer Experience",
    prose: {
      observation:
        "Customers often restart conversations across channels because branch, digital, and contact center teams do not share context.",
      whyItMatters:
        "Repeated interactions increase handle time and reduce confidence in service quality.",
      recommendation:
        "Fix the top three handoff failures, then choose CX technology that supports those specific workflow changes.",
    },
    href: "/solutions/customer-experience",
  },
];

export const recentWork: RecentWorkItem[] = [
  {
    title: "Banking AI Advisory",
    prose: {
      observation:
        "A credit union had four AI initiatives in motion, but none met compliance criteria for production deployment.",
      whyItMatters:
        "Continued pilot expansion would increase cost without improving agent or member outcomes.",
      recommendation:
        "Prioritize contact center transcription and workflow automation with a governance model approved by leadership.",
    },
    href: "/projects/ai-workflow-modernization",
  },
  {
    title: "Contact Center Transformation",
    prose: {
      observation:
        "A legacy ACD and disconnected WFM tools were driving agent desktop complexity during an active CCaaS evaluation.",
      whyItMatters:
        "Without a phased plan, migration risk would have disrupted service during peak periods.",
      recommendation:
        "Use operational fit scoring to reduce the vendor list and execute a phased cutover schedule.",
    },
    href: "/projects/contact-center-transformation",
  },
  {
    title: "Technology Vendor Evaluation",
    prose: {
      observation:
        "A multi-location operator had three UCaaS proposals and misaligned priorities between IT and operations.",
      whyItMatters:
        "A renewal deadline was approaching without a decision framework both teams supported.",
      recommendation:
        "Adopt a shared scoring matrix and select the platform with the strongest integration fit.",
    },
    href: "/projects/vendor-evaluation-advisory",
  },
  {
    title: "Restaurant Technology Research",
    prose: {
      observation:
        "Operators repeatedly asked for practical guidance on outage cost, POTS replacement timing, and carrier contract terms.",
      whyItMatters:
        "Without shared decision tools, each location made network choices inconsistently.",
      recommendation:
        "Use published calculators and checklists to standardize store network and POTS replacement decisions.",
    },
    href: "/industries/restaurants",
  },
  {
    title: "Digital Products",
    prose: {
      observation:
        "Clients needed proof that advisory recommendations could be translated into working software, not only strategy documents.",
      whyItMatters:
        "Execution credibility is critical when platform and product decisions have long implementation timelines.",
      recommendation:
        "Build and operate a production platform using the same architecture discipline applied in client evaluations.",
    },
    href: "/solutions/digital-products",
  },
  {
    title: "CFBVerdict",
    prose: {
      observation:
        "CFBVerdict was built as a live product to demonstrate end-to-end delivery capability.",
      whyItMatters:
        "A running platform provides clearer evidence of execution than advisory deliverables alone.",
      recommendation:
        "Review CFBVerdict as a reference for how we approach architecture, delivery, and production operations.",
    },
    href: "/projects/cfbverdict",
    external: false,
  },
];

export const independencePrinciples = [
  {
    title: "Recommendations based on your requirements",
    prose: {
      observation:
        "Technology evaluations drift when sales narratives rewrite what matters before requirements are documented.",
      whyItMatters:
        "Without shared criteria, shortlists favor presentation quality over fit for your operating model.",
      recommendation:
        "Document business and technical requirements before vendors are evaluated, and score finalists against those criteria.",
    },
  },
  {
    title: "Test beyond the demo",
    prose: {
      observation:
        "Platform demos are designed to show ideal conditions and may not reflect your integration and compliance environment.",
      whyItMatters:
        "Production performance depends on real call flows, data policies, and system integrations.",
      recommendation:
        "Require scenario-based demos and reference checks before shortlisting finalists.",
    },
  },
  {
    title: "Requirements before vendors",
    prose: {
      observation:
        "Evaluations move faster when teams begin vendor meetings before requirements are agreed internally.",
      whyItMatters:
        "Early vendor influence can narrow options before operational needs are fully defined.",
      recommendation:
        "Finalize requirements and scoring criteria before the first finalist demo.",
    },
  },
  {
    title: "Plan for production scale",
    prose: {
      observation:
        "Pilot success with a small user group does not always translate to full operational scale.",
      whyItMatters:
        "Capacity, workflow, and support requirements change significantly at production volume.",
      recommendation:
        "Build go-live and adoption plans for full scale, not pilot conditions only.",
    },
  },
];
