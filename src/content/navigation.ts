export type NavItem = {
  label: string;
  href: string;
  children?: "services" | "industries";
  highlight?: boolean;
};

export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", children: "services" },
  { label: "Industries", href: "/industries", children: "industries" },
  { label: "Crimson CX", href: "/crimson-cx", highlight: true },
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/insights" },
];

export const ctaNav = {
  label: "Schedule a Conversation",
  href: "/contact",
} as const;
