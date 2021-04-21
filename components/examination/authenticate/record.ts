import { sendRefranceVideo } from "../../../controller/exam/exam";
import { download } from "../recording/utils";

export function recordForPeriod(stream, recordingTime:number){
    let options = { mimeType: "video/webm" };
    let recorder = new MediaRecorder(stream, options);
    
    console.log("recoding")
    function handleDataAvailable(event) {
        let recordedChunks = []

        if (event.data.size > 0) {
            recordedChunks.push(event.data);
            download(recordedChunks)
            
            sendRefranceVideo({
                userId: localStorage.getItem('id'),
                recordedChunks: recordedChunks
            })
        }
    }
    
    recorder.ondataavailable = handleDataAvailable

    recorder.start()

    setTimeout(() => {
    recorder.stop()
    console.log("recoding stoped")
    }, recordingTime * 1000)
}