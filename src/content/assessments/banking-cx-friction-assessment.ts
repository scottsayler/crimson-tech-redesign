import type {
  AssessmentChoice,
  AssessmentDefinition,
  AssessmentQuestion,
  AssessmentSection,
} from "@/lib/assessments/types";
import { bankingCxFrictionInsights } from "./banking-cx-friction-insights";

function frictionChoices(
  minimal: string,
  low: string,
  moderate: string,
  elevated: string,
  severe: string
): AssessmentChoice[] {
  return [
    { label: minimal, score: 1 },
    { label: low, score: 2 },
    { label: moderate, score: 3 },
    { label: elevated, score: 4 },
    { label: severe, score: 5 },
  ];
}

function q(
  id: string,
  category: string,
  prompt: string,
  options: [string, string, string, string, string]
): AssessmentQuestion {
  return {
    id,
    category,
    prompt,
    choices: frictionChoices(...options),
    whyThisMatters: bankingCxFrictionInsights[id],
  };
}

const FRICTION_SCALE: [string, string, string, string, string] = [
  "Rarely or never — consistent, low-friction experience",
  "Occasionally — isolated incidents with minimal customer impact",
  "Sometimes — noticeable friction affecting a meaningful share of interactions",
  "Frequently — systemic friction that agents and customers work around daily",
  "Consistently — severe friction that drives callbacks, abandonment, or complaints",
];

export const bankingCxJourneys: AssessmentSection[] = [
  {
    id: "account-opening",
    label: "New Account Opening",
    description:
      "Digital-to-assisted transitions, application visibility, and identity verification across channels.",
    categoryIds: ["account-opening"],
  },
  {
    id: "digital-banking",
    label: "Digital Banking Self-Service",
    description:
      "Self-service completion rates, error recovery, and authentication consistency across digital channels.",
    categoryIds: ["digital-banking"],
  },
  {
    id: "card-services",
    label: "Card Services & Disputes",
    description:
      "Lost card, unauthorized transactions, dispute status, and provisional credit workflows.",
    categoryIds: ["card-services"],
  },
  {
    id: "loan-servicing",
    label: "Loan Inquiry & Servicing",
    description:
      "Payment, payoff, modification requests, and context preservation between origination and servicing.",
    categoryIds: ["loan-servicing"],
  },
  {
    id: "branch-handoff",
    label: "Branch-to-Contact Center Handoff",
    description:
      "Warm transfers, shared customer context, and routing from branch referrals.",
    categoryIds: ["branch-handoff"],
  },
  {
    id: "fraud-security",
    label: "Fraud Alerts & Security Events",
    description:
      "Fraud alert response, account restrictions, identity verification, and escalation paths.",
    categoryIds: ["fraud-security"],
  },
  {
    id: "mortgage-lending",
    label: "Mortgage & Home Lending",
    description:
      "Application status, document collection, closing timelines, and specialist coordination.",
    categoryIds: ["mortgage-lending"],
  },
  {
    id: "wealth-referral",
    label: "Wealth & Advisory Referrals",
    description:
      "Retail-to-advisory handoffs, suitability context, and referral tracking.",
    categoryIds: ["wealth-referral"],
  },
  {
    id: "business-banking",
    label: "Business Banking Support",
    description:
      "Treasury, ACH, user administration, dual-control workflows, and business routing.",
    categoryIds: ["business-banking"],
  },
  {
    id: "complaints-escalation",
    label: "Complaints & Escalation",
    description:
      "Complaint history, escalation ownership, SLAs, and resolution communication.",
    categoryIds: ["complaints-escalation"],
  },
];

