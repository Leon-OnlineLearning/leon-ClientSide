// depracated mean for testing only


import React from 'react';

import dynamic from 'next/dynamic';

const PdfViewer = dynamic(
  () => import('../../components/stream/viewer/viewerload'),
  { ssr: false }
);

export default function MyApp() {
  // return <PdfViewer onMouseMove={(()=>{})} pointerCanvasGenerator={null}/>
  return <h1>temp</h1>

}