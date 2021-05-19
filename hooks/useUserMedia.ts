import { useEffect, useState } from "react";



export default function useUserMedia(requestedMedia) {
    const [mediaStream, setMediaStream] = useState(null);
  
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
          }
        }
      }
  
      if (!mediaStream) {
        enableStream();
      } else {
        return function cleanup() {
          mediaStream.getTracks().forEach((track) => {
            track.stop();
          });
        };
      }
    }, [mediaStream, requestedMedia]);
  
    return mediaStream;
  }