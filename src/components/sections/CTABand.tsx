import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CTABand({
  title = "What's on your evaluation list?",
  description = "Renewal, migration, vendor selection—tell us what's actually happening. Scott responds personally.",
  primaryLabel = "Schedule a Conversation",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
  analyticsEvent = "contact_cta_click",
  analyticsCtaLocation = "cta_band",
  analyticsArticleSlug,
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  analyticsEvent?: string;
  analyticsCtaLocation?: string;
  analyticsArticleSlug?: string;
}) {
  const isContactCta =
    primaryHref === "/contact" || primaryHref.startsWith("/contact?");
  const eventName = isContactCta
    ? analyticsEvent
    : analyticsEvent === "contact_cta_click"
      ? undefined
      : analyticsEvent;

  return (
    <section className="bg-crimson-50 py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-lg text-ink-muted leading-relaxed">{description}</p>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              href={primaryHref}
              analyticsEvent={eventName}
              analyticsCtaLocation={analyticsCtaLocation}
              analyticsArticleSlug={analyticsArticleSlug}
            >
              {primaryLabel}
            </Button>
            {secondaryLabel && secondaryHref ? (
              <Button href={secondaryHref} variant="outline">
                {secondaryLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
