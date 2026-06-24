import type { Metadata } from "next";
import { site } from "@/content/site";

export function createMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const fullTitle =
    title === site.name ? `${site.name} | ${site.tagline}` : `${title} | ${site.name}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: `${site.url}${path}`,
      siteName: site.name,
      type: "website",
    },
  };
}
