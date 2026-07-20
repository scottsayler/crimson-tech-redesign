/**
 * Screaming Frog–style crawl of localhost for SEO exports.
 * Produces CSVs matching common SF exports the user listed.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { load } from "cheerio";
import path from "node:path";

const BASE = process.env.CRAWL_BASE || "http://127.0.0.1:3000";
const OUT = path.resolve("seo-crawl");

const seedPaths = [
  "/",
  "/about",
  "/contact",
  "/privacy",
  "/crimson-cx",
  "/solutions",
  "/industries",
  "/projects",
  "/research",
  "/research/topics",
  "/research/problems",
  "/research/technology",
  "/research/buying-guides",
  "/research/industry-guides",
  "/research/vendor-comparisons",
  "/research/decision-frameworks",
  "/research/checklists",
  "/tools",
  "/decision-center",
  "/decision-center/banking-cx-friction-assessment",
  "/decision-center/banking-cx-friction-assessment/results",
  // legacy redirect sources
  "/services",
  "/insights",
];

/** @typedef {{
 *  address: string,
 *  status: number,
 *  redirectUrl: string,
 *  title: string,
 *  metaDescription: string,
 *  canonical: string,
 *  h1: string[],
 *  h1Count: number,
 *  imagesMissingAlt: {src: string}[],
 *  missingAltCount: number,
 *  indexable: string,
 *  isHtml: boolean,
 * }} PageRow */

/** @type {Map<string, PageRow>} */
const pages = new Map();
/** @type {Set<string>} */
const queued = new Set();
/** @type {string[]} */
const queue = [];

function normalizePath(href, fromPath) {
  try {
    const u = new URL(href, `${BASE}${fromPath}`);
    if (u.origin !== new URL(BASE).origin) return null;
    u.hash = "";
    let p = u.pathname;
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    return p + u.search;
  } catch {
    return null;
  }
}

function enqueue(p) {
  if (!p || queued.has(p)) return;
  queued.add(p);
  queue.push(p);
}

function csvEscape(v) {
  const s = String(v ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function toCsv(headers, rows) {
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => csvEscape(row[h])).join(","));
  }
  return lines.join("\n") + "\n";
}

