import type { AutoLinkState } from "@/lib/research-auto-link";
import { MistakeCard } from "./MistakeCard";
import { NarrativeBlock } from "./NarrativeBlock";

export type MistakeItem = {
  title: string;
  paragraphs: string[];
};

type MistakesSectionProps = {
  intro?: string[];
  mistakes: MistakeItem[];
  linkState?: AutoLinkState;
};

export function MistakesSection({
  intro = [],
  mistakes,
  linkState,
}: MistakesSectionProps) {
  return (
    <>
      {intro.length > 0 ? (
        <NarrativeBlock paragraphs={intro} linkState={linkState} />
      ) : null}
      <ol className={`m-0 list-none p-0 ${intro.length > 0 ? "mt-7 space-y-4" : "space-y-4"}`}>
        {mistakes.map((mistake, index) => (
          <li key={`${index}-${mistake.title || mistake.paragraphs[0]?.slice(0, 40)}`}>
            <MistakeCard
              index={index + 1}
              title={mistake.title}
              paragraphs={mistake.paragraphs}
              linkState={linkState}
            />
          </li>
        ))}
      </ol>
    </>
  );
}
