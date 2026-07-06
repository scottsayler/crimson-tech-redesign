export type LearningPathStep = {
  slug: string;
  rationale: string;
};

export type LearningPath = {
  slug: string;
  title: string;
  description: string;
  industry?: string;
  steps: LearningPathStep[];
};

export const learningPaths: LearningPath[] = [
  {
    slug: "restaurant-connectivity",
    title: "Restaurant Connectivity Playbook",
    description:
      "A guided path from outage response to resilient store connectivity, network design, and infrastructure modernization.",
    industry: "restaurants",
    steps: [
      {
        slug: "restaurant-internet-outages",
        rationale:
          "Start here if outages are interrupting payments, POS, or online ordering. This establishes what breaks and how to respond in the first five minutes.",
      },
      {
        slug: "restaurant-network-visibility",
        rationale:
          "Read this next to understand what to monitor across stores before managers or guests report a problem.",
      },
      {
        slug: "restaurants-networking",
        rationale:
          "Move from incident response to store network design standards that reduce repeat failures across locations.",
      },
      {
        slug: "restaurants-best-internet",
        rationale:
          "Use this when you are ready to evaluate carriers, circuits, and backup options with a decision framework.",
      },
      {
        slug: "restaurant-pots-replacement",
        rationale:
          "Finish the connectivity path by addressing legacy analog lines that still create cost, compliance, and outage risk.",
      },
    ],
  },
  {
    slug: "restaurant-operations",
    title: "Restaurant Operations Playbook",
    description:
      "A guided path for multi-location operators reducing vendor sprawl, standardizing technology, and opening stores on time.",
    industry: "restaurants",
    steps: [
      {
        slug: "restaurant-vendor-sprawl",
        rationale:
          "Start here if invoices, contracts, and support contacts have multiplied across locations without a clear owner.",
      },
      {
        slug: "restaurant-technology-standardization",
        rationale:
          "Read this next to define the store technology standards franchisees and operators should follow.",
      },
      {
        slug: "restaurants-opening-technology-checklist",
        rationale:
          "Use this when new store openings need a repeatable technology checklist instead of last-minute improvisation.",
      },
    ],
  },
  {
    slug: "contact-center-modernization",
    title: "Contact Center Modernization Path",
    description:
      "A guided evaluation path from CCaaS shortlist through WFM integration and production AI decisions.",
    steps: [
      {
        slug: "ccaas-vendor-checklist",
        rationale:
          "Start with a scored evaluation framework before engaging CCaaS finalists on demos.",
      },
      {
        slug: "ccaas-addon-vs-point-solution",
        rationale:
          "Decide whether bundled CCaaS capabilities or point solutions fit your WFM and analytics needs.",
      },
      {
        slug: "ccaas-trends-2025",
        rationale:
          "Filter market narratives against your operational requirements and compliance constraints.",
      },
      {
        slug: "ai-auto-summarization-contact-centers",
        rationale:
          "If AI is in scope, define workflow, QA, and governance before production deployment.",
      },
    ],
  },
  {
    slug: "technology-vendor-evaluation",
    title: "Technology Vendor Evaluation Path",
    description:
      "A guided path from independent advisory principles through platform scoring and implementation planning.",
    steps: [
      {
        slug: "independent-technology-advisory",
        rationale:
          "Establish evaluation criteria and independence requirements before vendor meetings begin.",
      },
      {
        slug: "sales-vs-implementation",
        rationale:
          "Separate sales demonstrations from implementation scope before contract review.",
      },
      {
        slug: "ccaas-vendor-checklist",
        rationale:
          "Apply structured scoring when your evaluation reaches a platform or CCaaS shortlist.",
      },
    ],
  },
  {
    slug: "ai-readiness",
    title: "AI Readiness Path",
    description:
      "A focused path for moving contact center AI from pilot to governed production workflows.",
    steps: [
      {
        slug: "ai-auto-summarization-contact-centers",
        rationale:
          "Start with one production-ready use case and define QA sampling before scaling.",
      },
      {
        slug: "ccaas-trends-2025",
        rationale:
          "Understand which AI capabilities are production-ready in your CCaaS evaluation context.",
      },
    ],
  },
];

export function getLearningPath(pathSlug: string): LearningPath | undefined {
  return learningPaths.find((path) => path.slug === pathSlug);
}

export function getLearningPathForArticle(
  articleSlug: string,
): LearningPath | undefined {
  return learningPaths.find((path) =>
    path.steps.some((step) => step.slug === articleSlug),
  );
}
