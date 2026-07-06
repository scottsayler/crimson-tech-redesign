import { restaurantResearch } from "./restaurant-research";
import { researchNavigationMeta } from "./research-metadata";

export const RESEARCH_TYPES = [
  "problem-page",
  "buying-guide",
  "industry-guide",
  "technology-guide",
  "vendor-comparison",
  "decision-framework",
  "checklist",
] as const;

export type ResearchType = (typeof RESEARCH_TYPES)[number];

export const researchTypeLabels: Record<ResearchType, string> = {
  "problem-page": "Problem",
  "buying-guide": "Buying Guide",
  "industry-guide": "Industry Guide",
  "technology-guide": "Guide",
  "vendor-comparison": "Comparison",
  "decision-framework": "Decision Guide",
  checklist: "Checklist",
};

export const researchTypeDescriptions: Record<ResearchType, string> = {
  "problem-page":
    "Operational problems surfaced in real evaluations—before product selection begins.",
  "buying-guide":
    "What to test in demos, what to document in requirements, and what to review in contracts.",
  "industry-guide":
    "How connectivity, CCaaS, and store network decisions play out in a specific sector.",
  "technology-guide":
    "Capabilities and constraints observed in production—not trend summaries.",
  "vendor-comparison":
    "What differs between platforms when scenario testing—not slide decks.",
  "decision-framework":
    "Scoring models and criteria used in active vendor selections.",
  checklist:
    "Questions and checks borrowed from evaluations we've run.",
};

export const RESEARCH_HUB_PATHS: Record<ResearchType, string> = {
  "problem-page": "/research/problems",
  "technology-guide": "/research/technology",
  "buying-guide": "/research/buying-guides",
  "industry-guide": "/research/industry-guides",
  "vendor-comparison": "/research/vendor-comparisons",
  "decision-framework": "/research/decision-frameworks",
  checklist: "/research/checklists",
};

export function getResearchHubPath(type: ResearchType): string {
  return RESEARCH_HUB_PATHS[type];
}

export type ResearchNextStep = {
  slug: string;
  rationale: string;
};

export type ExecutiveResourceBadge =
  | "executive-brief"
  | "decision-matrix"
  | "executive-checklist"
  | "playbook"
  | "workbook";

export type ExecutiveResourceItem = {
  title: string;
  description: string;
  badge: ExecutiveResourceBadge;
  filePath: string;
  fileName?: string;
  thumbnailPath?: string;
  fileSize?: string;
  features?: string[];
  downloadLabel?: string;
  external?: boolean;
};

export type Research = {
  slug: string;
  title: string;
  date: string;
  type: ResearchType;
  category: string;
  excerpt: string;
  content: string[];
  readingTime?: string;
  relatedSolutions?: string[];
  relatedIndustries?: string[];
  featured?: boolean;
  tags?: string[];
  libraryCategory?: string;
  related?: string[];
  relatedTools?: { slug: string; label: string }[];
  nextSteps?: ResearchNextStep[];
  learningPath?: string;
  learningOrder?: number;
  linkAliases?: string[];
  executiveResources?: ExecutiveResourceItem[];
};

