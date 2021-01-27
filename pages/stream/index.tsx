import { useEffect, useState, useRef } from 'react';
// var Janus = require("../../public/janus/janus.js")
import Janus from "../../public/janus/janus.js";
var server = '/janus_back'

var myroom = 1234;	// TODO get this from query 
var webrtcUp = false;
var audioenabled = false;


let mixertest = null;
let myid = null

var opaqueId = "audiobridgetest-"+Janus.randomString(12); //FIXME what am i

export default function Stream(){
 
    let audio_player = useRef(null)
 
    useEffect(()=>{
     
    Janus.init({debug: "all",callback: function(){
        if(!Janus.isWebrtcSupported()) {
            alert("No WebRTC support... ");
            return;
        }
        let janus = new Janus(
            {
                server: server,
                success: function() {
                    // Attach to AudioBridge plugin
                    janus.attach(
                        {
                            plugin: "janus.plugin.audiobridge",
                            opaqueId: opaqueId,
                            success: function(pluginHandle) {
                                
                                mixertest = pluginHandle;
                                Janus.log("Plugin attached! (" + mixertest.getPlugin() + ", id=" + mixertest.getId() + ")");

                            },
                            error: function(error) {
                                Janus.error("  -- Error attaching plugin...", error);
                                alert("Error attaching plugin... " + error);
                            },
                            consentDialog: function(on) {
                                Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");
                            },
                            iceState: function(state) {
                                Janus.log("ICE state changed to " + state);
                            },
                            mediaState: function(medium, on) {
                                Janus.log("Janus " + (on ? "started" : "stopped") + " receiving our " + medium);
                            },
                            webrtcState: function(on) {
                                Janus.log("Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now");
                            },
                            onmessage: function(msg, jsep) {
                                Janus.debug(" ::: Got a message :::", msg);
                                var event = msg["audiobridge"];
                                Janus.debug("Event: " + event);
                                if(event) {
                                    if(event === "joined") {
                                        // Successfully joined, negotiate WebRTC now
                                        if(msg["id"]) {
                                            myid = msg["id"];
                                            Janus.log("Successfully joined room " + msg["room"] + " with ID " + myid);
                                            if(!webrtcUp) {
                                                webrtcUp = true;
                                                // Publish our stream
                                                mixertest.createOffer(
                                                    {
                                                        media: { video: false},	// This is an audio only room
                                                        success: function(jsep) {
                                                            Janus.debug("Got SDP!", jsep);
                                                            var publish = { request: "configure", muted: false };
                                                            mixertest.send({ message: publish, jsep: jsep });
                                                        },
                                                        error: function(error) {
                                                            Janus.error("WebRTC error:", error);
                                                            alert("WebRTC error... " + error.message);
                                                        }
                                                    });
                                            }
                                        }
                                        // Any room participant?
                                        if(msg["participants"]) {
                                            var list = msg["participants"];
                                            Janus.debug("Got a list of participants:", list);
                                            for(var f in list) {
                                                var id = list[f]["id"];
                                                var display = list[f]["display"];
                                                var setup = list[f]["setup"];
                                                var muted = list[f]["muted"];
                                                Janus.debug("  >> [" + id + "] " + display + " (setup=" + setup + ", muted=" + muted + ")");
                                                // TODO show participant
                                            }
                                        }
                                    } else if(event === "roomchanged") {
                                        // The user switched to a different room
                                        myid = msg["id"];
                                        Janus.log("Moved to room " + msg["room"] + ", new ID: " + myid);
                                        // Any room participant?
                                        if(msg["participants"]) {
                                            var list = msg["participants"];
                                            Janus.debug("Got a list of participants:", list);
                                            for(var f in list) {
                                                var id = list[f]["id"];
                                                var display = list[f]["display"];
                                                var setup = list[f]["setup"];
                                                var muted = list[f]["muted"];
                                                Janus.debug("  >> [" + id + "] " + display + " (setup=" + setup + ", muted=" + muted + ")");
                                                // TODO add participants
                                            }
                                        }
                                    } else if(event === "destroyed") {
                                        // The room has been destroyed
                                        Janus.warn("The room has been destroyed!");
                                        alert("The room has been destroyed")
                                        window.location.reload();
                                        
                                    } else if(event === "event") {
                                        if(msg["participants"]) {
                                            var list = msg["participants"];
                                            Janus.debug("Got a list of participants:", list);
                                            for(var f in list) {
                                                var id = list[f]["id"];
                                                var display = list[f]["display"];
                                                var setup = list[f]["setup"];
                                                var muted = list[f]["muted"];
                                                Janus.debug("  >> [" + id + "] " + display + " (setup=" + setup + ", muted=" + muted + ")");
                                                // TODO show participants
                                            }
                                        } else if(msg["error"]) {
                                            if(msg["error_code"] === 485) {
                                                // This is a "no such room" error: give a more meaningful description
                                                alert(
                                                    "<p>Apparently room <code>" + myroom + "</code> (the one this demo uses as a test room) " +
                                                    "does not exist...</p><p>Do you have an updated <code>janus.plugin.audiobridge.jcfg</code> " +
                                                    "configuration file? If not, make sure you copy the details of room <code>" + myroom + "</code> " +
                                                    "from that sample in your current configuration file, then restart Janus and try again."
                                                );
                                            } else {
                                                alert(msg["error"]);
                                            }
                                            return;
                                        }
                                        // Any new feed to attach to?
                                        if(msg["leaving"]) {
                                            // One of the participants has gone away?
                                            var leaving = msg["leaving"];
                                            Janus.log("Participant left: " + leaving + " (we have " + " elements with ID #rp" +leaving + ")");
                                        }
                                    }
                                }
                                if(jsep) {
                                    Janus.debug("Handling SDP as well...", jsep);
                                    mixertest.handleRemoteJsep({ jsep: jsep });
                                }
                            },
                            onlocalstream: function(stream) {
                                Janus.debug(" ::: Got a local stream :::", stream);
                                // TODO unmute button
                            },
                            onremotestream: function(stream) {
                                Janus.attachMediaStream(audio_player.current, stream);
                            },
                            oncleanup: function() {
                                webrtcUp = false;
                                Janus.log(" ::: Got a cleanup notification :::");
                            }
                        });
                },
                error: function(error) {
                    Janus.error(error);
                    alert(error)
                    window.location.reload();
                },
                destroyed: function() {
                    window.location.reload();
                }
            }
        );
    }})
 },[])



 function regester(){
    let name = prompt("name")
    var register = { request: "join", room: myroom, display: name };
    mixertest.send({ message: register});
 }

 
 return (<div>
     <button onClick={regester}>regester</button>
     <audio className="rounded centered" id="roomaudio" ref={audio_player} autoPlay/>
 </div>)
}
