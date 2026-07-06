type WebhookResult = {
  ok: boolean;
  error?: string;
};

export async function postToGoogleSheetsWebhook(
  webhookUrl: string,
  payload: Record<string, unknown>,
  context: string
): Promise<WebhookResult> {
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error(
        `[${context}] Google Sheets webhook returned ${response.status}: ${body.slice(0, 500)}`
      );
      return { ok: false, error: `Webhook returned ${response.status}` };
    }

    return { ok: true };
  } catch (error) {
    console.error(`[${context}] Google Sheets webhook request failed:`, error);
    return { ok: false, error: "Webhook request failed" };
  }
}
