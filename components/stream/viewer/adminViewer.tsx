import PdfViewer from "./viewerload";
import { useMemo, useState } from "react";
import Pointer_canvas from "./pointer_canvas";
export default function AdminViewer({
  pointerPositionX,
  setPointerPositionX,
  pointerPositionY,
  setPointerPositionY,
  pageNumber,
  setPageNumber
}) {
  let pointerCanvasGenerator = (viewer_hieght, viewer_width) => (
    <Pointer_canvas
      height={viewer_hieght}
      width={viewer_width}
      pointerX={pointerPositionX}
      pointerY={pointerPositionY}
    />
  );

  let onMouseMove = (refrance_element) => (e) => {
    const viewerRect = refrance_element.getBoundingClientRect();
    setPointerPositionX(e.clientX - viewerRect.x);
    setPointerPositionY(e.clientY - viewerRect.y);
  };

  return (
    <PdfViewer
      onMouseMove={onMouseMove}
      pointerCanvasGenerator={pointerCanvasGenerator}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
    />
  );
}
