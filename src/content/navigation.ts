export type NavItem = {
  label: string;
  href: string;
  children?: "solutions" | "industries" | "research";
};

export const primaryNav: NavItem[] = [
  { label: "Solutions", href: "/solutions", children: "solutions" },
  { label: "Research", href: "/research", children: "research" },
  { label: "Industries", href: "/industries", children: "industries" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const ctaNav = {
  label: "Schedule a Conversation",
  href: "/contact",
} as const;
