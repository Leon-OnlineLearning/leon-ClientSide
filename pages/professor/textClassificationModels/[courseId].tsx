import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import ModelsView from "../../../components/models-view/models-view";
import {
  ProfessorDashboard,
  ProfessorDashboardSelectedPage,
} from "../../../components/professor/dashboard/professor-dashboard";
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
  const redirectToCreateNewModel = () => {
    const pathNameParts = router.pathname.split("/");
    const parentRoute = pathNameParts[pathNameParts.length - 2];
    // split by the parent name and get the first split
    // this should return the full path before the parent route name including the "/"
    const preParentRouteName = router.pathname.split(parentRoute)[0];
    console.debug(
      "⚠️ WARNING: you are using a dangerous method to get the preParent route. One case this is discouraged is when there is a portion of the name repeats",
      "That's why it is not a separate function"
    );
    router.push(`${preParentRouteName}createModel/${courseId}`);
  };
  return (
    <>
      <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.models}>
        <section
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2>Maintain your models</h2>
          <Button
            style={{
              alignSelf: "flex-end",
              margin: "12px 0px",
            }}
            onClick={redirectToCreateNewModel}
          >
            Create new model
          </Button>
          {courseId ? (
            <ModelsView
              modelsFetcher={getModelsByCourseId}
              onRaiseModel={raiseModel}
              courseId={courseId}
            />
          ) : (
            <Spinner animation="border" variant="primary" />
          )}
        </section>
      </ProfessorDashboard>
    </>
  );
}
