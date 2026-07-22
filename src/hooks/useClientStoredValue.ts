"use client";

import { useEffect, useState } from "react";

/**
 * Loads a browser-storage value after mount so the server render and the
 * client's first render stay identical (avoids hydration mismatches).
 */
export function useClientStoredValue<T>(load: () => T | null): {
  value: T | null;
  ready: boolean;
} {
  const [value, setValue] = useState<T | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = load();
    queueMicrotask(() => {
      setValue(stored);
      setReady(true);
    });
  }, [load]);

  return { value, ready };
}
