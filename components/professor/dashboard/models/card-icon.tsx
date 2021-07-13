import { FC } from "react";
import styles from "./icon-styles.module.css";

interface CardIconProperties {
  iconClass: string;
}

const CardIcon: FC<CardIconProperties> = ({ iconClass }) => {
  return (
    <i
      className={`bi ${iconClass} ${styles["icon-style"]}`}
    />
  );
};

export default CardIcon;
