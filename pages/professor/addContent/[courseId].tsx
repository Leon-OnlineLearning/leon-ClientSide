import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import AddContent from "../../../components/add-content/addContent";
import finishSendingTC from "../../../controller/training/finish";
import styles from "./addContent.module.css";

export default function AddContentPage() {
  const [isWindowLoaded, setIsWindowLoaded] = useState(false);
  const [courseId, setCourseId] = useState("");
  const router = useRouter();
  console.log("styles", styles);

  useEffect(() => {
    if (window) {
      setIsWindowLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (router.isReady) {
      setCourseId(router.query["courseId"] as string);
    }
  }, [router.isReady]);
  return (
    <main className={`${styles["main-centerd"]}`}>
      {isWindowLoaded ? (
        <AddContent
          onFinish={finishSendingTC}
          sessionStorage={window.localStorage}
          courseId={courseId}
        />
      ) : (
        <Spinner animation="border" variant="primary" />
      )}
    </main>
  );
}
