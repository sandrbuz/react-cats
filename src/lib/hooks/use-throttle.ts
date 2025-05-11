import { useRef, useCallback } from "react";

function useThrottle<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number
): (...args: Args) => void {
  const lastRun = useRef(0);

  return useCallback(
    (...args: Args) => {
      const now = Date.now();
      if (now - lastRun.current >= delay) {
        lastRun.current = now;
        callback(...args);
      }
    },
    [callback, delay]
  );
}

export default useThrottle;
