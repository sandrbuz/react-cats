import { useState, useEffect, useRef, FC } from "react";
import styles from "./App.module.css";
import Controls from "./components/Controls/Controls";
import CatImage from "./components/CatImage/CatImage";
import { getRandomCat } from "./actions/cats/cats";

const App: FC = () => {
  const [enabled, setEnabled] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [catUrl, setCatUrl] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchCat = async () => {
    const url = await getRandomCat();
    setCatUrl(url);
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
