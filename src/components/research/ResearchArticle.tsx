import { FAQAccordion } from "@/components/research/FAQAccordion";
import { Section } from "@/components/ui/Section";
import {
  isStructuredResearch,
  parseResearchContent,
  type ParsedSection,
} from "@/lib/research-sections";

function SectionIntro({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-ink-muted">{description}</p>
      ) : null}
    </div>
  );
}

function NarrativeBlock({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-3xl space-y-5">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-ink-muted">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function CheckCard({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex gap-3">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-crimson-50 text-sm font-semibold text-crimson">
          ✓
        </span>
        <p className="text-sm leading-relaxed text-ink">{text}</p>
      </div>
    </div>
  );
}

function WarningCard({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-5">
      <div className="flex gap-3">
        <span className="mt-0.5 shrink-0 text-base">❌</span>
        <p className="text-sm leading-relaxed text-ink">{text}</p>
      </div>
    </div>
  );
}

function InsightCallout({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="rounded-2xl border border-crimson/15 bg-crimson-50 p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-crimson">
        Business Impact
      </p>
      <div className="mt-4 space-y-4">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-ink">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

function ComparisonTable({ pairs }: { pairs: { left: string; right: string }[] }) {
  if (pairs.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
      <div className="grid grid-cols-2 border-b border-stone-200 bg-stone-50 text-sm font-semibold text-ink">
        <div className="px-5 py-3">Current State</div>
        <div className="border-l border-stone-200 px-5 py-3">Best Practice</div>
      </div>
      {pairs.map((pair) => (
        <div
          key={`${pair.left}-${pair.right}`}
          className="grid grid-cols-2 border-b border-stone-100 last:border-b-0"
        >
          <div className="px-5 py-4 text-sm leading-relaxed text-ink-muted">{pair.left}</div>
          <div className="border-l border-stone-100 px-5 py-4 text-sm leading-relaxed text-ink">
            {pair.right}
          </div>
        </div>
      ))}
    </div>
  );
}

function OptionCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      {body ? (
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{body}</p>
      ) : null}
    </div>
  );
}

function QuestionCard({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5">
      <p className="text-sm leading-relaxed text-ink">{text}</p>
    </div>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6">
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-crimson/30 bg-crimson-50 text-xs text-crimson">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BulletGrid({ items }: { items: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <div
          key={item}
          className="rounded-xl border border-stone-200 bg-white p-5 text-sm leading-relaxed text-ink-muted"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function TimelineList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-4">
      {items.map((item, index) => (
        <li key={item} className="flex gap-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-crimson text-sm font-semibold text-white">
            {index + 1}
          </span>
          <p className="pt-1 text-sm leading-relaxed text-ink-muted">{item}</p>
        </li>
      ))}
    </ol>
  );
}

function TakeawayList({ items }: { items: string[] }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-ink p-6 text-white md:p-8">
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed md:text-base">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson-200" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function renderSection(section: ParsedSection, index: number) {
  const variant = index % 2 === 0 ? "muted" : "default";

  switch (section.kind) {
    case "executive-summary":
      return (
        <Section key={section.title} variant={variant} className="!py-12 md:!py-16">
          <SectionIntro title={section.title} />
          <div className="mt-8">
            <NarrativeBlock paragraphs={section.paragraphs} />
          </div>
        </Section>
      );

    case "why-matters":
      return (
        <Section key={section.title} variant={variant} className="!py-12 md:!py-16">
          <SectionIntro title={section.title} />
          <div className="mt-8">
            <InsightCallout paragraphs={section.paragraphs} />
          </div>
        </Section>
      );

    case "signs":
      return (
        <Section key={section.title} variant={variant} className="!py-12 md:!py-16">
          <SectionIntro
            title={section.title}
            description="How do I know this deserves attention?"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {section.bullets.map((bullet) => (
              <CheckCard key={bullet} text={bullet} />
            ))}
          </div>
        </Section>
      );

    case "mistakes":
      return (
        <Section key={section.title} variant={variant} className="!py-12 md:!py-16">
          <SectionIntro title={section.title} />
          <div className="mt-8 grid gap-4">
            {section.bullets.map((bullet) => (
              <WarningCard key={bullet} text={bullet} />
            ))}
          </div>
        </Section>
      );

    case "what-good-looks-like":
      return (
        <Section key={section.title} variant={variant} className="!py-12 md:!py-16">
          <SectionIntro title={section.title} />
          <div className="mt-8 space-y-6">
            {section.bullets.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {section.bullets.map((bullet) => (
                  <CheckCard key={bullet} text={bullet} />
                ))}
              </div>
            ) : null}
            {section.pairs.length > 0 ? <ComparisonTable pairs={section.pairs} /> : null}
            {section.paragraphs.length > 0 ? (
              <NarrativeBlock paragraphs={section.paragraphs} />
            ) : null}
          </div>
        </Section>
      );

    case "questions":
      return (
        <Section key={section.title} variant={variant} className="!py-12 md:!py-16">
          <SectionIntro title={section.title} />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {section.bullets.map((bullet) => (
              <QuestionCard key={bullet} text={bullet} />
            ))}
          </div>
        </Section>
      );

    case "options":
      return (
        <Section key={section.title} variant={variant} className="!py-12 md:!py-16">
          <SectionIntro title={section.title} />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {section.options.map((option) => (
              <OptionCard key={option.title} title={option.title} body={option.body} />
            ))}
          </div>
          {section.paragraphs.length > 0 ? (
            <div className="mt-8">
              <NarrativeBlock paragraphs={section.paragraphs} />
            </div>
          ) : null}
        </Section>
      );

    case "before-buy":
      return (
        <Section key={section.title} variant={variant} className="!py-12 md:!py-16">
          <SectionIntro title={section.title} />
          <div className="mt-8">
            <Checklist items={section.bullets} />
          </div>
        </Section>
      );

    case "decision":
      return (
        <Section key={section.title} variant={variant} className="!py-12 md:!py-16">
          <SectionIntro title={section.title} />
          <div className="mt-8">
            <ComparisonTable pairs={section.pairs} />
          </div>
          {section.paragraphs.length > 0 ? (
            <div className="mt-8">
              <NarrativeBlock paragraphs={section.paragraphs} />
            </div>
          ) : null}
        </Section>
      );

    case "escalation":
      return (
        <Section key={section.title} variant={variant} className="!py-12 md:!py-16">
          <SectionIntro title={section.title} />
          <div className="mt-8">
            <TimelineList items={section.bullets} />
          </div>
        </Section>
      );

    case "stack":
    case "challenges":
    case "priorities":
    case "evidence":
      return (
        <Section key={section.title} variant={variant} className="!py-12 md:!py-16">
          <SectionIntro title={section.title} />
          <div className="mt-8 space-y-6">
            {section.bullets.length > 0 ? <BulletGrid items={section.bullets} /> : null}
            {section.paragraphs.length > 0 ? (
              <NarrativeBlock paragraphs={section.paragraphs} />
            ) : null}
          </div>
        </Section>
      );

    case "faq":
      return (
        <Section key={section.title} variant={variant} className="!py-12 md:!py-16">
          <SectionIntro title={section.title} />
          <div className="mt-8">
            <FAQAccordion items={section.faqs} />
          </div>
        </Section>
      );

    case "takeaways":
      return (
        <Section key={section.title} variant={variant} className="!py-12 md:!py-16">
          <SectionIntro title={section.title} />
          <div className="mt-8">
            <TakeawayList items={section.bullets} />
          </div>
        </Section>
      );

    case "named":
    case "narrative":
      return (
        <Section key={section.title} variant={variant} className="!py-12 md:!py-16">
          <SectionIntro title={section.title} />
          <div className="mt-8 space-y-6">
            {section.bullets.length > 0 ? <BulletGrid items={section.bullets} /> : null}
            <NarrativeBlock paragraphs={section.paragraphs} />
          </div>
        </Section>
      );

    default:
      return null;
  }
}

function LegacyArticle({ content }: { content: string[] }) {
  const summary = content.slice(0, 3);
  const body = content.slice(3, -2);
  const takeaways = content.slice(-2);

  return (
    <>
      <Section variant="muted" className="!py-12 md:!py-16">
        <SectionIntro title="Executive Summary" />
        <div className="mt-8">
          <NarrativeBlock paragraphs={summary} />
        </div>
      </Section>

      {body.length > 0 ? (
        <Section className="!py-12 md:!py-16">
          <SectionIntro title="Advisory Perspective" />
          <div className="mt-8 space-y-8">
            {body.reduce<string[][]>((groups, paragraph, index) => {
              const groupIndex = Math.floor(index / 3);
              if (!groups[groupIndex]) groups[groupIndex] = [];
              groups[groupIndex].push(paragraph);
              return groups;
            }, []).map((group, index) =>
              index % 2 === 1 ? (
                <InsightCallout key={group[0].slice(0, 40)} paragraphs={group} />
              ) : (
                <NarrativeBlock key={group[0].slice(0, 40)} paragraphs={group} />
              ),
            )}
          </div>
        </Section>
      ) : null}

      <Section variant="muted" className="!py-12 md:!py-16">
        <SectionIntro title="Key Takeaways" />
        <div className="mt-8">
          <TakeawayList items={takeaways} />
        </div>
      </Section>
    </>
  );
}

type ResearchArticleProps = {
  content: string[];
};

export function ResearchArticle({ content }: ResearchArticleProps) {
  if (!isStructuredResearch(content)) {
    return <LegacyArticle content={content} />;
  }

  const { sections } = parseResearchContent(content);
  return <>{sections.map((section, index) => renderSection(section, index))}</>;
}