const bankingCxQuestions: AssessmentQuestion[] = [
  q(
    "ao-1",
    "account-opening",
    "When a customer starts account opening digitally but needs assistance, how often must they restart or re-verify information when switching channels?",
    FRICTION_SCALE
  ),
  q(
    "ao-2",
    "account-opening",
    "How consistently can agents see a customer's in-progress application status across digital, branch, and contact center channels?",
    [
      "Always — real-time visibility in a unified agent desktop",
      "Usually — visible in most channels with minor gaps",
      "Sometimes — visible in some channels but not others",
      "Rarely — agents must ask customers to describe progress",
      "Never — each channel operates on separate application records",
    ]
  ),
  q(
    "ao-3",
    "account-opening",
    "How often do customers experience delays because identity verification or document collection happens in disconnected systems?",
    FRICTION_SCALE
  ),
  q(
    "ao-4",
    "account-opening",
    "How clearly defined is ownership when account opening stalls between operations, compliance, and the contact center?",
    [
      "Always clear — named owners, SLAs, and customer communication standards",
      "Usually clear — ownership defined for most stall scenarios",
      "Sometimes clear — depends on which team identifies the delay",
      "Rarely clear — customers and agents lack visibility into who owns next steps",
      "Never clear — stalled applications lack accountable ownership",
    ]
  ),
  q(
    "db-1",
    "digital-banking",
    "How often do customers contact the bank for transactions or information they could complete in digital banking?",
    FRICTION_SCALE
  ),
  q(
    "db-2",
    "digital-banking",
    "When digital banking errors occur, how quickly can agents see what the customer attempted and where the flow failed?",
    [
      "Immediately — full digital session context in the agent desktop",
      "Within minutes — error logs available with minimal agent effort",
      "After investigation — agents must query separate monitoring tools",
      "Rarely — agents rely on customer description of the error",
      "Never — no digital session visibility for agent-assisted recovery",
    ]
  ),
  q(
    "db-3",
    "digital-banking",
    "How consistent is authentication and step-up verification when customers move between mobile app, web, and agent-assisted channels?",
    FRICTION_SCALE
  ),
  q(
    "db-4",
    "digital-banking",
    "How often do customers abandon self-service because error messages lack actionable next steps?",
    FRICTION_SCALE
  ),
  q(
    "cs-1",
    "card-services",
    "When a customer reports a lost card or unauthorized transaction, how often must they repeat information already captured in another channel?",
    FRICTION_SCALE
  ),
  q(
    "cs-2",
    "card-services",
    "How consistently can agents access real-time card status, dispute case history, and provisional credit decisions in one view?",
    [
      "Always — unified card and dispute desktop",
      "Usually — most data available without system switching",
      "Sometimes — requires one or two additional system lookups",
      "Rarely — agents switch between three or more platforms",
      "Never — card, dispute, and core data are in disconnected systems",
    ]
  ),
  q(
    "cs-3",
    "card-services",
    "How often do dispute resolution timelines exceed customer expectations due to handoffs between fraud, operations, and vendor processors?",
    FRICTION_SCALE
  ),
  q(
    "cs-4",
    "card-services",
    "How clearly can agents explain dispute status and next steps without transferring the customer to a specialist queue?",
    [
      "Always — first-line agents have full dispute lifecycle visibility",
      "Usually — agents handle status updates for most dispute types",
      "Sometimes — complex disputes require specialist involvement",
      "Rarely — most dispute inquiries require transfer",
      "Never — agents cannot access dispute status at all",
    ]
  ),
  q(
    "ls-1",
    "loan-servicing",
    "How often must customers provide loan or account details that agents cannot retrieve from core systems during the first interaction?",
    FRICTION_SCALE
  ),
  q(
    "ls-2",
    "loan-servicing",
    "When loan inquiries span origination and servicing teams, how consistently is customer context preserved across transfers?",
    [
      "Always — full context travels with every transfer",
      "Usually — context preserved for standard inquiry types",
      "Sometimes — context lost on cross-team transfers",
      "Rarely — customers repeat information at each transfer",
      "Never — origination and servicing operate as separate customer records",
    ]
  ),
  q(
    "ls-3",
    "loan-servicing",
    "How often do payment, payoff, or modification requests require callbacks because agents lack real-time servicing data?",
    FRICTION_SCALE
  ),
  q(
    "ls-4",
    "loan-servicing",
    "How clearly prioritized are routine loan servicing requests versus sales referrals in contact center routing?",
    [
      "Servicing-first — dedicated queues and SLAs for existing borrowers",
      "Balanced — servicing and sales routed with clear skill separation",
      "Mixed — servicing requests sometimes queue behind sales campaigns",
      "Sales-biased — servicing inquiries often misrouted or deprioritized",
      "No separation — servicing and sales compete in the same queues",
    ]
  ),
  q(
    "bh-1",
    "branch-handoff",
    "When branch staff warm-transfer a customer to the contact center, how often does the agent lack visibility into what was already discussed?",
    FRICTION_SCALE
  ),
  q(
    "bh-2",
    "branch-handoff",
    "How consistently do branch and contact center teams share the same customer profile and interaction history?",
    [
      "Always — unified CRM with full cross-channel history",
      "Usually — shared profile with minor channel-specific gaps",
      "Sometimes — partial history available depending on channel",
      "Rarely — branch and contact center use different customer views",
      "Never — no shared interaction history between branch and phone",
    ]
  ),
  q(
    "bh-3",
    "branch-handoff",
    "How often do customers re-authenticate when escalated from branch to phone or chat support?",
    FRICTION_SCALE
  ),
  q(
    "bh-4",
    "branch-handoff",
    "How frequently do branch-referred issues land in the wrong skill queue, extending resolution time?",
    FRICTION_SCALE
  ),
  q(
    "fs-1",
    "fraud-security",
    "When customers respond to fraud alerts, how often must they verify identity through processes disconnected from the alert workflow?",
    FRICTION_SCALE
  ),
  q(
    "fs-2",
    "fraud-security",
    "How consistently can agents see fraud case disposition, hold status, and card restrictions without switching platforms?",
    [
      "Always — fraud tools integrated in the agent desktop",
      "Usually — most fraud data accessible in primary systems",
      "Sometimes — requires switching to a dedicated fraud platform",
      "Rarely — agents coordinate fraud resolution through email or tickets",
      "Never — fraud status is invisible to front-line agents",
    ]
  ),
  q(
    "fs-3",
    "fraud-security",
    "How often do legitimate customers experience extended account lockouts due to fragmented fraud tool workflows?",
    FRICTION_SCALE
  ),
  q(
    "fs-4",
    "fraud-security",
    "How clearly defined is the escalation path when fraud alerts require compliance or back-office review?",
    [
      "Always defined — documented paths with customer-facing SLAs",
      "Usually defined — escalation paths exist for common scenarios",
      "Sometimes defined — depends on fraud type and agent experience",
      "Rarely defined — agents improvise escalation on complex cases",
      "Never defined — no standard escalation for fraud review",
    ]
  ),
  q(
    "ml-1",
    "mortgage-lending",
    "How often must mortgage customers contact multiple departments to get status on applications or closing timelines?",
    FRICTION_SCALE
  ),
  q(
    "ml-2",
    "mortgage-lending",
    "How consistently can contact center agents access mortgage pipeline status without specialist transfer?",
    [
      "Always — pipeline status in the agent desktop",
      "Usually — status available for most loan stages",
      "Sometimes — agents access a limited status view",
      "Rarely — most mortgage inquiries require specialist transfer",
      "Never — contact center has no mortgage pipeline visibility",
    ]
  ),
  q(
    "ml-3",
    "mortgage-lending",
    "How often do document requests create duplicate uploads because systems don't share received-file status?",
    FRICTION_SCALE
  ),
  q(
    "ml-4",
    "mortgage-lending",
    "How clearly communicated are next steps when mortgage inquiries require loan officer or processor follow-up?",
    [
      "Always — customers receive specific timelines and named contacts",
      "Usually — next steps communicated with estimated timelines",
      "Sometimes — customers told someone will call back without detail",
      "Rarely — customers left uncertain about follow-up timing",
      "Never — no structured follow-up communication on mortgage inquiries",
    ]
  ),
  q(
    "wr-1",
    "wealth-referral",
    "When retail customers request investment or trust services, how often does the referral process stall between contact center and advisory teams?",
    FRICTION_SCALE
  ),
  q(
    "wr-2",
    "wealth-referral",
    "How consistently is customer consent and suitability context captured before a warm handoff to wealth advisors?",
    [
      "Always — structured referral workflow with required context fields",
      "Usually — context captured for standard referral types",
      "Sometimes — context captured inconsistently across channels",
      "Rarely — advisors restart discovery on most referrals",
      "Never — no structured referral or suitability capture process",
    ]
  ),
  q(
    "wr-3",
    "wealth-referral",
    "How often do customers repeat financial goals and account details already shared with branch or contact center staff?",
    FRICTION_SCALE
  ),
  q(
    "wr-4",
    "wealth-referral",
    "How clearly tracked are referral outcomes so contact center agents can update customers on status?",
    [
      "Always — referral CRM with status visible to all channels",
      "Usually — outcomes tracked for most referral types",
      "Sometimes — tracking depends on the receiving advisor",
      "Rarely — agents cannot determine referral status",
      "Never — referrals disappear into advisory teams without tracking",
    ]
  ),
  q(
    "bb-1",
    "business-banking",
    "How often must business banking customers call back because agents lack authority to view treasury, ACH, or user administration details?",
    FRICTION_SCALE
  ),
  q(
    "bb-2",
    "business-banking",
    "How consistently can agents support authorized business users versus requiring relationship manager involvement?",
    [
      "Always — tiered authority covers routine business requests",
      "Usually — most authorized-user requests handled first-contact",
      "Sometimes — authority limits require escalation on common requests",
      "Rarely — most business inquiries escalate to relationship managers",
      "Never — contact center cannot support business banking customers",
    ]
  ),
  q(
    "bb-3",
    "business-banking",
    "How often do dual-control or approval workflows create customer-visible delays without proactive status updates?",
    FRICTION_SCALE
  ),
  q(
    "bb-4",
    "business-banking",
    "How clearly separated are consumer and business banking support paths in IVR, routing, and agent desktops?",
    [
      "Fully separated — distinct paths, skills, and desktops for business banking",
      "Mostly separated — clear routing with some shared agent pools",
      "Partially separated — business calls sometimes reach consumer agents",
      "Minimally separated — business and consumer share most routing paths",
      "Not separated — no distinction between consumer and business support",
    ]
  ),
  q(
    "ce-1",
    "complaints-escalation",
    "How often must dissatisfied customers repeat their concern when escalating beyond first-line support?",
    FRICTION_SCALE
  ),
  q(
    "ce-2",
    "complaints-escalation",
    "How consistently is complaint history visible across branch, digital, and contact center interactions?",
    [
      "Always — unified complaint record across all channels",
      "Usually — history visible for most complaint types",
      "Sometimes — partial history depending on originating channel",
      "Rarely — each channel maintains separate complaint notes",
      "Never — no cross-channel complaint visibility",
    ]
  ),
  q(
    "ce-3",
    "complaints-escalation",
    "How often do regulatory or executive complaints lack a tracked owner and SLA from first contact?",
    FRICTION_SCALE
  ),
  q(
    "ce-4",
    "complaints-escalation",
    "How clearly do agents explain resolution timelines and next steps for escalated complaints?",
    [
      "Always — documented SLAs communicated with specific follow-up dates",
      "Usually — agents provide estimated timelines on most escalations",
      "Sometimes — timeline communication depends on agent judgment",
      "Rarely — customers receive vague assurances without dates",
      "Never — no standard communication on escalation timelines",
    ]
  ),
];

