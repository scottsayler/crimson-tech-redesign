import Link from "next/link";
import { notFound } from "next/navigation";
import { ContextualLinks } from "@/components/sections/ContextualLinks";
import { CTABand } from "@/components/sections/CTABand";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getIndustry, industries } from "@/content/industries";
import { getSolution } from "@/content/solutions";
import { getResearchForIndustry } from "@/lib/relationships";
import { createMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  return createMetadata({
    title: industry.title,
    description: industry.shortDescription,
    path: `/industries/${slug}`,
  });
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const relatedServices = industry.relatedServices
    .map((s) => getSolution(s))
    .filter(Boolean);
  const relatedResearch = getResearchForIndustry(slug);

  return (
    <>
      <Section className="!pb-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-crimson">
          Industries
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {industry.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-ink-muted leading-relaxed">
          {industry.description}
        </p>
        {slug === "financial-services" && (
          <div className="mt-8">
            <Button href="/crimson-cx">Explore Crimson CX</Button>
          </div>
        )}
      </Section>

      <Section variant="muted" className="!py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-ink">Key challenges</h2>
            <ul className="mt-4 space-y-3">
              {industry.challenges.map((item) => (
                <li key={item} className="flex gap-3 text-ink-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-ink">How we help</h2>
            <ul className="mt-4 space-y-3">
              {industry.howWeHelp.map((item) => (
                <li key={item} className="flex gap-3 text-ink-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold text-ink">Related services</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {relatedServices.map(
            (service) =>
              service && (
                <Link
                  key={service.slug}
                  href={`/solutions/${service.slug}`}
                  className="rounded-lg border border-stone-200 p-5 transition-colors hover:border-crimson/30"
                >
                  <h3 className="font-semibold text-ink">{service.title}</h3>
                  <p className="mt-1 text-sm text-ink-muted">
                    {service.shortDescription}
                  </p>
                </Link>
              ),
          )}
        </div>
      </Section>

      <ContextualLinks research={relatedResearch} />

      <CTABand />
    </>
  );
}
