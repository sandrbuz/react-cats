import { useState, useEffect, useRef, FC, useCallback } from "react";
import styles from "./App.module.css";
import Controls from "./components/Controls/Controls";
import CatImage from "./components/CatImage/CatImage";
import { getRandomCat } from "./actions/cats/cats";
import useThrottle from "./lib/hooks/use-throttle";

const App: FC = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(false);
  const [catUrl, setCatUrl] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchCat = useCallback(async () => {
    const url = await getRandomCat();
    setCatUrl(url);
  }, []);

  const throttledFetchCat = useThrottle(fetchCat, 1000);

  useEffect(() => {
    if (isEnabled && isAutoRefreshEnabled) {
      fetchCat();
      intervalRef.current = setInterval(fetchCat, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isEnabled, isAutoRefreshEnabled]);

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
