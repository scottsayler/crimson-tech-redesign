import Link from "next/link";
import { AdvisorProse } from "@/components/sections/AdvisorProse";
import { founderProfile } from "@/content/credibility";
import { Button } from "@/components/ui/Button";

export function PrincipalAdvisor({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="rounded-lg border border-stone-200 bg-white p-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-crimson">
          Principal Advisor
        </p>
        <h3 className="mt-2 text-xl font-semibold text-ink">
          {founderProfile.name}
        </h3>
        <AdvisorProse prose={founderProfile.prose} className="mt-3 text-sm" />
        <Link
          href={founderProfile.href}
          className="mt-4 inline-block text-sm font-medium text-crimson hover:text-crimson-dark"
        >
          About Scott Sayler →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-crimson">
          Principal Advisor
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          {founderProfile.name}
        </h2>
        <p className="mt-1 text-lg text-ink-muted">{founderProfile.title}</p>
        <AdvisorProse prose={founderProfile.prose} className="mt-6" />
        <Button href={founderProfile.href} variant="outline" className="mt-6">
          About Scott Sayler
        </Button>
      </div>
      <ul className="space-y-4">
        {founderProfile.credentials.map((item) => (
          <li
            key={item}
            className="flex gap-3 rounded-lg border border-stone-200 bg-stone-50 p-4"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
            <span className="text-sm text-ink leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
