import { useState, useEffect, useRef, FC } from "react";
import styles from "./App.module.css";
import Controls from "./components/Controls/Controls";
import CatImage from "./components/CatImage/CatImage";

const API_KEY =
  "ive_cuibtCvZH5vtFB0tDHbanwzXYSQxzKXKTq67ytnIe0IB6Bw9YcO8ixhyEPqKLy92";

const App: FC = () => {
  const [enabled, setEnabled] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [catUrl, setCatUrl] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchCat = async () => {
    try {
      const res = await fetch("https://api.thecatapi.com/v1/images/search", {
        headers: { "x-api-key": API_KEY },
      });
      const data = await res.json();
      setCatUrl(data[0]?.url || null);
    } catch {
      setCatUrl(null);
    }
  };

  useEffect(() => {
    if (enabled && autoRefresh) {
      fetchCat();
      intervalRef.current = setInterval(fetchCat, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [enabled, autoRefresh]);

  useEffect(() => {
    if (!enabled) {
      setCatUrl(null);
      setAutoRefresh(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [enabled]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <Controls
          enabled={enabled}
          setEnabled={setEnabled}
          autoRefresh={autoRefresh}
          setAutoRefresh={setAutoRefresh}
          fetchCat={fetchCat}
        />
        <CatImage url={catUrl} enabled={enabled} />
      </div>
    </div>
  );
};

export default App;
