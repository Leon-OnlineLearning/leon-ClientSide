import StudentGrades from "../../components/student/student-grades/student-grades"
import { StudentDashboard, StudentDashboardSelectedPage } from "../../components/student/dashboad/student-dashboard";

export default function Dashboard() {
    return (
        <>
            <StudentDashboard selectedPage={StudentDashboardSelectedPage.grads}>
                <StudentGrades></StudentGrades>
            </StudentDashboard>
        </>
    )
}