const legacyResearch: Research[] = [
  {
    slug: "ccaas-vendor-checklist",
    title: "6 Question Checklist for Choosing a CCaaS Vendor",
    date: "2025-09-29",
    type: "checklist",
    category: "Communications",
    excerpt:
      "Six questions we use on CCaaS evaluations when CRM integration passes the demo and fails in week one of production.",
    content: [
      "In a recent CCaaS evaluation for a multi-site operator, three finalists delivered strong agent-desktop demos. Only one could route screen-pop data reliably when call volume exceeded the pilot queue depth.",
      "CCaaS selections fail quietly when evaluation criteria stay at feature level. Integration depth, recording retention, WFM scope, and contract exit terms determine whether the platform works after signature.",
      "These six questions translate operational requirements into scoring criteria you can use before the first finalist demo.",
      "Question one: Can the vendor demonstrate your top five call flows with your CRM objects, not a sandbox tenant? Ask for disposition mapping, transfer behavior, and after-call work under concurrent volume.",
      "Question two: Who owns WFM integration—license, implementation, and ongoing API maintenance? Bundled WFM modules often need a separate statement of work that is not in the initial proposal.",
      "Question three: How does recording retention work for your compliance policy—storage location, export, legal hold, and deletion? Demo recordings rarely reflect production retention rules.",
      "Question four: What is the realistic implementation timeline with your integration backlog, not the sales timeline? Request references with similar CRM and telephony complexity.",
      "Question five: What does TCO include beyond per-seat license—professional services, carrier charges, AI usage tiers, and renewal escalators?",
      "Question six: What is the exit path if the platform underperforms—data export, number porting, and parallel-run support during migration?",
      "Weight each answer in your scoring matrix before shortlisting. Finalists should earn points on tested scenarios, not presentation quality.",
      "Publish requirements and scoring criteria with IT, operations, and compliance sign-off before engaging vendors. Run scenario-based demos on your call flows, then reduce the list to two platforms with documented fit rationale.",
    ],
    relatedSolutions: ["communications-collaboration", "customer-experience"],
    relatedIndustries: ["financial-services", "multi-location-businesses"],
    featured: true,
  },
  {
    slug: "ai-auto-summarization-contact-centers",
    title: "The Power of Auto-Summarization in Contact Centers",
    date: "2025-10-09",
    type: "technology-guide",
    category: "AI & Automation",
    excerpt:
      "After-call summarization works in contact centers when workflow, QA sampling, and CRM field mapping are designed before production—not after the pilot.",
    content: [
      "A regional bank turned on CCaaS-bundled summarization for fifty agents before defining which CRM fields summaries should populate. Supervisors spent more time correcting records than agents saved in after-call work.",
      "Summarization fails when teams treat it as a feature toggle. The value depends on which interactions get summarized, how errors are caught, and whether downstream systems can consume structured output.",
      "Start with one workflow where summarization removes measurable friction—typically after-call documentation, supervisor review, or case creation.",
      "Map the interaction types that qualify. Inbound service, outbound collections, and authenticated member flows often need different prompts, retention rules, and human-review thresholds.",
      "Define QA sampling before scale. A practical model reviews five to ten percent of summaries in the first production month, tracks error categories, and adjusts prompts or routing rules weekly.",
      "Clarify ownership: agents edit summaries, supervisors audit samples, compliance approves retention language, and IT owns CRM field mapping. Ambiguous ownership is the most common reason pilots stall.",
      "Test with production call audio and redacted transcripts—not vendor demo recordings. Accuracy drops on accents, background noise, and domain terminology that demos omit.",
      "Measure handle time, after-call work, CRM completeness, and supervisor review time. Running summarization without baseline metrics makes ROI impossible to defend.",
      "Pilot one queue with compliance-approved language, publish QA criteria, and set a thirty-day review gate before expanding to additional teams or channels.",
    ],
    relatedSolutions: ["ai-workflow-automation", "customer-experience"],
    relatedIndustries: ["financial-services", "healthcare"],
  },
  {
    slug: "ccaas-addon-vs-point-solution",
    title: "CCaaS Add-On vs. Point Solution: Choosing the Right Path",
    date: "2025-10-03",
    type: "decision-framework",
    category: "Communications",
    excerpt:
      "When bundled CCaaS WFM or analytics is enough—and when a point solution earns its integration cost in complex contact center operations.",
    content: [
      "In a contact center modernization program, the CCaaS vendor included WFM in the license bundle. Supervisors still exported schedules to spreadsheets because the bundled module could not model their break rules or skill groups.",
      "Bundled add-ons reduce vendor count and simplify procurement. Point solutions often win on depth in WFM, speech analytics, or quality management—but add integration work and multi-vendor governance.",
      "The decision should follow operational complexity, not bundle pricing.",
      "Use bundled WFM when scheduling rules are straightforward, agent count is moderate, and your team wants one support relationship. Validate break rules, skill-based routing, and forecast accuracy in a scenario demo.",
      "Consider a point WFM solution when you run multiple sites, complex skill matrices, or union scheduling rules. Integration cost is justified when inaccurate schedules directly affect service levels and labor cost.",
      "For analytics and QM, bundled tools often suffice for basic dashboards. Specialized speech analytics earns its place when compliance, dispute resolution, or coaching programs depend on searchable interaction data.",
      "Score finalists on integration ownership: who builds CRM and WFM connectors, who maintains APIs after go-live, and what happens when the CCaaS platform upgrades.",
      "Document build-vs-buy criteria in your scoring matrix—internal capacity to manage a second vendor matters as much as feature depth.",
      "Default to bundled capabilities for standard scheduling and reporting. Shortlist a point solution only when scenario testing proves the bundle cannot meet documented requirements.",
    ],
    relatedSolutions: ["communications-collaboration"],
    relatedIndustries: ["financial-services", "technology-driven-organizations"],
  },
  {
    slug: "independent-technology-advisory",
    title: "Why Independent Technology Advisory Matters",
    date: "2025-11-15",
    type: "problem-page",
    category: "Advisory",
    excerpt:
      "Independent advisory changes platform evaluations when recommendations are tied to documented requirements—not reseller incentives.",
    content: [
      "A multi-location operator received three UCaaS proposals with different per-seat economics. The lowest license quote carried the highest implementation scope because CRM integration was excluded from the base package.",
      "Technology evaluations drift when incentives are misaligned. Reseller margins, vendor-funded rankings, and platform-specific practices shape recommendations unless decision criteria are documented first.",
      "Independence means the advisor has no commission on your final platform choice and publishes evaluation criteria before vendor meetings begin.",
      "Independent engagements start with requirements: call volumes, integration objects, compliance constraints, renewal timelines, and stakeholder success metrics. Vendors respond to criteria; criteria should not be rewritten after the first demo.",
      "A neutral facilitator runs scenario-based demos, scores finalists against the same scripts, and documents gaps for governance review. That process surfaces integration and contract issues early.",
      "Contract review belongs in the evaluation—not after signature. Renewal escalators, professional services caps, and exit terms affect TCO as much as license price.",
      "The output is a defensible recommendation: weighted scoring, shortlist rationale, migration phasing, and risks leadership can approve with evidence.",
      "Select advisory support with no reseller ties to finalists, publish your scoring model before demos, and require scenario testing on your integrations and compliance rules.",
    ],
    relatedSolutions: ["technology-advisory"],
    relatedIndustries: [
      "professional-services",
      "technology-driven-organizations",
    ],
    featured: true,
  },
  {
    slug: "sales-vs-implementation",
    title: "Don't Confuse Sales with Implementation",
    date: "2025-08-22",
    type: "problem-page",
    category: "Advisory",
    excerpt:
      "Sales demos and implementation delivery use different teams, timelines, and constraints—plan CCaaS and UCaaS evaluations accordingly.",
    content: [
      "A credit union signed a CCaaS agreement based on a polished sales demo. The implementation team scoped CRM integration as a twelve-week change order that was not in the original proposal.",
      "Sales organizations optimize for contract signature. Implementation teams optimize for deployability within statement-of-work boundaries. Those goals overlap but are not the same.",
      "Evaluations that treat the sales demo as proof of delivery create gap lists at go-live—when changing platforms is expensive.",
      "Ask who implements: vendor professional services, a partner, or your internal team. Request implementation references with similar integration depth, not only product references.",
      "Separate sales timeline from cutover timeline. Data migration, agent training, WFM configuration, and parallel-run testing need calendar space that sales cycles compress.",
      "Build implementation requirements into scoring: API documentation quality, sandbox access, migration tooling, and post-go-live support tiers.",
      "Include a statement-of-work review before signature. Line items for integration, training, and hypercare should match what you tested in finalists—not what was implied in the demo.",
      "Require implementation references, validate the SOW against demo-tested scenarios, and reserve parallel-run weeks in the migration plan before contract execution.",
    ],
    relatedSolutions: ["technology-advisory"],
    relatedIndustries: ["multi-location-businesses", "professional-services"],
  },
  {
    slug: "ccaas-trends-2025",
    title: "CCaaS Trends to Watch in 2025",
    date: "2025-09-24",
    type: "technology-guide",
    category: "Communications",
    excerpt:
      "What matters in 2025 CCaaS evaluations: AI that survives production audio, composable integrations, and agent desktop fit—not feature parity on slides.",
    content: [
      "Every CCaaS finalist in a recent evaluation led with AI copilots and sentiment scoring. Only two could run summarization on the client's recorded calls with acceptable accuracy under compliance review.",
      "Market narratives move faster than production readiness. Teams that chase trend lists without operational criteria often renew incumbent platforms—or select replacements that fail adoption.",
      "Filter trends through requirements: which capabilities change agent workflow, which need compliance approval, and which are roadmap items versus production features today.",
      "AI in CCaaS is shifting from novelty to operations—but production AI needs governance, QA sampling, and CRM field design. Pilot one use case with legal sign-off before portfolio expansion.",
      "Composable architectures let you integrate specialized WFM, analytics, or knowledge tools without full platform replacement. Ask finalists about API stability, event hooks, and upgrade impact on integrations.",
      "Agent experience is the adoption metric that matters. Desktop clutter, extra login steps, and unreliable screen-pop drive handle time up regardless of omnichannel feature count.",
      "Renewal decisions should include integration debt: what custom work was required at go-live and what breaks on the vendor's next major release.",
      "Anchor evaluations on documented call flows and agent desktop fit. Add AI and composable capabilities only after scenario testing proves production readiness.",
    ],
    relatedSolutions: ["communications-collaboration"],
    relatedIndustries: ["financial-services", "healthcare"],
  },
];

function enrichResearch(item: Research): Research {
  const meta = researchNavigationMeta[item.slug];
  if (!meta) return item;
  return { ...item, ...meta };
}

export const research: Research[] = [...legacyResearch, ...restaurantResearch].map(
  enrichResearch,
);

export function getResearch(slug: string): Research | undefined {
  return research.find((r) => r.slug === slug);
}

export function getResearchByType(type: ResearchType): Research[] {
  return research.filter((r) => r.type === type);
}

export function getResearchByTypeSorted(type: ResearchType): Research[] {
  return getResearchByType(type).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getResearchTypeCount(type: ResearchType): number {
  return research.filter((r) => r.type === type).length;
}

export function getResearchSortedByDate(): Research[] {
  return [...research].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
