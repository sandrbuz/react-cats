import { useEffect, useRef } from "react";

export function useAutoRefresh(
  callback: () => void,
  isEnabled: boolean,
  isAutoRefresh: boolean,
  intervalMs: number
): void {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isEnabled && isAutoRefresh) {
      callback();
      intervalRef.current = setInterval(callback, intervalMs);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [callback, isEnabled, isAutoRefresh, intervalMs]);
}
