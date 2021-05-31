import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import LocalStorageContext from "../../../contexts/localStorageContext";
import { getExamReport } from "../../../controller/exam/report";
import VideoIncidant from "./VideoIncidant";

export default function ExamReport({examId}) {

    const localStorageContext = useContext(LocalStorageContext)

    useEffect(() => {
        getExamReport(localStorageContext.userId, examId).then(report => setExamReport(report))
    }, [])

    console.log(examReport)

    return <>{examReport && examReport.map((incidant, index) =>
        <VideoIncidant key={incidant.startTime} incident={incidant} />)}</>

}