import router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import LocalStorageContext from "../../../contexts/localStorageContext";
import { isRecordingAlive } from "../../../controller/exam/exam";
import { Exam } from "../../../model/Exam";
import Recorder from "../recording/exam_record";
import ExamForm from "./exam_form";
import QRCode from "qrcode.react";
import config from "../../../utils/config";


// TODO use leon dns
const origin_base_url = "https://192.168.18.19"
const recordingUrl = `${config.serverBaseUrl}/exams/record`


export default function ExamRunner(props: { exam: Exam ,secondarySecret: string }) {

    const localStorageContext = useContext(LocalStorageContext)

    // the recorder is ready and running
    const [isRecordingStarted, setIsRecordingStarted] = useState(false);

    // the record is life and backend received at least one chunk
    const [isPrimeRecordLive, setIsPrimeRecordLive] = useState(false)

    // the second record is life and backend received at least one chunk
    const [isRecordSecondLive, setIsSecondRecordLive] = useState(false)

    // exam finish as time or question finished
    const [isExamFinished, setIsExamFinished] = useState(false);

    // recorder finished uploading every thing
    const [isRecordDone, setIsRecordDone] = useState(false);



    // counter used to track recording time
    const [count_up_time, setCountUpTime] = useState(0) //needed to mark liveness check
    useEffect(() => {
        if (isRecordingStarted) {
            setInterval(() => {
                setCountUpTime(t => t + 1)
            }, 1000)
        }
    }, [isRecordingStarted])
    
    
    // check recovers status
    // TODO make this interval and stop exam if recorders
    // are not alive
    useEffect(() => {
        const check_loop = async () => {
            while (true) {
                try{
                    const live_check = await isRecordingAlive(localStorageContext.userId,
                        props.exam.id)
                    console.debug("live_check", live_check)
                    if (live_check.primary && live_check.secondary) {
                        setIsPrimeRecordLive(live_check.primary)
                        setIsSecondRecordLive(live_check.secondary)
                        break;
                    }
                    setIsPrimeRecordLive(live_check.primary)
                    setIsSecondRecordLive(live_check.secondary)
                }
                catch(e){
                    console.error(e)
                }
                await sleep(3000)
            }
        }
        check_loop()
    },[])


    const studentId = localStorageContext.userId
    const query_params_secret = `studentId=${studentId}&secret=${props.secondarySecret}`
    const secret_connection_url = `${origin_base_url}/exam/${props.exam.id}?${query_params_secret}}`

    const [canStartExam, setCanStartExam] = useState(false)
    useEffect(()=>{
        
        const isRecorderLive = isPrimeRecordLive && isRecordSecondLive //live indicated by remote
        const isRecorderRunning = !isRecordDone  // running indicated by local
        if (isRecorderLive && isRecorderRunning) {
            setCanStartExam(true)
        }
        if (isRecordDone){
            setCanStartExam(false)
        }
        
    },[isPrimeRecordLive,isRecordSecondLive,isRecordDone])
    
    // CHECK only show exam when recorder is ready
    return <>
        {canStartExam ?
        <ExamForm
            exam={props.exam}
            setIsExamFinished={setIsExamFinished}
            count_up_time={count_up_time}/> 
            : <>
            {!isRecordDone && <Spinner animation="border" variant="primary" />}
            </>
            }

        {!isRecordSecondLive && 
        <QRCode value={secret_connection_url} size={480}/>}
        
        <Recorder examId={props.exam.id}
            shouldStop={isExamFinished}
            onFinish={() => {
                setIsRecordDone(true)
            }}
            recordingStarted={isRecordingStarted}
            setRecordingStarted={setIsRecordingStarted}
            recorderUrl={recordingUrl}
            studentId={localStorageContext.userId}
        />
        {
            isRecordDone && 
            <Button 
                onClick={() => 
                    router.push(`/student/examination/report/${props.exam.id}`)}
            >Go To Report</Button>}
    </>
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
