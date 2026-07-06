export type SectionKind =
  | "executive-summary"
  | "why-matters"
  | "signs"
  | "mistakes"
  | "what-good-looks-like"
  | "questions"
  | "options"
  | "before-buy"
  | "faq"
  | "takeaways"
  | "escalation"
  | "decision"
  | "stack"
  | "challenges"
  | "priorities"
  | "evidence"
  | "narrative"
  | "named";

export type ParsedSection = {
  kind: SectionKind;
  title: string;
  paragraphs: string[];
  bullets: string[];
  pairs: { left: string; right: string }[];
  options: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
};

export type ParsedArticle = {
  sections: ParsedSection[];
};

const HEADER_ALIASES: Record<string, { kind: SectionKind; title: string }> = {
  "when to evaluate": {
    kind: "signs",
    title: "Signs This Needs Your Attention",
  },
  "buying triggers": {
    kind: "signs",
    title: "Signs This Needs Your Attention",
  },
  "when to wait": {
    kind: "what-good-looks-like",
    title: "What Good Looks Like",
  },
  "alternatives": { kind: "options", title: "Your Options" },
  "questions to ask": {
    kind: "questions",
    title: "Questions to Ask Your Team",
  },
  "decision matrix": {
    kind: "decision",
    title: "Choosing the Right Approach",
  },
  "ask before you buy": { kind: "before-buy", title: "Before You Buy" },
  "buying trigger timeline": {
    kind: "escalation",
    title: "How This Problem Typically Escalates",
  },
  "technology stack": { kind: "stack", title: "Typical Environment" },
  "top challenges": {
    kind: "challenges",
    title: "Common Operational Challenges",
  },
  "common priorities": { kind: "priorities", title: "Common Priorities" },
  "evidence": {
    kind: "evidence",
    title: "What We See Across Organizations",
  },
  "common mistakes": { kind: "mistakes", title: "Common Mistakes" },
  "key takeaways": { kind: "takeaways", title: "Executive Takeaways" },
};

function normalizeHeader(line: string): string {
  return line.trim().replace(/:$/, "").toLowerCase();
}

function isKnownHeader(line: string): boolean {
  const normalized = normalizeHeader(line);
  if (HEADER_ALIASES[normalized]) return true;
  return /^[A-Za-z0-9][A-Za-z0-9\s/&'-]{0,48}:$/.test(line.trim());
}

function isBullet(line: string): boolean {
  return line.trim().startsWith("•");
}

function stripBullet(line: string): string {
  return line.trim().replace(/^•\s*/, "");
}

function parseBulletItem(line: string): { title: string; body: string } {
  const text = stripBullet(line);
  const colonIndex = text.indexOf(":");
  if (colonIndex > 0 && colonIndex < 60) {
    return {
      title: text.slice(0, colonIndex).trim(),
      body: text.slice(colonIndex + 1).trim(),
    };
  }
  return { title: text, body: "" };
}

function isQuestion(line: string): boolean {
  return line.trim().startsWith("Question:");
}

function parseQuestion(line: string): string {
  return line.trim().replace(/^Question:\s*/, "");
}

function parseAnswer(line: string): string {
  return line.trim().replace(/^Answer:\s*/, "");
}

function isNamedSubsection(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed || trimmed.length > 64) return false;
  if (trimmed.endsWith(":")) return false;
  if (isBullet(trimmed)) return false;
  if (isQuestion(trimmed)) return false;
  if (/^\d+\./.test(trimmed)) return false;
  if (trimmed.split(/\s+/).length > 8) return false;
  return /^[A-Z]/.test(trimmed) && !/[.!?]$/.test(trimmed);
}

type RawChunk = {
  header: string | null;
  lines: string[];
};

function splitRawChunks(content: string[]): RawChunk[] {
  const chunks: RawChunk[] = [];
  let current: RawChunk = { header: null, lines: [] };

  for (const line of content) {
    if (isKnownHeader(line)) {
      if (current.lines.length > 0 || current.header) {
        chunks.push(current);
      }
      current = { header: line.trim(), lines: [] };
      continue;
    }

    if (isNamedSubsection(line) && current.lines.length > 0) {
      chunks.push(current);
      current = { header: line.trim(), lines: [] };
      continue;
    }

    current.lines.push(line);
  }

  if (current.lines.length > 0 || current.header) {
    chunks.push(current);
  }

  return chunks;
}

