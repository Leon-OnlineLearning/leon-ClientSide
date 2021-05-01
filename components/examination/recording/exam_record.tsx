import { useEffect } from "react";
import { sendExamRecording } from "../../../controller/exam/exam";
import useUserMedia from "../../../hooks/useUserMedia";

let counter = 0;
const record_slice = 10 * 1000 //10 seconds
export default function Recorder(props:{examId:string}) {


    function handleDataAvailable(event) {
        let recordedChunks = []

        if (event.data.size > 0) {
            recordedChunks.push(event.data);
            sendExamRecording({
                // TODO get exam id
                examId: props.examId,
                userId: localStorage.getItem('id'),
                chunckIndex: counter++,
                recordedChunks: recordedChunks
            })
        }
    }

    const mediaStream = useUserMedia({ audio: true, video: true });

    useEffect(() => {
        if (mediaStream) {
            /**
             * TODO handle unsupported mimeType 
             * https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/isTypeSupported
             */
            let options = { mimeType: "video/webm" };
            let recorder = new MediaRecorder(mediaStream, options);
            recorder.ondataavailable = handleDataAvailable

            recorder.start(record_slice)
        }
    }, [mediaStream])

    console.log("iam alive")


    return <p>recorder</p>
}