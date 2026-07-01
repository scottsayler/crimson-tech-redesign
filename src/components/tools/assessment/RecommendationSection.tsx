import Link from "next/link";
import { ContentBadge } from "@/components/ui/ContentBadge";
import type { ClassifiedLink } from "./classify-recommendations";

type RecommendationSectionProps = {
  title: string;
  description?: string;
  links: ClassifiedLink[];
  numbered?: boolean;
};

export function RecommendationSection({
  title,
  description,
  links,
  numbered,
}: RecommendationSectionProps) {
  if (links.length === 0) return null;

  return (
    <section className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      {description ? <p className="mt-1 text-sm text-ink-muted">{description}</p> : null}
      <ol className={`mt-6 space-y-4 ${numbered ? "list-none" : ""}`}>
        {links.map((link, index) => (
          <li
            key={link.href}
            className="rounded-lg border border-stone-200 px-4 py-4 transition-colors hover:border-crimson/25 hover:bg-stone-50/50"
          >
            <div className="flex items-start gap-3">
              {numbered ? (
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-crimson text-xs font-bold text-white"
                  aria-hidden
                >
                  {index + 1}
                </span>
              ) : null}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={link.href}
                    className="text-[15px] font-semibold text-crimson hover:text-crimson-dark"
                  >
                    {link.title}
                  </Link>
                  {link.typeLabel ? (
                    <ContentBadge label={link.typeLabel} variant="chip" />
                  ) : null}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{link.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
