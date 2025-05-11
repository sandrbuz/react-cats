import { FC } from "react";
import styles from "./CatImage.module.css";

interface ICatImageProps {
  url: string | null;
  isEnabled: boolean;
}

const CatImage: FC<ICatImageProps> = ({ url, isEnabled }) => {
  return (
    <div className={styles.catImage}>
      {isEnabled && (
        <img src={url || "/default-cat.svg"} alt="cat" className={styles.img} />
      )}
    </div>
  );
};

export default CatImage;
