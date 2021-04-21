import { useEffect } from "react";
import { useUserMedia } from "../../authenticate/CameraView";
import { send_chunck} from "./utils"

let counter = 1;
const record_slice = 3 * 1000 //10 seconds
export default function Recorder() {


    function handleDataAvailable(event) {
        let recordedChunks = []

        console.log("data-available");
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
            send_chunck(recordedChunks,counter++);
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