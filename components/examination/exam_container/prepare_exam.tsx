import router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import LocalStorageContext from "../../../contexts/localStorageContext";
import { isRecordingAlive } from "../../../controller/exam/exam";
import { Exam } from "../../../model/Exam";
import Recorder from "../recording/exam_record";
import ExamForm from "./exam_form";
import QRCode from "qrcode.react";
import config from "../../../utils/config";
import ExamInfo from "./examInfo";
import {CheckCircleFill} from "react-bootstrap-icons"

// TODO use leon dns
const origin_base_url = "https://192.168.137.1"
const recordingUrl = `${config.serverBaseUrl}/exams/record`


export default function ExamRunner(props: { exam: Exam, secondarySecret: string }) {
    console.debug("ExamRunner props");
    console.debug(props.exam);
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

    const [pass_secondary, setPassSecondary] = useState(false)

    const [intentionStart, setIntentionStart] = useState(false)
    // check recovers status
    // TODO make this interval and stop exam if recorders
    // are not alive
    useEffect(() => {
        let intervalId = setInterval(async () => {
            try {
                const live_check = await isRecordingAlive(localStorageContext.userId,
                    props.exam.id)
                console.debug("live_check", live_check)

                console.debug("pass secondary", pass_secondary)
                if (pass_secondary && live_check.primary) {
                    setIsPrimeRecordLive(live_check.primary)
                    setIsSecondRecordLive(live_check.secondary)
                    clearInterval(intervalId)
                }

                if (live_check.primary && live_check.secondary) {
                    setIsPrimeRecordLive(live_check.primary)
                    setIsSecondRecordLive(live_check.secondary)
                    clearInterval(intervalId)
                }
                setIsPrimeRecordLive(live_check.primary)
                setIsSecondRecordLive(live_check.secondary)
            }
            catch (e) {
                console.error(e)
            }
        }, 3000)

        return () => { clearInterval(intervalId) }
    }, [pass_secondary])


    const studentId = localStorageContext.userId
    const query_params_secret = `studentId=${studentId}&secret=${props.secondarySecret}`
    const secret_connection_url = `${origin_base_url}/exam/${props.exam.id}?${query_params_secret}}`

    const [canStartExam, setCanStartExam] = useState(false)
    useEffect(() => {

        const isRecorderLive = isPrimeRecordLive && isRecordSecondLive //live indicated by remote
        const isRecorderRunning = !isRecordDone  // running indicated by local
        // TODO remove me
        if (pass_secondary && isPrimeRecordLive) {
            setCanStartExam(true)
        }

        if (isRecorderLive && isRecorderRunning) {
            setCanStartExam(true)
        }
        if (isRecordDone) {
            setCanStartExam(false)
        }

    }, [isPrimeRecordLive, isRecordSecondLive, isRecordDone, pass_secondary])


    // TODO make secondary camera optional for testing
    // console.log(props.exam)
    // CHECK only show exam when recorder is ready
    return <>

        {(intentionStart&&canStartExam)  &&
            <ExamForm
                exam={props.exam}
                setIsExamFinished={setIsExamFinished}
                count_up_time={count_up_time} />}


        {!intentionStart &&
            <>
                <div
                    className="bg-primary d-flex justify-content-center"
                    style={{ top: 0, zIndex: 1000 }}
                >
                    <h1 style={{ color: "white" }}>preparing exam ...</h1>
                </div>


                <div className="m-5">

                    <ExamInfo exam={props.exam} />

                    <h3>scan qr with the phone</h3>
                    <div className="my-3">

                        <QRCode value={secret_connection_url} size={520} />
                    </div>

                    <Button onClick={() => setPassSecondary(true)}> skip secondary </Button>

                    <hr/>
                    <Table striped bordered hover width="80%">
                        <tbody>
                            <tr>
                                <td>
                                    {isPrimeRecordLive ? <CheckCircleFill size="2.1em" />
                                    
                                    :
                                        <Spinner animation="border" />}
                                </td>
                                <td> main camera live </td>
                            </tr>
                            <tr>
                                <td>
                                    {isRecordSecondLive ? <CheckCircleFill size="2.1em" />
                                    :
                                        <Spinner animation="border" />}
                                </td>
                                <td>
                                    secondary camera live
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <hr />


                    <Button disabled={!canStartExam} onClick={() => setIntentionStart(true)}>start exam</Button>
                </div>
            </>
        }

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
