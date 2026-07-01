"use client";

import { useEffect, useRef } from "react";
import {
  trackCalculatorCompleted,
  trackCalculatorResultGenerated,
  trackCalculatorStarted,
} from "@/lib/analytics/calculator-events";

type UseCalculatorAnalyticsOptions = {
  calculatorId: string;
  sessionKeyPrefix: string;
  hasInteracted: boolean;
  onTrackResult: () => Record<string, string | number>;
};

function getSessionKeys(prefix: string) {
  return {
    started: `${prefix}_started_tracked`,
    result: `${prefix}_result_tracked`,
    completed: `${prefix}_completed_tracked`,
  };
}

export function useCalculatorAnalytics({
  calculatorId,
  sessionKeyPrefix,
  hasInteracted,
  onTrackResult,
}: UseCalculatorAnalyticsOptions) {
  const resultsRef = useRef<HTMLDivElement>(null);
  const hasTrackedStartedRef = useRef(false);
  const hasTrackedResultRef = useRef(false);
  const hasTrackedCompletedRef = useRef(false);
  const resultDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onTrackResultRef = useRef(onTrackResult);

  useEffect(() => {
    onTrackResultRef.current = onTrackResult;
  }, [onTrackResult]);

  function trackStarted() {
    if (typeof window === "undefined") return;
    const sessionKeys = getSessionKeys(sessionKeyPrefix);
    if (!hasTrackedStartedRef.current && sessionStorage.getItem(sessionKeys.started) !== "true") {
      trackCalculatorStarted(calculatorId);
      hasTrackedStartedRef.current = true;
      sessionStorage.setItem(sessionKeys.started, "true");
    }
  }

  function handleStart() {
    trackStarted();
  }

  function handleInteraction() {
    trackStarted();
  }

  useEffect(() => {
    if (!hasInteracted) return;

    if (resultDebounceRef.current) {
      clearTimeout(resultDebounceRef.current);
    }

    const sessionKeys = getSessionKeys(sessionKeyPrefix);

    resultDebounceRef.current = setTimeout(() => {
      if (!hasTrackedResultRef.current && sessionStorage.getItem(sessionKeys.result) !== "true") {
        trackCalculatorResultGenerated({
          calculatorId,
          ...onTrackResultRef.current(),
        });
        hasTrackedResultRef.current = true;
        sessionStorage.setItem(sessionKeys.result, "true");
      }
    }, 800);

    return () => {
      if (resultDebounceRef.current) {
        clearTimeout(resultDebounceRef.current);
      }
    };
  }, [calculatorId, hasInteracted, sessionKeyPrefix]);

  useEffect(() => {
    if (!hasInteracted || !resultsRef.current) return;

    const sessionKeys = getSessionKeys(sessionKeyPrefix);
    const element = resultsRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5);
        if (!isVisible) return;
        if (hasTrackedCompletedRef.current || sessionStorage.getItem(sessionKeys.completed) === "true") {
          return;
        }

        trackCalculatorCompleted(calculatorId);
        hasTrackedCompletedRef.current = true;
        sessionStorage.setItem(sessionKeys.completed, "true");
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [calculatorId, hasInteracted, sessionKeyPrefix]);

  return {
    resultsRef,
    handleStart,
    handleInteraction,
  };
}
