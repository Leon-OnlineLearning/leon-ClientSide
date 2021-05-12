import { useContext, useEffect, useRef, useState } from "react";
import AuthenticationView from "./AuthenticationView";
import { detectAllFaces, resizeResults, TinyFaceDetectorOptions, matchDimensions, nets } from '@vladmandic/face-api';
import useUserMedia from "../../../hooks/useUserMedia";
import { recordForPeriod } from "./record";
import { AuthInstructions } from "../../../pages/sendEmbedding";
import LocalStorageContext from "../../../contexts/localStorageContext";


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
export default function ReferenceCapturingView(props: {
  acceptableWidth: number
  acceptableHeight: number
  acceptableScore: number
  setIsDone: CallableFunction
  setCurrentInstruction: CallableFunction
}) {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const srcObj = useUserMedia(CAPTURE_OPTIONS);
  const videoRef = useRef(null)
  // let srcObj;

  const localStorageContext = useContext(LocalStorageContext)

  useEffect(() => {
    if (srcObj) {
      videoRef.current.srcObject = srcObj;
      console.log("src obj is", srcObj);
    }
  }, [srcObj])


  //load the model
  useEffect(() => {
    props.setCurrentInstruction(AuthInstructions.model_loading)
    const loadModule = async () => {
      await nets.tinyFaceDetector.loadFromUri('/models');
      setIsModelLoaded(true)
    }
    loadModule();
  }, [])


  // detect user face
  useEffect(() => {

    if (isModelLoaded && isVideoLoaded) {
      props.setCurrentInstruction(AuthInstructions.put_face)
      const displaySize = { width: videoRef.current.width, height: videoRef.current.height }

      let detection_interval = setInterval(async () => {
        const detections = await detectAllFaces(videoRef.current, new TinyFaceDetectorOptions())
        if (detections[0] &&
          detections[0].box.width > props.acceptableWidth &&
          detections[0].box.height > props.acceptableHeight) {
          if (detections[0].score > props.acceptableScore) {
            console.debug(`score = ${detections[0].score}`)

            // FIXME this will send vedio twice sometimes ??
            props.setCurrentInstruction(`${AuthInstructions.start_recording} wait for ${video_length}s`)
            recordForPeriod(localStorageContext.userId, srcObj, video_length, () => {
              props.setIsDone(true)
            })
          }
          else {
            // if score is bad 
            console.debug(`score = ${detections[0].score}`)

            // give instucture for lightning
            props.setCurrentInstruction(current => {
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
            props.setCurrentInstruction(current => {
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

  }, [isModelLoaded, isVideoLoaded])

  return (
    <>
      <AuthenticationView
        borderColor="#efefef"
        width={480}
        height={360}
        onCanPlay={() => { }}
        radius={170}
        srcObject={srcObj}
        isLoading={!isModelLoaded}

      />
      <video ref={videoRef} style={{ display: 'none' }} onCanPlay={() => { setIsVideoLoaded(true) }} autoPlay />
    </>
  );
}