function linesToSectionContent(lines: string[]): {
  paragraphs: string[];
  bullets: string[];
  faqs: { question: string; answer: string }[];
} {
  const { faqs, rest } = extractFaqs(lines);
  const paragraphs = rest.filter(
    (line) => !isBullet(line) && !line.trim().startsWith("Answer:"),
  );
  const bullets = rest.filter((line) => isBullet(line)).map(stripBullet);
  return { paragraphs, bullets, faqs };
}

function chunkToSection(chunk: RawChunk): ParsedSection | null {
  if (!chunk.header) {
    const { paragraphs, bullets, faqs } = linesToSectionContent(chunk.lines);
    if (paragraphs.length === 0 && bullets.length === 0 && faqs.length === 0) {
      return null;
    }

    return {
      kind: paragraphs.length > 0 ? "executive-summary" : "takeaways",
      title: paragraphs.length > 0 ? "Executive Summary" : "Executive Takeaways",
      paragraphs,
      bullets,
      pairs: [],
      options: [],
      faqs,
    };
  }

  const normalized = normalizeHeader(chunk.header);
  const alias = HEADER_ALIASES[normalized];

  if (alias) {
    const { paragraphs, faqs } = linesToSectionContent(chunk.lines);
    const bullets = chunk.lines.filter((line) => isBullet(line));

    if (alias.kind === "options") {
      return {
        kind: alias.kind,
        title: alias.title,
        paragraphs,
        bullets: [],
        pairs: [],
        options: bullets.map(parseBulletItem),
        faqs,
      };
    }

    if (alias.kind === "decision") {
      return {
        kind: alias.kind,
        title: alias.title,
        paragraphs,
        bullets: [],
        pairs: bullets.map(parseBulletItem).map((item) => ({
          left: item.title,
          right: item.body,
        })),
        options: [],
        faqs,
      };
    }

    if (alias.kind === "what-good-looks-like") {
      return {
        kind: alias.kind,
        title: alias.title,
        paragraphs,
        bullets: bullets.map(stripBullet),
        pairs: [],
        options: [],
        faqs,
      };
    }

    return {
      kind: alias.kind,
      title: alias.title,
      paragraphs,
      bullets: bullets.map(stripBullet),
      pairs: [],
      options: [],
      faqs,
    };
  }

  if (isNamedSubsection(chunk.header)) {
    const { paragraphs, bullets, faqs } = linesToSectionContent(chunk.lines);
    return {
      kind: "named",
      title: chunk.header,
      paragraphs,
      bullets,
      pairs: [],
      options: [],
      faqs,
    };
  }

  const { paragraphs, bullets, faqs } = linesToSectionContent(chunk.lines);
  return {
    kind: "narrative",
    title: chunk.header.replace(/:$/, ""),
    paragraphs,
    bullets,
    pairs: [],
    options: [],
    faqs,
  };
}

function extractFaqs(lines: string[]): { faqs: { question: string; answer: string }[]; rest: string[] } {
  const faqs: { question: string; answer: string }[] = [];
  const rest: string[] = [];
  let pendingQuestion: string | null = null;

  for (const line of lines) {
    if (isQuestion(line)) {
      pendingQuestion = parseQuestion(line);
      continue;
    }

    if (line.trim().startsWith("Answer:") && pendingQuestion) {
      faqs.push({ question: pendingQuestion, answer: parseAnswer(line) });
      pendingQuestion = null;
      continue;
    }

    rest.push(line);
  }

  return { faqs, rest };
}

function mergeSignSections(sections: ParsedSection[]): ParsedSection[] {
  const merged: ParsedSection[] = [];
  let pendingSigns: ParsedSection | null = null;

  for (const section of sections) {
    if (section.kind === "signs") {
      if (!pendingSigns) {
        pendingSigns = { ...section, bullets: [...section.bullets] };
      } else {
        pendingSigns.bullets.push(...section.bullets);
      }
      continue;
    }

    if (pendingSigns) {
      merged.push(pendingSigns);
      pendingSigns = null;
    }

    merged.push(section);
  }

  if (pendingSigns) merged.push(pendingSigns);
  return merged;
}

