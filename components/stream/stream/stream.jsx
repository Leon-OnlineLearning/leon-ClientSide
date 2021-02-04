/* tslint:disable */

import { forwardRef, useEffect, useRef } from "react";
import Janus from "../../../public/janus/janus";
// import { Janus } from 'janus-gateway';

var server = "/janus_back";

let mixertest = null;
var opaqueId = "audiobridgetest-" + Janus.randomString(12); //FIXME what am i

let Stream = forwardRef(
  (
    {
    setParticipants,
    addParticipants,
    removeParticipants,
    setMyData,
    myData,
    room,
  },ref) =>{

  
  
  let audio_player = useRef(null);

  useEffect(() => {
    console.warn("times")
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
                // tslint:disable-next-line
                Janus.log( 
                  "Plugin attached! (" +
                    mixertest.getPlugin() +
                    ", id=" +
                    mixertest.getId() +
                    ")"
                );
              },
              error: function (error) {
                Janus.error("  -- Error attaching plugin...", error);
                alert("Error attaching plugin... " + error);
              },
              consentDialog: function (on) {
                Janus.debug(
                  "Consent dialog should be " + (on ? "on" : "off") + " now"
                );
              },
              iceState: function (state) {
                Janus.log("ICE state changed to " + state);
              },
              mediaState: function (medium, on) {
                Janus.log(
                  "Janus " +
                    (on ? "started" : "stopped") +
                    " receiving our " +
                    medium
                );
              },
              webrtcState: function (on) {
                Janus.log(
                  "Janus says our WebRTC PeerConnection is " +
                    (on ? "up" : "down") +
                    " now"
                );
              },
              onmessage: function (msg, jsep) {
                console.debug(" ::: Got a message :::", msg);
                var event = msg["audiobridge"];
                Janus.debug("Event: " + event);
                if (event) {
                  if (event === "joined") {
                    // Successfully joined, negotiate WebRTC now
                    if (msg["id"]) {
                      setMyData({ ...myData, id: msg["id"] });
                      Janus.log(
                        "Successfully joined room " +
                          msg["room"] +
                          " with ID " +
                          myData.id
                      );
                      if (!webrtcUp) {
                        webrtcUp = true;
                        // Publish our stream
                        mixertest.createOffer({
                          media: { video: false }, // This is an audio only room
                          success: function (jsep) {
                            Janus.debug("Got SDP!", jsep);
                            var publish = {
                              request: "configure",
                              muted: false,
                            };
                            mixertest.send({ message: publish, jsep: jsep });
                          },
                          error: function (error) {
                            Janus.error("WebRTC error:", error);
                            alert("WebRTC error... " + error.message);
                          },
                        });
                      }
                    }
                    // Any room participant?
                    if (msg["participants"] && (msg["participants"].length > 0)) {
                      var list = msg["participants"];
                      Janus.debug("Got a list of participants:", list);
                      addParticipants(list);
                    }
                  } else if (event === "roomchanged") {
                    // The user switched to a different room
                    setMyData({ ...myData, id: msg["id"] });
                    Janus.log(
                      "Moved to room " + msg["room"] + ", new ID: " + msg["id"]
                    );
                    // Any room participant?
                    if (msg["participants"] && (msg["participants"].length > 0)) {
                      var list = msg["participants"];
                      Janus.debug("Got a list of participants:", list);
                      setParticipants(list);
                    }
                  } else if (event === "destroyed") {
                    // The room has been destroyed
                    Janus.warn("The room has been destroyed!");
                    alert("The room has been destroyed");
                    window.location.reload();
                  } 
                  else if (event === "event") {
                    if (msg["participants"] && (msg["participants"].length > 0)) {
                      
                        var list = msg["participants"];
                        Janus.debug("Got a list of participants:", list);
                        // TODO check when this happen
                      } 
                    else if (msg["error"]) {
                      if (msg["error_code"] === 485) {
                        // This is a "no such room" error: give a more meaningful description
                        Janus.error("audiobridge plug in is not working");
                      } else {
                        alert(msg["error"]);
                      }
                      // return;
                    }
                    // Any new feed to attach to?
                    if (msg["leaving"]) {
                      // One of the participants has gone away?
                      let leaving = msg["leaving"];
                      removeParticipants(leaving);
                      Janus.log(`Participant left: "${leaving}`);
                    }
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
              },
            });
          },
        });
        if (ref != null){ // should always go in
          ref.current = janus
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
}
)
export default Stream;
