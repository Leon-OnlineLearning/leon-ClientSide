import { sendReferenceVideo } from "../../../controller/exam/exam";
import { download } from "../recording/utils";

export function recordForPeriod(userId: string, stream, recordingTime:number,callback){
    let options = { mimeType: "video/webm" };
    let recorder = new MediaRecorder(stream, options);
    
    function handleDataAvailable(event) {
        let recordedChunks = []

        if (event.data.size > 0) {
            recordedChunks.push(event.data);
            // FIXME make sure this returns true   
            console.debug(`sending ${event.data.size}`)
            sendReferenceVideo({
                userId,
                recordedChunks: recordedChunks
            })
        }
    }
    
    recorder.ondataavailable = handleDataAvailable

    recorder.start()
    recorder.onstart = ()=>{console.debug("recording started") }

    setTimeout(() => {
        try {
            recorder.stop()
            console.log("recoding stopped")
        } catch (error) {
            console.error("already stopped")
        }
        finally {
            callback()
        }
    }, recordingTime * 1000)
}