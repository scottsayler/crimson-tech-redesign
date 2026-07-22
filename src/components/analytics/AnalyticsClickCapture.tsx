"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/track";
import type { AnalyticsEventName } from "@/lib/analytics/events";

const KNOWN_EVENTS = new Set<string>([
  "contact_cta_click",
  "research_cta_click",
  "scheduling_link_click",
  "decision_resource_start",
  "resource_download",
]);

function readDatasetParams(el: HTMLElement): Record<string, string> {
  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(el.dataset)) {
    if (!key.startsWith("analytics") || key === "analyticsEvent") continue;
    if (!value) continue;
    // data-analytics-cta-location -> ctaLocation -> cta_location
    const paramKey = key
      .replace(/^analytics/, "")
      .replace(/^[A-Z]/, (c) => c.toLowerCase())
      .replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
    params[paramKey] = value;
  }
  return params;
}

function fileNameFromHref(href: string): string {
  try {
    const url = new URL(href, window.location.origin);
    const parts = url.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] || url.pathname;
  } catch {
    return href;
  }
}

/**
 * Delegated click capture for conversion links.
 * Prefer data-analytics-event attributes; also covers mailto/tel/PDF downloads.
 */
export function AnalyticsClickCapture() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const analyticsEl = target.closest<HTMLElement>("[data-analytics-event]");
      if (analyticsEl) {
        const name = analyticsEl.dataset.analyticsEvent;
        if (name && KNOWN_EVENTS.has(name)) {
          trackEvent(name as AnalyticsEventName, readDatasetParams(analyticsEl) as never);
        }
      }

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";

      if (href.startsWith("mailto:")) {
        trackEvent("email_link_click");
        return;
      }

      if (href.startsWith("tel:")) {
        trackEvent("phone_link_click");
        return;
      }

      const isDownload =
        anchor.hasAttribute("download") ||
        /\.pdf($|\?)/i.test(href) ||
        href.includes("/downloads/");

      if (isDownload && !analyticsEl) {
        trackEvent("resource_download", {
          resource_name: fileNameFromHref(href),
          resource_type: "pdf",
        });
      }

      // External scheduling tools (Calendly, etc.) if ever added.
      if (
        /calendly\.com|cal\.com|hubspot\.com\/meetings/i.test(href) ||
        anchor.dataset.analyticsEvent === "scheduling_link_click"
      ) {
        if (!analyticsEl) {
          trackEvent("scheduling_link_click");
        }
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
