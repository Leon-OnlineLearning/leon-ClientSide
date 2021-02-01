import { useEffect, useRef } from "react";

import pointer_img from "./pointer.svg"

export default function Pointer_canvas({
  height,
  width,
  top,
  left,
  pointerX,
  pointerY,
}) {
  const canvasRef = useRef(null);

  let imageRef = useRef(null);
  useEffect(() => {
    let image = new Image()
    image.src = pointer_img
    imageRef.current = image
  },[])

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageRef.current, pointerX, pointerY);
  });
  
  return (
    <canvas
      ref={canvasRef}
      height={height}
      width={width}
      style={{
        opacity: 0.5,
        position: "absolute",
        top: top,
        left: left,
        zIndex:10000
      }}
    />
  );
}
