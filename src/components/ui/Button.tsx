import Link from "next/link";
import { type ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  external?: boolean;
  className?: string;
  /** GA4 event name consumed by AnalyticsClickCapture */
  analyticsEvent?: string;
  analyticsCtaLocation?: string;
  analyticsArticleSlug?: string;
  analyticsResourceName?: string;
  analyticsResourceType?: string;
};

const variants = {
  primary: "bg-crimson text-white hover:bg-crimson-dark shadow-sm",
  secondary: "bg-ink text-white hover:bg-ink-light shadow-sm",
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
  analyticsEvent,
  analyticsCtaLocation,
  analyticsArticleSlug,
  analyticsResourceName,
  analyticsResourceType,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors ${variants[variant]} ${className}`;

  const analyticsProps = {
    ...(analyticsEvent ? { "data-analytics-event": analyticsEvent } : {}),
    ...(analyticsCtaLocation
      ? { "data-analytics-cta-location": analyticsCtaLocation }
      : {}),
    ...(analyticsArticleSlug
      ? { "data-analytics-article-slug": analyticsArticleSlug }
      : {}),
    ...(analyticsResourceName
      ? { "data-analytics-resource-name": analyticsResourceName }
      : {}),
    ...(analyticsResourceType
      ? { "data-analytics-resource-type": analyticsResourceType }
      : {}),
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...analyticsProps}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...analyticsProps}>
      {children}
    </Link>
  );
}
