import React, { useEffect, useRef, useState } from "react";

import Janus from "../../../public/janus/janus";
import AudioPlugin from "./audioPlugin";
import { callControls_stream } from "./audioPlugin"
import DataPlugin from "./dataPlugin";

// TODO use variable from env
const server = "/janus_back";


export interface participantInfo_stream {
  room: number
  userName: string
}


export interface dataControl_stream {
  dataToSend: string,
  setDataRecived: (data: string) => void
}


/**
 * the main component for stream
 * this will manage the session by initiating it and pass it
 * to audio and data childs
 */
export default function StreamManager(props: callControls_stream & dataControl_stream & participantInfo_stream) {

  const [isJanusConnected,setIsJanusConnected] = useState(false);
  const jan = useRef<Janus | null>()

  useEffect(() => {
    Janus.init({
      debug: true,
    });

    jan.current = new Janus({
      server: server,
      success: () => { setIsJanusConnected(true) },
      error: Janus.error,
    })

  }, [])



  // we must wait the session connection whitch implies the jan object 
  // has been initialized otherwise jan would have null current 
  // because of hooks asyncronouse nature
  return (
    <>
      {isJanusConnected && 
      <>
        <AudioPlugin
          {...props}
          janus={jan.current}
        />
        
        <DataPlugin
          {...props}
          janus={jan.current}
          />  
      </>
      }
    </>
  )
}