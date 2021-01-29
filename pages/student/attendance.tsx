import {StudentDashboard, StudentDashboardSelectedPage} from "../../components/student/dashboad/student-dashboard"
import StudentAttendance from "../../components/student/student-attendace/student-attendance"

export default function Dashboard() {
    return (
        <StudentDashboard selectedPage={StudentDashboardSelectedPage.attendance}>
            <StudentAttendance></StudentAttendance>
        </StudentDashboard>
    )
}