import { ContextualLinks } from "@/components/sections/ContextualLinks";
import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";
import { getFeaturedResearch } from "@/lib/relationships";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name}.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  const featuredResearch = getFeaturedResearch(2);

  return (
    <>
    <Section>
      <h1 className="text-4xl font-semibold text-ink">Privacy Policy</h1>
      <div className="prose mt-8 max-w-3xl">
        <p>
          {site.name} LLC (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your
          privacy. This policy describes how we collect, use, and protect information
          when you visit our website or contact us.
        </p>
        <p>
          <strong>Information we collect:</strong> When you submit our contact form,
          we collect the information you provide, including your name, organization,
          email address, and message content.
        </p>
        <p>
          <strong>How we use information:</strong> We use contact form submissions to
          respond to your inquiry and provide information about our services. We do
          not sell your personal information to third parties.
        </p>
        <p>
          <strong>Cookies:</strong> Our website may use cookies to ensure a smooth
          browsing experience. You can control cookie preferences through your browser
          settings.
        </p>
        <p>
          <strong>Contact:</strong> For questions about this privacy policy, contact us
          at{" "}
          <a href={`mailto:${site.email}`} className="text-crimson">
            {site.email}
          </a>
          .
        </p>
        <p className="text-sm text-ink-muted">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
    </Section>

    <ContextualLinks research={featuredResearch} />
    </>
  );
}
