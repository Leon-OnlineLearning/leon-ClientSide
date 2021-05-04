import { useEffect, useState } from "react";
import ExamCard from "../../../components/exam/exam-card";
import { StudentDashboard, StudentDashboardSelectedPage } from "../../../components/student/dashboad/student-dashboard";
import { getAllExams } from "../../../controller/exam/exam";

const ExaminationPage: React.FC = () => {
    const [exams, setExams] = useState([])
    useEffect(() => {
        const f = async () => {
            const e = await getAllExams(localStorage.getItem('id'))
            setExams(e)
        }
        f();
    })
    return (
        <StudentDashboard selectedPage={StudentDashboardSelectedPage.exams}>
            <h1>Exams</h1>
            {exams.map(e => {
                return (
                    <ExamCard
                        endDate={new Date(e.endDate)}
                        startDate={new Date(e.startDate)}
                        id={e.id}
                        title={e.title}
                        mark={e.mark}
                    />
                )
            })}
        </StudentDashboard>
    )
}

export default ExaminationPage;