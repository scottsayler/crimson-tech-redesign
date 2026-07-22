#!/usr/bin/env node
/**
 * Production smoke test for a deployed (or local production) site.
 *
 * Usage:
 *   SITE_URL=https://crimsontech.co npm run audit:production
 *   SITE_URL=http://127.0.0.1:3000 npm run audit:production
 *
 * Does not submit the contact form.
 * Exit code 1 on critical failures.
 */

const SITE_URL = (process.env.SITE_URL || process.env.BASE_URL || "")
  .trim()
  .replace(/\/$/, "");

if (!SITE_URL) {
  console.error("Set SITE_URL, for example:");
  console.error("  SITE_URL=https://crimsontech.co npm run audit:production");
  process.exit(1);
}

const PRODUCTION_ORIGIN = "https://crimsontech.co";
const CRITICAL_PATHS = ["/", "/research", "/decision-center", "/contact"];
const LEGACY_REDIRECTS = [
  { from: "/tools", to: "/decision-center" },
  { from: "/services", to: "/solutions" },
  { from: "/insights", to: "/research" },
];

const SKIP_PREFIXES = ["mailto:", "tel:", "sms:", "javascript:", "data:"];

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
  if (absolute.origin !== new URL(SITE_URL).origin) return null;
  const path = `${absolute.pathname}${absolute.search}` || "/";
  if (
    path.startsWith("/_next/") ||
    path.startsWith("/favicon") ||
    /\.(css|js|map|png|jpe?g|gif|svg|webp|ico|woff2?)$/i.test(absolute.pathname)
  ) {
    return null;
  }
  return path;
}

function extractHrefs(html) {
  const hrefs = [];
  const re = /\bhref\s*=\s*(["'])(.*?)\1/gi;
  let match;
  while ((match = re.exec(html)) !== null) hrefs.push(match[2]);
  return hrefs;
}

function getCanonical(html) {
  const match =
    html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
    html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  return match ? match[1] : null;
}

function hasNoindex(html) {
  const robots =
    html.match(/name=["']robots["'][^>]*content=["']([^"']+)["']/i)?.[1] ||
    html.match(/content=["']([^"']+)["'][^>]*name=["']robots["']/i)?.[1] ||
    "";
  return /noindex/i.test(robots);
}

async function fetchManual(url) {
  const response = await fetch(url, {
    redirect: "manual",
    headers: { Accept: "text/html,application/xml,text/xml,*/*" },
  });
  const text = await response.text();
  return { response, text };
}

async function main() {
  console.log(`Production audit against ${SITE_URL}`);
  const errors = [];
  const warnings = [];
  const checked = new Set();

  async function assertOk(path, label = path) {
    const { response, text } = await fetchManual(`${SITE_URL}${path}`);
    if (response.status >= 300 && response.status < 400) {
      errors.push(`${label}: unexpected redirect ${response.status}`);
      return null;
    }
    if (!response.ok) {
      errors.push(`${label}: HTTP ${response.status}`);
      return null;
    }
    return text;
  }

  for (const path of CRITICAL_PATHS) {
    const html = await assertOk(path);
    if (!html) continue;

    const canonical = getCanonical(html);
    const expectedPath = path === "/" ? "" : path;
    const expected = `${PRODUCTION_ORIGIN}${expectedPath}`;
    const expectedHome = `${PRODUCTION_ORIGIN}/`;
    if (!canonical) {
      errors.push(`${path}: missing canonical`);
    } else if (
      canonical !== expected &&
      !(path === "/" && (canonical === expected || canonical === expectedHome))
    ) {
      // Local audits still expect production canonicals from metadataBase.
      if (!canonical.startsWith(PRODUCTION_ORIGIN)) {
        errors.push(`${path}: canonical not production domain (${canonical})`);
      } else if (canonical !== expected && canonical !== expectedHome) {
        errors.push(`${path}: canonical mismatch (${canonical})`);
      }
    }

    const pageUrl = `${SITE_URL}${path}`;
    for (const href of extractHrefs(html)) {
      const target = normalizePath(href, pageUrl);
      if (!target || checked.has(target)) continue;
      checked.add(target);
      const { response } = await fetchManual(`${SITE_URL}${target}`);
      let status = response.status;
      let location = response.headers.get("location");
      let hops = 0;
      while (status >= 300 && status < 400 && location && hops < 5) {
        hops += 1;
        const next = normalizePath(location, `${SITE_URL}${target}`);
        if (!next) break;
        const follow = await fetchManual(`${SITE_URL}${next}`);
        status = follow.response.status;
        location = follow.response.headers.get("location");
      }
      if (status === 404 || status >= 500) {
        errors.push(`${path} links to ${target} → HTTP ${status}`);
      }
    }
  }

  const sitemap = await assertOk("/sitemap.xml", "sitemap");
  if (sitemap && !/<urlset[\s>]/i.test(sitemap) && !/<sitemapindex[\s>]/i.test(sitemap)) {
    warnings.push("sitemap.xml did not look like a sitemap document");
  }

  const robots = await assertOk("/robots.txt", "robots.txt");
  if (robots && !/sitemap:/i.test(robots)) {
    warnings.push("robots.txt missing Sitemap directive");
  }

  for (const { from, to } of LEGACY_REDIRECTS) {
    const { response } = await fetchManual(`${SITE_URL}${from}`);
    const location = response.headers.get("location") || "";
    if (!(response.status >= 300 && response.status < 400)) {
      errors.push(`${from}: expected redirect, got ${response.status}`);
    } else if (!location.includes(to)) {
      errors.push(`${from}: redirected to ${location}, expected ${to}`);
    } else if (![301, 308].includes(response.status)) {
      warnings.push(`${from}: redirect status ${response.status} (prefer 301/308)`);
    }
  }

  const resultsPath = "/decision-center/banking-cx-friction-assessment/results";
  const resultsHtml = await assertOk(resultsPath, "results page");
  if (resultsHtml && !hasNoindex(resultsHtml)) {
    errors.push(`${resultsPath}: missing noindex`);
  }

  console.log(`
Checked critical pages: ${CRITICAL_PATHS.length}
Internal targets probed: ${checked.size}
Errors: ${errors.length}
Warnings: ${warnings.length}
`);

  for (const message of errors) console.log(`ERROR  ${message}`);
  for (const message of warnings) console.log(`WARN   ${message}`);

  if (errors.length) {
    process.exit(1);
  }
  console.log("Production audit passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
