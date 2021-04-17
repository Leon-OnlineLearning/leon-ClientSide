import { useEffect, useRef, useState } from "react";
import AuthenticationView from "./AuthenticationView";

const CAPTURE_OPTIONS = {
  audio: false,
  video: true,
};

export default function CameraView() {
  // const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  let srcObj;

  if (mediaStream && srcObj == null) {
    // videoRef.current.srcObject = mediaStream;
    srcObj = mediaStream;
    console.log("src obj is", srcObj);
  }

  function handleCanPlay(e) {
    // videoRef.current.play();
    console.log("e is:", e);
    e.target.play();
  }

  return (
    // <video ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted />
    <AuthenticationView
      borderColor="#efefef"
      width={480}
      height={360}
      onCanPlay={handleCanPlay}
      radius={170}
      srcObject={srcObj}
    />
  );
}

export function useUserMedia(requestedMedia) {
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(
          requestedMedia
        );
        setMediaStream(stream);
      } catch (err) {
        // Removed for brevity
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
