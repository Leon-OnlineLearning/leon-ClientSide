import { useEffect, useRef } from "react";

import pointer_img from "./pointer.svg"
/**
 * this will create a canvas in absolute position 
 * which can be used to draw other other elements
 * would require a parent div with position `relative` draw in sibling
 * 
 * 
 * @param height the height of the canvas to draw
 * @param width the width of the canvas to draw
 * @param pointerX x position of the pointer
 * @param pointerY y position of the pointer
 *  
 * @returns
 */
export default function Pointer_canvas({
  height,
  width,
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
        position: "absolute",
        top: 0,
        left: 0,
        zIndex:10000,
      }}
    />
  );
}
