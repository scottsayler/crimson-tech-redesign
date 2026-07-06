export type TopicClusterCategory = {
  label: string;
  /** Match research items by libraryCategory when set */
  libraryCategories?: string[];
  /** Explicit article slugs for this section (preserves order) */
  articleSlugs?: string[];
};

export type TopicCluster = {
  slug: string;
  title: string;
  description: string;
  categories: TopicClusterCategory[];
  relatedSolutions: string[];
  relatedIndustries: string[];
  relatedProjects: string[];
  relatedToolSlugs: string[];
  learningPathSlug?: string;
  linkAliases?: string[];
};

export const topicClusters: TopicCluster[] = [
  {
    slug: "contact-center-modernization",
    title: "Contact Center Modernization",
    description:
      "CCaaS evaluation, contact center AI, WFM integration, and modernization decisions—from vendor shortlists through production readiness.",
    learningPathSlug: "contact-center-modernization",
    categories: [
      {
        label: "Evaluation & selection",
        articleSlugs: [
          "ccaas-vendor-checklist",
          "ccaas-addon-vs-point-solution",
          "ccaas-trends-2025",
        ],
      },
      {
        label: "AI in the contact center",
        articleSlugs: ["ai-auto-summarization-contact-centers"],
      },
    ],
    relatedSolutions: [
      "communications-collaboration",
      "customer-experience",
      "ai-workflow-automation",
    ],
    relatedIndustries: ["financial-services", "healthcare", "professional-services"],
    relatedProjects: ["contact-center-transformation"],
    relatedToolSlugs: [],
    linkAliases: [
      "contact center modernization",
      "ccaas evaluation",
      "contact center",
    ],
  },
  {
    slug: "technology-vendor-evaluation",
    title: "Technology Vendor Evaluation",
    description:
      "Independent advisory, scoring models, and implementation planning for platform decisions—before contract signature.",
    learningPathSlug: "technology-vendor-evaluation",
    categories: [
      {
        label: "Advisory foundations",
        articleSlugs: ["independent-technology-advisory", "sales-vs-implementation"],
      },
      {
        label: "Applied frameworks",
        articleSlugs: ["ccaas-vendor-checklist", "ccaas-addon-vs-point-solution"],
      },
    ],
    relatedSolutions: ["technology-advisory", "communications-collaboration"],
    relatedIndustries: [
      "professional-services",
      "technology-driven-organizations",
      "multi-location-businesses",
    ],
    relatedProjects: ["vendor-evaluation-advisory"],
    relatedToolSlugs: [],
    linkAliases: ["vendor evaluation", "technology advisory", "vendor selection"],
  },
  {
    slug: "ai-readiness",
    title: "AI Readiness",
    description:
      "Moving AI from pilot to production—governance, workflow design, and contact center use cases that survive compliance review.",
    learningPathSlug: "ai-readiness",
    categories: [
      {
        label: "Production AI workflows",
        articleSlugs: ["ai-auto-summarization-contact-centers"],
      },
      {
        label: "Platform context",
        articleSlugs: ["ccaas-trends-2025", "independent-technology-advisory"],
      },
    ],
    relatedSolutions: ["ai-workflow-automation", "customer-experience"],
    relatedIndustries: ["financial-services", "healthcare"],
    relatedProjects: ["ai-workflow-modernization"],
    relatedToolSlugs: [],
    linkAliases: ["ai readiness", "ai in contact centers", "ai governance"],
  },
  {
    slug: "connectivity",
    title: "Connectivity & Resilience",
    description:
      "Store and site connectivity, carrier evaluation, failover design, and network resilience for multi-location operators.",
    learningPathSlug: "restaurant-connectivity",
    categories: [
      {
        label: "Outage response & visibility",
        libraryCategories: ["Connectivity"],
        articleSlugs: [
          "restaurant-internet-outages",
          "restaurant-network-visibility",
        ],
      },
      {
        label: "Network design & carriers",
        libraryCategories: ["Connectivity"],
        articleSlugs: ["restaurants-networking", "restaurants-best-internet"],
      },
      {
        label: "Infrastructure & checklists",
        libraryCategories: ["Infrastructure", "Connectivity"],
        articleSlugs: [
          "restaurant-pots-replacement",
          "restaurants-pots-replacement",
          "restaurant-network-checklist",
        ],
      },
    ],
    relatedSolutions: ["connectivity-infrastructure", "technology-advisory"],
    relatedIndustries: ["restaurants", "multi-location-businesses"],
    relatedProjects: [],
    relatedToolSlugs: [
      "downtime-cost-calculator",
      "network-assessment",
      "pots-savings-calculator",
    ],
    linkAliases: ["connectivity", "network resilience", "store connectivity"],
  },
  {
    slug: "restaurant-technology",
    title: "Restaurant Technology",
    description:
      "Multi-location restaurant technology—connectivity, operations, store openings, vendor governance, and infrastructure modernization.",
    learningPathSlug: "restaurant-operations",
    categories: [
      {
        label: "Connectivity",
        libraryCategories: ["Connectivity"],
      },
      {
        label: "Operations",
        libraryCategories: ["Operations"],
      },
      {
        label: "Infrastructure",
        libraryCategories: ["Infrastructure"],
      },
    ],
    relatedSolutions: [
      "connectivity-infrastructure",
      "technology-advisory",
      "customer-experience",
    ],
    relatedIndustries: ["restaurants"],
    relatedProjects: ["vendor-evaluation-advisory"],
    relatedToolSlugs: [
      "downtime-cost-calculator",
      "network-assessment",
      "pots-savings-calculator",
      "vendor-consolidation-calculator",
    ],
    linkAliases: ["restaurant technology", "multi-location restaurants"],
  },
];

export function getTopicCluster(slug: string): TopicCluster | undefined {
  return topicClusters.find((cluster) => cluster.slug === slug);
}
