import React, {
  BaseSyntheticEvent,
  EventHandler,
  ReactEventHandler,
  useEffect,
  useRef,
} from "react";
import styles from "./auth-view-styles.module.css";

interface AuthenticationViewProps {
  width: number;
  height: number;
  borderWidth?: number;
  borderColor?: string;
  onCanPlay: ReactEventHandler<HTMLVideoElement>;
  blurSize?: number;
  srcObject?: MediaProvider | null;
  radius: number;
}

/**
 * @description
 * Authentication camera view, this is a wrapper around the vide element create the blur and circle effect that helps client to be in a suitable pose
 * @param {number} height the hight of the component in pixels
 * @param {number} width the width of the component in pixels
 * @param {number} borderWidth the width of circle's border in pixels
 * @param {string} borderColor the border color of the circle
 * @param {number} blurSize the size of the blur filter
 * @param {number} radius the radius of the circle
 * @param {MediaProvider} srcObject the source object for the video element
 * @param {ReactEventHandler<HTMLVideoElement>} onCanPlay
 */
const AuthenticationView: React.FC<AuthenticationViewProps> = ({
  height,
  width,
  borderWidth = 3,
  blurSize = 5,
  onCanPlay,
  srcObject,
  borderColor = "#efefef",
  radius,
}) => {
  if (height < 1 || width < 1) {
    throw new Error("Width and height must be >= 1");
  }
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const foregroundVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (srcObject != null) {
      backgroundVideoRef.current.srcObject = srcObject;
      foregroundVideoRef.current.srcObject = srcObject;
    }
  }, [srcObject]);
  return (
    <>
      <div
        style={{
          overflow: "hidden",
          width: `${width}px`,
          height: `${height}px`,
          position: "relative",
        }}
      >
        {/* add blur size to width and heigh to clip the smooth edges of picture */}
        <video
          style={{
            width: `${width + blurSize}px`,
            height: `${height + blurSize}px`,
            filter: `blur(${blurSize}px)`,
          }}
          onCanPlay={onCanPlay}
          autoPlay
          playsInline
          muted
          ref={backgroundVideoRef}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            clipPath: `circle(${radius + borderWidth}px at center)`,
            backgroundColor: borderColor,
            width,
            height,
          }}
        >
          <video
            style={{
              width: `${width + blurSize}px`,
              height: `${height + blurSize}px`,
              clipPath: `circle(${radius}px at center)`,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
            onCanPlay={onCanPlay}
            autoPlay
            playsInline
            muted
            ref={foregroundVideoRef}
          />
        </div>
      </div>
    </>
  );
};

export default AuthenticationView;
