import ProfessorStudentAttendance from "../../components/professor/student-attendace/professor-student-attendance"
import { ProfessorDashboard, ProfessorDashboardSelectedPage } from "../../components/professor/dashboard/professor-dashboard";
import ButtonsListLayout from "../../components/buttons-list-layout/buttons-list-layout";
import AccountSettings from "../../components/accounts-settings/account-settings"

export default function Dashboard() {
    return (
        <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.accountSettings}>
            <ButtonsListLayout pages={
                {
                    "Account Settings": <AccountSettings />,
                }
            }></ButtonsListLayout>
        </ProfessorDashboard>
    )
}