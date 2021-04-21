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
  const [modelLaoded, setModelLaoded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

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
    ]).then(() => setModelLaoded(true))
  }, [])


  // detect user face
  useEffect(() => {

    if (modelLaoded && videoLoaded) {
      const displaySize = { width: videoRef.current.width, height: videoRef.current.height }

      let detection_interval = setInterval(async () => {
        const detections = await detectAllFaces(videoRef.current, new TinyFaceDetectorOptions())
        if (detections[0] &&
          detections[0].box.width > props.accaptableWidth &&
          detections[0].box.height > props.accaptableHieght &&
          detections[0].score > props.accaptableScore) {

          recordForPeriod(mediaStream, video_length)
          console.log(detections)

          // console.log(detections)

          try {
            clearInterval(detection_interval)
            // Stop all video streams.
            // mediaStream.getVideoTracks().forEach(track => track.stop());
          }
          catch (error) {
            console.log(error)
          }

        }

      }, 1000)

      // clean interval in unmount

    }

  }, [modelLaoded, videoLoaded])

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
      <video ref={videoRef} style={{ display: 'none' }} onCanPlay={() => { setVideoLoaded(true) }} autoPlay />
    </>
  );
}
