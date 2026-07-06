import type { MetadataRoute } from "next";
import { industries } from "@/content/industries";
import { projects } from "@/content/projects";
import { RESEARCH_HUB_PATHS, research } from "@/content/research";
import { topicClusters } from "@/content/topic-clusters";
import { solutions } from "@/content/solutions";
import { site } from "@/content/site";
import { tools } from "@/content/tools";
import { getExecutiveResources, getLocalExecutiveResourcePaths } from "@/lib/executive-resources";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/solutions",
    "/research",
    "/tools",
    "/industries",
    "/crimson-cx",
    "/projects",
    "/contact",
    "/privacy",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path === "/research" ? 0.9 : 0.8,
  }));

  const solutionPages = solutions.map((s) => ({
    url: `${site.url}/solutions/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const industryPages = industries.map((i) => ({
    url: `${site.url}/industries/${i.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectPages = projects.map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const researchHubPages = Object.values(RESEARCH_HUB_PATHS).map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const topicClusterPages = [
    {
      url: `${site.url}/research/topics`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.88,
    },
    ...topicClusters.map((cluster) => ({
      url: `${site.url}/research/topics/${cluster.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.87,
    })),
  ];

  const researchPages = research.map((r) => ({
    url: `${site.url}/research/${r.slug}`,
    lastModified: new Date(r.date),
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  const downloadPages = research.flatMap((item) =>
    getLocalExecutiveResourcePaths(getExecutiveResources(item)).map((path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(item.date),
      changeFrequency: "yearly" as const,
      priority: 0.65,
    }))
  );

  const toolPages = tools.map((tool) => ({
    url: `${site.url}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [
    ...staticPages,
    ...solutionPages,
    ...industryPages,
    ...projectPages,
    ...researchHubPages,
    ...topicClusterPages,
    ...researchPages,
    ...downloadPages,
    ...toolPages,
  ];
}
