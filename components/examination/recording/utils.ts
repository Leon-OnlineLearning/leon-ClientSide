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

export function cleanStream(stream:MediaStream) {
    stream.getTracks().forEach((track) => {
        track.stop();
      });
}