export const bankingCxFrictionAssessment: AssessmentDefinition = {
  id: "banking-cx-friction-assessment",
  slug: "banking-cx-friction-assessment",
  title: "Banking CX Friction Assessment",
  scoreLabel: "Overall CX friction score",
  maturityLabel: "Friction level",
  scoreMode: "friction",
  resultsDisclaimer: "Scores reflect operational friction based on your selections in this session.",
  intro: {
    eyebrow: "Executive Assessment",
    title: "Banking CX Friction Assessment",
    subtitle:
      "Score friction across ten customer journeys before evaluating CCaaS platforms, CRM integrations, or AI investments. Identify where agents and customers lose time—not which vendor to buy.",
    highlights: [
      "10 customer journeys",
      "40 diagnostic questions",
      "1–5 friction scoring per question",
      "Instant journey-level results and priorities",
      "No registration required",
    ],
  },
  sectionNavLabel: "Customer journeys",
  sections: bankingCxJourneys,
  categories: bankingCxJourneys.map((journey) => ({
    id: journey.categoryIds[0],
    label: journey.label,
    description: journey.description,
    sectionId: journey.id,
    weight: 1,
  })),
  questions: bankingCxQuestions,
  operationalObservations: {
    "account-opening":
      "Account opening friction typically signals CRM, digital onboarding, and identity verification are not integrated. Fixing channel handoffs often delivers measurable conversion gains before a CCaaS migration.",
    "digital-banking":
      "Digital deflection failures inflate contact center volume with preventable calls. Session visibility and actionable error recovery are prerequisites for meaningful self-service ROI.",
    "card-services":
      "Card and dispute friction peaks during fraud events when customers are most anxious. Unified card-dispute-core visibility reduces both handle time and complaint escalation rates.",
    "loan-servicing":
      "Loan servicing friction reflects core integration depth more than agent training. Borrowers who repeat information on every call are signaling a data architecture problem.",
    "branch-handoff":
      "Branch referral friction undermines the relationship investment branch staff make in person. Unified CRM and warm-transfer context are often higher-impact than IVR redesign.",
    "fraud-security":
      "Fraud workflow fragmentation creates both false-positive lockouts and extended resolution times. Compliance requirements make this journey especially sensitive to technology gaps.",
    "mortgage-lending":
      "Mortgage customers tolerate less friction than retail banking customers because stakes are higher. Pipeline visibility gaps generate disproportionate complaint volume.",
    "wealth-referral":
      "Referral friction represents direct revenue leakage. Structured referral workflows with tracked outcomes convert more retail relationships to advisory revenue.",
    "business-banking":
      "Business banking complexity requires tiered agent authority and separated routing. Consumer contact center models applied to business customers predictably fail.",
    "complaints-escalation":
      "Escalation friction is the most visible CX failure and the most likely to surface in regulatory examinations. Cross-channel complaint history is a compliance requirement, not a nice-to-have.",
  },
  relatedContent: {
    ccaasChecklist: {
      id: "ccaasChecklist",
      title: "6-Question CCaaS Vendor Checklist",
      href: "/research/ccaas-vendor-checklist",
      description:
        "Structured vendor evaluation criteria for banks evaluating CCaaS platforms.",
    },
    ccaasAddon: {
      id: "ccaasAddon",
      title: "CCaaS Add-on vs. Point Solution",
      href: "/research/ccaas-addon-vs-point-solution",
      description:
        "Decision framework for WFM, analytics, and AI modules in CCaaS evaluations.",
    },
    ccaasTrends: {
      id: "ccaasTrends",
      title: "CCaaS Trends 2025",
      href: "/research/ccaas-trends-2025",
      description:
        "Which AI and automation capabilities are production-ready versus roadmap items.",
    },
    aiSummarization: {
      id: "aiSummarization",
      title: "Auto-Summarization in Contact Centers",
      href: "/research/ai-auto-summarization-contact-centers",
      description:
        "Production workflow and governance considerations for agent assist AI.",
    },
    independentAdvisory: {
      id: "independentAdvisory",
      title: "Independent Technology Advisory",
      href: "/research/independent-technology-advisory",
      description:
        "How community banks compete on technology strategy—not budget size alone.",
    },
    journeyBrief: {
      id: "journeyBrief",
      title: "CX Without a Full Journey Redesign",
      href: "/research/ccaas-trends-2025",
      description:
        "How one institution improved CX by fixing operational handoffs—not redesigning the entire journey.",
    },
  },
  relatedPages: [
    {
      id: "crimsonCx",
      title: "Crimson CX Practice",
      href: "/crimson-cx",
      description:
        "CCaaS evaluations, contact center migrations, and AI adoption for banks and credit unions.",
    },
    {
      id: "financialServices",
      title: "Financial Services",
      href: "/industries/financial-services",
      description:
        "How we evaluate CCaaS renewals, integrations, and AI programs in regulated environments.",
    },
    {
      id: "customerExperience",
      title: "Customer Experience Advisory",
      href: "/solutions/customer-experience",
      description:
        "Cross-channel friction analysis based on real workflows—not vendor demos.",
    },
  ],
  resultProfiles: [
    {
      minScore: 76,
      level: "Critical Friction",
      summary:
        "Operational friction is systemic across multiple customer journeys. Technology investments without addressing integration, context, and routing gaps will underdeliver. Prioritize journey-level remediation before vendor selection.",
    },
    {
      minScore: 56,
      level: "Elevated Friction",
      summary:
        "Friction is concentrated in specific journeys with spillover into contact center volume and complaint rates. Target the highest-friction journeys first—often branch handoffs, card services, and digital error recovery.",
    },
    {
      minScore: 36,
      level: "Moderate Friction",
      summary:
        "Foundational capabilities exist but consistency breaks down across channels and teams. Strengthen integration and agent desktop visibility in your weakest journeys before expanding platform scope.",
    },
    {
      minScore: 16,
      level: "Low Friction",
      summary:
        "Most journeys operate with acceptable friction levels. Focus on the remaining outliers and validate that upcoming technology changes won't introduce new handoff gaps.",
    },
    {
      minScore: 0,
      level: "Minimal Friction",
      summary:
        "Customer journeys demonstrate strong cross-channel consistency. Use this baseline to set requirements for CCaaS, CRM, and AI investments—and maintain friction monitoring as platforms evolve.",
    },
  ],
  recommendations: {
    maxResults: 6,
    requireCategoryComplete: true,
    reasonTemplate:
      "Your {category} journey scored {score}/100 friction. {description}",
    fallback: "ccaasChecklist",
    byCategory: {
      "account-opening": ["ccaasChecklist", "independentAdvisory", "journeyBrief"],
      "digital-banking": ["ccaasTrends", "aiSummarization", "ccaasChecklist"],
      "card-services": ["ccaasChecklist", "ccaasAddon", "independentAdvisory"],
      "loan-servicing": ["independentAdvisory", "ccaasChecklist", "journeyBrief"],
      "branch-handoff": ["journeyBrief", "ccaasChecklist", "independentAdvisory"],
      "fraud-security": ["ccaasTrends", "aiSummarization", "ccaasChecklist"],
      "mortgage-lending": ["independentAdvisory", "journeyBrief", "ccaasChecklist"],
      "wealth-referral": ["independentAdvisory", "ccaasAddon", "journeyBrief"],
      "business-banking": ["ccaasChecklist", "ccaasAddon", "independentAdvisory"],
      "complaints-escalation": ["journeyBrief", "independentAdvisory", "ccaasChecklist"],
    },
  },
  insights: {
    strengthsCount: 3,
    risksCount: 3,
  },
};
