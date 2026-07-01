import Link from "next/link";
import { ContextualLinks } from "@/components/sections/ContextualLinks";
import { CTABand } from "@/components/sections/CTABand";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { practices } from "@/content/practices";
import { solutions } from "@/content/solutions";
import { getFeaturedResearch } from "@/lib/relationships";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Services",
  description:
    "Technology advisory, connectivity, communications, AI, customer experience, and digital product services from Crimson Technology.",
  path: "/solutions",
});

export default function SolutionsPage() {
  const featuredResearch = getFeaturedResearch(3);

  return (
    <>
      <Section className="!pb-12">
        <SectionHeader
          eyebrow="Services"
          title="Services built around decisions—and delivery"
          description="We help at every stage: evaluate, plan, select, and execute. Choose a capability area or start with a conversation."
        />
      </Section>

      <Section variant="muted" className="!py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <ServiceCard key={solution.slug} service={solution} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Practice Areas"
          title="Specialized practices within Crimson Technology"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {practices.map((practice) => (
            <Link
              key={practice.slug}
              href={practice.href}
              className="group flex flex-col rounded-lg border border-stone-200 bg-white p-6 transition-all hover:border-crimson/30 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-ink group-hover:text-crimson">
                {practice.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-ink-muted leading-relaxed">
                {practice.shortDescription}
              </p>
              <span className="mt-4 text-sm font-medium text-crimson">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <ContextualLinks research={featuredResearch} />

      <Section variant="muted">
        <div className="rounded-lg border border-stone-200 bg-stone-50 p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-ink">
            Not sure where to start?
          </h2>
          <p className="mt-4 max-w-2xl text-ink-muted leading-relaxed">
            Most engagements begin with a conversation about what you are trying to
            accomplish—not which service category you fit into. We will help you
            identify the right starting point.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block text-sm font-medium text-crimson hover:text-crimson-dark"
          >
            Start a conversation →
          </Link>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
