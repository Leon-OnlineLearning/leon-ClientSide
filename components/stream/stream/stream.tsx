import { forwardRef, useEffect, useRef } from "react";
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
  HasParticipants,
  publishMyAudioStream,
} from "./utils";
// import { Janus } from 'janus-gateway';

var server = "/janus_back";

let mixertest = null;
var opaqueId = "audiobridgetest-" + Janus.randomString(12); //FIXME what am i

let Stream = (
  {
    setParticipants,
    addParticipants,
    removeParticipants,
    setMyData,
    myData,
    room,
    extendCall,
    // isMaster,
  },
  ref
) => {
  let audio_player = useRef(null);

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
                debug_msg(msg);
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

            if (extendCall) {
              // janus.attach()
            }
          },
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
  return (
    <div>
      <button onClick={register}>register</button>
      <audio className="rounded centered" ref={audio_player} autoPlay />
    </div>
  );
};

export default forwardRef(Stream);
