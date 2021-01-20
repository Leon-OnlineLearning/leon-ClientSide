import { ProfessorDashboard, ProfessorDashboardSelectedPage } from "../../components/dashboard-professor/professor-dashboard";
import ProfessorStudentGrades from "../../components/professor-student-grades/professor-student-grades"

export default function Dashboard() {
    return (
        <>
            <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.grads}>
                <ProfessorStudentGrades></ProfessorStudentGrades>
            </ProfessorDashboard>
        </>
    )
}