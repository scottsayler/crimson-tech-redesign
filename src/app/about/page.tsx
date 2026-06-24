import { CTABand } from "@/components/sections/CTABand";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description:
    "Crimson Technology is an independent technology advisory and digital execution company led by Scott Sayler.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Section className="!pb-12">
        <SectionHeader
          eyebrow="About"
          title="Independent advisory. Operational understanding. Execution when it counts."
          description="Crimson Technology helps organizations make smarter technology decisions and turn ideas into operational outcomes."
        />
      </Section>

      <Section variant="muted" className="!py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-ink">Who we are</h2>
            <p className="mt-4 text-ink-muted leading-relaxed">
              Crimson Technology sits at the intersection of technology advisory,
              AI and workflow automation, communications and collaboration,
              customer experience, connectivity and infrastructure, and digital
              product development.
            </p>
            <p className="mt-4 text-ink-muted leading-relaxed">
              We are not a web design agency, a generic IT services firm, or a
              platform reseller. We are an independent partner who helps
              organizations understand what problem actually exists, which
              technologies matter, which vendors fit, and what implementation
              requires.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-ink">What makes us different</h2>
            <ul className="mt-4 space-y-3">
              {[
                "Independent—no platform bias or vendor commissions",
                "Operator mindset—we understand how technology runs in production",
                "Advisory and execution—we guide decisions and build when needed",
                "Breadth with depth—communications, CX, AI, infrastructure, and products",
              ].map((item) => (
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
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold text-ink">Scott Sayler</h2>
          <p className="mt-4 text-ink-muted leading-relaxed">
            Scott founded Crimson Technology to bring independent, operationally
            grounded technology advisory to organizations navigating complex
            decisions. With experience across contact centers, customer experience,
            workforce optimization, cloud communications, and digital product
            development, Scott helps leadership teams move from vendor confusion to
            structured decisions—and from decisions to outcomes.
          </p>
          <p className="mt-4 text-ink-muted leading-relaxed">
            Having completed over 100 cloud migrations and worked on both sides of
            vendor relationships, Scott brings a perspective that prioritizes
            client outcomes over platform sales. Whether advising a bank on contact
            center modernization, helping a mid-market company evaluate UCaaS
            providers, or building a data-driven digital product, the focus is the
            same: clarity, independence, and execution.
          </p>
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeader
          title="How we engage"
          description="Flexible engagement models based on what you actually need."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Advisory",
              description:
                "Structured evaluations, vendor selection, and strategic roadmaps with clear deliverables and timelines.",
            },
            {
              title: "Project-based",
              description:
                "Defined scope engagements for specific initiatives—CX transformation, platform selection, or automation.",
            },
            {
              title: "Execution",
              description:
                "Hands-on support for implementation, digital product development, and operational rollout.",
            },
          ].map((model) => (
            <div
              key={model.title}
              className="rounded-lg border border-stone-200 bg-white p-6"
            >
              <h3 className="text-lg font-semibold text-ink">{model.title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                {model.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader title="Our approach" />
        <ProcessSteps />
      </Section>

      <CTABand />
    </>
  );
}
