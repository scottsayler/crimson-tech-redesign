import { FAQAccordion } from "@/components/research/FAQAccordion";
import {
  BulletGrid,
  ChecklistCard,
  ChecklistCards,
  ComparisonTable,
  ExecutiveResources,
  InsightCallout,
  ImpactCascade,
  MistakesSection,
  NarrativeBlock,
  OptionCard,
  QuestionCard,
  SectionIntro,
  TakeawayList,
  TimelineList,
} from "@/components/research/primitives";
import { Section } from "@/components/ui/Section";
import {
  createAutoLinkState,
  type AutoLinkState,
} from "@/lib/research-auto-link";
import {
  isStructuredResearch,
  parseResearchContent,
  resolveMistakeItems,
  type ParsedSection,
} from "@/lib/research-sections";
import type { ExecutiveResourceItem } from "@/content/research";

function isChecklistSection(section: ParsedSection): boolean {
  return (
    section.bullets.length > 0 &&
    /checklist/i.test(section.title) &&
    section.paragraphs.length === 0
  );
}

function renderSection(
  section: ParsedSection,
  index: number,
  linkState?: AutoLinkState,
  executiveResources: ExecutiveResourceItem[] = [],
) {
  const variant = index % 2 === 0 ? "muted" : "default";

  switch (section.kind) {
    case "executive-summary":
      return (
        <Section key={section.title} variant={variant} className="!py-12 md:!py-16">
          <SectionIntro title={section.title} />
          <div className="mt-8">
            <NarrativeBlock paragraphs={section.paragraphs} linkState={linkState} />
          </div>
          {executiveResources.length > 0 ? (
            <div className="mt-10">
              <ExecutiveResources resources={executiveResources} />
            </div>
          ) : null}
        </Section>
      );

    case "why-matters":
      return (
        <Section key={section.title} variant={variant} className="!py-12 md:!py-16">
          <SectionIntro title={section.title} />
          <div className="mt-8">
            <InsightCallout paragraphs={section.paragraphs} linkState={linkState} />
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

    case "mistakes": {
      const mistakeItems = resolveMistakeItems(section);
      return (
        <Section key={section.title} variant={variant} className="!py-12 md:!py-16">
          <SectionIntro title={section.title} />
          <div className="mt-8">
            <MistakesSection
              intro={section.paragraphs}
              mistakes={mistakeItems}
              linkState={linkState}
            />
          </div>
        </Section>
      );
    }

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
              <NarrativeBlock paragraphs={section.paragraphs} linkState={linkState} />
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
              <NarrativeBlock paragraphs={section.paragraphs} linkState={linkState} />
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
              <NarrativeBlock paragraphs={section.paragraphs} linkState={linkState} />
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

    case "evidence":
    case "cascade":
      return (
        <Section key={section.title} variant={variant} className="!py-12 md:!py-16">
          <SectionIntro title={section.title} />
          <div className="mt-8 space-y-6">
            {section.kind === "cascade" && section.bullets.length > 0 ? (
              <ImpactCascade items={section.bullets} />
            ) : null}
            {section.bullets.length > 0 && section.kind !== "cascade" ? (
              <BulletGrid items={section.bullets} />
            ) : null}
            {section.paragraphs.length > 0 ? (
              <NarrativeBlock paragraphs={section.paragraphs} linkState={linkState} />
            ) : null}
          </div>
        </Section>
      );

    case "stack":
    case "challenges":
    case "priorities":
      return (
        <Section key={section.title} variant={variant} className="!py-12 md:!py-16">
          <SectionIntro title={section.title} />
          <div className="mt-8 space-y-6">
            {section.bullets.length > 0 ? <BulletGrid items={section.bullets} /> : null}
            {section.paragraphs.length > 0 ? (
              <NarrativeBlock paragraphs={section.paragraphs} linkState={linkState} />
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
            {section.mistakes.length > 0 ? (
              <MistakesSection
                intro={section.paragraphs}
                mistakes={section.mistakes}
                linkState={linkState}
              />
            ) : (
              <>
                {section.bullets.length > 0 ? (
                  isChecklistSection(section) ? (
                    <ChecklistCards items={section.bullets} />
                  ) : (
                    <BulletGrid items={section.bullets} />
                  )
                ) : null}
                <NarrativeBlock paragraphs={section.paragraphs} linkState={linkState} />
              </>
            )}
          </div>
        </Section>
      );

    default:
      return null;
  }
}

function LegacyArticle({
  content,
  linkState,
  executiveResources = [],
}: {
  content: string[];
  linkState?: AutoLinkState;
  executiveResources?: ExecutiveResourceItem[];
}) {
  const summary = content.slice(0, 3);
  const body = content.slice(3, -2);
  const takeaways = content.slice(-2);

  return (
    <>
      <Section variant="muted" className="!py-12 md:!py-16">
        <SectionIntro title="Executive Summary" />
        <div className="mt-8">
          <NarrativeBlock paragraphs={summary} linkState={linkState} />
        </div>
        {executiveResources.length > 0 ? (
          <div className="mt-10">
            <ExecutiveResources resources={executiveResources} />
          </div>
        ) : null}
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
                <InsightCallout
                  key={group[0].slice(0, 40)}
                  paragraphs={group}
                  linkState={linkState}
                />
              ) : (
                <NarrativeBlock
                  key={group[0].slice(0, 40)}
                  paragraphs={group}
                  linkState={linkState}
                />
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
  currentSlug: string;
  executiveResources?: ExecutiveResourceItem[];
};

export function ResearchArticle({
  content,
  currentSlug,
  executiveResources = [],
}: ResearchArticleProps) {
  const linkState = createAutoLinkState(currentSlug);

  if (!isStructuredResearch(content)) {
    return (
      <LegacyArticle
        content={content}
        linkState={linkState}
        executiveResources={executiveResources}
      />
    );
  }

  const { sections } = parseResearchContent(content);
  return (
    <>
      {sections.map((section, index) =>
        renderSection(section, index, linkState, executiveResources),
      )}
    </>
  );
}
