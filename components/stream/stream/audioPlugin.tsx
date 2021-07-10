import { useEffect, useRef, useState } from "react";

import Janus,{JanusJS} from "../../../public/janus/janus";
import { alert_msgError, alert_pluginError, alert_roomDestroy, debug_msg, log_consentDialog, log_iceState, log_joining, log_mediaState, log_plugAttach, log_roomChange, log_webrtcState } from "./callback_logger";
import { handleParticipants, publishMyAudioStream } from "./audioRoomUtils";
import { participantInfo_stream } from "./stream_manager"
import { addToList, removeFromListUsingId } from "./StateMutation";

export interface callControls_stream {
    setIsReadyToJoin: CallableFunction,
    muteRemote: boolean,
    muteLocal: boolean,
    setParticipants: CallableFunction
}

/**
 * sequence of operation
 *  [ without use interaction ]
 * 1. attach audio plugin
 * 2. regester in specified room 
 * 3. negoiate audio stream
 * 4. attach remote stream to audioplayer
 * 5. send our stream muted 
 *  [ with user interaction ]
 * play remote stream (props.muteRemote) //TODO unimplemented
 * user can unmute local stream (props.muteLocal)
 */
export default function AudioPlugin(props: callControls_stream & { janus: Janus } & participantInfo_stream) {

    const audioHandler = useRef(null)
    const audioSourceDeviceRef = useRef(null)
    const [webrtcUp, setWebrtcUp] = useState(false);

    // mute or unmute our stream
    useEffect(() => {
        if (audioHandler.current) {
            props.muteLocal ? audioHandler.current.muteAudio() : audioHandler.current.unmuteAudio()
        }
    }, [props.muteLocal])
    
    /**
     * handle messages from the remote plugin as following
     * 
     * event --> action
     * a joining response --> [log, setweprtcup, send own audio,set participants]
     * room change --> [log,set participants] //this SHOULD NOT  happen
     * room destroied --> [send alert] // TODO handle UI and redirect user
     * 
     * error msg --> [log] //TODO check expected errors
     * participant left --> [log,update participants]
     * 
     * REVIEW to read updates in any state variable such as `webrtcup` we need to
     *  make this outside init effect otherwise it doesn't update
     * as it use the one passed at onInit effect
     */
    function handleControlMsgAudio(handler : JanusJS.PluginHandle, msg: JanusJS.Message) {
        var event = msg["audiobridge"];

        if (event) {
            // this event would fire when me or other participants join the call
            if (event === "joined") {
                // Successfully joined, negotiate WebRTC now
                // REVIEW  if the message will have id only once at
                // joining then we don't need to check if it's first time
                if (msg["id"]) {
                    // REVIEW  do we need this id
                    // setMyData({ ...myData, id_audio: msg["id"] });
                    log_joining(msg);
                    if (!webrtcUp) {
                        setWebrtcUp(true);
                        publishMyAudioStream(handler);
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
                router.push('/')
                // TODO go to end lecture page
            } else if (event === "event") {
                Janus.log(msg)
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

    /**
     * onInit
     */
    useEffect(() => {
        props.janus.attach({
            plugin: "janus.plugin.audiobridge",
            success: function (pluginHandle) {
                // send join request to room
                audioHandler.current = pluginHandle;
                props.setIsReadyToJoin(true);
                log_plugAttach(audioHandler.current);
                var register = { request: "join", room: props.room, display: props.userName };
                audioHandler.current.send({ message: register });
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
                    handleControlMsgAudio(audioHandler.current, msg)
                }
                if (jsep) {
                    Janus.debug("Handling SDP as well...", jsep);
                    console.log(audioHandler.current)
                    audioHandler.current.handleRemoteJsep({ jsep: jsep });
                }
            },
            onlocalstream: function (stream) {
                Janus.debug(" ::: Got a local stream :::", stream);
                if (props.muteLocal) {
                    audioHandler.current.muteAudio()
                }
                // TODO unmute button
            },
            onremotestream: function (stream) {
                Janus.attachMediaStream(audioSourceDeviceRef.current, stream);
            },
            oncleanup: function () {
                setWebrtcUp(false);
                Janus.log(" ::: Got a cleanup notification :::");
            },
        });
    }, [])


    return <audio ref={audioSourceDeviceRef} autoPlay />


}