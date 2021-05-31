import ExamReport from "../../../../components/examination/report/ExamReport";
import { StudentDashboard, StudentDashboardSelectedPage } from "../../../../components/student/dashboad/student-dashboard";
import { useRouterQuery } from "../../../../hooks/useRouteQuery";

export default function Report() {

    const [examId] = useRouterQuery("examId")


    return (<StudentDashboard selectedPage={StudentDashboardSelectedPage.exams}>
        {examId && <ExamReport examId={examId} />}
    </StudentDashboard>);
}