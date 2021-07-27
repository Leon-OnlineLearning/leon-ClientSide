import React, { useState } from "react";

import { Document, Page , pdfjs} from "react-pdf/dist/esm/entry.webpack";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import { useEffect, useRef, useMemo } from 'react';

export default function PdfViewer({onMouseMove,pointerCanvasGenerator,pageNumber,
  setPageNumber}) {
  const [numPages, setNumPages] = useState(null);

  const [tall, setTall] = useState(0);
  const [viewer_width, setWidthViewer] = useState(0);
  

  let drawwen_canvas = pointerCanvasGenerator && pointerCanvasGenerator(tall,viewer_width)      
  const pageViewerRef = useRef(null);

  function initCanvas(){
    if (pageViewerRef.current !== null){
      const viewerRect = pageViewerRef.current.getBoundingClientRect();
      setCanvasWidth(viewerRect)
      if (onMouseMove!==null){
        window.onmousemove = onMouseMove(pageViewerRef.current)
  
      }
    }
  }


  function setCanvasWidth(viewerRect) {
    // this only set width for pointer canvas 
      setWidthViewer(viewerRect.right - viewerRect.left);
  }
  function setHeight(){
    // height applied to pdf and canvas and Elements
    setTall(0.9 * window.innerHeight); //0.9 height relative to window  window
  }


  //this should only fire once in load 
  useEffect(() => {
    
    setHeight()
    // update the canvas with page resize
    window.onresize = () => {
      setHeight()
      initCanvas();
    }
  }, []);


  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }


  function onGetTextError(error) {
    alert(error);
  }

  return (
    <div className="p-1">
      <Document
        options={
          {
            // cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
            // cMapPacked: true,
            // maxImageSize:100
          }
        }
        file="/test.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <div id="drawContainer" style={{position: "relative"}}>
        <Page
        // @ts-expect-error: canvas refrance isnot added to types yet 
          canvasRef={pageViewerRef}
          onLoadSuccess={initCanvas}
          className="d-inline-flex"
          pageNumber={pageNumber}
          height={tall}
          onGetTextError={onGetTextError}
          renderTextLayer={true}
        />
        {drawwen_canvas}
      </div>
      </Document>
      {/* TODO add navigation in top of page viewer */}
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