function deriveMistakes(paragraphs: string[]): string[] {
  const patterns = [
    /\bnot simply\b/i,
    /\bnot only\b/i,
    /\bbefore (buying|identifying|relying)\b/i,
    /\bwithout (testing|identifying|documenting)\b/i,
    /\bassuming\b/i,
    /\bnever tested\b/i,
    /\bdoes not\b/i,
    /\bdo not only\b/i,
    /\brarely the\b/i,
  ];

  return paragraphs
    .filter((paragraph) => patterns.some((pattern) => pattern.test(paragraph)))
    .slice(0, 5);
}

function deriveWhyMatters(paragraphs: string[]): string[] {
  const impactPatterns = [
    /\bpayment\b/i,
    /\brevenue\b/i,
    /\boperational\b/i,
    /\bcustomer\b/i,
    /\bguest\b/i,
    /\bcomplexity\b/i,
    /\bresilience\b/i,
    /\bdisruption\b/i,
  ];

  return paragraphs.filter(
    (paragraph) =>
      paragraph.length > 120 &&
      impactPatterns.filter((pattern) => pattern.test(paragraph)).length >= 2,
  );
}

function deriveTakeaways(sections: ParsedSection[]): string[] {
  const closing = sections
    .filter((section) =>
      ["executive-summary", "narrative", "named", "evidence"].includes(section.kind),
    )
    .flatMap((section) => section.paragraphs)
    .slice(-4);

  const bullets = closing
    .flatMap((paragraph) =>
      paragraph
        .split(/(?<=[.!?])\s+/)
        .map((sentence) => sentence.trim())
        .filter((sentence) => sentence.length > 40 && sentence.length < 220),
    )
    .slice(-5);

  if (bullets.length >= 3) return bullets.slice(0, 5);

  const lastBullets = sections
    .filter((section) => section.kind === "priorities" || section.kind === "challenges")
    .flatMap((section) => section.bullets)
    .slice(0, 5);

  return lastBullets.length > 0 ? lastBullets : bullets;
}

