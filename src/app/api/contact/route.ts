import { Resend } from "resend";
import { NextResponse } from "next/server";
import { site } from "@/content/site";
import {
  getContactSheetsWebhookUrl,
  getResendConfig,
  logMissingContactSheetsWebhook,
  logMissingResendConfig,
} from "@/lib/server/env";
import { postToGoogleSheetsWebhook } from "@/lib/server/google-sheets-webhook";

type ContactPayload = {
  name: string;
  title?: string;
  organization: string;
  email: string;
  interest: string;
  message: string;
  company_website?: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function POST(request: Request) {
  const resendConfig = getResendConfig();
  const sheetsWebhookUrl = getContactSheetsWebhookUrl();
  const hasResend = resendConfig.configured;
  const hasSheets = Boolean(sheetsWebhookUrl);

  if (!hasResend && !hasSheets) {
    logMissingResendConfig();
    logMissingContactSheetsWebhook();
    console.error(
      "[contact] No delivery channels configured — set Resend variables and/or GOOGLE_SHEETS_WEBHOOK_URL."
    );
    return NextResponse.json(
      { error: "Contact form is temporarily unavailable." },
      { status: 503 }
    );
  }

  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.company_website) {
    return NextResponse.json({ success: true });
  }

  const name = body.name?.trim();
  const organization = body.organization?.trim();
  const email = body.email?.trim().toLowerCase();
  const interest = body.interest?.trim();
  const message = body.message?.trim();
  const title = body.title?.trim();

  if (!name || !organization || !email || !interest || !message) {
    return NextResponse.json(
      { error: "Please complete all required fields." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (name.length > 120 || organization.length > 160 || message.length > 5000) {
    return NextResponse.json({ error: "One or more fields are too long." }, { status: 400 });
  }

  const timestamp = new Date().toISOString();
  let emailDelivered = false;
  let sheetsCaptured = false;

  if (hasResend) {
    const resend = new Resend(resendConfig.apiKey!);
    const subject = `New contact inquiry — ${organization}`;
    const text = [
      `Name: ${name}`,
      title ? `Title: ${title}` : null,
      `Organization: ${organization}`,
      `Email: ${email}`,
      `Primary interest: ${interest}`,
      "",
      "Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
    <h2>New contact inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    ${title ? `<p><strong>Title:</strong> ${escapeHtml(title)}</p>` : ""}
    <p><strong>Organization:</strong> ${escapeHtml(organization)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Primary interest:</strong> ${escapeHtml(interest)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
    <hr />
    <p style="color:#666;font-size:12px;">Sent from ${site.name} contact form</p>
  `;

    const { error } = await resend.emails.send({
      from: resendConfig.fromEmail!,
      to: resendConfig.toEmail!,
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
    } else {
      emailDelivered = true;
    }
  } else {
    logMissingResendConfig();
  }

  if (hasSheets && sheetsWebhookUrl) {
    const sheetsResult = await postToGoogleSheetsWebhook(
      sheetsWebhookUrl,
      {
        type: "contact",
        timestamp,
        name,
        title: title || null,
        organization,
        email,
        interest,
        message,
      },
      "contact"
    );

    sheetsCaptured = sheetsResult.ok;
  }

  if (emailDelivered || sheetsCaptured) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: "Unable to send your message right now. Please email us directly." },
    { status: 502 }
  );
}
