import ExamReport from "../../../../components/examination/report/ExamReport";
import { StudentDashboard, StudentDashboardSelectedPage } from "../../../../components/student/dashboad/student-dashboard";

export default function Report() {
    return (<StudentDashboard selectedPage={StudentDashboardSelectedPage.exams}>
        <ExamReport />
    </StudentDashboard>);
}