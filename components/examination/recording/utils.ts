export function download(recordedChunks) {
    var blob = new Blob(recordedChunks, {
        type: "video/webm"
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    // a.style = "display: none";
    a.href = url;
    a.download = "test.webm";
    a.click();
    window.URL.revokeObjectURL(url);
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
 export function send_chunck(recordedChunks,counter) {
    var blob = new Blob(recordedChunks, {
        type: "video/webm"
    });
    var fd = new FormData();
    fd.append('chuck', blob, `upl.webm`);
    fd.append('chunckIndex', String(counter))
    fd.append('userId', localStorage.getItem('id'));
    fd.append('examId', String(1));
    
    // TODO use link from variable
    fetch("/backend/exams/record", {
        method: "put",
        body: fd,
        credentials: "include"
    }).then(res => {
        console.log("Promise resolved", res);
    }).catch(console.log)
        ;
}