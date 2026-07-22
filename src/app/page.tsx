import Link from "next/link";
import { CTABand } from "@/components/sections/CTABand";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { engagementFunding, independenceProof } from "@/content/credibility";
import {
  homepageBuyerContext,
  homepageFinalCta,
  homepageHero,
  homepageIndependence,
  homepagePracticePaths,
  homepageProcess,
  homepageProof,
} from "@/content/home";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f4_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <Container className="relative">
          <p className="text-sm font-semibold uppercase tracking-wider text-crimson">
            {homepageHero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-ink md:text-5xl lg:text-6xl">
            {homepageHero.title}
          </h1>
          <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-ink-muted md:text-xl">
            {homepageHero.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              href={homepageHero.primaryCta.href}
              analyticsEvent="contact_cta_click"
              analyticsCtaLocation="homepage_hero"
            >
              {homepageHero.primaryCta.label}
            </Button>
            <Button href={homepageHero.secondaryCta.href} variant="outline">
              {homepageHero.secondaryCta.label}
            </Button>
          </div>
        </Container>
      </section>

      <Section variant="muted">
        <SectionHeader
          title={homepageBuyerContext.title}
          description={homepageBuyerContext.paragraphs[0]}
        />
        <p className="max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">
          {homepageBuyerContext.paragraphs[1]}
        </p>
      </Section>

      <Section id="decision-process">
        <SectionHeader
          title={homepageProcess.title}
          description={homepageProcess.description}
          align="center"
        />
        <ProcessSteps />
      </Section>

      <Section variant="muted">
        <SectionHeader
          title={homepageProof.title}
          description={homepageProof.description}
        />
        <div className="grid gap-8 sm:grid-cols-3">
          {homepageProof.points.map((point) => (
            <div key={point.label}>
              <p className="text-2xl font-semibold tracking-tight text-crimson md:text-3xl">
                {point.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">{point.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                {point.detail}
              </p>
            </div>
          ))}
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {homepageProof.outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-3 text-sm text-ink-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
              {outcome}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link
            href="/about"
            className="text-sm font-medium text-crimson hover:text-crimson-dark"
          >
            About Scott Sayler and Crimson Technology →
          </Link>
        </div>
      </Section>

      <Section>
        <SectionHeader
          title="Where to start"
          description="Three paths into the work, depending on the decision in front of you."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {homepagePracticePaths.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className="group flex flex-col rounded-lg border border-stone-200 bg-white p-6 transition-all hover:border-crimson/30 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-ink group-hover:text-crimson">
                {path.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                {path.description}
              </p>
              <span className="mt-4 text-sm font-medium text-crimson">
                {path.linkLabel} →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeader
          title={homepageIndependence.title}
          description={homepageIndependence.lead}
          align="center"
        />
        <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-ink-muted">
          {engagementFunding}
        </p>
        <ul className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
          {independenceProof.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-ink-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <CTABand
        title={homepageFinalCta.title}
        description={homepageFinalCta.description}
        primaryLabel={homepageFinalCta.primaryLabel}
        primaryHref={homepageFinalCta.primaryHref}
        analyticsEvent="contact_cta_click"
        analyticsCtaLocation="homepage_final"
      />
    </>
  );
}
