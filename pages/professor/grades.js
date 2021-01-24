import ProfessorStudentGrades from "../../components/professor/student-grades/professor-student-grades";
import {ProfessorDashboard, ProfessorDashboardSelectedPage} from "../../components/professor/dashboard/professor-dashboard";

export default function Dashboard() {
    return (
        <>
            <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.grads}>
                <ProfessorStudentGrades></ProfessorStudentGrades>
            </ProfessorDashboard>
        </>
    )
}