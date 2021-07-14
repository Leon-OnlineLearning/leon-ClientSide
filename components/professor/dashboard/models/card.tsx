import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import { Card } from "react-bootstrap";
import styles from "./icon-styles.module.css";

interface ModelCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
}

const ModelCard: FC<ModelCardProps> = ({ icon, title, description, href }) => {
  return (
    <Link href={href}>
      <Card className={`${styles["card"]}`}>
        {icon}
        <h4>{title}</h4>
        <p className="text-secondary text-center">
          <small>{description}</small>
        </p>
      </Card>
    </Link>
  );
};

export default ModelCard;
