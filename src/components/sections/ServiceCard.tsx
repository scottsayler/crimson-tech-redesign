import Link from "next/link";
import type { Solution } from "@/content/solutions";

export function ServiceCard({ service }: { service: Solution }) {
  return (
    <Link
      href={`/solutions/${service.slug}`}
      className="group flex flex-col rounded-lg border border-stone-200 bg-white p-6 transition-all hover:border-crimson/30 hover:shadow-md"
    >
      <h3 className="text-lg font-semibold text-ink group-hover:text-crimson">
        {service.title}
      </h3>
      <p className="mt-2 flex-1 text-sm text-ink-muted leading-relaxed">
        {service.shortDescription}
      </p>
      <span className="mt-4 text-sm font-medium text-crimson">
        Learn more →
      </span>
    </Link>
  );
}
