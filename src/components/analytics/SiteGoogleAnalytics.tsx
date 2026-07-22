import { GoogleAnalytics } from "@next/third-parties/google";
import { getGaMeasurementId, isAnalyticsEnabled } from "@/lib/analytics/config";

export function SiteGoogleAnalytics() {
  if (!isAnalyticsEnabled()) return null;

  const gaId = getGaMeasurementId();
  if (!gaId) return null;

  return <GoogleAnalytics gaId={gaId} />;
}
