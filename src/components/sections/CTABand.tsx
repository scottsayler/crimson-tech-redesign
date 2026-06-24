import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CTABand({
  title = "Ready for a clearer path forward?",
  description = "Tell us what you are evaluating or trying to build. We will respond with a direct next step—not a generic sales sequence.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-crimson-50 py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-ink-muted leading-relaxed">{description}</p>
          <div className="mt-8">
            <Button href="/contact">Schedule a Conversation</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
