export type NavItem = {
  label: string;
  href: string;
  children?: "solutions" | "industries" | "research";
};

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/solutions", children: "solutions" },
  { label: "Industries", href: "/industries", children: "industries" },
  { label: "Crimson CX", href: "/crimson-cx" },
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/research", children: "research" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const ctaNav = {
  label: "Schedule a Conversation",
  href: "/contact",
} as const;
