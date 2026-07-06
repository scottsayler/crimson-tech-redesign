import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getAllQuestionIds } from "@/lib/banking-cx-assessment/areas";
import { generatePriorityAreas } from "@/lib/banking-cx-assessment/insights";
import {
  AI_READINESS_SECTION,
  GOVERNANCE_SECTION,
} from "@/lib/banking-cx-assessment/sections";
import {
  calculateAllScores,
  calculateAreaScores,
  getHighestFrictionAreas,
  getLowestScoringQuestions,
  validateResponses,
} from "@/lib/banking-cx-assessment/scoring";
import type { AssessmentResult, AssessmentSubmission } from "@/lib/banking-cx-assessment/types";
import { buildWebhookPayload, submitToGoogleSheets } from "@/lib/banking-cx-assessment/webhook";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AssessmentSubmission;

    if (!body.organization?.organizationName?.trim()) {
      return NextResponse.json({ error: "Organization name is required." }, { status: 400 });
    }

    if (!body.contact?.contactName?.trim() || !body.contact?.contactEmail?.trim()) {
      return NextResponse.json(
        { error: "Contact name and email are required." },
        { status: 400 }
      );
    }

    const { valid, missing } = validateResponses(body.responses ?? {}, getAllQuestionIds());
    if (!valid) {
      return NextResponse.json(
        { error: "All assessment questions must be answered.", missing },
        { status: 400 }
      );
    }

    const scores = calculateAllScores(body);
    const areaScores = calculateAreaScores(body.responses);
    const governanceGaps = getLowestScoringQuestions(
      body.responses,
      GOVERNANCE_SECTION.questions,
      3
    );
    const aiReadinessGaps = getLowestScoringQuestions(
      body.responses,
      AI_READINESS_SECTION.questions,
      3
    );
    const topFriction = getHighestFrictionAreas(areaScores, 3);
    const priorityAreas = generatePriorityAreas(
      scores,
      topFriction,
      governanceGaps,
      aiReadinessGaps
    );

    const result: AssessmentResult = {
      id: randomUUID(),
      submittedAt: new Date().toISOString(),
      organization: {
        ...body.organization,
        organizationName: body.organization.organizationName.trim(),
      },
      technology: body.technology,
      contact: {
        ...body.contact,
        contactName: body.contact.contactName.trim(),
        contactEmail: body.contact.contactEmail.trim().toLowerCase(),
        contactTitle: body.contact.contactTitle?.trim() ?? "",
      },
      scores,
      areaScores,
      governanceGaps,
      aiReadinessGaps,
      priorityAreas,
      responses: body.responses,
    };

    const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (webhookUrl && secret) {
      const webhookPayload = buildWebhookPayload(body, result, secret);
      const sheetResult = await submitToGoogleSheets(webhookPayload);
      if (!sheetResult.ok) {
        return NextResponse.json(
          { error: sheetResult.error ?? "Failed to save assessment." },
          { status: 502 }
        );
      }
    } else if (webhookUrl && !secret) {
      console.warn(
        "[banking-cx-assessment] GOOGLE_SHEETS_WEBHOOK_URL is set but GOOGLE_SHEETS_WEBHOOK_SECRET is missing."
      );
    } else {
      console.warn(
        "[banking-cx-assessment] GOOGLE_SHEETS_WEBHOOK_URL is not set — returning results without Sheets capture."
      );
    }

    return NextResponse.json({ result });
  } catch (err) {
    console.error("[banking-cx-assessment] API error:", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
