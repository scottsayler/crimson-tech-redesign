import { NextResponse } from "next/server";
import { postToGoogleSheetsWebhook } from "@/lib/server/google-sheets-webhook";
import {
  getAssessmentResultsWebhookUrl,
  logMissingAssessmentWebhook,
} from "@/lib/server/env";

type AssessmentResultsPayload = {
  assessmentId: string;
  assessmentName: string;
  overallScore: number;
  maturityLevel: string;
  journeyScores: Record<string, number>;
  highFrictionAreas: string[];
  strengths?: string[];
  durationSeconds?: number;
  timestamp?: string;
  name?: string;
  email?: string;
  organization?: string;
};

function isValidPayload(body: unknown): body is AssessmentResultsPayload {
  if (!body || typeof body !== "object") return false;

  const payload = body as AssessmentResultsPayload;

  return (
    typeof payload.assessmentId === "string" &&
    payload.assessmentId.length > 0 &&
    typeof payload.assessmentName === "string" &&
    payload.assessmentName.length > 0 &&
    typeof payload.overallScore === "number" &&
    Number.isFinite(payload.overallScore) &&
    typeof payload.maturityLevel === "string" &&
    typeof payload.journeyScores === "object" &&
    payload.journeyScores !== null &&
    Array.isArray(payload.highFrictionAreas)
  );
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Invalid assessment results payload." }, { status: 400 });
  }

  const webhookUrl = getAssessmentResultsWebhookUrl();

  if (!webhookUrl) {
    logMissingAssessmentWebhook();
    return NextResponse.json({ success: true, captured: false });
  }

  const timestamp = body.timestamp ?? new Date().toISOString();

  const result = await postToGoogleSheetsWebhook(
    webhookUrl,
    {
      type: "assessment",
      timestamp,
      assessmentId: body.assessmentId,
      assessmentName: body.assessmentName,
      overallScore: body.overallScore,
      maturityLevel: body.maturityLevel,
      journeyScores: body.journeyScores,
      highFrictionAreas: body.highFrictionAreas,
      strengths: body.strengths ?? [],
      durationSeconds: body.durationSeconds ?? null,
      name: body.name?.trim() || null,
      email: body.email?.trim().toLowerCase() || null,
      organization: body.organization?.trim() || null,
    },
    "assessment"
  );

  if (!result.ok) {
    return NextResponse.json(
      { error: "Unable to record assessment results right now." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, captured: true });
}
