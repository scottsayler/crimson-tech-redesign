import { getProject, type Project } from "@/content/projects";
import { getResearch, research, type Research } from "@/content/research";
import {
  getTopicCluster,
  topicClusters,
  type TopicCluster,
  type TopicClusterCategory,
} from "@/content/topic-clusters";
import { getTool, type Tool } from "@/content/tools";

function uniqueBySlug<T extends { slug: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
}

function articleMatchesCluster(article: Research, cluster: TopicCluster): boolean {
  if (article.topicCluster === cluster.slug) return true;

  for (const category of cluster.categories) {
    if (category.articleSlugs?.includes(article.slug)) return true;
    if (
      category.libraryCategories?.length &&
      article.libraryCategory &&
      category.libraryCategories.includes(article.libraryCategory)
    ) {
      if (cluster.slug === "restaurant-technology") {
        return article.relatedIndustries?.includes("restaurants") ?? false;
      }
      if (cluster.slug === "connectivity") {
        return article.relatedIndustries?.includes("restaurants") ?? false;
      }
    }
  }

  return false;
}

export function getTopicClusterForArticle(
  articleSlug: string,
): TopicCluster | undefined {
  const article = getResearch(articleSlug);
  if (!article) return undefined;

  if (article.topicCluster) {
    return getTopicCluster(article.topicCluster);
  }

  return topicClusters.find((cluster) => articleMatchesCluster(article, cluster));
}

function articlesForCategory(
  category: TopicClusterCategory,
  cluster: TopicCluster,
): Research[] {
  const resolved: Research[] = [];

  if (category.articleSlugs?.length) {
    for (const slug of category.articleSlugs) {
      const article = getResearch(slug);
      if (article) resolved.push(article);
    }
  }

  if (category.libraryCategories?.length) {
    const libraryMatches = research.filter((item) => {
      if (!item.libraryCategory) return false;
      if (!category.libraryCategories!.includes(item.libraryCategory)) return false;
      if (cluster.slug === "restaurant-technology") {
        return item.relatedIndustries?.includes("restaurants") ?? false;
      }
      if (cluster.slug === "connectivity") {
        return item.relatedIndustries?.includes("restaurants") ?? false;
      }
      return true;
    });

    libraryMatches.sort((a, b) => {
      const orderA = a.learningOrder ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.learningOrder ?? Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      return a.title.localeCompare(b.title);
    });

    resolved.push(...libraryMatches);
  }

  return uniqueBySlug(resolved);
}

export function getTopicClusterArticlesByCategory(
  clusterSlug: string,
): { category: TopicClusterCategory; articles: Research[] }[] {
  const cluster = getTopicCluster(clusterSlug);
  if (!cluster) return [];

  return cluster.categories
    .map((category) => ({
      category,
      articles: articlesForCategory(category, cluster),
    }))
    .filter((entry) => entry.articles.length > 0);
}

export function getTopicClusterArticles(clusterSlug: string): Research[] {
  const grouped = getTopicClusterArticlesByCategory(clusterSlug);
  return uniqueBySlug(grouped.flatMap((entry) => entry.articles));
}

export function getTopicClusterProjects(clusterSlug: string): Project[] {
  const cluster = getTopicCluster(clusterSlug);
  if (!cluster) return [];

  return cluster.relatedProjects
    .map((slug) => getProject(slug))
    .filter((project): project is Project => Boolean(project));
}

export function getTopicClusterTools(clusterSlug: string): Tool[] {
  const cluster = getTopicCluster(clusterSlug);
  if (!cluster) return [];

  return cluster.relatedToolSlugs
    .map((slug) => getTool(slug))
    .filter((tool): tool is Tool => Boolean(tool));
}

export function getTopicClusterHref(clusterSlug: string): string {
  return `/research/topics/${clusterSlug}`;
}

export function buildTopicClusterLinkIndex(): Map<string, string> {
  const index = new Map<string, string>();

  for (const cluster of topicClusters) {
    index.set(cluster.title.toLowerCase(), cluster.slug);
    for (const alias of cluster.linkAliases ?? []) {
      index.set(alias.toLowerCase(), cluster.slug);
    }
  }

  return index;
}
