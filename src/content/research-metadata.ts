import type { ExecutiveResourceItem, ResearchNextStep } from "./research";

export type ResearchNavigationMeta = {
  tags?: string[];
  libraryCategory?: string;
  related?: string[];
  relatedTools?: { slug: string; label: string }[];
  nextSteps?: ResearchNextStep[];
  learningPath?: string;
  learningOrder?: number;
  linkAliases?: string[];
  executiveResources?: ExecutiveResourceItem[];
  topicCluster?: string;
};

export const researchNavigationMeta: Record<string, ResearchNavigationMeta> = {
  "restaurant-internet-outages": {
    tags: ["connectivity", "outages", "failover", "pos", "restaurants"],
    libraryCategory: "Connectivity",
    topicCluster: "connectivity",
    learningPath: "restaurant-connectivity",
    learningOrder: 1,
    nextSteps: [
      {
        slug: "restaurant-network-visibility",
        rationale:
          "After outage response, most operators need visibility into what failed before managers call IT.",
      },
    ],
    related: [
      "restaurant-network-visibility",
      "restaurants-networking",
      "restaurants-best-internet",
    ],
    relatedTools: [
      {
        slug: "downtime-cost-calculator",
        label: "Calculate outage cost",
      },
      {
        slug: "network-assessment",
        label: "Score network readiness",
      },
    ],
    linkAliases: ["internet outages", "store outages"],
  },
  "restaurant-network-visibility": {
    tags: ["monitoring", "network visibility", "restaurants", "connectivity"],
    libraryCategory: "Connectivity",
    topicCluster: "connectivity",
    learningPath: "restaurant-connectivity",
    learningOrder: 2,
    related: [
      "restaurant-internet-outages",
      "restaurants-networking",
      "restaurant-network-checklist",
    ],
    relatedTools: [
      {
        slug: "network-assessment",
        label: "Score network readiness",
      },
      {
        slug: "downtime-cost-calculator",
        label: "Calculate outage cost",
      },
    ],
    linkAliases: ["network visibility"],
  },
  "restaurants-networking": {
    tags: ["networking", "store network", "restaurants", "connectivity"],
    libraryCategory: "Connectivity",
    topicCluster: "connectivity",
    learningPath: "restaurant-connectivity",
    learningOrder: 3,
    related: [
      "restaurants-best-internet",
      "restaurant-network-visibility",
      "restaurant-network-checklist",
    ],
    linkAliases: ["restaurant networking", "store networking"],
  },
  "restaurants-best-internet": {
    tags: ["internet", "carriers", "decision framework", "restaurants"],
    libraryCategory: "Connectivity",
    topicCluster: "connectivity",
    learningPath: "restaurant-connectivity",
    learningOrder: 4,
    related: [
      "restaurant-internet-outages",
      "restaurants-networking",
      "restaurant-pots-replacement",
    ],
    relatedTools: [
      {
        slug: "downtime-cost-calculator",
        label: "Calculate outage cost",
      },
      {
        slug: "network-assessment",
        label: "Score network readiness",
      },
    ],
    linkAliases: ["best internet"],
  },
  "restaurant-pots-replacement": {
    tags: ["pots", "analog lines", "infrastructure", "restaurants"],
    libraryCategory: "Infrastructure",
    topicCluster: "connectivity",
    learningPath: "restaurant-connectivity",
    learningOrder: 5,
    related: [
      "restaurants-pots-replacement",
      "restaurants-best-internet",
      "restaurant-technology-standardization",
    ],
    relatedTools: [
      {
        slug: "pots-savings-calculator",
        label: "Estimate POTS replacement savings",
      },
      {
        slug: "network-assessment",
        label: "Score network readiness",
      },
    ],
    linkAliases: ["POTS replacement", "pots lines"],
  },
  "restaurants-pots-replacement": {
    tags: ["pots", "decision framework", "infrastructure", "restaurants"],
    libraryCategory: "Infrastructure",
    topicCluster: "connectivity",
    related: [
      "restaurant-pots-replacement",
      "restaurants-best-internet",
      "restaurant-technology-standardization",
    ],
    relatedTools: [
      {
        slug: "pots-savings-calculator",
        label: "Estimate POTS replacement savings",
      },
      {
        slug: "network-assessment",
        label: "Score network readiness",
      },
    ],
    linkAliases: ["pots replacement"],
  },
  "restaurant-vendor-sprawl": {
    tags: ["vendor sprawl", "operations", "restaurants", "managed services"],
    libraryCategory: "Operations",
    topicCluster: "restaurant-technology",
    learningPath: "restaurant-operations",
    learningOrder: 1,
    related: [
      "restaurant-technology-standardization",
      "restaurants-opening-technology-checklist",
    ],
    relatedTools: [
      {
        slug: "vendor-consolidation-calculator",
        label: "Estimate vendor consolidation savings",
      },
      {
        slug: "network-assessment",
        label: "Score network readiness",
      },
    ],
    linkAliases: ["vendor sprawl"],
  },
  "restaurant-technology-standardization": {
    tags: ["standardization", "operations", "franchise", "restaurants"],
    libraryCategory: "Operations",
    topicCluster: "restaurant-technology",
    learningPath: "restaurant-operations",
    learningOrder: 2,
    related: [
      "restaurant-vendor-sprawl",
      "restaurants-opening-technology-checklist",
      "restaurants-networking",
    ],
    relatedTools: [
      {
        slug: "vendor-consolidation-calculator",
        label: "Estimate vendor consolidation savings",
      },
      {
        slug: "network-assessment",
        label: "Score network readiness",
      },
    ],
    linkAliases: ["technology standardization"],
  },
  "restaurants-opening-technology-checklist": {
    tags: ["new stores", "checklist", "operations", "restaurants"],
    libraryCategory: "Operations",
    topicCluster: "restaurant-technology",
    learningPath: "restaurant-operations",
    learningOrder: 3,
    related: [
      "restaurant-network-checklist",
      "restaurant-technology-standardization",
      "restaurants-networking",
    ],
    linkAliases: ["opening technology checklist", "new store opening"],
  },
  "restaurant-network-checklist": {
    tags: ["checklist", "network", "connectivity", "restaurants"],
    libraryCategory: "Connectivity",
    topicCluster: "connectivity",
    related: [
      "restaurants-networking",
      "restaurant-network-visibility",
      "restaurants-opening-technology-checklist",
    ],
    linkAliases: ["network checklist"],
  },
  "ccaas-vendor-checklist": {
    tags: ["ccaas", "contact center", "checklist", "vendor evaluation", "communications"],
    libraryCategory: "Communications",
    topicCluster: "contact-center-modernization",
    learningPath: "contact-center-modernization",
    learningOrder: 1,
    nextSteps: [
      {
        slug: "ccaas-addon-vs-point-solution",
        rationale:
          "Once finalists are identified, decide whether bundled CCaaS modules or point solutions fit your WFM and analytics requirements.",
      },
    ],
    related: [
      "ccaas-addon-vs-point-solution",
      "ccaas-trends-2025",
      "independent-technology-advisory",
    ],
    linkAliases: ["CCaaS vendor", "contact center vendor"],
    executiveResources: [
      {
        title: "Download the Executive Checklist",
        description:
          'Prefer a printable version? Download the professionally designed "6-Question Checklist for Choosing a CCaaS Vendor" to share with your team or use during vendor evaluations.',
        badge: "executive-checklist",
        filePath: "/downloads/The-6-Question-Checklist-for-Choosing-a-CCaaS-Vendor.pdf",
        fileName: "The-6-Question-Checklist-for-Choosing-a-CCaaS-Vendor.pdf",
        features: [
          "Six critical vendor evaluation questions",
          "AI & Analytics checklist",
          "Integration evaluation",
          "Security & Compliance review",
          "Total Cost of Ownership guidance",
          "Cloud strategy considerations",
        ],
      },
    ],
  },
  "ai-auto-summarization-contact-centers": {
    tags: ["ai", "auto-summarization", "contact center", "workflow", "governance"],
    libraryCategory: "AI & Automation",
    topicCluster: "ai-readiness",
    learningPath: "ai-readiness",
    learningOrder: 1,
    nextSteps: [
      {
        slug: "ccaas-trends-2025",
        rationale:
          "Understand which AI capabilities in CCaaS platforms are production-ready versus roadmap items.",
      },
    ],
    related: [
      "ccaas-vendor-checklist",
      "ccaas-trends-2025",
      "independent-technology-advisory",
    ],
    linkAliases: ["auto-summarization", "contact centers"],
    executiveResources: [
      {
        title: "Download the Executive Guide",
        description:
          "Prefer a printable version? Download the professionally designed guide on auto-summarization in agent assist tools to share with your team or use during technology evaluations.",
        badge: "executive-brief",
        filePath:
          "/downloads/Unlocking-Contact-Center-Excellence-The-Power-of-Autosummarization-in-Agent-Assist-Tools.pdf",
        fileName:
          "Unlocking-Contact-Center-Excellence-The-Power-of-Autosummarization-in-Agent-Assist-Tools.pdf",
        features: [
          "Auto-summarization use cases",
          "Workflow design considerations",
          "Governance and quality review",
          "CRM and system integration",
          "Agent productivity impact",
          "Supervisor efficiency and data quality",
        ],
      },
    ],
  },
  "ccaas-addon-vs-point-solution": {
    tags: ["ccaas", "decision framework", "point solution", "communications"],
    libraryCategory: "Communications",
    topicCluster: "contact-center-modernization",
    learningPath: "contact-center-modernization",
    learningOrder: 2,
    nextSteps: [
      {
        slug: "ai-auto-summarization-contact-centers",
        rationale:
          "If AI is part of your CCaaS decision, define production workflow and governance before contract scope.",
      },
    ],
    related: [
      "ccaas-vendor-checklist",
      "ccaas-trends-2025",
      "independent-technology-advisory",
    ],
    linkAliases: ["CCaaS add-on", "point solution"],
    executiveResources: [
      {
        title: "Download the Decision Matrix",
        description:
          'Prefer a printable version? Download the professionally designed "CCaaS Add-on vs. Point Solution Decision Matrix" to share with stakeholders or use during vendor evaluations.',
        badge: "decision-matrix",
        filePath: "/downloads/CCaaS-Add-on-vs-Point-Solution-Decision-Matrix.pdf",
        fileName: "CCaaS-Add-on-vs-Point-Solution-Decision-Matrix.pdf",
        features: [
          "Seven decision dimensions",
          "CCaaS add-on vs. point solution comparison",
          "Key point solution categories",
          "Operational maturity assessment",
          "Decision framework implementation steps",
          "Strategic choice guidance",
        ],
      },
    ],
  },
  "independent-technology-advisory": {
    tags: ["advisory", "vendor neutral", "technology strategy", "evaluation"],
    libraryCategory: "Advisory",
    topicCluster: "technology-vendor-evaluation",
    learningPath: "technology-vendor-evaluation",
    learningOrder: 1,
    nextSteps: [
      {
        slug: "sales-vs-implementation",
        rationale:
          "Before signing, separate what the sales demo showed from what implementation will deliver.",
      },
    ],
    related: [
      "sales-vs-implementation",
      "ccaas-vendor-checklist",
      "ccaas-addon-vs-point-solution",
    ],
    linkAliases: ["independent technology advisory", "independent advisory"],
    executiveResources: [
      {
        title: "Executive Brief: Community Bank Technology Decisions",
        description:
          "A concise brief on why smaller institutions can compete on technology strategy—not budget size alone.",
        badge: "executive-brief",
        filePath:
          "/downloads/Most-Community-Banks-Dont-Fall-Behind-Because-of-Smaller-Budgets.pdf",
        fileName: "Most-Community-Banks-Dont-Fall-Behind-Because-of-Smaller-Budgets.pdf",
      },
    ],
  },
  "sales-vs-implementation": {
    tags: ["implementation", "advisory", "vendor evaluation", "deployment"],
    libraryCategory: "Advisory",
    topicCluster: "technology-vendor-evaluation",
    learningPath: "technology-vendor-evaluation",
    learningOrder: 2,
    nextSteps: [
      {
        slug: "ccaas-vendor-checklist",
        rationale:
          "Apply a structured scoring model when your evaluation reaches the CCaaS or platform shortlist stage.",
      },
    ],
    related: [
      "independent-technology-advisory",
      "ccaas-vendor-checklist",
    ],
    linkAliases: ["sales with implementation", "implementation planning"],
  },
  "ccaas-trends-2025": {
    tags: ["ccaas", "contact center", "ai", "technology trends", "communications"],
    libraryCategory: "Communications",
    topicCluster: "contact-center-modernization",
    learningPath: "contact-center-modernization",
    learningOrder: 3,
    nextSteps: [
      {
        slug: "ccaas-vendor-checklist",
        rationale:
          "Translate trend narratives into a scored evaluation before your renewal deadline.",
      },
    ],
    related: [
      "ai-auto-summarization-contact-centers",
      "ccaas-vendor-checklist",
      "ccaas-addon-vs-point-solution",
    ],
    linkAliases: ["CCaaS trends", "contact center technology"],
    executiveResources: [
      {
        title: "Executive Brief: CX Without a Full Journey Redesign",
        description:
          "How one institution improved customer experience by fixing operational handoffs—not redesigning the entire journey.",
        badge: "executive-brief",
        filePath:
          "/downloads/This-bank-didnt-fix-CX-by-redesigning-the-customer-journey.pdf",
        fileName: "This-bank-didnt-fix-CX-by-redesigning-the-customer-journey.pdf",
      },
    ],
  },
};
