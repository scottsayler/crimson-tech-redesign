import Link from "next/link";
import { industries } from "@/content/industries";
import { primaryNav } from "@/content/navigation";
import { services } from "@/content/services";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-crimson" />
              <span className="text-lg font-semibold text-ink">{site.name}</span>
            </Link>
            <p className="mt-4 text-sm text-ink-muted leading-relaxed">
              Independent technology advisory and digital execution.
            </p>
            <p className="mt-4 text-sm text-ink-muted">{site.location}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink">Company</h3>
            <ul className="mt-4 space-y-2">
              {primaryNav
                .filter((item) => !item.children)
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-ink-muted hover:text-crimson"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              <li>
                <Link href="/contact" className="text-sm text-ink-muted hover:text-crimson">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink">Services</h3>
            <ul className="mt-4 space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-ink-muted hover:text-crimson"
                  >
                    {service.title}
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
