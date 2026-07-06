export type Practice = {
  slug: string;
  title: string;
  shortDescription: string;
  href: string;
};

export const practices: Practice[] = [
  {
    slug: "technology-advisory",
    title: "Technology Advisory",
    shortDescription:
      "Vendor evaluations, renewals, and platform decisions—before the contract is signed.",
    href: "/solutions/technology-advisory",
  },
  {
    slug: "crimson-cx",
    title: "Crimson CX",
    shortDescription:
      "CCaaS, contact center operations, and CX technology for banks and credit unions.",
    href: "/crimson-cx",
  },
  {
    slug: "digital-products",
    title: "Digital Products",
    shortDescription:
      "Built in-house—CFBVerdict demonstrates end-to-end product delivery.",
    href: "/solutions/digital-products",
  },
];

export function getPractice(slug: string): Practice | undefined {
  return practices.find((p) => p.slug === slug);
}
