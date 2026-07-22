"use client";

import Link from "next/link";
import { useState } from "react";
import { industries } from "@/content/industries";
import { ctaNav, primaryNav } from "@/content/navigation";
import { practices } from "@/content/practices";
import {
  RESEARCH_TYPES,
  getResearchHubPath,
  researchTypeLabels,
} from "@/content/research";
import { solutions } from "@/content/solutions";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

type DropdownType = "solutions" | "industries" | "research";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownType | null>(null);

  function renderDropdown(childType: DropdownType) {
    if (childType === "solutions") {
      return (
        <>
          {solutions.map((child) => (
            <Link
              key={child.slug}
              href={`/solutions/${child.slug}`}
              className="block rounded-md px-3 py-2 hover:bg-stone-50"
            >
              <span className="block text-sm font-medium text-ink">
                {child.title}
              </span>
              <span className="mt-0.5 block text-xs text-ink-muted line-clamp-1">
                {child.shortDescription}
              </span>
            </Link>
          ))}
          <div className="mt-2 border-t border-stone-100 pt-2">
            <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Practice Areas
            </p>
            {practices.map((practice) => (
              <Link
                key={practice.slug}
                href={practice.href}
                className="block rounded-md px-3 py-2 hover:bg-stone-50"
              >
                <span className="block text-sm font-medium text-ink">
                  {practice.title}
                </span>
                <span className="mt-0.5 block text-xs text-ink-muted line-clamp-1">
                  {practice.shortDescription}
                </span>
              </Link>
            ))}
          </div>
        </>
      );
    }

    if (childType === "research") {
      return (
        <>
          <Link
            href="/research/topics"
            className="block rounded-md px-3 py-2 hover:bg-stone-50"
          >
            <span className="block text-sm font-medium text-ink">
              Decision areas
            </span>
            <span className="mt-0.5 block text-xs text-ink-muted line-clamp-1">
              Topic hubs that group related research
            </span>
          </Link>
          <div className="my-2 border-t border-stone-100" />
          {RESEARCH_TYPES.map((researchType) => (
            <Link
              key={researchType}
              href={getResearchHubPath(researchType)}
              className="block rounded-md px-3 py-2 hover:bg-stone-50"
            >
              <span className="block text-sm font-medium text-ink">
                {researchTypeLabels[researchType]}
              </span>
            </Link>
          ))}
        </>
      );
    }

    return industries.map((child) => (
      <Link
        key={child.slug}
        href={`/industries/${child.slug}`}
        className="block rounded-md px-3 py-2 hover:bg-stone-50"
      >
        <span className="block text-sm font-medium text-ink">{child.title}</span>
        <span className="mt-0.5 block text-xs text-ink-muted line-clamp-1">
          {child.shortDescription}
        </span>
      </Link>
    ));
  }

  function renderMobileChildren(childType: DropdownType) {
    if (childType === "solutions") {
      return (
        <>
          {solutions.map((child) => (
            <Link
              key={child.slug}
              href={`/solutions/${child.slug}`}
              className="block py-1 text-sm text-ink-muted"
              onClick={() => setMobileOpen(false)}
            >
              {child.title}
            </Link>
          ))}
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Practice Areas
          </p>
          {practices.map((practice) => (
            <Link
              key={practice.slug}
              href={practice.href}
              className="block py-1 text-sm text-ink-muted"
              onClick={() => setMobileOpen(false)}
            >
              {practice.title}
            </Link>
          ))}
        </>
      );
    }

    if (childType === "research") {
      return (
        <>
          <Link
            href="/research/topics"
            className="block py-1 text-sm font-medium text-ink"
            onClick={() => setMobileOpen(false)}
          >
            Decision areas
          </Link>
          {RESEARCH_TYPES.map((researchType) => (
            <Link
              key={researchType}
              href={getResearchHubPath(researchType)}
              className="block py-1 text-sm text-ink-muted"
              onClick={() => setMobileOpen(false)}
            >
              {researchTypeLabels[researchType]}
            </Link>
          ))}
        </>
      );
    }

    return industries.map((child) => (
      <Link
        key={child.slug}
        href={`/industries/${child.slug}`}
        className="block py-1 text-sm text-ink-muted"
        onClick={() => setMobileOpen(false)}
      >
        {child.title}
      </Link>
    ));
  }

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <Logo />

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
                        {renderDropdown(childType)}
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
                className="rounded-md px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            );
          })}
          <Button
            href={ctaNav.href}
            className="ml-4 !px-4 !py-2 text-sm"
            analyticsEvent="contact_cta_click"
            analyticsCtaLocation="header_desktop"
          >
            {ctaNav.label}
          </Button>
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson/30 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-nav" className="border-t border-stone-200 bg-white lg:hidden">
          <div className="px-6 py-4">
            <Button
              href={ctaNav.href}
              className="mb-4 w-full"
              analyticsEvent="contact_cta_click"
              analyticsCtaLocation="header_mobile"
            >
              {ctaNav.label}
            </Button>
            {primaryNav.map((item) => (
              <div key={item.label} className="border-b border-stone-100 py-3">
                <Link
                  href={item.href}
                  className="block text-base font-medium text-ink"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="mt-2 space-y-1 pl-4">
                    {renderMobileChildren(item.children)}
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
