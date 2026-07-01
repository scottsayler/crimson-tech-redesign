import type { MetadataRoute } from "next";
import { industries } from "@/content/industries";
import { projects } from "@/content/projects";
import { RESEARCH_HUB_PATHS, research } from "@/content/research";
import { solutions } from "@/content/solutions";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/solutions",
    "/research",
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

  const researchPages = research.map((r) => ({
    url: `${site.url}/research/${r.slug}`,
    lastModified: new Date(r.date),
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  const downloadPages = research
    .filter(
      (item) =>
        item.executiveResource &&
        !item.executiveResource.downloadUrl.startsWith("http"),
    )
    .map((item) => ({
      url: `${site.url}${item.executiveResource!.downloadUrl}`,
      lastModified: new Date(item.date),
      changeFrequency: "yearly" as const,
      priority: 0.65,
    }));

  return [
    ...staticPages,
    ...solutionPages,
    ...industryPages,
    ...projectPages,
    ...researchHubPages,
    ...researchPages,
    ...downloadPages,
  ];
}
