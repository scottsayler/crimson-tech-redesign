export type Practice = {
  slug: string;
  title: string;
  shortDescription: string;
  href: string;
};

export const practices: Practice[] = [
  {
    slug: "crimson-cx",
    title: "Crimson CX",
    shortDescription:
      "Customer experience advisory for financial institutions.",
    href: "/crimson-cx",
  },
];

export function getPractice(slug: string): Practice | undefined {
  return practices.find((p) => p.slug === slug);
}
