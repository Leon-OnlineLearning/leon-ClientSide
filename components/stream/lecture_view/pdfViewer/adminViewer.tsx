import dynamic from "next/dynamic";
import Pointer_canvas from "./pointer_canvas";
const PdfViewer = dynamic(
  () => import('./viewerload'),
  { ssr: false }
)


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
    setPointerPositionX(Math.floor(e.clientX - viewerRect.x));
    setPointerPositionY(Math.floor(e.clientY - viewerRect.y));
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
