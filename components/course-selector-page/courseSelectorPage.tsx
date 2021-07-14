import { Spinner } from "react-bootstrap";
import useCourseDependantPage from "../../hooks/useCourseDependantPage";
import ProfessorsCourseSelector from "../course-selector/courseSelector";
import {
  ProfessorDashboard,
  ProfessorDashboardSelectedPage,
} from "../professor/dashboard/professor-dashboard";

export default function ProfessorCourseSelectorPage() {
  const [userId, courseParentRoute] = useCourseDependantPage();
  return (
    <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.models}>
		<h2 style={{
			fontWeight: 600,
			marginBottom: "24px"
		}}>Select a course</h2>
      {userId ? (
        <ProfessorsCourseSelector
          userId={userId}
          parentRoute={courseParentRoute}
        />
      ) : (
        <Spinner animation="border" variant="primary" />
      )}
    </ProfessorDashboard>
  );
}
