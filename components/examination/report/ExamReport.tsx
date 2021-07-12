import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import LocalStorageContext from "../../../contexts/localStorageContext";
import { getExamReport } from "../../../controller/exam/report";
import { IncidentInterface } from "../../../model/examination/report";
import VideoIncident from "./VideoIncident";

export default function ExamReport({examId}) {
    const [examReport, setExamReport] = useState<IncidentInterface[]>([])

    const localStorageContext = useContext(LocalStorageContext)

    useEffect(() => {
        getExamReport(localStorageContext.userId, examId).then(report => setExamReport(report))
    }, [])

    console.log(examReport)

    return <>{examReport && examReport.map((incident, index) =>
        <VideoIncident key={`incident_${index}`} incident={incident} examId={examId} userId={localStorageContext.userId}/>)}</>

}