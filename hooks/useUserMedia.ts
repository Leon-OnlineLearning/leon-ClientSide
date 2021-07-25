import { useEffect, useState } from "react";



export default function useUserMedia(requestedMedia): MediaStream {
  const [mediaStream, setMediaStream] = useState(null);

  const [isMediaRequested, setIsMediaRequested] = useState(false);
  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(
          requestedMedia
        );
        setMediaStream(stream);
      } catch (err) {
        if (err instanceof DOMException && err.message === "Permission denied") {
          alert("We must grant camera permission to get your embedding")
        } else {
          console.error(err)
      }
    }
    }
    // FIXME this will prevent getting new stream when requestedMedia change
    if (!isMediaRequested) {
      console.debug("media is requested")
      setIsMediaRequested(true)
      enableStream();
    }
    // FIXME clean is called multible times and stop track without need
    // return function cleanup() {
    //   console.log("stoping track")
    //   if (mediaStream && mediaStream.active == false){
    //     mediaStream?.getTracks().forEach((track) => {
    //       track.stop();
    //     });
    //   }
    // };

  }, [requestedMedia]);

  return mediaStream;
}