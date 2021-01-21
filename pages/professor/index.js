import { ProfessorDashboard, ProfessorDashboardSelectedPage } from "../../components/professor/dashboard/professor-dashboard";
import Calendar from "../../components/calendar/calendar"
import {getEvents} from "../../controller/getEvent"


export default function Dashboard() {
    return (
        <>
            <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.home}>
                <Calendar getEvents={getEvents}></Calendar>
            </ProfessorDashboard>
        </>
    )
}