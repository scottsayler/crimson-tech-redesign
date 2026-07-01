export type IndustryLibrary = {
  industrySlug: string;
  title: string;
  description: string;
  categories: string[];
};

export const industryLibraries: IndustryLibrary[] = [
  {
    industrySlug: "restaurants",
    title: "Restaurant Technology Library",
    description:
      "Guides, checklists, and decision frameworks for restaurant connectivity, operations, and store infrastructure.",
    categories: ["Connectivity", "Operations", "Infrastructure"],
  },
];

export function getIndustryLibrary(
  industrySlug: string,
): IndustryLibrary | undefined {
  return industryLibraries.find((library) => library.industrySlug === industrySlug);
}
