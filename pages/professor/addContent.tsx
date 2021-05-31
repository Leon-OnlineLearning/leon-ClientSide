import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import AddContent from "../../components/add-content/addContent";
import finishSendingTC from "../../controller/training/finish";

export default function AddContentPage() {
  const [isWindowLoaded, setIsWindowLoaded] = useState(false);
  const [courseId, setCourseId] = useState("");
  useEffect(() => {
    if (window) {
      setIsWindowLoaded(true);
    }
  }, []);
  return (
    <>
      <input
        type="text"
        value={courseId}
        onChange={(e) => {
          setCourseId(e.target.value);
        }}
      />
      {isWindowLoaded ? (
        <AddContent
          onFinish={finishSendingTC}
          sessionStorage={window.localStorage}
          courseId={courseId}
        />
      ) : (
        <Spinner animation="border" variant="primary" />
      )}
    </>
  );
}
