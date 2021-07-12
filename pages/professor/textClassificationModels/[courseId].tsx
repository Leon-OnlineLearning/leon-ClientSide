import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import ModelsView from "../../../components/models-view/models-view";
import {
  getModelsByCourseId,
  raiseModel,
} from "../../../controller/training/modelsModifications";

export default function ModelViewPage() {
  const router = useRouter();
  const [courseId, setCourseId] = useState("");
  useEffect(() => {
    if (router.isReady) {
      setCourseId(router.query["courseId"] as string);
    }
  }, [router.isReady]);
  return (
    <>
      {courseId ? (
        <ModelsView
          modelsFetcher={getModelsByCourseId}
          onRaiseModel={raiseModel}
          courseId={courseId}
        />
      ) : (
        <Spinner animation="border" variant="primary" />
      )}
    </>
  );
}
