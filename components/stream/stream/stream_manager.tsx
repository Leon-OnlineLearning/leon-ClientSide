import { useEffect, useRef } from "react";

import Janus from "../../../public/janus/janus";
import AudioPlugin from "./audioPlugin";


// TODO use variable from env
const server = "/janus_back";


export interface sessionState_stream {
  setIsJanusConnected: CallableFunction
  isJanusConnected: boolean
}

export interface participantInfo_stream {
  room: string
  userName: string
}


export interface callControls_stream {
  setIsReadyToJoin: CallableFunction,
  startCall: boolean,
  endCall: boolean,
  setEndCall: CallableFunction,
  muteAudio: boolean,
  setMuteAudio: CallableFunction,
  audioSourceDevice: HTMLMediaElement,
  setParticipants: CallableFunction
}

interface dataControl_stream {
  dataToSend: string,
  setDataRecived: (data: string) => void
}


/**
 * the main component for stream
 * this will manage the session by initiating it and pass it
 * to audio and data childs
 */
export default function StreamManager(props: callControls_stream & dataControl_stream & sessionState_stream & participantInfo_stream) {

  const jan = useRef<Janus | null>()

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
        <AudioPlugin
          {...props}
          janus={jan.current}
        />
        {/* <h2>the data plugin</h2>  */}
      </>
      }
    </>
  )
}