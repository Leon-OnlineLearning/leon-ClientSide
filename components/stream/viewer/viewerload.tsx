import React, { useMemo, useState } from "react";

import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

import { useEffect, useRef } from "react";
import Pointer_canvas from './pointer_canvas';

export default function PdfViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [tall, setTall] = useState(0);
  const [viewer_width, setWidthViewer] = useState(0);
  const [pageX, setPageX] = useState(0);
  const [pageY, setPageY] = useState(0);
  const [pointerPositionX, setPointerPositionX] = useState(100)
  const [pointerPositionY, setPointerPositionY] = useState(100)

  const pageViewerRef = useRef(null);
  // if (typeof window !== "undefined"){
  // }

  function setCanvasPosition(e) {
    const viewerRect = pageViewerRef.current.getBoundingClientRect();

    setPageX(viewerRect.left);
    setPageY(viewerRect.top);
    setWidthViewer(viewerRect.right - viewerRect.left);
  }
  useEffect(() => {
    setTall(0.9 * window.innerHeight); //0.9 height relative to window
    window.onresize = () => setTall(0.9 * window.innerHeight);
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

  function highlightPattern(text, pattern) {
    const splitText = text.split(pattern);

    if (splitText.length <= 1) {
      return text;
    }

    const matches = text.match(pattern);

    return splitText.reduce(
      (arr, element, index) =>
        matches[index]
          ? [...arr, element, <mark key={index}>{matches[index]}</mark>]
          : [...arr, element],
      []
    );
  }

  function onGetTextError(error) {
    alert(error);
  }

  return (
    <div>
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
        // renderMode="svg"
      >
        <Page
          inputRef={pageViewerRef}
          onLoadSuccess={setCanvasPosition}
          className="d-inline-flex"
          pageNumber={pageNumber}
          height={tall}
          onGetTextError={onGetTextError}
          renderTextLayer={true}
        />
      </Document>
      <Pointer_canvas
        height={tall}
        width={viewer_width}
        top={pageX}
        left={pageY}
        pointerX={pointerPositionX}
        pointerY={pointerPositionY}

      />
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
