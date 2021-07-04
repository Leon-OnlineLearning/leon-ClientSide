import ProfessorStudentGrades from "../../components/professor/student-grades/professor-student-grades";
import { ProfessorDashboard, ProfessorDashboardSelectedPage } from "../../components/professor/dashboard/professor-dashboard";
import StudentGrades from "../../components/student/student-grades/student-grades";

export default function Dashboard() {
    return (
        <>
            <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.grads}>
                <ProfessorStudentGrades></ProfessorStudentGrades>
            </ProfessorDashboard>
        </>
    )
}