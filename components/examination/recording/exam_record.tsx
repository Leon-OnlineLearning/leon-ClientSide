import { useContext, useEffect } from "react";
import LocalStorageContext from "../../../contexts/localStorageContext";
import { sendExamRecording } from "../../../controller/exam/exam";
import useUserMedia from "../../../hooks/useUserMedia";

let counter = 0;
const record_slice = 10 * 1000 //10 seconds
export default function Recorder(props:{examId:string}) {

    const localStorageContext = useContext(LocalStorageContext)
    const [remaining_chunks, setRemaining_chunks] = useState(0);

    function handleDataAvailable(event) {
        setRemaining_chunks(rem => rem+1)
        let recordedChunks = []
        console.debug(`sending ${event.data.size}`)
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
            sendExamRecording({
                // TODO get exam id
                examId: props.examId,
                userId: localStorageContext.userId,
                chunckIndex: counter++,
                recordedChunks: recordedChunks
            }).then(res => {setRemaining_chunks(rem => rem-1)})
        }
    }

    const mediaStream = useUserMedia({ audio: true, video: true });
    const [recordingStarted, setRecordingStarted] = useState(false);
    useEffect(() => {
        if (mediaStream){
            if (!recordingStarted)
            {
                if (mediaStream.active == false){
                    console.error("media stram is not active")
                }
                /**
                 * TODO handle unsupported mimeType 
                 * https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/isTypeSupported
                 */
                let options = { mimeType: "video/webm" };
                let recorder = new MediaRecorder(mediaStream, options);
                recorder.ondataavailable = handleDataAvailable
                recorder.onerror = console.error
                recorder.onstart = ()=>{
                    console.debug("recording started")
                    setRecordingStarted(true)
                }
                recorder.start(record_slice)
                recorderRef.current = recorder
            }
        }
    
    }, [mediaStream])


    return <p>remaining chunks {String(remaining_chunks)}</p>
}