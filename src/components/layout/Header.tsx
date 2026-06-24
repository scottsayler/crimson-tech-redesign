"use client";

import Link from "next/link";
import { useState } from "react";
import { industries } from "@/content/industries";
import { ctaNav, primaryNav } from "@/content/navigation";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"services" | "industries" | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-crimson" />
          <span className="text-lg font-semibold tracking-tight text-ink">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            if (item.children) {
              const childType = item.children;
              return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(childType)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
                {openDropdown === childType && (
                  <div className="absolute left-0 top-full w-80 pt-2">
                    <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-lg">
                      {(childType === "services" ? services : industries).map(
                        (child) => (
                          <Link
                            key={child.slug}
                            href={`/${childType === "services" ? "services" : "industries"}/${child.slug}`}
                            className="block rounded-md px-3 py-2 hover:bg-stone-50"
                          >
                            <span className="block text-sm font-medium text-ink">
                              {child.title}
                            </span>
                            <span className="mt-0.5 block text-xs text-ink-muted line-clamp-1">
                              {child.shortDescription}
                            </span>
                          </Link>
                        ),
                      )}
                      <Link
                        href={item.href}
                        className="mt-2 block border-t border-stone-100 px-3 pt-3 text-sm font-medium text-crimson hover:text-crimson-dark"
                      >
                        View all {item.label.toLowerCase()} →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  item.highlight
                    ? "text-crimson hover:text-crimson-dark"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Button href={ctaNav.href} className="ml-4 !px-4 !py-2 text-sm">
            {ctaNav.label}
          </Button>
        </nav>

        <button
          type="button"
          className="lg:hidden rounded-md p-2 text-ink"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-stone-200 bg-white lg:hidden">
          <div className="px-6 py-4">
            <Button href={ctaNav.href} className="mb-4 w-full">
              {ctaNav.label}
            </Button>
            {primaryNav.map((item) => (
              <div key={item.label} className="border-b border-stone-100 py-3">
                <Link
                  href={item.href}
                  className={`block text-base font-medium ${
                    item.highlight ? "text-crimson" : "text-ink"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="mt-2 space-y-1 pl-4">
                    {(item.children === "services" ? services : industries).map(
                      (child) => (
                        <Link
                          key={child.slug}
                          href={`/${item.children === "services" ? "services" : "industries"}/${child.slug}`}
                          className="block py-1 text-sm text-ink-muted"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.title}
                        </Link>
                      ),
                    )}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
