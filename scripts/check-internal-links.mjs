#!/usr/bin/env node
/**
 * Internal link checker for the production build.
 *
 * Usage:
 *   1. npm run build && npm run start
 *   2. In another terminal: npm run check:links
 *
 * Options:
 *   --base-url=http://localhost:3000
 *   --max-redirects=5
 *   --allow-redirect-links   Do not fail when an internal href redirects
 *
 * Exit code 1 when broken internal routes are found.
 */

import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    "base-url": { type: "string", default: "http://127.0.0.1:3000" },
    "max-redirects": { type: "string", default: "5" },
    "allow-redirect-links": { type: "boolean", default: false },
    help: { type: "boolean", default: false },
  },
  strict: true,
});

if (values.help) {
  console.log(`Usage: node scripts/check-internal-links.mjs [options]

Options:
  --base-url=URL              Origin of the running production server
  --max-redirects=N           Fail if a request redirects more than N times
  --allow-redirect-links      Allow internal hrefs that 3xx to a canonical URL
`);
  process.exit(0);
}

const BASE_URL = values["base-url"].replace(/\/$/, "");
const MAX_REDIRECTS = Number(values["max-redirects"]);
const ALLOW_REDIRECT_LINKS = values["allow-redirect-links"];

const SKIP_PREFIXES = ["mailto:", "tel:", "sms:", "javascript:", "data:"];
const STATIC_SEED_PATHS = [
  "/",
  "/about",
  "/solutions",
  "/research",
  "/decision-center",
  "/industries",
  "/crimson-cx",
  "/projects",
  "/contact",
  "/privacy",
  "/research/topics",
];

function isExternal(href) {
  return /^(https?:)?\/\//i.test(href) || SKIP_PREFIXES.some((p) => href.startsWith(p));
}

function normalizePath(href, pageUrl) {
  if (!href || href.startsWith("#") || isExternal(href)) return null;

  let absolute;
  try {
    absolute = new URL(href, pageUrl);
  } catch {
    return null;
  }

  if (absolute.origin !== new URL(BASE_URL).origin) return null;

  const path = `${absolute.pathname}${absolute.search}` || "/";

  // Build/runtime assets are not content routes.
  if (
    path.startsWith("/_next/") ||
    path.startsWith("/favicon") ||
    /\.(css|js|map|png|jpe?g|gif|svg|webp|ico|woff2?)$/i.test(absolute.pathname)
  ) {
    return null;
  }

  return path;
}

async function fetchText(url) {
  const response = await fetch(url, {
    redirect: "manual",
    headers: { Accept: "text/html,application/xml,text/xml,*/*" },
  });
  const text = await response.text();
  return { response, text };
}

async function resolvePath(path) {
  const hops = [];
  let current = path;

  for (let i = 0; i <= MAX_REDIRECTS; i += 1) {
    const url = `${BASE_URL}${current}`;
    const { response } = await fetchText(url);
    const status = response.status;
    const location = response.headers.get("location");

    if (status >= 300 && status < 400 && location) {
      const next = normalizePath(location, url) ?? location;
      hops.push({ from: current, to: next, status });
      if (typeof next !== "string" || !next.startsWith("/")) {
        return { ok: false, status, path: current, hops, error: "redirected off-origin" };
      }
      current = next;
      continue;
    }

    if (status >= 200 && status < 300) {
      return { ok: true, status, path: current, hops };
    }

    return { ok: false, status, path: current, hops, error: `HTTP ${status}` };
  }

  return {
    ok: false,
    status: 0,
    path: current,
    hops,
    error: `redirect chain exceeded ${MAX_REDIRECTS}`,
  };
}

