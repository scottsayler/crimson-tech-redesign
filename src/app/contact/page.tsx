import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Start a conversation with Crimson Technology about technology advisory, Crimson CX, AI, communications, or digital products.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Section className="!pb-8">
        <SectionHeader
          eyebrow="Contact"
          title="Start a conversation"
          description="Share what you are working on—a platform evaluation, modernization initiative, CX transformation, or new digital product. We will follow up personally."
        />
      </Section>

      <Section variant="muted" className="!py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-ink">What to expect</h2>
            <ul className="mt-4 space-y-4 text-sm text-ink-muted">
              <li className="flex gap-3">
                <span className="font-semibold text-crimson">1.</span>
                We respond within one business day
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-crimson">2.</span>
                A direct conversation—not a generic sales sequence
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-crimson">3.</span>
                Independent advisory with no obligation
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
    </>
  );
}
