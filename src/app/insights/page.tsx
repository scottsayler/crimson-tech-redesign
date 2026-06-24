import { CTABand } from "@/components/sections/CTABand";
import { InsightCard } from "@/components/sections/InsightCard";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { insights } from "@/content/insights";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Insights",
  description:
    "Practical perspectives on technology advisory, CX, AI, communications, and digital execution from Crimson Technology.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <Section className="!pb-12">
        <SectionHeader
          eyebrow="Insights"
          title="Perspectives for technology and operations leaders"
          description="Practical thinking on advisory, CX, AI, communications, and execution—without the buzzwords."
        />
      </Section>

      <Section variant="muted" className="!py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((insight) => (
            <InsightCard key={insight.slug} insight={insight} />
          ))}
        </div>
      </Section>

      <CTABand />
    </>
  );
}
