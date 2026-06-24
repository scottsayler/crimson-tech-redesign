import Link from "next/link";
import { type ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  external?: boolean;
  className?: string;
};

const variants = {
  primary:
    "bg-crimson text-white hover:bg-crimson-dark shadow-sm",
  secondary:
    "bg-ink text-white hover:bg-ink-light shadow-sm",
  outline:
    "border border-stone-300 bg-white text-ink hover:border-crimson hover:text-crimson",
  ghost: "text-crimson hover:text-crimson-dark",
};

export function Button({
  href,
  children,
  variant = "primary",
  external,
  className = "",
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
