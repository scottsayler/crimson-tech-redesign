"use client";

import { Analytics } from "@vercel/analytics/react";
import { isAnalyticsEnabled } from "@/lib/analytics/config";

export function SiteVercelAnalytics() {
  if (!isAnalyticsEnabled()) return null;
  return <Analytics />;
}
