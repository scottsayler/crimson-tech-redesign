/**
 * Banking CX Friction Assessment — Google Apps Script Webhook
 *
 * After updating this script, run `setupSheet` once to refresh column headers.
 */

const SHEET_NAME = "Submissions";

const HEADERS = [
  "Submitted At",
  "Submission ID",
  "Organization Name",
  "Institution Type",
  "Asset Size",
  "Customer-Facing Employees",
  "Respondent Role",
  "CCaaS Platform",
  "CRM Platform",
  "Core Platform",
  "AI Technologies",
  "Data Environment",
  "Contact Name",
  "Contact Email",
  "Contact Title",
  "Consent Benchmarking",
  "CX Maturity Score",
  "CX Friction Score",
  "Governance Score",
  "AI Readiness Score",
  "Executive Alignment Score",
  "Technology Complexity Score",
  "Account Opening",
  "Onboarding",
  "Everyday Servicing",
  "Fraud & Disputes",
  "Lending Lifecycle",
  "Payments",
  "Card Services",
  "Complaints",
  "Branch Experience",
  "Retention",
  "Top Friction Areas",
  "Top Governance Gaps",
  "Priority Areas",
  "Responses JSON",
];

function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  sheet.clear();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  sheet.setFrozenRows(1);
}

function doPost(e) {
  try {
    const props = PropertiesService.getScriptProperties();
    const expectedSecret = props.getProperty("WEBHOOK_SECRET");
    const notifyEmail = getNotifyEmail();

    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ error: "Missing request body" });
    }

    const payload = JSON.parse(e.postData.contents);

    if (!expectedSecret || payload.secret !== expectedSecret) {
      return jsonResponse({ error: "Unauthorized" });
    }

    const sheet = getOrCreateSheet();
    const areaScores = payload.areaScores || [];
    const scores = payload.scores || {};
    const scoreByArea = {};
    areaScores.forEach(function (area) {
      scoreByArea[area.areaId] = area.score;
    });

    const topFriction = (payload.topFrictionAreas || [])
      .map(function (a) {
        return a.areaName + " (" + a.score.toFixed(1) + ")";
      })
      .join("; ");

    const governanceGaps = (payload.governanceGaps || [])
      .map(function (g) {
        return g.text.substring(0, 60) + " (" + g.score.toFixed(1) + ")";
      })
      .join("; ");

    const priorityAreas = (payload.priorityAreas || []).join(" | ");

    const tech = payload.technology || {};
    const org = payload.organization || {};

    const row = [
      payload.submittedAt || new Date().toISOString(),
      payload.id || "",
      org.organizationName || "",
      org.institutionType || "",
      org.assetSize || "",
      org.customerFacingEmployees || "",
      org.respondentRole || "",
      tech.ccaasPlatform || "",
      tech.crmPlatform || "",
      tech.corePlatform || "",
      (tech.aiTechnologies || []).join(", "),
      tech.dataEnvironment || "",
      payload.contact?.contactName || "",
      payload.contact?.contactEmail || "",
      payload.contact?.contactTitle || "",
      payload.contact?.consentBenchmarking ? "Yes" : "No",
      scores.cxMaturityScore ?? "",
      scores.cxFrictionScore ?? "",
      scores.governanceScore ?? "",
      scores.aiReadinessScore ?? "",
      scores.executiveAlignmentScore ?? "",
      scores.technologyComplexityScore ?? "",
      scoreByArea["account_opening"] ?? "",
      scoreByArea["onboarding"] ?? "",
      scoreByArea["everyday_servicing"] ?? "",
      scoreByArea["fraud_disputes"] ?? "",
      scoreByArea["lending_lifecycle"] ?? "",
      scoreByArea["payments"] ?? "",
      scoreByArea["card_services"] ?? "",
      scoreByArea["complaints"] ?? "",
      scoreByArea["branch_experience"] ?? "",
      scoreByArea["retention"] ?? "",
      topFriction,
      governanceGaps,
      priorityAreas,
      JSON.stringify(payload.responses || {}),
    ];

    sheet.appendRow(row);

    const emailResult = sendNotificationEmail(
      notifyEmail,
      payload,
      topFriction,
      scores
    );

    return jsonResponse({
      success: true,
      emailSent: emailResult.sent,
      emailError: emailResult.error || undefined,
      notifyEmail: notifyEmail,
    });
  } catch (err) {
    return jsonResponse({ error: String(err) });
  }
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    setupSheet();
    sheet = ss.getSheetByName(SHEET_NAME);
  }
  return sheet;
}

