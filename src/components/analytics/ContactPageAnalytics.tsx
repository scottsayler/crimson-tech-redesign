"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/track";

/**
 * Fires when /contact is opened after an internal navigation.
 * Complements contact_cta_click (which fires on the originating CTA).
 */
export function ContactPageAnalytics() {
  useEffect(() => {
    try {
      const referrer = document.referrer;
      if (!referrer) return;
      const refUrl = new URL(referrer);
      if (refUrl.origin !== window.location.origin) return;
      if (refUrl.pathname === "/contact") return;

      trackEvent("contact_page_from_cta", {
        from_path: `${refUrl.pathname}${refUrl.search}`,
      });
    } catch {
      // ignore
    }
  }, []);

  return null;
}