function reorganizeArticle(sections: ParsedSection[]): ParsedSection[] {
  const output: ParsedSection[] = [];
  const looseNarrative: string[] = [];
  let executive: ParsedSection | null = null;
  const faqs: { question: string; answer: string }[] = [];

  for (const section of sections) {
    if (section.kind === "executive-summary") {
      executive = section;
      continue;
    }

    if (section.kind === "faq") {
      faqs.push(...section.faqs);
      continue;
    }

    if (section.kind === "named") {
      const extracted = extractFaqs(section.paragraphs);
      faqs.push(...section.faqs, ...extracted.faqs);
      output.push({
        ...section,
        paragraphs: extracted.rest,
      });
      continue;
    }

    if (section.kind === "narrative") {
      const extracted = extractFaqs(section.paragraphs);
      faqs.push(...section.faqs, ...extracted.faqs);
      looseNarrative.push(...extracted.rest);
      continue;
    }

    const extracted = extractFaqs(section.paragraphs);
    faqs.push(...section.faqs, ...extracted.faqs);
    output.push({
      ...section,
      paragraphs: extracted.rest,
    });
  }

  if (executive) {
    const summaryParagraphs = executive.paragraphs.slice(0, 3);
    output.unshift({
      ...executive,
      paragraphs: summaryParagraphs,
    });

    looseNarrative.unshift(...executive.paragraphs.slice(3));
  }

  const usedParagraphs = new Set<string>();
  const whatGoodIndex = output.findIndex((section) => section.kind === "what-good-looks-like");
  if (whatGoodIndex >= 0) {
    const whatGood = output[whatGoodIndex];
    const impactParagraphs = whatGood.paragraphs.filter((paragraph) => paragraph.length > 120);
    if (impactParagraphs.length > 0) {
      impactParagraphs.forEach((paragraph) => usedParagraphs.add(paragraph));
      output[whatGoodIndex] = {
        ...whatGood,
        paragraphs: whatGood.paragraphs.filter((paragraph) => !usedParagraphs.has(paragraph)),
      };
      const signsIndex = output.findIndex((section) => section.kind === "signs");
      const whySection: ParsedSection = {
        kind: "why-matters",
        title: "Why This Matters",
        paragraphs: impactParagraphs.slice(0, 3),
        bullets: [],
        pairs: [],
        options: [],
        faqs: [],
      };
      if (signsIndex >= 0) {
        output.splice(signsIndex + 1, 0, whySection);
      } else {
        output.splice(whatGoodIndex, 0, whySection);
      }
    }
  }

  const whyMatters = deriveWhyMatters(looseNarrative).filter(
    (paragraph) => !usedParagraphs.has(paragraph),
  );
  if (whyMatters.length > 0 && !output.some((section) => section.kind === "why-matters")) {
    whyMatters.forEach((paragraph) => usedParagraphs.add(paragraph));
    const insertAt = output.findIndex((section) => section.kind === "signs");
    const whySection: ParsedSection = {
      kind: "why-matters",
      title: "Why This Matters",
      paragraphs: whyMatters.slice(0, 3),
      bullets: [],
      pairs: [],
      options: [],
      faqs: [],
    };
    if (insertAt >= 0) {
      output.splice(insertAt + 1, 0, whySection);
    } else {
      output.unshift(whySection);
    }
  }

  const mistakes = deriveMistakes([
    ...looseNarrative,
    ...output.flatMap((section) => section.paragraphs),
  ]).filter((paragraph) => !usedParagraphs.has(paragraph));
  if (mistakes.length > 0) {
    mistakes.forEach((paragraph) => usedParagraphs.add(paragraph));
    const anchorIndex = Math.max(
      output.findIndex((section) => section.kind === "why-matters"),
      output.findIndex((section) => section.kind === "signs"),
    );
    const mistakeSection: ParsedSection = {
      kind: "mistakes",
      title: "Common Mistakes",
      paragraphs: [],
      bullets: mistakes,
      pairs: [],
      options: [],
      faqs: [],
    };
    if (anchorIndex >= 0) {
      output.splice(anchorIndex + 1, 0, mistakeSection);
    } else {
      output.push(mistakeSection);
    }
  }

  const remainingNarrative = looseNarrative.filter(
    (paragraph) => !usedParagraphs.has(paragraph),
  );
  if (remainingNarrative.length > 0) {
    const optionsIndex = output.findIndex((section) => section.kind === "options");
    const narrativeSection: ParsedSection = {
      kind: "narrative",
      title: "Advisory Perspective",
      paragraphs: remainingNarrative,
      bullets: [],
      pairs: [],
      options: [],
      faqs: [],
    };
    if (optionsIndex >= 0) {
      output.splice(optionsIndex, 0, narrativeSection);
    } else {
      output.push(narrativeSection);
    }
  }

  const orderedKinds: SectionKind[] = [
    "executive-summary",
    "why-matters",
    "signs",
    "mistakes",
    "what-good-looks-like",
    "challenges",
    "priorities",
    "stack",
    "evidence",
    "narrative",
    "named",
    "questions",
    "options",
    "decision",
    "before-buy",
    "escalation",
  ];

  const rank = (kind: SectionKind) => {
    const index = orderedKinds.indexOf(kind);
    return index === -1 ? 50 : index;
  };

  const structured = [...output]
    .map((section, index) => ({ section, index }))
    .sort((a, b) => {
      const rankDiff = rank(a.section.kind) - rank(b.section.kind);
      return rankDiff !== 0 ? rankDiff : a.index - b.index;
    })
    .map(({ section }) => section);

  const uniqueFaqs = faqs.filter(
    (faq, index, all) =>
      all.findIndex((item) => item.question === faq.question) === index,
  );

  if (uniqueFaqs.length > 0) {
    structured.push({
      kind: "faq",
      title: "Frequently Asked Questions",
      paragraphs: [],
      bullets: [],
      pairs: [],
      options: [],
      faqs: uniqueFaqs,
    });
  }

  const takeaways = deriveTakeaways(sections);
  if (takeaways.length > 0) {
    structured.push({
      kind: "takeaways",
      title: "Executive Takeaways",
      paragraphs: [],
      bullets: takeaways,
      pairs: [],
      options: [],
      faqs: [],
    });
  }

  return structured;
}

export function parseResearchContent(content: string[]): ParsedArticle {
  const chunks = splitRawChunks(content);
  const sections = chunks
    .map(chunkToSection)
    .filter((section): section is ParsedSection => Boolean(section));

  const withFaqsExtracted = sections.map((section) => {
    const { faqs, rest } = extractFaqs(section.paragraphs);
    return {
      ...section,
      paragraphs: rest,
      faqs: [...section.faqs, ...faqs],
    };
  });

  const merged = mergeSignSections(withFaqsExtracted);
  return { sections: reorganizeArticle(merged) };
}

export function isStructuredResearch(content: string[]): boolean {
  return content.some((line) => isKnownHeader(line));
}
