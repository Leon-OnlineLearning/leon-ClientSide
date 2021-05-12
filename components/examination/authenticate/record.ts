import { sendRefranceVideo } from "../../../controller/exam/exam";
import { download } from "../recording/utils";

export function recordForPeriod(userId: string, stream, recordingTime:number,callback){
    let options = { mimeType: "video/webm" };
    let recorder = new MediaRecorder(stream, options);
    
    console.debug("start recording")
    function handleDataAvailable(event) {
        let recordedChunks = []

        if (event.data.size > 0) {
            recordedChunks.push(event.data);
            // TODO make sure this returns true   
            sendRefranceVideo({
                userId,
                recordedChunks: recordedChunks
            })
        }
    }
    
    recorder.ondataavailable = handleDataAvailable

    recorder.start()

    setTimeout(() => {
    recorder.stop()
    console.log("recoding stoped")
    callback()
    }, recordingTime * 1000)
}