import { ContactForm } from "@/components/ContactForm";
import { ContextualLinks } from "@/components/sections/ContextualLinks";
import { PrincipalAdvisor } from "@/components/sections/PrincipalAdvisor";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/content/site";
import { getFeaturedResearch } from "@/lib/relationships";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Start a conversation with Crimson Technology about technology advisory, Crimson CX, AI, communications, or digital products.",
  path: "/contact",
});

export default function ContactPage() {
  const featuredResearch = getFeaturedResearch(3);

  return (
    <>
      <Section className="!pb-8">
        <SectionHeader
          eyebrow="Contact"
          title="What's on your desk?"
          description="Share your timeline, vendors, and constraints. Scott responds personally."
        />
      </Section>

      <Section variant="muted" className="!py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-ink">What happens next</h2>
            <ul className="mt-4 space-y-4 text-sm text-ink-muted">
              <li className="flex gap-3">
                <span className="font-semibold text-crimson">1.</span>
                Scott responds within one business day
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-crimson">2.</span>
                A direct conversation about your evaluation: timeline, vendors, what&apos;s already been tried
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-crimson">3.</span>
                Honest assessment of whether we can help and what it would look like
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-crimson">4.</span>
                If there is a fit: scope, deliverables, and timeline
              </li>
            </ul>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-ink">Direct contact</h3>
              <p className="mt-2 text-sm text-ink-muted">
                <a href={`mailto:${site.email}`} className="text-crimson hover:text-crimson-dark">
                  {site.email}
                </a>
              </p>
              <p className="mt-1 text-sm text-ink-muted">{site.location}</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-lg border border-stone-200 bg-white p-6 md:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <PrincipalAdvisor compact />
      </Section>

      <ContextualLinks research={featuredResearch} />
    </>
  );
}
