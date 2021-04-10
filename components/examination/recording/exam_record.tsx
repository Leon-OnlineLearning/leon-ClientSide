import { useEffect } from "react";
import { useUserMedia } from "../../authenticate/CameraView";



const record_slice = 3 * 1000 //2 seconds
export default function Recorder() {


    function handleDataAvailable(event) {
        let recordedChunks = []

        console.log("data-available");
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
            console.log(recordedChunks);
            send_chunck(recordedChunks);
        } else {
            // ...
        }
    }

    function send_chunck(recordedChunks) {
        var blob = new Blob(recordedChunks, {
            type: "video/webm"
        });
        var fd = new FormData();
        fd.append('upl', blob, 'test.webm');

        fetch("http://localhost:5000/video", {
            method: "POST",
            body: fd
        }).then(res => {
            console.log("Promise resolved", res);
        }).catch(console.log)
        ;
    }

    const mediaStream = useUserMedia({ audio: true, video: true });

    useEffect(() => {
        if (mediaStream) {
            let options = { mimeType: "video/webm" };
            let recorder = new MediaRecorder(mediaStream, options);
            recorder.ondataavailable = handleDataAvailable

            recorder.start(record_slice)
        }
    }, [mediaStream])

    console.log("iam alive")


    return <p>recorder</p>
}