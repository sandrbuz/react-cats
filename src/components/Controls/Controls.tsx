import { FC } from "react";
import styles from "./Controls.module.css";

interface IControlsProps {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  autoRefresh: boolean;
  setAutoRefresh: (v: boolean) => void;
  fetchCat: () => void;
}

const Controls: FC<IControlsProps> = ({
  enabled,
  setEnabled,
  autoRefresh,
  setAutoRefresh,
  fetchCat,
}) => (
  <div className={styles.controls}>
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => setEnabled(e.target.checked)}
      />
      Enabled
    </label>
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        checked={autoRefresh}
        disabled={!enabled}
        onChange={(e) => setAutoRefresh(e.target.checked)}
      />
      Auto-refrash every 5 second
    </label>
    <button className={styles.button} onClick={fetchCat} disabled={!enabled}>
      Get cat
    </button>
  </div>
);

export default Controls;
