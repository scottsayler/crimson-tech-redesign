import Link from "next/link";
import { ContextualLinks } from "@/components/sections/ContextualLinks";
import { CTABand } from "@/components/sections/CTABand";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getFeaturedIndustries, industries } from "@/content/industries";
import { solutions } from "@/content/solutions";
import { getFeaturedResearch } from "@/lib/relationships";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Industries",
  description:
    "Technology advisory for financial services, multi-location businesses, restaurants, and professional services.",
  path: "/industries",
});

export default function IndustriesPage() {
  const featuredResearch = getFeaturedResearch(3);
  const featuredIndustries = getFeaturedIndustries();
  const featuredSlugs = new Set(featuredIndustries.map((i) => i.slug));
  const additionalIndustries = industries.filter((i) => !featuredSlugs.has(i.slug));

  return (
    <>
      <Section className="!pb-12">
        <SectionHeader
          as="h1"
          eyebrow="Industries"
          title="Same evaluations, different constraints"
          description="A CCaaS evaluation for a bank has different compliance rules than one for a restaurant chain. We've done both."
        />
      </Section>

      <Section variant="muted" className="!py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {featuredIndustries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group rounded-lg border border-stone-200 bg-white p-6 transition-all hover:border-crimson/30 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-ink group-hover:text-crimson">
                {industry.title}
              </h2>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                {industry.shortDescription}
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-crimson">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {additionalIndustries.length > 0 ? (
        <Section className="!py-12">
          <SectionHeader
            title="Also work in"
            description="Healthcare, technology companies, and other sectors with similar platform decisions."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {additionalIndustries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group rounded-lg border border-stone-200 bg-white p-6 transition-all hover:border-crimson/30 hover:shadow-md"
              >
                <h2 className="text-xl font-semibold text-ink group-hover:text-crimson">
                  {industry.title}
                </h2>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                  {industry.shortDescription}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-crimson">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      <ContextualLinks research={featuredResearch} solutions={solutions.slice(0, 3)} />

      <CTABand />
    </>
  );
}
