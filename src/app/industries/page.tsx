import Link from "next/link";
import { CTABand } from "@/components/sections/CTABand";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { industries } from "@/content/industries";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Industries",
  description:
    "Crimson Technology serves financial services, healthcare, professional services, multi-location businesses, and technology-driven organizations.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <Section className="!pb-12">
        <SectionHeader
          eyebrow="Industries"
          title="Industries we serve"
          description="Different sectors, same challenge: technology complexity outpaces organizational capacity to decide and deliver."
        />
      </Section>

      <Section variant="muted" className="!py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {industries.map((industry) => (
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

      <CTABand />
    </>
  );
}
