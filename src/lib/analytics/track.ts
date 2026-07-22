import { isAnalyticsEnabled } from "@/lib/analytics/config";
import type {
  AnalyticsEventName,
  AnalyticsParams,
} from "@/lib/analytics/events";

function currentPath(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return `${window.location.pathname}${window.location.search}`;
}

function sanitizeParams(
  params: Record<string, unknown> | undefined,
): Record<string, string | number | boolean> {
  if (!params) return {};

  const cleaned: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

/**
 * Fire a GA4 event. Safe during SSR and when gtag is unavailable.
 * Never throws into the user interaction path.
 */
export function trackEvent<T extends AnalyticsEventName>(
  name: T,
  params?: AnalyticsParams<T>,
): void {
  try {
    if (!isAnalyticsEnabled()) return;
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;

    const payload = {
      page_path: currentPath(),
      ...sanitizeParams(params as Record<string, unknown> | undefined),
    };

    window.gtag("event", name, payload);
  } catch {
    // Swallow analytics failures so UX is never interrupted.
  }
}
