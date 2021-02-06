import Janus from "../../../public/janus/janus";


import { alert_pluginError, log_plugAttach, log_iceState, log_webrtcState, debug_msg, log_mediaState, alert_webrtcError } from './callback_logger';
import { subscribeToFeed } from './videoRoomUtils';
export function newRemoteFeed(janus, id, display, audio, video, private_id, room_id,setPointerPositionX,setPointerPositionY,setPageNumber){
    let remoteFeed = null
    janus.attach({
        plugin: "janus.plugin.videoroom",
        // opaqueId: opaqueId
        success: (plugin)=>{
            remoteFeed = plugin
            log_plugAttach(remoteFeed)
            subscribeToFeed(remoteFeed, private_id,id,room_id)
        },
        error: alert_pluginError,
        iceState: log_iceState,
        onmessage: (msg,jsep)=>{
            debug_msg(msg,msg['videoroom']);
            if (jsep){
                Janus.debug("Handling SDP as well...", jsep);
                remoteFeed.createAnswer(
                    {
                        jsep: jsep,
                        media: { audioSend: false, videoSend: false , data:true },// TODO we may need to ignore audio and video data
                        success: (jsep)=>{
                            Janus.debug("Got SDP!", jsep);
                            let body = { request: "start", room: room_id };
                            remoteFeed.send({ message: body, jsep: jsep });
                        },
                        error: alert_webrtcError
                    }
                )

            }

        },
        webrtcState: log_webrtcState, 
        mediaState: log_mediaState,

        onremotestream: (stream)=>{
            Janus.debug("Remote feed #" + remoteFeed.rfindex + ", stream:", stream);
        },
        oncleanup: ()=>{
            Janus.log(" ::: Got a cleanup notification (remote feed " + id + ") :::");
        },
        ondata:(data,label)=>{
            Janus.log(`got data: ${JSON.stringify(data)} and label ${label}`);
            console.warn("a remote message");
            // TODO use better approach to check messages
            if (data.indexOf(",") > -1){
                let [x,y] = data.split(",")
                setPointerPositionX(x)
                setPointerPositionY(y)
            }
            else{ 
                setPageNumber(parseInt(data))
            }
            
        },
        ondataopen:(data,label)=>{
            Janus.log(`got data: ${JSON.stringify(data)} and label ${label}`);
            console.warn("a remote message");

        },

        
    })

}
