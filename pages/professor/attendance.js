import ProfessorStudentAttendance from "../../components/professor-student-attendace/professor-student-attendance";
import {ProfessorDashboard, ProfessorDashboardSelectedPage} from "../../components/dashboard-professor/professor-dashboard"

export default function Dashboard() {
    return (
        <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.attendance}>
            <ProfessorStudentAttendance></ProfessorStudentAttendance>
        </ProfessorDashboard>
    )
}