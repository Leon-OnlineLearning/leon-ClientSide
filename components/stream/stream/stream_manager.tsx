import { useEffect, useRef } from "react";

import Janus from "../../../public/janus/janus";


// TODO use variable from env
const server = "/janus_back";


interface sessionState_stream {
    setIsJanusConnected:CallableFunction
    isJanusConnected:boolean
}

interface callControls_stream {
    setIsReadyToJoin:CallableFunction,
    endCall:boolean,
    setEndCall:CallableFunction,
    muteAudio:boolean,
    setMuteAudio:CallableFunction,
    audioSourceDevice:string,
}

interface dataControl_stream {
    dataToSend:string,
    setDataRecived:(data:string) => void
}


/**
 * the main plugable component for stream 
 * this will manage the session by initiating it and pass it
 * ot audio and data childs
 */
export default function StreamManager(props : callControls_stream & dataControl_stream & sessionState_stream){
    
    const jan = useRef<Janus|null>()

    useEffect(() => {
      Janus.init({
        debug: true,
      });
  
      jan.current = new Janus({
        server: server,
        success: () => { props.setIsJanusConnected(true) },
        error: Janus.error,
      })
  
    }, [])
  
  
    
    // we must wait the session connection whitch implies the jan object 
    // has been initialized otherwise jan would have null current 
    // because of hooks asyncronouse nature
    return (
        <>
        {props.isJanusConnected && <>
            <h1>the audio plugin</h1>
            <h2>the data plugin</h2> 
            </> 
            }
        </>
    )
}