import ProfessorStudentAttendance from "../../components/professor/student-attendace/professor-student-attendance"
import {ProfessorDashboard, ProfessorDashboardSelectedPage} from "../../components/professor/dashboard/professor-dashboard";

export default function Dashboard() {
    return (
        <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.attendance}>
            <ProfessorStudentAttendance></ProfessorStudentAttendance>
        </ProfessorDashboard>
    )
}
