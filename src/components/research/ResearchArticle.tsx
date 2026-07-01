import { FAQAccordion } from "@/components/research/FAQAccordion";
import {
  BulletGrid,
  ChecklistCard,
  ChecklistCards,
  ComparisonTable,
  InsightCallout,
  NarrativeBlock,
  OptionCard,
  QuestionCard,
  SectionIntro,
  TakeawayList,
  TimelineList,
  WarningBox,
} from "@/components/research/primitives";
import { Section } from "@/components/ui/Section";
import {
  isStructuredResearch,
  parseResearchContent,
  type ParsedSection,
} from "@/lib/research-sections";

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
              <ChecklistCard key={bullet} text={bullet} />
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
              <WarningBox key={bullet} text={bullet} />
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
                  <ChecklistCard key={bullet} text={bullet} />
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
            <ChecklistCards items={section.bullets} />
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
        <SectionIntro title="Executive Takeaways" />
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
