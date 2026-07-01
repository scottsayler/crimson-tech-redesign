import { getIndustry } from "@/content/industries";
import {
  getLearningPath,
  getLearningPathForArticle,
  type LearningPath,
  type LearningPathStep,
} from "@/content/learning-paths";
import {
  getResearch,
  getResearchHubPath,
  research,
  researchTypeLabels,
  type Research,
} from "@/content/research";
import { getRelatedResearch } from "@/lib/relationships";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type LearningPathContext = {
  path: LearningPath;
  currentIndex: number;
  currentStep: LearningPathStep;
  nextSteps: LearningPathStep[];
};

export type ContinueReadingItem = {
  slug: string;
  title: string;
  rationale: string;
};

function uniqueBySlug<T extends { slug: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
}

function resolveResearch(slugs: string[]): Research[] {
  return slugs
    .map((slug) => getResearch(slug))
    .filter((item): item is Research => Boolean(item));
}

export function getTopicBreadcrumb(item: Research): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [{ label: "Research", href: "/research" }];

  const primaryIndustry = item.relatedIndustries?.[0];
  if (primaryIndustry) {
    const industry = getIndustry(primaryIndustry);
    if (industry) {
      crumbs.push({
        label: industry.title,
        href: `/industries/${industry.slug}`,
      });
    }
  } else {
    crumbs.push({
      label: researchTypeLabels[item.type],
      href: getResearchHubPath(item.type),
    });
  }

  if (item.libraryCategory && primaryIndustry) {
    crumbs.push({
      label: item.libraryCategory,
      href: `/industries/${primaryIndustry}`,
    });
  } else if (!primaryIndustry) {
    crumbs.push({ label: item.category });
  }

  crumbs.push({ label: item.title });
  return crumbs;
}

export function getLearningPathContext(
  articleSlug: string,
): LearningPathContext | undefined {
  const path = getLearningPathForArticle(articleSlug);
  if (!path) return undefined;

  const currentIndex = path.steps.findIndex((step) => step.slug === articleSlug);
  if (currentIndex < 0) return undefined;

  return {
    path,
    currentIndex,
    currentStep: path.steps[currentIndex],
    nextSteps: path.steps.slice(currentIndex + 1, currentIndex + 3),
  };
}

export function getContinueReading(item: Research): ContinueReadingItem[] {
  if (item.nextSteps?.length) {
    return item.nextSteps
      .map((step) => {
        const article = getResearch(step.slug);
        if (!article) return null;
        return {
          slug: article.slug,
          title: article.title,
          rationale: step.rationale,
        };
      })
      .filter((entry): entry is ContinueReadingItem => Boolean(entry));
  }

  const pathContext = getLearningPathContext(item.slug);
  if (!pathContext) return [];

  return pathContext.nextSteps
    .map((step) => {
      const article = getResearch(step.slug);
      if (!article) return null;
      return {
        slug: article.slug,
        title: article.title,
        rationale: step.rationale,
      };
    })
    .filter((entry): entry is ContinueReadingItem => Boolean(entry));
}

export function getExplicitRelated(item: Research, limit = 4): Research[] {
  if (item.related?.length) {
    const explicit = resolveResearch(item.related);
    if (explicit.length >= limit) return explicit.slice(0, limit);
  }

  return getRelatedResearch(item, limit);
}

export function getRelatedTopics(item: Research, limit = 4): Research[] {
  const candidates: Research[] = [];

  if (item.related?.length) {
    candidates.push(...resolveResearch(item.related));
  }

  if (item.tags?.length) {
    const tagMatches = research.filter((candidate) => {
      if (candidate.slug === item.slug) return false;
      return candidate.tags?.some((tag) => item.tags?.includes(tag));
    });
    candidates.push(...tagMatches);
  }

  const path = item.learningPath ? getLearningPath(item.learningPath) : undefined;
  if (path) {
    const siblings = resolveResearch(
      path.steps.map((step) => step.slug).filter((slug) => slug !== item.slug),
    );
    candidates.push(...siblings);
  }

  const resolved = uniqueBySlug(candidates);
  if (resolved.length >= limit) return resolved.slice(0, limit);

  const fallback = getRelatedResearch(item, limit).filter(
    (candidate) => !resolved.some((entry) => entry.slug === candidate.slug),
  );

  return [...resolved, ...fallback].slice(0, limit);
}

export function getSeeAlso(item: Research, limit = 3): Research[] {
  const industries = item.relatedIndustries ?? [];
  const currentPath = item.learningPath;

  const candidates = research.filter((candidate) => {
    if (candidate.slug === item.slug) return false;
    if (!industries.some((slug) => candidate.relatedIndustries?.includes(slug))) {
      return false;
    }
    if (currentPath && candidate.learningPath === currentPath) return false;
    if (item.libraryCategory && candidate.libraryCategory === item.libraryCategory) {
      return false;
    }
    return true;
  });

  if (candidates.length >= limit) return candidates.slice(0, limit);

  const fallback = getRelatedResearch(item, limit).filter(
    (candidate) =>
      candidate.slug !== item.slug &&
      !candidates.some((entry) => entry.slug === candidate.slug) &&
      candidate.libraryCategory !== item.libraryCategory,
  );

  return uniqueBySlug([...candidates, ...fallback]).slice(0, limit);
}

export function getIndustryLibraryArticles(
  industrySlug: string,
  category?: string,
): Research[] {
  return research.filter((item) => {
    if (!item.relatedIndustries?.includes(industrySlug)) return false;
    if (category && item.libraryCategory !== category) return false;
    return Boolean(item.libraryCategory);
  });
}

export function buildLinkIndex(): Map<string, string> {
  const index = new Map<string, string>();

  for (const item of research) {
    index.set(item.title.toLowerCase(), item.slug);
    for (const alias of item.linkAliases ?? []) {
      index.set(alias.toLowerCase(), item.slug);
    }
  }

  return new Map(
    [...index.entries()].sort((a, b) => b[0].length - a[0].length),
  );
}
