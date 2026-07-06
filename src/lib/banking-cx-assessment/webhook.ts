import { getHighestFrictionAreas } from "@/lib/banking-cx-assessment/scoring";
import type { AssessmentResult, AssessmentSubmission } from "@/lib/banking-cx-assessment/types";

export type WebhookPayload = {
  secret: string;
  id: string;
  submittedAt: string;
  organization: AssessmentSubmission["organization"];
  technology: AssessmentSubmission["technology"];
  contact: AssessmentSubmission["contact"];
  responses: AssessmentSubmission["responses"];
  scores: AssessmentResult["scores"];
  areaScores: AssessmentResult["areaScores"];
  topFrictionAreas: AssessmentResult["areaScores"];
  governanceGaps: AssessmentResult["governanceGaps"];
  priorityAreas: AssessmentResult["priorityAreas"];
};

export function buildWebhookPayload(
  submission: AssessmentSubmission,
  result: AssessmentResult,
  secret: string
): WebhookPayload {
  return {
    secret,
    id: result.id,
    submittedAt: result.submittedAt,
    organization: submission.organization,
    technology: submission.technology,
    contact: submission.contact,
    responses: submission.responses,
    scores: result.scores,
    areaScores: result.areaScores,
    topFrictionAreas: getHighestFrictionAreas(result.areaScores, 3),
    governanceGaps: result.governanceGaps,
    priorityAreas: result.priorityAreas,
  };
}

export async function submitToGoogleSheets(
  payload: WebhookPayload
): Promise<{ ok: boolean; error?: string }> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn(
      "[banking-cx-assessment] GOOGLE_SHEETS_WEBHOOK_URL is not set — submission will not be captured in Google Sheets."
    );
    return { ok: false, error: "Google Sheets webhook is not configured." };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data: { success?: boolean; error?: string } = {};

    try {
      data = JSON.parse(text) as { success?: boolean; error?: string };
    } catch {
      if (!res.ok) {
        return { ok: false, error: "Failed to save assessment to Google Sheets." };
      }
    }

    if (data.error) {
      return { ok: false, error: data.error };
    }

    if (!res.ok) {
      return { ok: false, error: "Failed to save assessment to Google Sheets." };
    }

    return { ok: true };
  } catch (err) {
    console.error("[banking-cx-assessment] Google Sheets webhook error:", err);
    return { ok: false, error: "Failed to reach assessment storage." };
  }
}
