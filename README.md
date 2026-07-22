# Crimson Technology website

Next.js site for Crimson Technology (independent technology advisory).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm run check` | lint → typecheck → build |
| `npm run check:links` | Crawl a running production server and fail on broken internal links |
| `npm run audit:pages` | Local SEO/page-quality audit against a running production server |
| `npm run audit:production` | Smoke-test a deployed (or local production) site via `SITE_URL` |
| `npm run test:analytics` | Safety checks for the analytics track helper |

## Internal link check

Run against a production build (not `next dev`):

```bash
npm run build
npm run start
```

In another terminal:

```bash
npm run check:links
```

Options:

```bash
npm run check:links -- --base-url=http://127.0.0.1:3000
npm run check:links -- --allow-redirect-links
```

The checker:

- Seeds from `sitemap.xml` plus core static routes
- Ignores external, `mailto:`, `tel:`, and fragment-only links
- Follows redirects intentionally and reports redirect chains/loops
- Fails (exit code 1) on broken internal targets
- By default also fails when an internal href still points at a legacy redirect source (for example `/tools` → `/decision-center`)

It is intentionally **not** part of `npm run check` until you want it in CI.

## Page-quality audit

```bash
npm run build && npm run start
npm run audit:pages
```

Writes `seo-crawl/local-audit-report.json`.

## Production smoke test

```bash
SITE_URL=https://crimsontech.co npm run audit:production
```

Against a local production server:

```bash
npm run build && npm run start
SITE_URL=http://127.0.0.1:3000 npm run audit:production
```

Checks homepage, research, decision center, contact, sitemap, robots, production canonicals, legacy redirects, results `noindex`, and internal links on the tested pages. Does **not** submit the contact form.

## Analytics

Production builds load:

- Google Analytics 4 (`NEXT_PUBLIC_GA_MEASUREMENT_ID`, default `G-P6YQVPG270`)
- Microsoft Clarity (`NEXT_PUBLIC_CLARITY_PROJECT_ID`)
- Vercel Analytics

These scripts are gated to `NODE_ENV=production` and do not load during `next dev`.

Conversion events are emitted through `src/lib/analytics/track.ts` (never direct `gtag` calls in UI). Events exclude names, emails, phone numbers, free-form messages, and assessment answers.

## Production launch checklist

Complete before and after go-live. Items marked **manual** must be verified on the live domain by a human.

### Environment variables (Vercel / host)

- [ ] `RESEND_API_KEY`
- [ ] `CONTACT_FROM_EMAIL` (verified Resend sender)
- [ ] `CONTACT_TO_EMAIL`
- [ ] `GOOGLE_SHEETS_WEBHOOK_URL` (optional contact / assessment capture)
- [ ] `GOOGLE_SHEETS_WEBHOOK_SECRET` (required for Banking CX Sheets webhook)
- [ ] `ASSESSMENT_RESULTS_WEBHOOK_URL` (optional)
- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional override)
- [ ] `NEXT_PUBLIC_CLARITY_PROJECT_ID` (optional override)

### Resend

- [ ] **Manual:** Sender domain verified in Resend
- [ ] **Manual:** Send a real contact-form test from production and confirm inbox delivery
- [ ] Confirm spam/honeypot still blocks obvious bot payloads

### Analytics

- [ ] **Manual:** GA4 Realtime shows a production page view
- [ ] **Manual:** Trigger `contact_form_submit` with a test lead and confirm in GA4 DebugView / Realtime
- [ ] **Manual:** Clarity session appears for the production hostname
- [ ] Confirm analytics scripts are absent on local `next dev`

### Domain and SEO

- [ ] Primary domain is `https://crimsontech.co`
- [ ] Canonicals use `https://crimsontech.co` (no preview hostnames)
- [ ] `https://crimsontech.co/sitemap.xml` returns 200
- [ ] `https://crimsontech.co/robots.txt` returns 200 and references the sitemap
- [ ] Legacy `/tools`, `/services`, `/insights` permanently redirect to canonical paths
- [ ] Assessment results URL remains `noindex`

### Automated checks (run against production after deploy)

```bash
SITE_URL=https://crimsontech.co npm run audit:production
```

Optional deeper crawl (requires the live origin to accept the same checks as local):

```bash
npm run check:links -- --base-url=https://crimsontech.co
npm run audit:pages -- --base-url=https://crimsontech.co
```

### Search Console and performance (**manual**)

- [ ] Submit sitemap in Google Search Console
- [ ] Inspect a research article and the homepage URL
- [ ] Run PageSpeed Insights on homepage, research hub, one article, Decision Center, one tool, and contact
- [ ] Review Core Web Vitals field data after enough traffic accumulates

### Privacy

- [ ] Privacy policy still accurately describes analytics/cookies in use
- [ ] No PII is sent in custom GA4 event parameters
