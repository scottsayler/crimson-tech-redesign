export type CredentialStat = {
  value: string;
  label: string;
  detail: string;
};

export type MethodologyStep = {
  number: string;
  title: string;
  prose: {
    observation: string;
    whyItMatters: string;
    recommendation: string;
  };
  deliverables: string[];
};

export const credentialStats: CredentialStat[] = [
  {
    value: "100+",
    label: "Cloud migrations guided",
    detail: "UCaaS cutovers, CCaaS replacements, and carrier consolidations",
  },
  {
    value: "Independent",
    label: "Criteria-based",
    detail:
      "Transparent evaluation. Flexible funding—participating technology providers after selection, or fee-based",
  },
  {
    value: "Operator-led",
    label: "Production experience",
    detail: "Planning informed by go-live, adoption, and post-launch support realities",
  },
  {
    value: "Advisory → Execute",
    label: "Through go-live",
    detail: "Support continues from selection into implementation and early production",
  },
];

export const methodologySteps: MethodologyStep[] = [
  {
    number: "01",
    title: "Assess",
    prose: {
      observation:
        "Strong evaluations begin with an accurate picture of current platforms, contracts, integrations, and operational constraints.",
      whyItMatters:
        "Missing current-state detail leads to unrealistic timelines and avoidable migration risk.",
      recommendation:
        "Complete a current-state inventory and stakeholder interviews before engaging finalists.",
    },
    deliverables: [
      "Platform, carrier, and contract inventory",
      "Stakeholder interviews across IT, operations, and finance",
      "Prioritized gap list tied to business impact",
    ],
  },
  {
    number: "02",
    title: "Clarify",
    prose: {
      observation:
        "Teams often enter vendor demos without shared success criteria or weighted decision criteria.",
      whyItMatters:
        "Without alignment, evaluations drift toward preference and presentation quality instead of fit.",
      recommendation:
        "Publish requirements and a scoring model approved by decision stakeholders.",
    },
    deliverables: [
      "Signed requirements document",
      "Weighted scoring matrix",
      "Aligned scope, budget, and timeline",
    ],
  },
  {
    number: "03",
    title: "Design",
    prose: {
      observation:
        "Shortlists are most reliable when they are tied to integration, compliance, and operating requirements rather than feature breadth.",
      whyItMatters:
        "A weak shortlist increases implementation rework and contract change orders later.",
      recommendation:
        "Select finalists based on documented fit and build a phased migration plan with rollback options.",
    },
    deliverables: [
      "Finalist shortlist with fit rationale",
      "Phased migration roadmap",
      "TCO model including implementation effort",
    ],
  },
  {
    number: "04",
    title: "Execute",
    prose: {
      observation:
        "Contract terms, implementation scope, and adoption planning determine whether a good platform choice succeeds in production.",
      whyItMatters:
        "Weak contract guardrails and unclear cutover ownership are common causes of post-signature delays.",
      recommendation:
        "Facilitate scenario-based demos, review contract terms, and finalize a go-live adoption plan.",
    },
    deliverables: [
      "Scenario-based demo facilitation",
      "Contract and SLA review notes",
      "Go-live checklist and adoption plan",
    ],
  },
];

export const founderProfile = {
  name: "Scott Sayler",
  title: "Founder & Principal Advisor",
  prose: {
    observation:
      "Scott has led evaluations and migrations across UCaaS, CCaaS, contact center operations, and digital product delivery.",
    whyItMatters:
      "Platform decisions affect daily operations for years, so the advisor needs production experience—not only presentation experience.",
    recommendation:
      "Engage Scott directly when you need a principal advisor through selection, contract decisions, and go-live planning.",
  },
  credentials: [
    "100+ UCaaS, CCaaS, and cloud communications migrations",
    "Contact center operations: ACD, WFM, and workforce scheduling",
    "Experience on both client and vendor sides of platform decisions",
    "Built and operates CFBVerdict as a live digital product",
  ],
  href: "/about",
} as const;

