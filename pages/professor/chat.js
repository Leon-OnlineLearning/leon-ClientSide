import { ProfessorDashboard, ProfessorDashboardSelectedPage } from "../../components/dashboard-professor/professor-dashboard";

export default function Dashboard() {
    return (
        <>
            <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.chat}></ProfessorDashboard>
        </>
    )
}