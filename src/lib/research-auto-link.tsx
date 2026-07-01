import Link from "next/link";
import type { ReactNode } from "react";
import { buildLinkIndex } from "@/lib/topic-graph";

export type AutoLinkState = {
  currentSlug: string;
  index: Map<string, string>;
  linkedTargets: Set<string>;
  linkCount: number;
  maxLinks: number;
};

export function createAutoLinkState(
  currentSlug: string,
  maxLinks = 4,
): AutoLinkState {
  return {
    currentSlug,
    index: buildLinkIndex(),
    linkedTargets: new Set(),
    linkCount: 0,
    maxLinks,
  };
}

function canLinkTarget(state: AutoLinkState, targetSlug: string): boolean {
  return (
    targetSlug !== state.currentSlug &&
    !state.linkedTargets.has(targetSlug) &&
    state.linkCount < state.maxLinks
  );
}

function registerLink(state: AutoLinkState, targetSlug: string) {
  state.linkedTargets.add(targetSlug);
  state.linkCount += 1;
}

type Match = {
  start: number;
  end: number;
  phrase: string;
  slug: string;
};

function findEarliestMatch(text: string, state: AutoLinkState): Match | null {
  const lowerText = text.toLowerCase();
  let best: Match | null = null;

  for (const [phrase, slug] of state.index.entries()) {
    if (!canLinkTarget(state, slug)) continue;

    const index = lowerText.indexOf(phrase);
    if (index < 0) continue;

    const before = index > 0 ? lowerText[index - 1] : " ";
    const after =
      index + phrase.length < lowerText.length
        ? lowerText[index + phrase.length]
        : " ";

    const isWordChar = (char: string) => /[a-z0-9]/.test(char);
    if (isWordChar(before) || isWordChar(after)) continue;

    if (!best || index < best.start || (index === best.start && phrase.length > best.phrase.length)) {
      best = {
        start: index,
        end: index + phrase.length,
        phrase,
        slug,
      };
    }
  }

  return best;
}

export function linkParagraphText(
  text: string,
  state: AutoLinkState,
): ReactNode {
  const nodes: ReactNode[] = [];
  let remaining = text;
  let safety = 0;

  while (remaining.length > 0 && state.linkCount < state.maxLinks && safety < 20) {
    safety += 1;
    const match = findEarliestMatch(remaining, state);
    if (!match) {
      nodes.push(remaining);
      break;
    }

    if (match.start > 0) {
      nodes.push(remaining.slice(0, match.start));
    }

    const matchedText = remaining.slice(match.start, match.end);
    registerLink(state, match.slug);
    nodes.push(
      <Link
        key={`${match.slug}-${match.start}-${nodes.length}`}
        href={`/research/${match.slug}`}
        className="font-medium text-crimson underline decoration-crimson/30 underline-offset-2 hover:text-crimson-dark"
      >
        {matchedText}
      </Link>,
    );

    remaining = remaining.slice(match.end);
  }

  if (remaining) nodes.push(remaining);
  return nodes.length === 1 ? nodes[0] : nodes;
}
