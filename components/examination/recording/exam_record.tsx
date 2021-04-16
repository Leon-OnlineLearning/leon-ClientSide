import { useEffect } from "react";
import { useUserMedia } from "../../authenticate/CameraView";


let counter = 1;
const record_slice = 3 * 1000 //10 seconds
export default function Recorder() {


    function handleDataAvailable(event) {
        let recordedChunks = []

        console.log("data-available");
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
            send_chunck(recordedChunks);
        } else {
            // ...
        }
    }

    /**
     * send a chunk of data for now it is simple fetch call with post method
     * NOTE not all chuncks are playable 
     * acording to https://www.w3.org/TR/mediastream-recording/#dom-mediarecorder-start
     * ```
     * The UA MUST record stream in such a way that the original Tracks can be 
     * retrieved at playback time. When multiple Blobs are returned 
     * (because of timeslice or requestData()), the individual Blobs
     *  need not be playable, but the combination of all the Blobs 
     * from a completed recording MUST be playable.
     * ```
     * which turns out to mean that we need the first chnunk to 
     * reconstranct file __we may need the last chunk but as i tested 
     * we don't need it
     * 
     * TODO handle failed requests
     * TODO handle lost connection 
     * TODO handle closing browser
     */
    function send_chunck(recordedChunks) {
        var blob = new Blob(recordedChunks, {
            type: "video/webm"
        });
        var fd = new FormData();
        fd.append('upl', blob, `test${counter++}.webm`);

        // TODO use link from variable
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