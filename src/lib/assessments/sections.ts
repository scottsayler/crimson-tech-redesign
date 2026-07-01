import type {
  AssessmentDefinition,
  AssessmentQuestion,
  AssessmentSection,
} from "./types";

export function getSectionForCategory(
  definition: AssessmentDefinition,
  categoryId: string
): AssessmentSection | undefined {
  return definition.sections?.find((section) => section.categoryIds.includes(categoryId));
}

export function getSectionForQuestion(
  definition: AssessmentDefinition,
  question: AssessmentQuestion
): AssessmentSection | undefined {
  return getSectionForCategory(definition, question.category);
}

export function getQuestionsInSection(
  definition: AssessmentDefinition,
  section: AssessmentSection
): AssessmentQuestion[] {
  return definition.questions.filter((question) =>
    section.categoryIds.includes(question.category)
  );
}

export function getSectionProgress(
  definition: AssessmentDefinition,
  questionIndex: number
): {
  section: AssessmentSection;
  sectionIndex: number;
  questionInSection: number;
  totalInSection: number;
} | null {
  const question = definition.questions[questionIndex];
  if (!question || !definition.sections?.length) return null;

  const sectionIndex = definition.sections.findIndex((section) =>
    section.categoryIds.includes(question.category)
  );
  if (sectionIndex === -1) return null;

  const section = definition.sections[sectionIndex];
  const sectionQuestions = getQuestionsInSection(definition, section);
  const questionInSection =
    sectionQuestions.findIndex((item) => item.id === question.id) + 1;

  return {
    section,
    sectionIndex,
    questionInSection,
    totalInSection: sectionQuestions.length,
  };
}

export function getSectionCompletion(
  definition: AssessmentDefinition,
  section: AssessmentSection,
  answers: Record<string, number>
): { answered: number; total: number } {
  const sectionQuestions = getQuestionsInSection(definition, section);
  const answered = sectionQuestions.filter((q) => answers[q.id] !== undefined).length;
  return { answered, total: sectionQuestions.length };
}
