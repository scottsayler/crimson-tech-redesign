export function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  return {
    apiKey,
    fromEmail,
    toEmail,
    configured: Boolean(apiKey && fromEmail && toEmail),
  };
}

export function getContactSheetsWebhookUrl(): string | undefined {
  return process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim() || undefined;
}

export function getAssessmentResultsWebhookUrl(): string | undefined {
  return process.env.ASSESSMENT_RESULTS_WEBHOOK_URL?.trim() || undefined;
}

export function logMissingResendConfig() {
  const { apiKey, fromEmail, toEmail } = getResendConfig();
  const missing = [
    !apiKey ? "RESEND_API_KEY" : null,
    !fromEmail ? "CONTACT_FROM_EMAIL" : null,
    !toEmail ? "CONTACT_TO_EMAIL" : null,
  ].filter(Boolean);

  if (missing.length > 0) {
    console.warn(
      `[contact] Resend email not configured — missing: ${missing.join(", ")}. Email delivery will be skipped.`
    );
  }
}

export function logMissingContactSheetsWebhook() {
  console.warn(
    "[contact] GOOGLE_SHEETS_WEBHOOK_URL is not set — contact submissions will not be captured in Google Sheets."
  );
}

export function logMissingAssessmentWebhook() {
  console.warn(
    "[assessment] ASSESSMENT_RESULTS_WEBHOOK_URL is not set — assessment completions will not be captured in Google Sheets."
  );
}
