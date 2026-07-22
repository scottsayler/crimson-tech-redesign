import Link from "next/link";
import { ContextualLinks } from "@/components/sections/ContextualLinks";
import { CTABand } from "@/components/sections/CTABand";
import { CredibilityBar } from "@/components/sections/CredibilityBar";
import { EngagementStandards } from "@/components/sections/EngagementStandards";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { AdvisorProse } from "@/components/sections/AdvisorProse";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { practices } from "@/content/practices";
import { solutions } from "@/content/solutions";
import { getFeaturedResearch } from "@/lib/relationships";
import {
  buildBreadcrumbList,
  buildCollectionPage,
  buildSchemaGraph,
} from "@/lib/schema";
import { createMetadata } from "@/lib/seo";

const servicesIntro = {
  observation:
    "Most engagements begin with a specific decision—a CCaaS renewal, UCaaS migration, AI pilot, or connectivity audit—not a service category.",
  whyItMatters:
    "Starting from the actual decision keeps scope focused and timelines realistic.",
  recommendation:
    "Tell us what is on your desk and we will map it to the right evaluation approach.",
};

const notSureProse = {
  observation:
    "Many teams start with a renewal deadline or platform shortlist before defining internal requirements.",
  whyItMatters:
    "A short conversation can clarify scope, stakeholders, and the right first deliverable.",
  recommendation:
    "Schedule a conversation and we will outline a practical starting point.",
};

export const metadata = createMetadata({
  title: "Services",
  description:
    "UCaaS, CCaaS, connectivity, AI, and contact center evaluations—before you sign.",
  path: "/solutions",
});

export default function SolutionsPage() {
  const featuredResearch = getFeaturedResearch(3);

  return (
    <>
      <JsonLd
        data={buildSchemaGraph([
          buildCollectionPage({
            name: "Services",
            description:
              "UCaaS, CCaaS, connectivity, AI, and contact center evaluations before you sign.",
            path: "/solutions",
          }),
          buildBreadcrumbList([
            { name: "Home", path: "/" },
            { name: "Services", path: "/solutions" },
          ]),
        ])}
      />
      <Section className="!pb-12">
        <SectionHeader
          as="h1"
          eyebrow="Services"
          title="What are you evaluating?"
          description="Platform renewals, vendor selections, migrations, and AI programs."
        />
        <AdvisorProse prose={servicesIntro} className="mt-6 max-w-3xl" />
      </Section>

      <CredibilityBar />

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
          title="Three ways we work"
          description="Same principal advisor across all of them."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

      <Section variant="muted">
        <SectionHeader
          title="What makes an evaluation work"
          description="Practices we apply on every engagement."
        />
        <EngagementStandards />
      </Section>

      <ContextualLinks research={featuredResearch} />

      <Section>
        <div className="rounded-lg border border-stone-200 bg-stone-50 p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-ink">
            Not sure which category fits?
          </h2>
          <AdvisorProse prose={notSureProse} className="mt-4 max-w-2xl" />
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
