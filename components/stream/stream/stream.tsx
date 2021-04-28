import { forwardRef, useEffect, useRef, useState } from 'react';
import Janus from "../../../public/janus/janus";
import {
  alert_pluginError,
  log_consentDialog,
  log_iceState,
  log_mediaState,
  log_webrtcState,
  log_plugAttach,
  debug_msg,
  log_joining,
  log_roomChange,
  alert_roomDestroy,
  alert_msgError,
} from "./callback_logger";
import {
  handleParticipants,
  handleRemoteFeed,
  publishMyAudioStream,
} from "./utils";
// import { Janus } from 'janus-gateway';
import { publishOwnFeed } from './utils';

var server = "/janus_back";

let mixertest = null;
var opaqueId = "audiobridgetest-" + Janus.randomString(12); //FIXME what am i
let private_id= null;



/**
 * @deprecated
 * @returns 
 */
let Stream = (
  {
    setParticipants,
    addParticipants,
    removeParticipants,
    setMyData,
    myData,
    room,
    pointerX = 50,
    pointerY = 50,
    setPointerPositionX = null,
    setPointerPositionY = null,
    enableAudio = true,
    enableDataSend = false,
    enableDataRecv = false,
    pageNumber = 1,
    setPageNumber = null
  },
  ref
) => {
  let audio_player = useRef(null);
  let sfuRef = useRef(null);

  useEffect(() => {
    let webrtcUp = false;

    Janus.init({
      debug: true,
      callback: function () {
        if (!Janus.isWebrtcSupported()) {
          alert("No WebRTC support... ");
          return;
        }
        let janus = new Janus({
          server: server,
          success: function () {
            // Attach to AudioBridge plugin
            if (enableAudio){
              // TODO move this to seprate file
              janus.attach({
                plugin: "janus.plugin.audiobridge",
                opaqueId: opaqueId,
                success: function (pluginHandle) {
                  mixertest = pluginHandle;
                  log_plugAttach(mixertest);
                },
                error: alert_pluginError,
                consentDialog: log_consentDialog,
                iceState: log_iceState,
                mediaState: log_mediaState,
                webrtcState: log_webrtcState,
                onmessage: function (msg, jsep) {
                  debug_msg(msg,msg['audiobridge']);
                  var event = msg["audiobridge"];
                  if (event) {
                    // this event would fire when me or other participants join the call
                    if (event === "joined") {
                      // Successfully joined, negotiate WebRTC now
                      if (msg["id"]) {
                        setMyData({ ...myData, id: msg["id"] });
                        log_joining(msg);
                        if (!webrtcUp) {
                          webrtcUp = true;
                          publishMyAudioStream(mixertest);
                        }
                      }
                      handleParticipants(msg, addParticipants);
                    } else if (event === "roomchanged") {
                      // The user switched to a different room
                      setMyData({ ...myData, id: msg["id"] });
                      log_roomChange(msg);
                      handleParticipants(msg, setParticipants);
                    } else if (event === "destroyed") {
                      // The room has been destroyed
                      alert_roomDestroy();
                      window.location.reload();
                    } else if (event === "event") {
                      // no need for update they already added at join event
                      // handleParticipants(msg, addParticipants);
                      // TODO check when this happen
                    } else if (msg["error"]) {
                      alert_msgError(msg);
                      // return;
                    }
                    if (msg["leaving"]) {
                      // One of the participants has gone away?
                      removeParticipants(msg["leaving"]);
                      Janus.log(`Participant left: "${msg["leaving"]}`);
                    }
                  }
                  if (jsep) {
                    Janus.debug("Handling SDP as well...", jsep);
                    mixertest.handleRemoteJsep({ jsep: jsep });
                  }
                },
                onlocalstream: function (stream) {
                  Janus.debug(" ::: Got a local stream :::", stream);
                  // TODO unmute button
                },
                onremotestream: function (stream) {
                  Janus.attachMediaStream(audio_player.current, stream);
                },
                oncleanup: function () {
                  webrtcUp = false;
                  Janus.log(" ::: Got a cleanup notification :::");
                  // TODO update ui
                },
              });
            }

            if (enableDataSend || enableDataRecv) {
              // attach to vedio room to send data or screen share if needed
              let sfutest;
              janus.attach(
                {
                  plugin: "janus.plugin.videoroom",
                  // opaqueId: opaqueId
                  success: (pluginHandle)=>{
                    sfuRef.current = pluginHandle;
                    sfutest = pluginHandle
                    log_plugAttach(pluginHandle)
                  },
                  error: alert_pluginError,
                  consentDialog: log_consentDialog,
                  iceState: log_iceState,
                  mediaState: log_mediaState,
                  webrtcState: log_webrtcState, 
                  onmessage: (msg, jsep)=>{
                    debug_msg(msg,msg['videoroom']);

                    let event = msg["videoroom"];
                    if (event){
                      switch (event) {
                        case "joined":
                          log_joining(msg);
                          private_id = msg["private_id"];
                          if(enableDataSend){
                            publishOwnFeed(sfutest);
                          }
                          if (enableDataRecv){
                            handleRemoteFeed(janus, msg, private_id,room,
                              setPointerPositionX,setPointerPositionY,setPageNumber);
                          }
                          break;
                        case "destroyed":
                          alert_roomDestroy();
                          window.location.reload();
                          break;
                        case "event":
                          if (enableDataRecv){
                            handleRemoteFeed(janus, msg, private_id,room,
                              setPointerPositionX,setPointerPositionY,setPageNumber);
                          }
                          if(msg["leaving"]){
                            Janus.log(`Participant left: "${msg["leaving"]}`);
                          }
                          else if (msg["unpublished"]){
                            Janus.log(`Participant left: "${msg["leaving"]}`);
                            // TODO hangup if no publishers left
                          }
                          else if (msg["error"]){
                            alert_msgError(msg)
                          }
                          break;
                        default:
                          break;
                      }
                    }
                    if (jsep){
                      Janus.debug("Handling SDP as well...", jsep);
                      sfutest.handleRemoteJsep({ jsep: jsep });
                    }

                  },
                  oncleanup: ()=>{
                    Janus.log(" ::: Got a cleanup notification: we are unpublished now :::");
                  }
                }
              )
            }
          },
          error: (error) => {
						Janus.error(error);
            // window.location.reload();

          }
        });
        if (ref != null) {
          // should always go in
          ref.current = janus;
        }
      },
    });
  }, []);

  function register() {
    var register = { request: "join", room: room, display: myData.name };
    mixertest.send({ message: register });
  }

  function register_data(){
    var register = {request: "join", room: room,ptype:"publisher", display: myData.name}
    sfuRef.current.send({message: register})
  }

  useEffect(() => {
    if (sfuRef.current !== null && enableDataSend){
      send_data(`${pointerX},${pointerY}`)

    }
  },[pointerX,pointerY])
  

  useEffect(() => {
    if (sfuRef.current !== null && enableDataSend){
      send_data(`${pageNumber}`)
    }
  },[pageNumber])
  
  function send_data(data){

    sfuRef.current.data({
      text:data,
      // label:"test",
      success: ()=>{
        Janus.log("data sent")
      },
      error: (error)=>{
        Janus.error("connont send data")
      }
    }
      )
  }
  return (
    <div>
      {enableAudio && <button onClick={register}>register</button>}
      {(enableDataRecv || enableDataSend)&& <button onClick={register_data}>register data</button>}
      {enableDataSend && <button onClick={send_data}>send something</button>}

      <audio className="rounded centered" ref={audio_player} autoPlay />
    </div>
  );
};

export default forwardRef(Stream);
