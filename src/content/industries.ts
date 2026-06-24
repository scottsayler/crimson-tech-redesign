export type Industry = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  challenges: string[];
  howWeHelp: string[];
  relatedServices: string[];
};

export const industries: Industry[] = [
  {
    slug: "financial-services",
    title: "Financial Services",
    shortDescription:
      "CX, contact centers, AI, and compliance-aware modernization for banks and credit unions.",
    description:
      "Financial institutions face mounting pressure to modernize customer experience while maintaining operational stability and regulatory compliance. We help leadership navigate technology decisions with structured, independent guidance.",
    challenges: [
      "Siloed systems and disconnected customer journeys",
      "Contact center technology that can't keep pace with expectations",
      "AI initiatives that stall before reaching production",
      "Vendor evaluations overwhelmed by marketing and demos",
    ],
    howWeHelp: [
      "Independent CCaaS and communications platform evaluation",
      "Customer experience friction analysis and transformation roadmaps",
      "AI readiness assessment and workflow automation",
      "Operational modernization with compliance in mind",
    ],
    relatedServices: [
      "customer-experience",
      "communications-collaboration",
      "ai-workflow-automation",
      "technology-advisory",
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    shortDescription:
      "Communications, operations, and experience modernization for care organizations.",
    description:
      "Healthcare organizations need technology that supports patient and member experience without adding operational complexity. We help evaluate platforms, modernize communications, and improve service delivery.",
    challenges: [
      "Fragmented patient communication across channels",
      "Contact center strain and long wait times",
      "Legacy systems limiting operational visibility",
      "Technology decisions made under vendor pressure",
    ],
    howWeHelp: [
      "Communications and contact center modernization",
      "Workflow automation for operational efficiency",
      "Infrastructure and connectivity planning",
      "Vendor-neutral platform evaluation",
    ],
    relatedServices: [
      "communications-collaboration",
      "customer-experience",
      "connectivity-infrastructure",
    ],
  },
  {
    slug: "professional-services",
    title: "Professional Services",
    shortDescription:
      "Collaboration, workflow, and client experience for knowledge-driven firms.",
    description:
      "Professional services firms depend on seamless internal collaboration and polished client interactions. We help modernize the technology that supports both.",
    challenges: [
      "Disconnected collaboration tools across teams",
      "Manual workflows slowing client delivery",
      "Inconsistent client communication experience",
      "Security and connectivity requirements for remote work",
    ],
    howWeHelp: [
      "UCaaS and collaboration platform strategy",
      "Workflow automation and process improvement",
      "Secure connectivity and infrastructure planning",
      "Digital client experience development",
    ],
    relatedServices: [
      "communications-collaboration",
      "ai-workflow-automation",
      "digital-products",
    ],
  },
  {
    slug: "multi-location-businesses",
    title: "Multi-Location Businesses",
    shortDescription:
      "Standardization, connectivity, and unified operations across locations.",
    description:
      "Organizations with multiple locations need consistent technology, reliable connectivity, and operational visibility. We help design architectures that scale without creating new silos.",
    challenges: [
      "Inconsistent technology across locations",
      "Carrier and connectivity complexity",
      "Limited visibility into operations across sites",
      "Difficulty standardizing customer experience",
    ],
    howWeHelp: [
      "Connectivity and carrier evaluation",
      "Unified communications deployment",
      "Infrastructure standardization planning",
      "Operational visibility and workflow design",
    ],
    relatedServices: [
      "connectivity-infrastructure",
      "communications-collaboration",
      "technology-advisory",
    ],
  },
  {
    slug: "technology-driven-organizations",
    title: "Technology-Driven Organizations",
    shortDescription:
      "Advisory, product development, and automation for organizations where technology is core.",
    description:
      "When technology is central to your business model, you need a partner who understands both strategy and execution. We help evaluate platforms, build products, and automate operations.",
    challenges: [
      "Rapid technology change outpacing internal capacity",
      "AI and automation initiatives without clear ROI",
      "Need for both advisory guidance and hands-on execution",
      "Platform decisions with long-term architectural impact",
    ],
    howWeHelp: [
      "Technology advisory and vendor evaluation",
      "Digital product strategy and development",
      "AI and workflow automation",
      "Infrastructure and connectivity planning",
    ],
    relatedServices: [
      "technology-advisory",
      "digital-products",
      "ai-workflow-automation",
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
