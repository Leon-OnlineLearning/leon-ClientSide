import ProfessorStudentAttendance from "../../components/professor/student-attendace/professor-student-attendance"
import {ProfessorDashboard, ProfessorDashboardSelectedPage} from "../../components/professor/dashboard/professor-dashboard";
import Calendar from "../../components/calendar/calendar"

export default function Dashboard() {
    return (
        <>
            <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.home}>
                <Calendar year={2021} month={1} events={[
                    {
                        date: new Date(),
                        title: "are you real!",
                        description: "hello to my life"
                    }
                ]}></Calendar>
            </ProfessorDashboard>
        </>
    )
}