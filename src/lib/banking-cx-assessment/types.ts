export type InstitutionType =
  | "community_bank"
  | "regional_bank"
  | "credit_union"
  | "other";

export type AssetSize = "under_1b" | "1b_5b" | "5b_20b" | "over_20b";

export type CustomerFacingEmployees =
  | "under_50"
  | "50_200"
  | "200_1000"
  | "over_1000";

export type RespondentRole =
  | "cio"
  | "coo"
  | "contact_center"
  | "digital_banking"
  | "retail_banking"
  | "cx"
  | "other";

export type DataEnvironment =
  | "mostly_siloed"
  | "partially_integrated"
  | "mostly_unified"
  | "realtime_unified";

export type AssessmentQuestion = {
  id: string;
  text: string;
};

export type AssessmentArea = {
  id: string;
  name: string;
  description: string;
  questions: AssessmentQuestion[];
};

export type QuestionSection = {
  id: "governance" | "ai_readiness" | "executive_alignment";
  name: string;
  description: string;
  questions: AssessmentQuestion[];
};

export type AreaScore = {
  areaId: string;
  areaName: string;
  score: number;
  questionCount: number;
};

export type QuestionScore = {
  questionId: string;
  text: string;
  score: number;
};

export type AssessmentResponses = Record<string, number>;

export type OrganizationInfo = {
  organizationName: string;
  institutionType: InstitutionType;
  assetSize: AssetSize;
  customerFacingEmployees: CustomerFacingEmployees | "";
  respondentRole: RespondentRole | "";
};

export type TechnologyProfile = {
  ccaasPlatform: string;
  crmPlatform: string;
  corePlatform: string;
  aiTechnologies: string[];
  dataEnvironment: DataEnvironment | "";
};

export type ContactInfo = {
  contactName: string;
  contactEmail: string;
  contactTitle: string;
  consentBenchmarking: boolean;
};

export type AssessmentScores = {
  cxFrictionScore: number;
  governanceScore: number;
  aiReadinessScore: number;
  executiveAlignmentScore: number;
  technologyComplexityScore: number;
  cxMaturityScore: number;
};

export type AssessmentSubmission = {
  organization: OrganizationInfo;
  technology: TechnologyProfile;
  contact: ContactInfo;
  responses: AssessmentResponses;
};

export type AssessmentResult = {
  id: string;
  submittedAt: string;
  organization: OrganizationInfo;
  technology: TechnologyProfile;
  contact: ContactInfo;
  scores: AssessmentScores;
  areaScores: AreaScore[];
  governanceGaps: QuestionScore[];
  aiReadinessGaps: QuestionScore[];
  priorityAreas: string[];
  responses: AssessmentResponses;
};
