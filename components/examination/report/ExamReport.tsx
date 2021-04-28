import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getExamReport } from "../../../controller/exam/report";
import VideoIncidant from "./VideoIncidant";

export default function ExamReport() {
    const [examReport, setExamReport] = useState([])

    const router = useRouter()
    const { examId } = router.query

    useEffect(() => {
        getExamReport(localStorage.getItem('id'), examId).then(report => setExamReport(report))
    }, [])

    console.log(examReport)

    return <>{examReport && examReport.map((incidant, index) =>
        <VideoIncidant key={incidant.startTime} incident={incidant} />)}</>

}