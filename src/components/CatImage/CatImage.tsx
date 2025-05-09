import { FC } from "react";
import styles from "./CatImage.module.css";

interface ICatImageProps {
  url: string | null;
  enabled: boolean;
}

const CatImage: FC<ICatImageProps> = ({ url, enabled }) => {
  return (
    <div className={styles.catImage}>
      {enabled && (
        <img src={url || "/default-cat.svg"} alt="cat" className={styles.img} />
      )}
    </div>
  );
};

export default CatImage;