export const engagementStandards = [
  {
    title: "Principal-led engagements",
    prose: {
      observation:
        "Large technology decisions benefit when the lead advisor stays involved from requirements through implementation planning.",
      whyItMatters:
        "Continuity reduces rework and keeps decision context intact across stakeholders.",
      recommendation:
        "Work directly with Scott on evaluation design, finalist scoring, and transition planning.",
    },
  },
  {
    title: "Decision-ready deliverables",
    prose: {
      observation:
        "Executive teams need concise artifacts they can use in approval meetings, not broad strategy documents.",
      whyItMatters:
        "Clear deliverables accelerate governance decisions and reduce project delay.",
      recommendation:
        "Use scoring matrices, shortlist rationale, migration timelines, and TCO summaries as decision inputs.",
    },
  },
  {
    title: "Scenario-based demos",
    prose: {
      observation:
        "Generic demos rarely reveal integration, compliance, and workflow constraints that appear in production.",
      whyItMatters:
        "Scenario testing improves confidence in finalist selection and reduces post-selection surprises.",
      recommendation:
        "Run demos using your call flows, store layouts, and compliance requirements.",
    },
  },
  {
    title: "Support through go-live",
    prose: {
      observation:
        "Many platform issues surface during cutover, training, and the first weeks of production use.",
      whyItMatters:
        "Early production support determines whether adoption targets are met on time.",
      recommendation:
        "Stay engaged through cutover planning, launch support, and initial production stabilization.",
    },
  },
];

export const aboutWhatWeAre = {
  observation:
    "Crimson Technology is an independent technology advisory firm. Every engagement begins with documented business and technical requirements.",
  whyItMatters:
    "Vendors are evaluated against those criteria using a transparent methodology, and recommendations are based on the results of that evaluation—not vendor preferences.",
  recommendation:
    "Most engagements are funded by participating technology providers after a client selects a solution, allowing many organizations to receive advisory services without consulting fees. Fee-based advisory engagements are also available when preferred or appropriate.",
} as const;

/** Short funding disclosure for homepage, solutions, and other surfaces. */
export const engagementFunding =
  "Most engagements are funded by participating technology providers after a client selects a solution, allowing many organizations to receive advisory services without consulting fees. Fee-based advisory engagements are also available when preferred or appropriate.";

export const engagementFundingFaq = [
  {
    question: "How are you paid?",
    answer:
      "Most engagements are funded by participating technology providers after a client selects a solution. This allows many organizations to receive advisory services without consulting fees. Fee-based engagements are also available.",
  },
  {
    question: "Does that affect your recommendations?",
    answer:
      "No. Recommendations are based on documented business and technical requirements established before vendors are evaluated. The engagement model does not change the evaluation methodology or the criteria used to assess solutions.",
  },
] as const;

export const independencePrimaryStatement =
  "Independent in how recommendations are made. Flexible in how engagements are funded.";

export const originStory = {
  observation:
    "Scott founded Crimson Technology after repeatedly seeing platform decisions made on demos, signed without contract review, and corrected only after go-live.",
  whyItMatters:
    "Late discovery of integration and contract issues creates avoidable cost and operational disruption.",
  recommendation:
    "Run evaluations with requirements, scenario testing, and contract review completed before signature.",
} as const;

export const engagementTypes = [
  {
    title: "Advisory",
    prose: {
      observation:
        "Teams often need a defensible recommendation before internal approval or board review.",
      whyItMatters:
        "Without documented scoring and rationale, platform decisions stall in governance.",
      recommendation:
        "Use a scoped advisory engagement for evaluation design, shortlist, and contract review.",
    },
  },
  {
    title: "Project-based",
    prose: {
      observation:
        "Many organizations face one urgent decision—CCaaS selection, UCaaS migration, or AI readiness—rather than a broad transformation program.",
      whyItMatters:
        "Focused scope keeps timelines realistic and deliverables tied to the decision at hand.",
      recommendation:
        "Define fixed scope around one decision with clear outputs and timeline.",
    },
  },
  {
    title: "Execution",
    prose: {
      observation:
        "Platform selection quality only matters if cutover, training, and early production support are planned.",
      whyItMatters:
        "Most adoption issues appear in the first 90 days after launch.",
      recommendation:
        "Extend support through demo facilitation, contract negotiation, and go-live planning.",
    },
  },
] as const;

export const independenceProof = [
  "Requirements documented before vendors are evaluated",
  "Recommendations based on documented business and technical criteria",
  "Transparent evaluation methodology",
  "Flexible engagement model, technology-provider funded or fee-based",
];
