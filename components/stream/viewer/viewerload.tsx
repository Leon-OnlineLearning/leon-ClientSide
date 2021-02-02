import React, { useState } from "react";

import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

import { useEffect, useRef } from "react";
import Pointer_canvas from './pointer_canvas';

export default function PdfViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [tall, setTall] = useState(0);
  const [viewer_width, setWidthViewer] = useState(0);
  const [pdfPageX, setPdfPageX] = useState(0);
  const [pdfPageY, setPdfPageY] = useState(0);
  const [pointerPositionX, setPointerPositionX] = useState(100)
  const [pointerPositionY, setPointerPositionY] = useState(100)

  const pageViewerRef = useRef(null);

  function initCanvas(){
    const viewerRect = pageViewerRef.current.getBoundingClientRect();
    setCanvasWidth(viewerRect)
    setPdfPageX(pageViewerRef.current.offsetLeft)
    setPdfPageY(pageViewerRef.current.offsetY)

    window.onmousemove = (e) => {
      const viewerRect = pageViewerRef.current.getBoundingClientRect();
      setPointerPositionX(e.clientX - viewerRect.x)
      setPointerPositionY(e.clientY - viewerRect.y)
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
    <div className="p-5">
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
        // @ts-expect-error: Let's ignore a single compiler error like this unreachable code 
          canvasRef={pageViewerRef}
          onLoadSuccess={initCanvas}
          className="d-inline-flex"
          pageNumber={pageNumber}
          height={tall}
          onGetTextError={onGetTextError}
          renderTextLayer={true}
        />
      <Pointer_canvas
        height={tall}
        width={viewer_width}
        pointerX={pointerPositionX}
        pointerY={pointerPositionY}

      />
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
