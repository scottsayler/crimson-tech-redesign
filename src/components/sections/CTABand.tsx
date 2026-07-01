import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CTABand({
  title = "Ready for a clearer path forward?",
  description = "Tell us what you are evaluating or trying to build. We will respond with a direct next step—not a generic sales sequence.",
  primaryLabel = "Schedule a Conversation",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
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
            <Button href={primaryHref}>{primaryLabel}</Button>
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
