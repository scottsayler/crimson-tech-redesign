import Link from "next/link";

export function AssessmentConsultingCTA() {
  return (
    <section className="rounded-xl border border-crimson/20 bg-gradient-to-br from-crimson-50/80 via-white to-stone-50 p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-crimson">Expert review</p>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">Want an expert review?</h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
        If your assessment identified operational gaps, schedule a strategy conversation to review
        your results and discuss practical next steps.
      </p>
      <Link
        href="/contact"
        className="mt-6 inline-flex rounded-lg bg-crimson px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-crimson-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson/30"
        data-analytics-event="contact_cta_click"
        data-analytics-cta-location="assessment_consulting_cta"
      >
        Schedule a Strategy Conversation
      </Link>
    </section>
  );
}
