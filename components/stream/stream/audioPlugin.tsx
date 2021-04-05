import { useEffect, useRef, useState } from "react";

import Janus from "../../../public/janus/janus";
import { alert_msgError, alert_pluginError, alert_roomDestroy, debug_msg, log_consentDialog, log_iceState, log_joining, log_mediaState, log_plugAttach, log_roomChange, log_webrtcState } from "./callback_logger";
import { handleParticipants, publishMyAudioStream } from "./utils";
import { callControls_stream, participantInfo_stream } from "./stream_manager"
import { addToList, removeFromListUsingId } from "./StateMutation";

export default function attachAudio(props: callControls_stream & { janus: Janus } & participantInfo_stream) {

    const audioHandler = useRef(null)

    const [controlMsg, setControlMsg] = useState({});
    const [controlJsep, setControlJsep] = useState({});

    const [webrtcUp, setWebrtcUp] = useState(false);


    // handle message effect
    useEffect(() => {
        if (audioHandler.current) {

            let msg = controlMsg
            var event = msg["audiobridge"];


            if (event) {
                // this event would fire when me or other participants join the call
                if (event === "joined") {
                    // Successfully joined, negotiate WebRTC now
                    if (msg["id"]) {
                        // setMyData({ ...myData, id: msg["id"] });
                        log_joining(msg);
                        if (!webrtcUp) {
                            setWebrtcUp(true);
                            publishMyAudioStream(audioHandler.current);
                        }
                    }
                    handleParticipants(msg, (partc) => addToList(partc, props.setParticipants));
                } else if (event === "roomchanged") {
                    // The user switched to a different room
                    //   setMyData({ ...myData, id: msg["id"] });
                    log_roomChange(msg);
                    handleParticipants(msg, props.setParticipants);
                } else if (event === "destroyed") {
                    alert_roomDestroy();
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
                    const partc = msg["leaving"]
                    removeFromListUsingId(partc, props.setParticipants)

                    Janus.log(`Participant left: "${msg["leaving"]}`);
                }
            }
        }
    }
        , [controlMsg]);

    // handle jsep effect
    useEffect(() => {
        if (audioHandler.current) {
            audioHandler.current.handleRemoteJsep({ jsep: controlJsep });
        }
    }, [controlJsep])

    // send response to start call
    useEffect(() => {
        if (audioHandler.current) {
            var register = { request: "join", room: props.room, display: props.userName };
            audioHandler.current.send({ message: register });
        }
    }, [props.startCall])


    useEffect(() => {
        props.janus.attach({
            plugin: "janus.plugin.audiobridge",
            success: function (pluginHandle) {
                audioHandler.current = pluginHandle;
                props.setIsReadyToJoin(true);
                log_plugAttach(audioHandler.current);
            },
            error: alert_pluginError,
            consentDialog: log_consentDialog,
            iceState: log_iceState,
            mediaState: log_mediaState,
            webrtcState: log_webrtcState,
            onmessage: function (msg, jsep) {
                //so we can use the updated refrance in effect
                if (msg) {
                    // debug msg and event
                    debug_msg(msg, msg['audiobridge']);
                    setControlMsg(msg)
                }
                if (jsep) {
                    Janus.debug("Handling SDP as well...", jsep);
                    setControlJsep(jsep)
                }
            },
            onlocalstream: function (stream) {
                Janus.debug(" ::: Got a local stream :::", stream);
                // TODO unmute button
            },
            onremotestream: function (stream) {
                Janus.attachMediaStream(props.audioSourceDevice, stream);
            },
            oncleanup: function () {
                setWebrtcUp(false);
                Janus.log(" ::: Got a cleanup notification :::");
            },
        });
    }, [])


    return <div style={{ display: 'None' }} />


}