function getNotifyEmail() {
  const props = PropertiesService.getScriptProperties();
  return props.getProperty("NOTIFY_EMAIL") || "scott@crimson.cx";
}

function getScriptOwnerEmail() {
  try {
    return Session.getEffectiveUser().getEmail() || "";
  } catch (err) {
    Logger.log("Could not read script owner email: " + err);
    return "";
  }
}

function sendNotificationEmail(to, payload, topFriction, scores) {
  if (!to || !to.trim()) {
    return { sent: false, error: "NOTIFY_EMAIL script property is not set." };
  }

  try {
    const org = payload.organization?.organizationName || "Unknown";
    const contact = payload.contact?.contactName || "Unknown";
    const email = payload.contact?.contactEmail || "";
    const recipient = to.trim();
    const ownerEmail = getScriptOwnerEmail();
    const cc =
      ownerEmail && ownerEmail.toLowerCase() !== recipient.toLowerCase()
        ? ownerEmail
        : "";

    const subject = "New Banking CX Friction Assessment: " + org;

    const body =
      "A new Banking CX Friction Assessment was submitted.\n\n" +
      "Organization: " + org + "\n" +
      "Institution Type: " + (payload.organization?.institutionType || "—") + "\n" +
      "Asset Size: " + (payload.organization?.assetSize || "—") + "\n\n" +
      "SCORES\n" +
      "CX Maturity: " + (scores.cxMaturityScore != null ? scores.cxMaturityScore.toFixed(1) : "—") + " / 5\n" +
      "CX Friction: " + (scores.cxFrictionScore != null ? scores.cxFrictionScore.toFixed(1) : "—") + " / 5\n" +
      "Governance: " + (scores.governanceScore != null ? scores.governanceScore.toFixed(1) : "—") + " / 5\n" +
      "AI Readiness: " + (scores.aiReadinessScore != null ? scores.aiReadinessScore.toFixed(1) : "—") + " / 5\n" +
      "Executive Alignment: " + (scores.executiveAlignmentScore != null ? scores.executiveAlignmentScore.toFixed(1) : "—") + " / 5\n" +
      "Tech Complexity: " + (scores.technologyComplexityScore != null ? scores.technologyComplexityScore.toFixed(1) : "—") + " / 5\n\n" +
      "Top Friction Areas:\n" + (topFriction || "—") + "\n\n" +
      "Contact: " + contact + "\nEmail: " + email + "\n" +
      "Submission ID: " + (payload.id || "—");

    const options = { name: "Crimson CX Assessment" };
    if (cc) {
      options.cc = cc;
    }

    // GmailApp sends from your Google account and appears in Sent mail.
    GmailApp.sendEmail(recipient, subject, body, options);

    return { sent: true, to: recipient, cc: cc || undefined };
  } catch (err) {
    Logger.log("Notification email failed: " + err);
    return { sent: false, error: String(err) };
  }
}

/**
 * Run once from the Apps Script editor to verify email delivery.
 * Check Executions log for the exact recipient addresses used.
 */
function testNotificationEmail() {
  const notifyEmail = getNotifyEmail();
  const ownerEmail = getScriptOwnerEmail();

  Logger.log("NOTIFY_EMAIL: " + notifyEmail);
  Logger.log("Script owner (CC): " + (ownerEmail || "(not available)"));

  const result = sendNotificationEmail(
    notifyEmail,
    {
      organization: { organizationName: "Test Bank (Apps Script)" },
      contact: {
        contactName: "Test User",
        contactEmail: "test@example.com",
      },
    },
    "Everyday Servicing (4.2); Onboarding (3.8)",
    {
      cxMaturityScore: 3.1,
      cxFrictionScore: 3.4,
      governanceScore: 2.8,
      aiReadinessScore: 2.5,
      executiveAlignmentScore: 3.0,
      technologyComplexityScore: 3.2,
    }
  );

  if (result.sent) {
    Logger.log(
      "Test email sent to " +
        result.to +
        (result.cc ? " (CC: " + result.cc + ")" : "")
    );
  } else {
    Logger.log("Test email failed: " + (result.error || "unknown error"));
  }
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doGet() {
  return jsonResponse({ status: "ok", service: "Crimson CX Assessment Webhook" });
}
