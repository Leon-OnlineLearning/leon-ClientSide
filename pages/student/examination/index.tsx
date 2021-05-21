import { useContext, useEffect, useState } from "react";
import ExamCard from "../../../components/exam/exam-card";
import { StudentDashboard, StudentDashboardSelectedPage } from "../../../components/student/dashboad/student-dashboard";
import LocalStorageContext from "../../../contexts/localStorageContext";
import { getAllExams } from "../../../controller/exam/exam";

const ExaminationPage: React.FC = () => {
    const [exams, setExams] = useState([])
    const localStorageContext = useContext(LocalStorageContext)
    useEffect(() => {
        const f = async () => {
            const e = await getAllExams(localStorageContext.userId)
            setExams(e)
        }
        f();
    },[])
    return (
        <StudentDashboard selectedPage={StudentDashboardSelectedPage.exams}>
            <h1>Exams</h1>
            {exams && exams.map(e => {
                return (
                    <ExamCard
                        endDate={new Date(e.endDate)}
                        startDate={new Date(e.startDate)}
                        id={e.id}
                        title={e.title}
                        mark={e.mark}
                        key={e.id}
                    />
                )
            })}
        </StudentDashboard>
    )
}

export default ExaminationPage;