function extractHrefs(html) {
  const hrefs = [];
  const re = /\bhref\s*=\s*(["'])(.*?)\1/gi;
  let match;
  while ((match = re.exec(html)) !== null) {
    hrefs.push(match[2]);
  }
  return hrefs;
}

function extractSitemapLocs(xml) {
  const locs = [];
  const re = /<loc>(.*?)<\/loc>/gi;
  let match;
  while ((match = re.exec(xml)) !== null) {
    locs.push(match[1].trim());
  }
  return locs;
}

async function main() {
  console.log(`Checking internal links against ${BASE_URL}`);

  let sitemapPaths = [];
  try {
    const { response, text } = await fetchText(`${BASE_URL}/sitemap.xml`);
    if (!response.ok) {
      throw new Error(`sitemap HTTP ${response.status}`);
    }
    sitemapPaths = extractSitemapLocs(text)
      .map((loc) => {
        try {
          return new URL(loc).pathname;
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      // Skip binary downloads in page crawl seeds; still validated as targets.
      .filter((path) => !path.startsWith("/downloads/"));
  } catch (error) {
    console.error(`Failed to load sitemap.xml: ${error.message}`);
    console.error("Start the production server first: npm run build && npm run start");
    process.exit(1);
  }

  const seedPaths = [...new Set([...STATIC_SEED_PATHS, ...sitemapPaths])];
  const htmlPages = [];
  const downloadTargets = extractSitemapLocs(
    (await fetchText(`${BASE_URL}/sitemap.xml`)).text,
  )
    .map((loc) => {
      try {
        return new URL(loc).pathname;
      } catch {
        return null;
      }
    })
    .filter((path) => path?.startsWith("/downloads/"));

  const pageIssues = [];
  const linkFailures = [];
  const redirectLinkFailures = [];
  const checkedTargets = new Map();

  async function checkTarget(path, from) {
    if (!checkedTargets.has(path)) {
      checkedTargets.set(path, await resolvePath(path));
    }
    const result = checkedTargets.get(path);

    if (!result.ok) {
      linkFailures.push({ from, href: path, ...result });
      return;
    }

    if (result.hops.length > 0 && !ALLOW_REDIRECT_LINKS) {
      redirectLinkFailures.push({
        from,
        href: path,
        canonical: result.path,
        hops: result.hops,
      });
    }
  }

  for (const path of seedPaths) {
    const url = `${BASE_URL}${path}`;
    const { response, text } = await fetchText(url);

    if (response.status >= 300 && response.status < 400) {
      pageIssues.push({
        path,
        issue: `seed URL redirected (${response.status}) — exclude from crawl seeds / sitemap`,
      });
      continue;
    }

    if (!response.ok) {
      pageIssues.push({ path, issue: `HTTP ${response.status}` });
      continue;
    }

    htmlPages.push({ path, html: text });

    for (const href of extractHrefs(text)) {
      const normalized = normalizePath(href, url);
      if (!normalized) continue;
      await checkTarget(normalized, path);
    }
  }

  for (const path of downloadTargets) {
    await checkTarget(path, "sitemap.xml");
  }

  // Explicit legacy redirect smoke checks (must redirect, not 404).
  const legacyRedirects = [
    "/tools",
    "/services",
    "/insights",
    "/services/technology-advisory",
    "/insights/ccaas-vendor-checklist",
  ];
  const redirectSmoke = [];
  for (const path of legacyRedirects) {
    const result = await resolvePath(path);
    if (!result.ok || result.hops.length === 0) {
      redirectSmoke.push({ path, issue: result.error ?? "expected permanent redirect" });
    } else if (result.hops.length > 1) {
      redirectSmoke.push({
        path,
        issue: `redirect chain (${result.hops.map((h) => `${h.from}->${h.to}`).join(", ")})`,
      });
    }
  }

  const brokenUnique = [...new Map(linkFailures.map((f) => [`${f.href}|${f.status}`, f])).values()];
  const redirectUnique = [
    ...new Map(redirectLinkFailures.map((f) => [`${f.from}|${f.href}`, f])).values(),
  ];

  console.log(`
Seed HTML pages crawled: ${htmlPages.length}
Unique internal targets checked: ${checkedTargets.size}
Broken internal targets: ${brokenUnique.length}
Internal hrefs that redirect: ${redirectUnique.length}
Seed page issues: ${pageIssues.length}
Legacy redirect smoke failures: ${redirectSmoke.length}
`);

  if (pageIssues.length) {
    console.log("Seed page issues:");
    for (const issue of pageIssues) {
      console.log(`  - ${issue.path}: ${issue.issue}`);
    }
  }

  if (brokenUnique.length) {
    console.log("Broken internal links:");
    for (const failure of brokenUnique.slice(0, 50)) {
      console.log(
        `  - ${failure.href} (from ${failure.from}) → ${failure.error ?? failure.status}`,
      );
    }
  }

  if (redirectUnique.length) {
    console.log("Internal links that should point to the canonical destination:");
    for (const failure of redirectUnique.slice(0, 50)) {
      console.log(`  - ${failure.from} links to ${failure.href} → ${failure.canonical}`);
    }
  }

  if (redirectSmoke.length) {
    console.log("Legacy redirect smoke failures:");
    for (const issue of redirectSmoke) {
      console.log(`  - ${issue.path}: ${issue.issue}`);
    }
  }

  const failed =
    brokenUnique.length > 0 ||
    pageIssues.length > 0 ||
    redirectSmoke.length > 0 ||
    (!ALLOW_REDIRECT_LINKS && redirectUnique.length > 0);

  if (failed) {
    process.exit(1);
  }

  console.log("Internal link check passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
