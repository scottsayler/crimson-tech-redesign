import { getIndustry, industries, type Industry } from "@/content/industries";
import { research, type Research, type ResearchType } from "@/content/research";
import { getSolution, type Solution } from "@/content/solutions";

function uniqueBySlug<T extends { slug: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
}

export function getResearchForSolution(solutionSlug: string): Research[] {
  return research.filter((item) => item.relatedSolutions?.includes(solutionSlug));
}

export function getResearchForIndustry(industrySlug: string): Research[] {
  const industry = getIndustry(industrySlug);
  const direct = research.filter((item) =>
    item.relatedIndustries?.includes(industrySlug),
  );
  const viaSolutions = industry
    ? research.filter((item) =>
        item.relatedSolutions?.some((solutionSlug) =>
          industry.relatedServices.includes(solutionSlug),
        ),
      )
    : [];

  return uniqueBySlug([...direct, ...viaSolutions]);
}

export function getSolutionsForResearch(item: Research): Solution[] {
  return (item.relatedSolutions ?? [])
    .map((slug) => getSolution(slug))
    .filter((solution): solution is Solution => Boolean(solution));
}

export function getIndustriesForResearch(item: Research): Industry[] {
  const explicit = (item.relatedIndustries ?? [])
    .map((slug) => getIndustry(slug))
    .filter((industry): industry is Industry => Boolean(industry));

  const viaSolutions = industries.filter((industry) =>
    industry.relatedServices.some((solutionSlug) =>
      item.relatedSolutions?.includes(solutionSlug),
    ),
  );

  return uniqueBySlug([...explicit, ...viaSolutions]);
}

export function getIndustriesForSolution(solutionSlug: string): Industry[] {
  return industries.filter((industry) =>
    industry.relatedServices.includes(solutionSlug),
  );
}

export function getSolutionsForIndustrySlug(industrySlug: string): Solution[] {
  const industry = getIndustry(industrySlug);
  if (!industry) return [];

  return industry.relatedServices
    .map((slug) => getSolution(slug))
    .filter((solution): solution is Solution => Boolean(solution));
}

export function getRelatedResearch(current: Research, limit = 3): Research[] {
  const candidates = research.filter((item) => item.slug !== current.slug);

  const scored = candidates
    .map((item) => {
      let score = 0;
      if (item.category === current.category) score += 2;
      if (item.type === current.type) score += 1;
      if (
        item.relatedSolutions?.some((slug) =>
          current.relatedSolutions?.includes(slug),
        )
      ) {
        score += 3;
      }
      if (
        item.relatedIndustries?.some((slug) =>
          current.relatedIndustries?.includes(slug),
        )
      ) {
        score += 3;
      }
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);

  const related = uniqueBySlug(scored);
  if (related.length >= limit) return related.slice(0, limit);

  const filler = candidates.filter(
    (item) => !related.some((entry) => entry.slug === item.slug),
  );

  return [...related, ...filler].slice(0, limit);
}

export function getResearchForPractice(practiceSlug: string): Research[] {
  if (practiceSlug === "crimson-cx") {
    return getResearchForIndustry("financial-services");
  }
  return [];
}

const PROJECT_SOLUTION_LINKS: Record<string, string[]> = {
  "vendor-evaluation-advisory": ["technology-advisory", "communications-collaboration"],
  "contact-center-transformation": [
    "customer-experience",
    "communications-collaboration",
  ],
  "ai-workflow-modernization": ["ai-workflow-automation"],
  cfbverdict: ["digital-products", "technology-advisory"],
};

export function getResearchForProject(projectSlug: string): Research[] {
  const solutionSlugs = PROJECT_SOLUTION_LINKS[projectSlug] ?? ["technology-advisory"];
  return uniqueBySlug(
    solutionSlugs.flatMap((solutionSlug) => getResearchForSolution(solutionSlug)),
  );
}

export function getFeaturedResearch(limit = 6): Research[] {
  const featured = research.filter((item) => item.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return uniqueBySlug([...featured, ...research]).slice(0, limit);
}

export function getRelatedSolutionsForResearchType(
  type: ResearchType,
): Solution[] {
  const items = research.filter((item) => item.type === type);
  const slugs = new Set<string>();

  for (const item of items) {
    for (const solutionSlug of item.relatedSolutions ?? []) {
      slugs.add(solutionSlug);
    }
  }

  return [...slugs]
    .map((slug) => getSolution(slug))
    .filter((solution): solution is Solution => Boolean(solution));
}

export function getRelatedIndustriesForResearchType(
  type: ResearchType,
): Industry[] {
  const items = research.filter((item) => item.type === type);
  return uniqueBySlug(items.flatMap((item) => getIndustriesForResearch(item)));
}

export function getFeaturedResearchForType(
  type: ResearchType,
  limit = 3,
): Research[] {
  const items = research.filter((item) => item.type === type);
  const featured = items.filter((item) => item.featured);

  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }

  return uniqueBySlug([
    ...featured,
    ...items.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    ),
  ]).slice(0, limit);
}
