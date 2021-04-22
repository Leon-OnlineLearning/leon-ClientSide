import { useEffect, useRef, useState } from "react";
import AuthenticationView from "./AuthenticationView";
import { detectAllFaces, resizeResults, TinyFaceDetectorOptions, matchDimensions, nets } from '@vladmandic/face-api';
import useUserMedia from "../../../hooks/useUserMedia";
import { recordForPeriod } from "./record";


const video_length = 12  // 12 second

const CAPTURE_OPTIONS = {
  audio: false,
  video: true,
};
/**
 * refrance capturing 
 * @param props 
 * @returns 
 */
export default function RefranceCapturingView(props: {
  accaptableWidth: number
  accaptableHieght: number
  accaptableScore: number
}) {
  const [isModelLaoded, setIsModelLaoded] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  const videoRef = useRef(null)
  let srcObj;

  if (mediaStream && srcObj == null) {
    videoRef.current.srcObject = mediaStream;
    srcObj = mediaStream;
    console.log("src obj is", srcObj);
  }

  //load the model
  useEffect(() => {
    Promise.all([
      nets.tinyFaceDetector.loadFromUri('/models'),
    ]).then(() => setIsModelLaoded(true))
  }, [])


  // detect user face
  useEffect(() => {

    if (isModelLaoded && isVideoLoaded) {
      const displaySize = { width: videoRef.current.width, height: videoRef.current.height }

      let detection_interval = setInterval(async () => {
        const detections = await detectAllFaces(videoRef.current, new TinyFaceDetectorOptions())
        if (detections[0] &&
          detections[0].box.width > props.accaptableWidth &&
          detections[0].box.height > props.accaptableHieght &&
          detections[0].score > props.accaptableScore) {

          // FIXME this will send vedio twice sometimes ??
          recordForPeriod(mediaStream, video_length)

          try {
            clearInterval(detection_interval)
            // TODO Stop all video streams and use router to send to other page
            // mediaStream.getVideoTracks().forEach(track => track.stop());
          }
          catch (error) {
            console.log(error)
          }

        }

      }, 200)

      // clean interval in unmount

    }

  }, [isModelLaoded, isVideoLoaded])

  return (
    <>
      <AuthenticationView
        borderColor="#efefef"
        width={480}
        height={360}
        onCanPlay={() => { }}
        radius={170}
        srcObject={srcObj}
      />
      <video ref={videoRef} style={{ display: 'none' }} onCanPlay={() => { setIsVideoLoaded(true) }} autoPlay />
    </>
  );
}