async function fetchPage(pagePath) {
  const url = `${BASE}${pagePath}`;
  const res = await fetch(url, {
    redirect: "manual",
    headers: { "user-agent": "CrimsonSEOCrawl/1.0 (SF-equivalent)" },
  });

  const status = res.status;
  const location = res.headers.get("location") || "";
  let redirectUrl = "";
  if (status >= 300 && status < 400 && location) {
    try {
      redirectUrl = new URL(location, url).href;
    } catch {
      redirectUrl = location;
    }
  }

  /** @type {PageRow} */
  const row = {
    address: url,
    status,
    redirectUrl,
    title: "",
    metaDescription: "",
    canonical: "",
    h1: [],
    h1Count: 0,
    imagesMissingAlt: [],
    missingAltCount: 0,
    indexable: status >= 200 && status < 300 ? "Indexable" : "Non-Indexable",
    isHtml: false,
  };

  if (status >= 200 && status < 300) {
    const contentType = res.headers.get("content-type") || "";
    const isHtml = contentType.includes("text/html");
    row.isHtml = isHtml;

    if (!isHtml) {
      pages.set(pagePath, row);
      return;
    }

    const html = await res.text();
    const $ = load(html);
    row.title = $("title").first().text().trim();
    row.metaDescription =
      $('meta[name="description"]').attr("content")?.trim() || "";
    row.canonical = $('link[rel="canonical"]').attr("href")?.trim() || "";
    const robots =
      $('meta[name="robots"]').attr("content")?.toLowerCase() || "";
    if (robots.includes("noindex")) row.indexable = "Non-Indexable";

    $("h1").each((_, el) => {
      const t = $(el).text().replace(/\s+/g, " ").trim();
      if (t) row.h1.push(t);
    });
    row.h1Count = row.h1.length;

    $("img").each((_, el) => {
      const alt = $(el).attr("alt");
      const src = $(el).attr("src") || "";
      // missing alt attribute entirely (empty alt is OK for decorative)
      if (alt === undefined) {
        row.imagesMissingAlt.push({ src });
      }
    });
    row.missingAltCount = row.imagesMissingAlt.length;

    // Discover internal links
    $("a[href]").each((_, el) => {
      const href = $(el).attr("href");
      if (!href) return;
      const next = normalizePath(href, pagePath);
      if (next) enqueue(next);
    });
  } else if (redirectUrl) {
    const next = normalizePath(redirectUrl, pagePath);
    if (next) enqueue(next);
  }

  pages.set(pagePath, row);
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  for (const p of seedPaths) enqueue(p);

  while (queue.length) {
    const batch = queue.splice(0, 8);
    await Promise.all(batch.map((p) => fetchPage(p)));
  }

  const all = [...pages.values()].sort((a, b) =>
    a.address.localeCompare(b.address)
  );

  // Internal_all.csv style
  writeFileSync(
    path.join(OUT, "internal_all.csv"),
    toCsv(
      [
        "Address",
        "Status Code",
        "Status",
        "Indexability",
        "Title 1",
        "Meta Description 1",
        "Canonical Link Element 1",
        "H1-1",
        "H1-2",
        "H1 Count",
        "Images Missing Alt",
        "Redirect URL",
      ],
      all.map((r) => ({
        Address: r.address,
        "Status Code": r.status,
        Status: r.status,
        Indexability: r.indexable,
        "Title 1": r.title,
        "Meta Description 1": r.metaDescription,
        "Canonical Link Element 1": r.canonical,
        "H1-1": r.h1[0] || "",
        "H1-2": r.h1[1] || "",
        "H1 Count": r.h1Count,
        "Images Missing Alt": r.missingAltCount,
        "Redirect URL": r.redirectUrl,
      }))
    )
  );

  // Duplicate titles
  /** @type {Map<string, PageRow[]>} */
  const byTitle = new Map();
  for (const r of all) {
    if (!r.isHtml || !r.title || r.status !== 200) continue;
    const list = byTitle.get(r.title) || [];
    list.push(r);
    byTitle.set(r.title, list);
  }
  const dupTitles = [...byTitle.entries()]
    .filter(([, list]) => list.length > 1)
    .flatMap(([title, list]) =>
      list.map((r) => ({
        Address: r.address,
        Title: title,
        Occurrences: list.length,
      }))
    );
  writeFileSync(
    path.join(OUT, "page_titles_duplicate.csv"),
    toCsv(["Address", "Title", "Occurrences"], dupTitles)
  );

  // H1 issues: missing or multiple (HTML pages only)
  const h1Issues = all
    .filter((r) => r.isHtml && r.status === 200 && (r.h1Count === 0 || r.h1Count > 1))
    .map((r) => ({
      Address: r.address,
      "H1 Count": r.h1Count,
      "H1-1": r.h1[0] || "",
      "H1-2": r.h1[1] || "",
      Issue: r.h1Count === 0 ? "Missing H1" : "Multiple H1s",
    }));
  writeFileSync(
    path.join(OUT, "h1_issues.csv"),
    toCsv(["Address", "H1 Count", "H1-1", "H1-2", "Issue"], h1Issues)
  );

  // Canonical issues: missing or pointing elsewhere incorrectly (self != canonical path)
  const canonIssues = all
    .filter((r) => r.isHtml && r.status === 200)
    .map((r) => {
      const issues = [];
      if (!r.canonical) issues.push("Missing canonical");
      else {
        try {
          const c = new URL(r.canonical);
          const a = new URL(r.address);
          // Compare path+search; allow production host vs localhost
          if (c.pathname !== a.pathname || c.search !== a.search) {
            issues.push("Canonical URL mismatch");
          }
        } catch {
          issues.push("Invalid canonical");
        }
      }
      return { r, issues };
    })
    .filter((x) => x.issues.length)
    .map(({ r, issues }) => ({
      Address: r.address,
      Canonical: r.canonical,
      Issue: issues.join("; "),
    }));
  writeFileSync(
    path.join(OUT, "canonicals_issues.csv"),
    toCsv(["Address", "Canonical", "Issue"], canonIssues)
  );

  // Redirects
  const redirects = all
    .filter((r) => r.status >= 300 && r.status < 400)
    .map((r) => ({
      Address: r.address,
      "Status Code": r.status,
      "Redirect URL": r.redirectUrl,
    }));
  writeFileSync(
    path.join(OUT, "redirects.csv"),
    toCsv(["Address", "Status Code", "Redirect URL"], redirects)
  );

  // Missing alt (attribute absent)
  const missingAlt = all
    .filter((r) => r.missingAltCount > 0)
    .flatMap((r) =>
      r.imagesMissingAlt.map((img) => ({
        Address: r.address,
        "Image Src": img.src,
      }))
    );
  writeFileSync(
    path.join(OUT, "images_missing_alt.csv"),
    toCsv(["Address", "Image Src"], missingAlt)
  );

  // Summary
  const summary = {
    crawled: all.length,
    duplicateTitles: dupTitles.length,
    uniqueDuplicateTitleGroups: [...byTitle.values()].filter((l) => l.length > 1)
      .length,
    h1Issues: h1Issues.length,
    canonicalIssues: canonIssues.length,
    redirects: redirects.length,
    imagesMissingAlt: missingAlt.length,
  };
  writeFileSync(path.join(OUT, "summary.json"), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
  console.log(`\nCSVs written to ${OUT}/`);
  if (dupTitles.length) {
    console.log("\nDuplicate titles:");
    for (const [title, list] of byTitle) {
      if (list.length < 2) continue;
      console.log(`  "${title}" (${list.length})`);
      for (const r of list) console.log(`    - ${r.address}`);
    }
  }
  if (h1Issues.length) {
    console.log("\nH1 issues:");
    for (const r of h1Issues) console.log(`  [${r.Issue}] ${r.Address}`);
  }
  if (canonIssues.length) {
    console.log("\nCanonical issues:");
    for (const r of canonIssues) console.log(`  ${r.Address}: ${r.Issue}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
