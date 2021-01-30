import React, { useMemo, useState } from "react";

import {Document, Page} from 'react-pdf/dist/esm/entry.webpack'


import { useEffect } from "react";


export default function PdfViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [tall, setTall] = useState(0);
  useEffect(() => {
    setTall(window.innerHeight);
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
          className="d-inline-flex"
          pageNumber={pageNumber}
          height={0.9 * tall}
          onGetTextError={onGetTextError}
          renderTextLayer={true}

        />
      </Document>
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
