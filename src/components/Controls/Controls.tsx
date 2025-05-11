import { FC } from "react";
import styles from "./Controls.module.css";

interface IControlsProps {
  isEnabled: boolean;
  setIsEnabled: (v: boolean) => void;
  isAutoRefreshEnabled: boolean;
  setIsAutoRefreshEnabled: (v: boolean) => void;
  fetchCat: () => void;
}

const Controls: FC<IControlsProps> = ({
  isEnabled,
  setIsEnabled,
  isAutoRefreshEnabled,
  setIsAutoRefreshEnabled,
  fetchCat,
}) => (
  <div className={styles.controls}>
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        checked={isEnabled}
        onChange={(e) => setIsEnabled(e.target.checked)}
      />
      Enabled
    </label>
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        checked={isAutoRefreshEnabled}
        disabled={!isEnabled}
        onChange={(e) => setIsAutoRefreshEnabled(e.target.checked)}
      />
      Auto-refrash every 5 second
    </label>
    <button className={styles.button} onClick={fetchCat} disabled={!isEnabled}>
      Get cat
    </button>
  </div>
);

export default Controls;
