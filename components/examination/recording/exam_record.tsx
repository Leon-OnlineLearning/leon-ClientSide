import { useContext, useEffect, useRef, useState } from "react";
import LocalStorageContext from "../../../contexts/localStorageContext";
import { sendExamRecording } from "../../../controller/exam/exam";
import useUserMedia from "../../../hooks/useUserMedia";

import { cleanStream } from "./utils";

// FIXME re-obtain the counter value after refresh
let counter = 0;
const record_slice_sec = 6
const record_slice_ms = record_slice_sec * 1000
export default function Recorder(props: {
    examId: string,
    shouldStop: boolean,
    onFinish: CallableFunction
    examDuration: number
    recordingStarted: boolean
    setRecordingStarted: CallableFunction
}) {

    const localStorageContext = useContext(LocalStorageContext)
    const [remaining_chunks, setRemaining_chunks] = useState(0);
    const recorderRef = useRef(null)

    const [isRecordDone, setIsRecordDone] = useState(false);
    // stop recording
    useEffect(() => {
        if (props.shouldStop && recorderRef.current.state == "recording") {
            console.log(recorderRef.current)
            recorderRef.current.stop()
            cleanStream(recorderRef.current.stream)
            setTimeout(() => {
                setIsRecordDone(true)
            }, 1000)
            console.log("recording stoped")
        }
    }, [props.shouldStop])

    // call on recording finish
    useEffect(() => {
        if (remaining_chunks == 0 && isRecordDone) {
            console.log("sending report")
            props.onFinish()
        }
    }, [remaining_chunks, isRecordDone])

    function handleDataAvailable(event) {
        setRemaining_chunks(rem => rem + 1)
        let recordedChunks = []
        console.debug(`sending ${event.data.size}`)
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
            const chunk_start = counter * record_slice_sec
            let chunk_end = chunk_start + record_slice_sec
            if (chunk_end >= props.examDuration){
                chunk_end = props.examDuration
            }
            
            const isLastChunk = event.target.state == "inactive"
            // TODO check if we can use time code
            console.log(event.timecode)
            sendExamRecording({
                examId: props.examId,
                userId: localStorageContext.userId,
                chunckIndex: counter,
                recordedChunks: recordedChunks,
                startingFrom: chunk_start,
                endingAt: chunk_end,
                isLastChunk:  isLastChunk
            }).then(res => { setRemaining_chunks(rem => rem - 1) })
            counter++
        }
    }

    const mediaStream = useUserMedia({ audio: true, video: true });
    useEffect(() => {
        if (mediaStream) {
            if (!props.recordingStarted) {
                if (mediaStream.active == false) {
                    console.error("media stream is not active")
                }
                /**
                 * TODO handle unsupported mimeType 
                 * https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/isTypeSupported
                 */
                let options = { mimeType: "video/webm" };
                let recorder = new MediaRecorder(mediaStream, options);
                recorder.ondataavailable = handleDataAvailable
                recorder.onerror = console.error
                recorder.onstart = () => {
                    console.debug("recording started")
                    props.setRecordingStarted(true)
                }
                recorder.start(record_slice_ms)
                recorderRef.current = recorder
            }
        }

    }, [mediaStream])


    return <p>remaining chunks {String(remaining_chunks)}</p>
}