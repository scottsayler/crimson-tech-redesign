/**
 * Analytics trackEvent safety checks (no Next.js runtime required).
 * Run: node --test scripts/analytics-track.safety.test.mjs
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";

function createTrackStub({ enabled, hasGtag }) {
  const calls = [];
  const gtag = hasGtag
    ? (_command, name, params) => {
        calls.push({ name, params });
      }
    : undefined;

  function trackEvent(name, params) {
    try {
      if (!enabled) return;
      if (typeof gtag !== "function") return;
      gtag("event", name, { page_path: "/contact", ...params });
    } catch {
      // swallow
    }
  }

  return { trackEvent, calls };
}

describe("analytics track safety", () => {
  it("no-ops when analytics disabled", () => {
    const { trackEvent, calls } = createTrackStub({
      enabled: false,
      hasGtag: true,
    });
    trackEvent("contact_form_submit", { status: "success" });
    assert.equal(calls.length, 0);
  });

  it("no-ops without gtag", () => {
    const { trackEvent, calls } = createTrackStub({
      enabled: true,
      hasGtag: false,
    });
    trackEvent("contact_form_submit", { status: "success" });
    assert.equal(calls.length, 0);
  });

  it("sends event when enabled", () => {
    const { trackEvent, calls } = createTrackStub({
      enabled: true,
      hasGtag: true,
    });
    trackEvent("contact_form_submit", { status: "success" });
    assert.equal(calls.length, 1);
    assert.equal(calls[0].name, "contact_form_submit");
    assert.equal(calls[0].params.status, "success");
  });
});
