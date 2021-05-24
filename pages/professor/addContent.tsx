import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import AddContent from "../../components/add-content/addContent";

export default function AddContentPage() {
  const [isWindowLoaded, setIsWindowLoaded] = useState(false);
  useEffect(() => {
    if (window) {
      setIsWindowLoaded(true);
    }
  }, []);
  return (
    <>
      {isWindowLoaded ? (
        <AddContent
          sessionStorage={window.localStorage}
          courseId="TODO replace this placeholder with the course id"
        />
      ) : (
        <Spinner animation="border" variant="primary" />
      )}
    </>
  );
}
