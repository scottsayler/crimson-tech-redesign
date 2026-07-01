export interface AssessmentChoice {
  label: string;
  score: number;
}

export interface AssessmentCategory {
  id: string;
  label: string;
  description: string;
  weight?: number;
}

export interface AssessmentRelatedContent {
  id: string;
  title: string;
  href: string;
  description: string;
}

export interface AssessmentQuestion {
  id: string;
  category: string;
  prompt: string;
  choices: AssessmentChoice[];
  weight?: number;
}

export interface AssessmentResultProfile {
  minScore: number;
  level: string;
  summary: string;
}

export interface AssessmentRecommendationConfig {
  maxResults: number;
  requireCategoryComplete?: boolean;
  reasonTemplate: string;
  fallback?: string;
  byCategory: Record<string, string[]>;
}

export interface AssessmentInsightsConfig {
  strengthsCount: number;
  risksCount: number;
}

export interface AssessmentDefinition {
  id: string;
  toolSlug: string;
  title: string;
  scoreLabel: string;
  resultsDisclaimer?: string;
  categories: AssessmentCategory[];
  questions: AssessmentQuestion[];
  relatedContent: Record<string, AssessmentRelatedContent>;
  resultProfiles: AssessmentResultProfile[];
  recommendations: AssessmentRecommendationConfig;
  insights: AssessmentInsightsConfig;
}

export interface AssessmentAnswers {
  [questionId: string]: number;
}

export interface CategoryScore {
  id: string;
  label: string;
  score: number;
  answered: number;
  total: number;
  weight: number;
}

export interface AssessmentInsight {
  label: string;
  score: number;
  category: string;
}

export interface AssessmentPriority {
  title: string;
  href: string;
  reason: string;
}

export interface AssessmentResults {
  overallScore: number;
  maturityLevel: string;
  maturitySummary: string;
  categoryScores: CategoryScore[];
  strengths: AssessmentInsight[];
  risks: AssessmentInsight[];
  priorities: AssessmentPriority[];
  answeredCount: number;
  totalQuestions: number;
}

export interface PersistedAssessmentState {
  currentIndex: number;
  answers: AssessmentAnswers;
  showResults: boolean;
}
