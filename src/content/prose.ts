export type AdvisorProse = {
  observation: string;
  whyItMatters: string;
  recommendation: string;
};

export function proseToText(prose: AdvisorProse): string {
  return `${prose.observation} ${prose.whyItMatters} ${prose.recommendation}`;
}
