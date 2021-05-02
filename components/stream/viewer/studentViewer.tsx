import PdfViewer from "./viewerload";
import Pointer_canvas from './pointer_canvas';
import { useState } from 'react';

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