import { useEffect, useRef, useState } from 'react';


const CAPTURE_OPTIONS = {
    audio: false,
    video: true,
};

export default function CameraView() {
    const videoRef = useRef(null);
    const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  
    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = mediaStream;
    }
  
    function handleCanPlay() {
      videoRef.current.play();
    }
  
    return (
      <video ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted />
    );
  }


export function useUserMedia(requestedMedia) {
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(requestedMedia);
        setMediaStream(stream);
      } catch(err) {
        // Removed for brevity
      }
    }

    if (!mediaStream) {
      enableStream();
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach(track => {
          track.stop();
        });
      }
    }
  }, [mediaStream, requestedMedia]);

  return mediaStream;
}