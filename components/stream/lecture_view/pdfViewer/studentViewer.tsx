
import Pointer_canvas from './pointer_canvas';
import { useState } from 'react';
import dynamic from 'next/dynamic';
const PdfViewer = dynamic(
  () => import('./viewerload'),
  { ssr: false }
)


export default function StudentViewer({pointerPositionX,pointerPositionY,pageNumber,
  setPageNumber}){
    
    let pointerCanvas = (viewer_hieght,viewer_width) => (
         <Pointer_canvas
        height={viewer_hieght}
        width={viewer_width}
        pointerX={pointerPositionX}
        pointerY={pointerPositionY}
      />
    )

    return <PdfViewer onMouseMove={null} pointerCanvasGenerator={pointerCanvas}
    pageNumber={pageNumber}
    setPageNumber={setPageNumber}/>
}