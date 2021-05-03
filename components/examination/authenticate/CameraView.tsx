import { useEffect, useRef, useState } from "react";
import AuthenticationView from "./AuthenticationView";
import { detectAllFaces, resizeResults, TinyFaceDetectorOptions, matchDimensions, nets } from '@vladmandic/face-api';
import useUserMedia from "../../../hooks/useUserMedia";
import { recordForPeriod } from "./record";
import { AuthInstructions } from "../../../pages/sendEmbedding";


const video_length = 5  // 8 second

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
  setIsDone: CallableFunction
  setcurrentInstuction: CallableFunction
}) {
  const [isModelLaoded, setIsModelLaoded] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const srcObj = useUserMedia(CAPTURE_OPTIONS);
  const videoRef = useRef(null)
  // let srcObj;


  useEffect(() => {
    if (srcObj) {
      videoRef.current.srcObject = srcObj;
      console.log("src obj is", srcObj);
    }
  }, [srcObj])


  //load the model
  useEffect(() => {
    props.setcurrentInstuction(AuthInstructions.model_loading)
    const loadModule = async () => {
      await nets.tinyFaceDetector.loadFromUri('/models');
      setIsModelLaoded(true)
    }
    loadModule();
  }, [])


  // detect user face
  useEffect(() => {

    if (isModelLaoded && isVideoLoaded) {
      props.setcurrentInstuction(AuthInstructions.put_face)
      const displaySize = { width: videoRef.current.width, height: videoRef.current.height }

      let detection_interval = setInterval(async () => {
        const detections = await detectAllFaces(videoRef.current, new TinyFaceDetectorOptions())
        if (detections[0] &&
          detections[0].box.width > props.accaptableWidth &&
          detections[0].box.height > props.accaptableHieght) {
          if (detections[0].score > props.accaptableScore) {
            console.debug(`score = ${detections[0].score}`)

            // FIXME this will send vedio twice sometimes ??
            props.setcurrentInstuction(`${AuthInstructions.start_recording} wait for ${video_length}s`)
            recordForPeriod(srcObj, video_length, () => {
              props.setIsDone(true)
            })
          }
          else {
            // if score is bad 
            console.debug(`score = ${detections[0].score}`)

            // give instucture for lightning
            props.setcurrentInstuction(current => {
              if (current == AuthInstructions.bad_lighting) {
                return current
              }
              else {
                // set it to bad and remove it after some time
                return AuthInstructions.bad_lighting
              }
            })


            return
          }

          try {
            clearInterval(detection_interval)
            // TODO Stop all video streams and use router to send to other page
            // mediaStream.getVideoTracks().forEach(track => track.stop());
          }
          catch (error) {
            console.log(error)
          }

        }
        else {
          if (detections[0]) {
            console.debug(`width = ${detections[0].box.width}`)
            console.debug(`hieght = ${detections[0].box.height}`)
            console.debug(`-----------------------------`)
            props.setcurrentInstuction(current => {
              if (current == AuthInstructions.bad_lighting)
                return AuthInstructions.put_face // return to put face message
              else
                return current // if file is uploading don't change it
            })
          }
          else
            console.debug("no_face")
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
        isLoading={!isModelLaoded}

      />
      <video ref={videoRef} style={{ display: 'none' }} onCanPlay={() => { setIsVideoLoaded(true) }} autoPlay />
    </>
  );
}
