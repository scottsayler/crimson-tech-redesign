import type { ResearchNextStep, ExecutiveResource } from "./research";

export type ResearchNavigationMeta = {
  tags?: string[];
  libraryCategory?: string;
  related?: string[];
  relatedTools?: { slug: string; label: string }[];
  nextSteps?: ResearchNextStep[];
  learningPath?: string;
  learningOrder?: number;
  linkAliases?: string[];
  executiveResource?: ExecutiveResource;
};

export const researchNavigationMeta: Record<string, ResearchNavigationMeta> = {
  "restaurant-internet-outages": {
    tags: ["connectivity", "outages", "failover", "pos", "restaurants"],
    libraryCategory: "Connectivity",
    learningPath: "restaurant-connectivity",
    learningOrder: 1,
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
    related: [
      "ccaas-addon-vs-point-solution",
      "ccaas-trends-2025",
      "independent-technology-advisory",
    ],
    linkAliases: ["CCaaS vendor", "contact center vendor"],
    executiveResource: {
      heading: "Download the Executive Checklist",
      description:
        'Prefer a printable version? Download the professionally designed "6-Question Checklist for Choosing a CCaaS Vendor" to share with your team or use during vendor evaluations.',
      downloadUrl:
        "/downloads/The-6-Question-Checklist-for-Choosing-a-CCaaS-Vendor.pdf",
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
  },
  "ai-auto-summarization-contact-centers": {
    tags: ["ai", "auto-summarization", "contact center", "workflow", "governance"],
    libraryCategory: "AI & Automation",
    related: [
      "ccaas-vendor-checklist",
      "ccaas-trends-2025",
      "independent-technology-advisory",
    ],
    linkAliases: ["auto-summarization", "contact centers"],
    executiveResource: {
      heading: "Download the Executive Guide",
      description:
        'Prefer a printable version? Download the professionally designed guide on auto-summarization in agent assist tools to share with your team or use during technology evaluations.',
      downloadUrl:
        "/downloads/Unlocking-Contact-Center-Excellence-The-Power-of-Autosummarization-in-Agent-Assist-Tools.pdf",
      fileName:
        "Unlocking-Contact-Center-Excellence-The-Power-of-Autosummarization-in-Agent-Assist-Tools.pdf",
      variant: "pdf",
      features: [
        "Auto-summarization use cases",
        "Workflow design considerations",
        "Governance and quality review",
        "CRM and system integration",
        "Agent productivity impact",
        "Supervisor efficiency and data quality",
      ],
    },
  },
  "ccaas-addon-vs-point-solution": {
    tags: ["ccaas", "decision framework", "point solution", "communications"],
    libraryCategory: "Communications",
    related: [
      "ccaas-vendor-checklist",
      "ccaas-trends-2025",
      "independent-technology-advisory",
    ],
    linkAliases: ["CCaaS add-on", "point solution"],
    executiveResource: {
      heading: "Download the Decision Matrix",
      description:
        'Prefer a printable version? Download the professionally designed "CCaaS Add-on vs. Point Solution Decision Matrix" to share with stakeholders or use during vendor evaluations.',
      downloadUrl:
        "/downloads/CCaaS-Add-on-vs-Point-Solution-Decision-Matrix.pdf",
      fileName: "CCaaS-Add-on-vs-Point-Solution-Decision-Matrix.pdf",
      variant: "pdf",
      features: [
        "Seven decision dimensions",
        "CCaaS add-on vs. point solution comparison",
        "Key point solution categories",
        "Operational maturity assessment",
        "Decision framework implementation steps",
        "Strategic choice guidance",
      ],
    },
  },
  "independent-technology-advisory": {
    tags: ["advisory", "vendor neutral", "technology strategy", "evaluation"],
    libraryCategory: "Advisory",
    related: [
      "sales-vs-implementation",
      "ccaas-vendor-checklist",
      "ccaas-addon-vs-point-solution",
    ],
    linkAliases: ["independent technology advisory", "independent advisory"],
  },
  "sales-vs-implementation": {
    tags: ["implementation", "advisory", "vendor evaluation", "deployment"],
    libraryCategory: "Advisory",
    related: [
      "independent-technology-advisory",
      "ccaas-vendor-checklist",
    ],
    linkAliases: ["sales with implementation", "implementation planning"],
  },
  "ccaas-trends-2025": {
    tags: ["ccaas", "contact center", "ai", "technology trends", "communications"],
    libraryCategory: "Communications",
    related: [
      "ai-auto-summarization-contact-centers",
      "ccaas-vendor-checklist",
      "ccaas-addon-vs-point-solution",
    ],
    linkAliases: ["CCaaS trends", "contact center technology"],
  },
};
