import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import LocalStorageContext from "../../../contexts/localStorageContext";
import { getExamReport } from "../../../controller/exam/report";
import { IncidantInterface } from "../../../model/examination/report";
import VideoIncidant from "./VideoIncidant";

export default function ExamReport({examId}) {
    const [examReport, setExamReport] = useState<IncidantInterface[]>([])

    const localStorageContext = useContext(LocalStorageContext)

    useEffect(() => {
        getExamReport(localStorageContext.userId, examId).then(report => setExamReport(report))
    }, [])

    console.log(examReport)

    return <>{examReport && examReport.map((incidant, index) =>
        <VideoIncidant key={`incident_${index}`} incident={incidant} />)}</>

}