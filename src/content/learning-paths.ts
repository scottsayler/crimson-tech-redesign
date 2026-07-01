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
