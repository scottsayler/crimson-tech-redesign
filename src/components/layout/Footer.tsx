import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { industries } from "@/content/industries";
import { primaryNav } from "@/content/navigation";
import { practices } from "@/content/practices";
import { solutions } from "@/content/solutions";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo imageClassName="h-7 w-auto" />
            <p className="mt-4 text-sm text-ink-muted leading-relaxed">
              Independent technology advisory and digital execution.
            </p>
            <p className="mt-4 text-sm text-ink-muted">{site.location}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink">Company</h3>
            <ul className="mt-4 space-y-2">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-muted hover:text-crimson"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink">Services</h3>
            <ul className="mt-4 space-y-2">
              {solutions.map((solution) => (
                <li key={solution.slug}>
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className="text-sm text-ink-muted hover:text-crimson"
                  >
                    {solution.title}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-sm font-semibold text-ink">Practice Areas</h3>
            <ul className="mt-4 space-y-2">
              {practices.map((practice) => (
                <li key={practice.slug}>
                  <Link
                    href={practice.href}
                    className="text-sm text-ink-muted hover:text-crimson"
                  >
                    {practice.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink">Industries</h3>
            <ul className="mt-4 space-y-2">
              {industries.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="text-sm text-ink-muted hover:text-crimson"
                  >
                    {industry.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-stone-200 pt-8 md:flex-row">
          <p className="text-sm text-ink-muted">
            © {new Date().getFullYear()} {site.name} LLC. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-ink-muted hover:text-crimson">
              Privacy Policy
            </Link>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-ink-muted hover:text-crimson"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
