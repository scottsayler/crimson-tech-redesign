import Link from "next/link";
import { Section } from "@/components/ui/Section";
import type { Research } from "@/content/research";
import type { ContinueReadingItem, LearningPathContext } from "@/lib/topic-graph";
import { ContinueYourResearch } from "./ContinueYourResearch";
import { LearningPathNav } from "./LearningPathNav";
import { RelatedTopics } from "./RelatedTopics";
import { SeeAlso } from "./SeeAlso";

type ResearchNavigationProps = {
  current: Research;
  learningPath?: LearningPathContext;
  continueReading: ContinueReadingItem[];
  relatedTopics: Research[];
  seeAlso: Research[];
};

export function ResearchNavigation({
  current,
  learningPath,
  continueReading,
  relatedTopics,
  seeAlso,
}: ResearchNavigationProps) {
  const hasContent =
    learningPath ||
    continueReading.length > 0 ||
    relatedTopics.length > 0 ||
    seeAlso.length > 0;

  if (!hasContent) return null;

  return (
    <>
      {learningPath ? (
        <Section variant="muted" className="!py-12 md:!py-16">
          <LearningPathNav context={learningPath} currentSlug={current.slug} />
        </Section>
      ) : null}

      {continueReading.length > 0 || relatedTopics.length > 0 || seeAlso.length > 0 ? (
        <Section className="!py-12 md:!py-16">
          <div className="space-y-12">
            <ContinueYourResearch items={continueReading} />
            <RelatedTopics items={relatedTopics} />
            <SeeAlso items={seeAlso} />
          </div>
        </Section>
      ) : null}

      <Section variant="muted" className="!py-10">
        <Link
          href="/research"
          className="text-sm font-medium text-crimson hover:text-crimson-dark"
        >
          Browse all research →
        </Link>
      </Section>
    </>
  );
}
