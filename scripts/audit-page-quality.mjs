#!/usr/bin/env node
/**
 * Local production page-quality audit.
 *
 * Usage:
 *   npm run build && npm run start
 *   node scripts/audit-page-quality.mjs
 */

import { parseArgs } from "node:util";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const { values } = parseArgs({
  options: {
    "base-url": { type: "string", default: "http://127.0.0.1:3000" },
    out: { type: "string", default: "seo-crawl/local-audit-report.json" },
  },
  strict: true,
});

const BASE_URL = values["base-url"].replace(/\/$/, "");

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function metaContent(html, nameOrProperty) {
  const patterns = [
    new RegExp(
      `<meta[^>]+(?:name|property)=["']${nameOrProperty}["'][^>]+content=["']([^"']*)["']`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["']${nameOrProperty}["']`,
      "i",
    ),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return decodeEntities(match[1]);
  }
  return null;
}

function getTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? decodeEntities(match[1].replace(/\s+/g, " ").trim()) : null;
}

function getCanonical(html) {
  const match = html.match(
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
  ) || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  return match ? decodeEntities(match[1]) : null;
}

function getH1s(html) {
  const matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  return matches.map((m) =>
    decodeEntities(m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()),
  );
}

function getHeadingLevels(html) {
  return [...html.matchAll(/<(h[1-6])\b/gi)].map((m) => Number(m[1].slice(1)));
}

