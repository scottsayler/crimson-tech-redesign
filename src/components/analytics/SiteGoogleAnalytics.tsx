import { GoogleAnalytics } from "@next/third-parties/google";

const GA_MEASUREMENT_ID = "G-P6YQVPG270";

export function SiteGoogleAnalytics() {
  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
