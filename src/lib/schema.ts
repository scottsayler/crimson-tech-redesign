import { site } from "@/content/site";
import { founderProfile } from "@/content/credibility";
import { parseResearchContent } from "@/lib/research-sections";

export type SchemaNode = Record<string, unknown>;

export type FaqItem = {
  question: string;
  answer: string;
};

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function absoluteUrl(path = ""): string {
  if (!path || path === "/") return `${site.url}/`;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildOrganization(): SchemaNode {
  return {
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: absoluteUrl(),
    logo: absoluteUrl(site.logo),
    image: absoluteUrl(site.ogImage),
    email: site.email,
    description: site.description,
    sameAs: [site.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Downers Grove",
      addressRegion: "IL",
      addressCountry: "US",
    },
    founder: {
      "@type": "Person",
      "@id": `${site.url}/#founder`,
      name: founderProfile.name,
      jobTitle: founderProfile.title,
      url: absoluteUrl(founderProfile.href),
    },
  };
}

export function buildProfessionalService(): SchemaNode {
  return {
    "@type": "ProfessionalService",
    "@id": `${site.url}/#professional-service`,
    name: site.name,
    description: site.description,
    url: absoluteUrl(),
    image: absoluteUrl(site.ogImage),
    email: site.email,
    areaServed: "US",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Downers Grove",
      addressRegion: "IL",
      addressCountry: "US",
    },
    founder: {
      "@type": "Person",
      "@id": `${site.url}/#founder`,
      name: founderProfile.name,
      jobTitle: founderProfile.title,
      url: absoluteUrl(founderProfile.href),
    },
    parentOrganization: {
      "@id": `${site.url}/#organization`,
    },
  };
}

export function buildWebSite(): SchemaNode {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: absoluteUrl(),
    description: site.description,
    publisher: {
      "@id": `${site.url}/#organization`,
    },
  };
}

export function buildArticle({
  title,
  description,
  path,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
}): SchemaNode {
  const url = absoluteUrl(path);
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    image: absoluteUrl(site.ogImage),
    author: {
      "@type": "Person",
      "@id": `${site.url}/#founder`,
      name: founderProfile.name,
      url: absoluteUrl(founderProfile.href),
    },
    publisher: {
      "@id": `${site.url}/#organization`,
    },
  };
}

export function buildService({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): SchemaNode {
  const url = absoluteUrl(path);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    url,
    provider: {
      "@id": `${site.url}/#organization`,
    },
  };
}

export function buildCollectionPage({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): SchemaNode {
  const url = absoluteUrl(path);
  return {
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    name,
    description,
    url,
    isPartOf: {
      "@id": `${site.url}/#website`,
    },
  };
}

export function buildWebApplication({
  name,
  description,
  path,
  applicationCategory = "BusinessApplication",
}: {
  name: string;
  description: string;
  path: string;
  applicationCategory?: string;
}): SchemaNode {
  const url = absoluteUrl(path);
  return {
    "@type": "WebApplication",
    "@id": `${url}#webapp`,
    name,
    description,
    url,
    applicationCategory,
    operatingSystem: "Web",
    browserRequirements: "Requires a modern web browser with JavaScript enabled",
    provider: {
      "@id": `${site.url}/#organization`,
    },
  };
}

export function buildBreadcrumbList(items: BreadcrumbItem[]): SchemaNode | null {
  if (items.length < 2) return null;

  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildFaqPage(faqs: FaqItem[]): SchemaNode | null {
  const valid = faqs.filter(
    (faq) => faq.question.trim().length > 0 && faq.answer.trim().length > 0,
  );
  if (valid.length === 0) return null;

  return {
    "@type": "FAQPage",
    mainEntity: valid.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildCreativeWork({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): SchemaNode {
  const url = absoluteUrl(path);
  return {
    "@type": "CreativeWork",
    "@id": `${url}#work`,
    name,
    description,
    url,
    publisher: {
      "@id": `${site.url}/#organization`,
    },
  };
}

export function buildAboutPage({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): SchemaNode {
  const url = absoluteUrl(path);
  return {
    "@type": "AboutPage",
    "@id": `${url}#about`,
    name,
    description,
    url,
    mainEntity: {
      "@id": `${site.url}/#organization`,
    },
  };
}

export function buildContactPage({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): SchemaNode {
  const url = absoluteUrl(path);
  return {
    "@type": "ContactPage",
    "@id": `${url}#contact`,
    name,
    description,
    url,
  };
}

export function buildWebPage({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): SchemaNode {
  const url = absoluteUrl(path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name,
    description,
    url,
    isPartOf: {
      "@id": `${site.url}/#website`,
    },
  };
}

/** Sitewide graph for Organization + ProfessionalService + WebSite. */
export function buildSiteGraph(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@graph": [buildOrganization(), buildProfessionalService(), buildWebSite()],
  };
}

export function buildSchemaGraph(nodes: Array<SchemaNode | null | undefined>): SchemaNode {
  const graph = nodes.filter((node): node is SchemaNode => Boolean(node));
  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function getResearchFaqs(content: string[]): FaqItem[] {
  return parseResearchContent(content)
    .sections.filter((section) => section.kind === "faq")
    .flatMap((section) => section.faqs)
    .filter((faq) => faq.question.trim() && faq.answer.trim());
}
