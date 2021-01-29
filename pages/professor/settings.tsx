import ProfessorStudentAttendance from "../../components/professor/student-attendace/professor-student-attendance"
import { ProfessorDashboard, ProfessorDashboardSelectedPage } from "../../components/professor/dashboard/professor-dashboard";
import Settings from "../../components/settings/settings";

export default function Dashboard() {
    return (
        <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.accountSettings}>
            <Settings pages={
                {
                    "hello": "world",
                    "yahoo": "lossy"
                }
            }></Settings>
        </ProfessorDashboard>
    )
}