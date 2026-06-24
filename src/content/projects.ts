export type Project = {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  externalUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "cfbverdict",
    title: "CFBVerdict",
    category: "Digital Product",
    shortDescription:
      "A data-driven sports analytics platform demonstrating product strategy, data architecture, analytics, and digital execution.",
    description:
      "CFBVerdict is a sports analytics platform built from the ground up—combining data architecture, predictive analytics, and a customer-facing digital experience. It demonstrates our ability to move from product concept to operational platform.",
    highlights: [
      "Product strategy and market positioning",
      "Data architecture and analytics pipeline",
      "Customer-facing web application",
      "End-to-end digital product execution",
    ],
    externalUrl: "https://cfbverdict.com",
    featured: true,
  },
  {
    slug: "vendor-evaluation-advisory",
    title: "Multi-Location Vendor Evaluation",
    category: "Advisory Engagement",
    shortDescription:
      "Structured vendor evaluation and platform selection for a multi-location organization evaluating UCaaS providers.",
    description:
      "A multi-location organization faced a major communications platform decision with competing vendor proposals and internal disagreement. We structured the evaluation, facilitated stakeholder alignment, and guided selection to a platform that fit operational requirements.",
    highlights: [
      "Vendor-neutral evaluation framework",
      "Stakeholder alignment and decision facilitation",
      "Tailored vendor demos based on real requirements",
      "Contract negotiation support",
    ],
  },
  {
    slug: "contact-center-transformation",
    title: "Contact Center Transformation",
    category: "CX Transformation",
    shortDescription:
      "Contact center modernization roadmap and vendor alignment for an organization struggling with legacy systems.",
    description:
      "An organization with aging contact center technology needed a clear path to modernization without disrupting daily operations. We assessed current state, identified friction points, and designed a phased transformation roadmap.",
    highlights: [
      "Current state assessment and friction analysis",
      "CCaaS evaluation and vendor shortlisting",
      "Phased modernization roadmap",
      "Workforce and operational impact planning",
    ],
  },
  {
    slug: "ai-workflow-modernization",
    title: "AI Workflow Modernization",
    category: "AI & Workflow",
    shortDescription:
      "Practical AI adoption and workflow automation to move from pilot projects to production-ready operations.",
    description:
      "An organization had multiple AI pilots that never reached production. We assessed readiness, prioritized use cases, designed governance frameworks, and implemented workflow automation that delivered measurable operational improvement.",
    highlights: [
      "AI readiness assessment",
      "Use case prioritization and governance design",
      "Workflow automation implementation",
      "Production deployment and adoption planning",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
