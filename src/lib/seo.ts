import type { Metadata } from "next";
import { site } from "@/content/site";

export function createMetadata({
  title,
  description,
  path = "",
  index = true,
}: {
  title: string;
  description: string;
  path?: string;
  /** Set false for utility/results pages that should stay out of search results. */
  index?: boolean;
}): Metadata {
  const fullTitle =
    title === site.name ? `${site.name} | ${site.tagline}` : `${title} | ${site.name}`;
  // Prefer a trailing slash on the homepage so the canonical matches the URL Google crawls
  // (`https://example.com/`) and avoids "Duplicate without user-selected canonical".
  const url = !path || path === "/" ? `${site.url}/` : `${site.url}${path}`;
  const ogImageUrl = `${site.url}${site.ogImage}`;

  return {
    metadataBase: new URL(site.url),
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: index
      ? undefined
      : {
          index: false,
          follow: false,
        },
    icons: {
      icon: [
        { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        {
          url: "/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
      shortcut: "/favicon.ico",
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${site.name} — ${site.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImageUrl],
    },
  };
}
