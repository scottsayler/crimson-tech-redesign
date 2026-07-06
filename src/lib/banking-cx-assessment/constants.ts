export const LIKERT_SCALE = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
] as const;

export const INSTITUTION_TYPES = [
  { value: "community_bank", label: "Community Bank" },
  { value: "regional_bank", label: "Regional Bank" },
  { value: "credit_union", label: "Credit Union" },
  { value: "other", label: "Other" },
] as const;

export const ASSET_SIZES = [
  { value: "under_1b", label: "Under $1B" },
  { value: "1b_5b", label: "$1B – $5B" },
  { value: "5b_20b", label: "$5B – $20B" },
  { value: "over_20b", label: "$20B+" },
] as const;

export const CUSTOMER_FACING_EMPLOYEES = [
  { value: "under_50", label: "Under 50" },
  { value: "50_200", label: "50 – 200" },
  { value: "200_1000", label: "200 – 1,000" },
  { value: "over_1000", label: "Over 1,000" },
] as const;

export const RESPONDENT_ROLES = [
  { value: "cio", label: "CIO / IT Leader" },
  { value: "coo", label: "COO / Operations Leader" },
  { value: "contact_center", label: "Contact Center Leader" },
  { value: "digital_banking", label: "Digital Banking Leader" },
  { value: "retail_banking", label: "Retail Banking Leader" },
  { value: "cx", label: "CX / Member Experience Leader" },
  { value: "other", label: "Other" },
] as const;

export const CCAAS_PLATFORMS = [
  { value: "nice", label: "NICE" },
  { value: "genesys", label: "Genesys" },
  { value: "glia", label: "Glia" },
  { value: "five9", label: "Five9" },
  { value: "talkdesk", label: "Talkdesk" },
  { value: "amazon_connect", label: "Amazon Connect" },
  { value: "ringcentral", label: "RingCentral" },
  { value: "other", label: "Other" },
  { value: "not_sure", label: "Not Sure" },
] as const;

export const CRM_PLATFORMS = [
  { value: "salesforce", label: "Salesforce" },
  { value: "dynamics", label: "Microsoft Dynamics" },
  { value: "hubspot", label: "HubSpot" },
  { value: "zendesk", label: "Zendesk" },
  { value: "other", label: "Other" },
  { value: "none", label: "None" },
  { value: "not_sure", label: "Not Sure" },
] as const;

export const CORE_PLATFORMS = [
  { value: "fiserv", label: "Fiserv" },
  { value: "jack_henry", label: "Jack Henry" },
  { value: "fis", label: "FIS" },
  { value: "corelation", label: "Corelation" },
  { value: "other", label: "Other" },
  { value: "not_sure", label: "Not Sure" },
] as const;

export const AI_TECHNOLOGIES = [
  { value: "virtual_assistant", label: "Virtual Assistant" },
  { value: "agent_assist", label: "Agent Assist" },
  { value: "call_summarization", label: "Call Summarization" },
  { value: "knowledge_ai", label: "Knowledge AI" },
  { value: "workflow_automation", label: "Workflow Automation" },
  { value: "agentic_ai", label: "Agentic AI" },
  { value: "none", label: "None" },
] as const;

export const DATA_ENVIRONMENTS = [
  { value: "mostly_siloed", label: "Mostly siloed" },
  { value: "partially_integrated", label: "Partially integrated" },
  { value: "mostly_unified", label: "Mostly unified" },
  { value: "realtime_unified", label: "Real-time unified" },
] as const;
