import type { MetadataRoute } from "next";
import { insights } from "@/content/insights";
import { industries } from "@/content/industries";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/services",
    "/industries",
    "/crimson-cx",
    "/projects",
    "/insights",
    "/contact",
    "/privacy",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const servicePages = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
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

  const insightPages = insights.map((i) => ({
    url: `${site.url}/insights/${i.slug}`,
    lastModified: new Date(i.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...industryPages,
    ...projectPages,
    ...insightPages,
  ];
}
