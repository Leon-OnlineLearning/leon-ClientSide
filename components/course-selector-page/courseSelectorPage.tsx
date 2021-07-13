import { Spinner } from "react-bootstrap";
import useCourseDependantPage from "../../hooks/useCourseDependantPage";
import ProfessorsCourseSelector from "../course-selector/courseSelector";

export default function ProfessorCourseSelectorPage () {
  const [userId, courseParentRoute] = useCourseDependantPage();
  return (
    <>
      {userId ? (
        <ProfessorsCourseSelector
          userId={userId}
          parentRoute={courseParentRoute}
        />
      ) : (
        <Spinner animation="border" variant="primary" />
      )}
    </>
  );

}