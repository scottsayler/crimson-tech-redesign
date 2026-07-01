import { FAQAccordion } from "@/components/research/FAQAccordion";
import { InsightCallout } from "@/components/research/primitives/InsightCallout";
import { Section } from "@/components/ui/Section";
import type { Tool } from "@/content/tools";

export function ToolEditorial({ tool }: { tool: Tool }) {
  const whyParagraphs = tool.whyYoureHere.split("\n\n").filter(Boolean);

  return (
    <>
      <Section className="!pb-8 md:!pb-10">
        <InsightCallout paragraphs={[tool.quickAnswer]} />
      </Section>

      <Section variant="muted" className="!py-12 md:!py-16">
        <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Why this tool exists
        </h2>
        <div className="mt-6 max-w-3xl space-y-4">
          {whyParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-ink-muted">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-stone-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-ink">Should you use it?</h3>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-ink">You should evaluate this if:</p>
              <ul className="mt-3 space-y-2">
                {tool.shouldConsider.evaluateIf.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted">
                    <span className="mt-0.5 shrink-0 text-emerald-600" aria-hidden>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Probably not if:</p>
              <ul className="mt-3 space-y-2">
                {tool.shouldConsider.probablyNotIf.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted">
                    <span className="mt-0.5 shrink-0 text-crimson" aria-hidden>
                      ✗
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {tool.sections.map((section) => (
        <Section key={section.heading} className="!py-12 md:!py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">{section.heading}</h2>
          <div className="mt-6 max-w-3xl space-y-4">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-ink-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </Section>
      ))}

      <Section variant="muted" className="!py-12 md:!py-16">
        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-crimson">Reality check</p>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink-muted">
            {tool.realityCheck}
          </p>
        </div>
      </Section>
    </>
  );
}

export function ToolEditorialFooter({ tool }: { tool: Tool }) {
  const faqs = tool.faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <Section variant="muted" className="!py-12 md:!py-16">
      <h2 className="text-2xl font-semibold tracking-tight text-ink">Bottom line</h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-muted">{tool.bottomLine}</p>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Frequently asked questions</h2>
        <div className="mt-6">
          <FAQAccordion items={faqs} />
        </div>
      </div>
    </Section>
  );
}
