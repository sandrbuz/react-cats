import { useState, useEffect, useRef, FC, useCallback } from "react";
import styles from "./App.module.css";
import Controls from "./components/Controls/Controls";
import CatImage from "./components/CatImage/CatImage";
import { getRandomCat } from "./actions/cats/cats";
import useThrottle from "./lib/hooks/use-throttle";
import { useAutoRefresh } from "./lib/hooks/use-auto-refresh";

const App: FC = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(false);
  const [catUrl, setCatUrl] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isEnabledRef = useRef(isEnabled);

  useEffect(() => {
    isEnabledRef.current = isEnabled;
  }, [isEnabled]);

  const fetchCat = useCallback(async () => {
    const url = await getRandomCat();
    if (!isEnabledRef.current) return;
    setCatUrl(url);
  }, []);

  const throttledFetchCat = useThrottle(fetchCat, 1000);

  useAutoRefresh(fetchCat, isEnabled, isAutoRefreshEnabled, 5000);

  useEffect(() => {
    if (!isEnabled) {
      setCatUrl(null);
      setIsAutoRefreshEnabled(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [isEnabled]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <Controls
          isEnabled={isEnabled}
          setIsEnabled={setIsEnabled}
          isAutoRefreshEnabled={isAutoRefreshEnabled}
          setIsAutoRefreshEnabled={setIsAutoRefreshEnabled}
          fetchCat={throttledFetchCat}
        />
        <CatImage url={catUrl} isEnabled={isEnabled} />
      </div>
    </div>
  );
};

export default App;
