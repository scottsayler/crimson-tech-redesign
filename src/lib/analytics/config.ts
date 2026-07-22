/**
 * Analytics configuration.
 * Measurement IDs are public client identifiers (not secrets).
 * Scripts load only in production builds.
 */

export const DEFAULT_GA_MEASUREMENT_ID = "G-P6YQVPG270";
export const DEFAULT_CLARITY_PROJECT_ID = "xfsmqkx7l7";

export function getGaMeasurementId(): string {
  return (
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ||
    DEFAULT_GA_MEASUREMENT_ID
  );
}

export function getClarityProjectId(): string {
  return (
    process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim() ||
    DEFAULT_CLARITY_PROJECT_ID
  );
}

/** True only for production runtime. Keeps local/dev free of third-party tags. */
export function isAnalyticsEnabled(): boolean {
  return process.env.NODE_ENV === "production";
}