function parseJsonLd(html) {
  const blocks = [
    ...html.matchAll(
      /<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];
  const parsed = [];
  const errors = [];
  for (const block of blocks) {
    try {
      parsed.push(JSON.parse(block[1]));
    } catch (error) {
      errors.push(error.message);
    }
  }
  return { parsed, errors };
}

function extractInternalHrefs(html, pageUrl) {
  const hrefs = [];
  const re = /\bhref\s*=\s*(["'])(.*?)\1/gi;
  let match;
  while ((match = re.exec(html)) !== null) {
    const href = match[2];
    if (!href || href.startsWith("#") || /^(mailto:|tel:|https?:\/\/)/i.test(href)) {
      continue;
    }
    try {
      const absolute = new URL(href, pageUrl);
      if (absolute.origin === new URL(BASE_URL).origin) {
        hrefs.push(absolute.pathname);
      }
    } catch {
      // ignore
    }
  }
  return [...new Set(hrefs)];
}

function imageAltIssues(html) {
  const imgs = [...html.matchAll(/<img\b([^>]*)>/gi)];
  const missing = [];
  for (const img of imgs) {
    const attrs = img[1];
    if (!/\balt\s*=/.test(attrs)) {
      missing.push(attrs.slice(0, 80));
    }
  }
  return missing;
}

function robotsNoindex(html) {
  const robots = metaContent(html, "robots") ?? "";
  return /noindex/i.test(robots);
}

async function fetchPage(path) {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, { redirect: "manual" });
  const html = await response.text();
  return { url, response, html };
}

async function main() {
  const sitemapResponse = await fetch(`${BASE_URL}/sitemap.xml`);
  if (!sitemapResponse.ok) {
    throw new Error(`Cannot load sitemap: HTTP ${sitemapResponse.status}`);
  }
  const sitemapXml = await sitemapResponse.text();
  const locs = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/gi)].map((m) => m[1].trim());
  const htmlPaths = locs
    .map((loc) => new URL(loc).pathname)
    .filter((path) => !path.startsWith("/downloads/"));

  // Intentionally excluded / utility pages to audit separately.
  const utilityPaths = [
    "/decision-center/banking-cx-friction-assessment/results",
  ];

  const titles = new Map();
  const descriptions = new Map();
  const pageReports = [];
  const issues = [];

  for (const path of htmlPaths) {
    const { url, response, html } = await fetchPage(path);
    const title = getTitle(html);
    const description = metaContent(html, "description");
    const canonical = getCanonical(html);
    const ogTitle = metaContent(html, "og:title");
    const ogDescription = metaContent(html, "og:description");
    const h1s = getH1s(html);
    const headings = getHeadingLevels(html);
    const jsonLd = parseJsonLd(html);
    const noindex = robotsNoindex(html);
    const altMissing = imageAltIssues(html);
    const internalLinks = extractInternalHrefs(html, url);

    const report = {
      path,
      status: response.status,
      title,
      description,
      canonical,
      ogTitle,
      ogDescription,
      h1s,
      headingLevels: headings,
      noindex,
      jsonLdErrorCount: jsonLd.errors.length,
      missingAltCount: altMissing.length,
      internalLinkCount: internalLinks.length,
    };
    pageReports.push(report);

    if (response.status !== 200) {
      issues.push({ path, severity: "error", message: `HTTP ${response.status}` });
    }
    if (!title) issues.push({ path, severity: "error", message: "Missing title" });
    if (!description) {
      issues.push({ path, severity: "error", message: "Missing meta description" });
    }
    if (!canonical) {
      issues.push({ path, severity: "error", message: "Missing canonical" });
    } else {
      const expected = `https://crimsontech.co${path === "/" ? "" : path}`;
      const expectedHomeSlash = "https://crimsontech.co/";
      if (
        canonical !== expected &&
        !(path === "/" && (canonical === expected || canonical === expectedHomeSlash))
      ) {
        issues.push({
          path,
          severity: "error",
          message: `Canonical mismatch: ${canonical} (expected ${expected})`,
        });
      }
    }
    if (noindex) {
      issues.push({
        path,
        severity: "error",
        message: "Indexable sitemap URL is marked noindex",
      });
    }
    if (h1s.length !== 1) {
      issues.push({
        path,
        severity: "error",
        message: `Expected 1 H1, found ${h1s.length}`,
      });
    }
    if (!ogTitle || !ogDescription) {
      issues.push({
        path,
        severity: "error",
        message: "Missing Open Graph title or description",
      });
    }
    if (jsonLd.errors.length) {
      issues.push({
        path,
        severity: "error",
        message: `Invalid JSON-LD: ${jsonLd.errors.join("; ")}`,
      });
    }
    if (altMissing.length) {
      issues.push({
        path,
        severity: "warn",
        message: `${altMissing.length} image(s) missing alt`,
      });
    }
    for (let i = 1; i < headings.length; i += 1) {
      if (headings[i] - headings[i - 1] > 1) {
        issues.push({
          path,
          severity: "warn",
          message: `Heading skip h${headings[i - 1]} → h${headings[i]}`,
        });
        break;
      }
    }
    if (internalLinks.length === 0 && path !== "/") {
      issues.push({
        path,
        severity: "warn",
        message: "No internal links found",
      });
    }

    if (title) {
      if (!titles.has(title)) titles.set(title, []);
      titles.get(title).push(path);
    }
    if (description) {
      if (!descriptions.has(description)) descriptions.set(description, []);
      descriptions.get(description).push(path);
    }
  }

  for (const [title, paths] of titles) {
    if (paths.length > 1) {
      issues.push({
        path: paths.join(", "),
        severity: "error",
        message: `Duplicate title: ${title}`,
      });
    }
  }
  for (const [description, paths] of descriptions) {
    if (paths.length > 1) {
      // Brand boilerplate may legitimately repeat short descriptions; flag only exact full duplicates.
      issues.push({
        path: paths.join(", "),
        severity: "warn",
        message: `Duplicate description (${paths.length} pages): ${description.slice(0, 80)}…`,
      });
    }
  }

  for (const path of utilityPaths) {
    const { response, html } = await fetchPage(path);
    if (response.status !== 200) {
      issues.push({ path, severity: "error", message: `Utility page HTTP ${response.status}` });
      continue;
    }
    if (!robotsNoindex(html)) {
      issues.push({
        path,
        severity: "error",
        message: "Results/utility page should be noindex",
      });
    }
  }

  // Redirect smoke
  const redirects = [
    ["/tools", "/decision-center"],
    ["/services", "/solutions"],
    ["/insights", "/research"],
  ];
  for (const [from, to] of redirects) {
    const response = await fetch(`${BASE_URL}${from}`, { redirect: "manual" });
    const location = response.headers.get("location") || "";
    if (!(response.status >= 300 && response.status < 400)) {
      issues.push({
        path: from,
        severity: "error",
        message: `Expected redirect, got ${response.status}`,
      });
    } else if (!location.includes(to)) {
      issues.push({
        path: from,
        severity: "error",
        message: `Redirected to ${location}, expected ${to}`,
      });
    } else if (![301, 308].includes(response.status)) {
      issues.push({
        path: from,
        severity: "warn",
        message: `Redirect status ${response.status} (prefer 301/308)`,
      });
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    sitemapHtmlPages: htmlPaths.length,
    sitemapDownloads: locs.length - htmlPaths.length,
    issueCounts: {
      error: issues.filter((i) => i.severity === "error").length,
      warn: issues.filter((i) => i.severity === "warn").length,
    },
    issues,
    pages: pageReports,
  };

  writeFileSync(join(process.cwd(), values.out), JSON.stringify(report, null, 2));
  console.log(`Wrote ${values.out}`);
  console.log(
    `Pages: ${pageReports.length}; errors: ${report.issueCounts.error}; warnings: ${report.issueCounts.warn}`,
  );

  if (report.issueCounts.error > 0) {
    for (const issue of issues.filter((i) => i.severity === "error").slice(0, 40)) {
      console.log(`ERROR ${issue.path}: ${issue.message}`);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
