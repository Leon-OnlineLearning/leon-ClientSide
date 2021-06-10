
import Janus,{JanusJS} from "../../../public/janus/janus";
import { alert_msgError, alert_pluginError, alert_webrtcError, debug_data, debug_msg, log_iceState, log_mediaState, log_plugAttach, log_webrtcState } from "./callback_logger";




// Just an helper to generate random usernames
function randomString(len) {
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
    	var randomPoz = Math.floor(Math.random() * charSet.length);
    	randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}


export function sendData(handler:JanusJS.PluginHandle,msg:string,roomId:number) {
    
    const message = {
		textroom: "message",
		room: roomId,
        transaction : randomString(12),
 		text: msg,
        ack:false 
	};
    handler.data({
		text: JSON.stringify(message),
		error: Janus.error,
		success: ()=> { Janus.debug(`data sent ${msg}`) }
	});
}


function handleRemoteJsepData(handler: JanusJS.PluginHandle, jsep: JanusJS.JSEP){
    handler.createAnswer(
        {
            jsep: jsep,
            media: { audio: false, video: false, data: true },	// data only
            success: function(jsep) {
                Janus.debug("Got SDP!", jsep);
                var body = { request: "ack" };
                handler.send({ message: body, jsep: jsep });
            },
            error: alert_webrtcError
        });
}

function joinRoomData(handler:JanusJS.PluginHandle,roomId:number,userId:string,userName:string){
    const register = {
        textroom: "join",
        room: roomId,
        transaction: randomString(12),
        username: userId,
        display: userName
    }
    handler.data({
        text: JSON.stringify(register),
        error: Janus.error
                    
    })
}


export function joinRoom(janusSession:Janus,roomId:number,userId:string,userName:string,setData){
    
    let dataHandler
    
    return new Promise<JanusJS.PluginHandle>((resolve,reject)=>{
        janusSession.attach({
            plugin: "janus.plugin.textroom",
            success: (handler)=>{
                log_plugAttach(handler)
                dataHandler = handler
                // setup channel
                var body = { request: "setup" };
                Janus.debug("Sending message:", body);
                dataHandler.send({ message: body });
                
                resolve(handler)
            },
            error: alert_pluginError,
            iceState: log_iceState,
            mediaState: log_mediaState,
            webrtcState: log_webrtcState,
            onmessage: (msg,jsep) =>{
                if (msg){
                    debug_msg(msg, msg['textroom'])
                    if(msg["error"]) {
                        alert(msg["error"]);
                    }
                }
                if(jsep){
                    console.debug(dataHandler)
                    handleRemoteJsepData(dataHandler,jsep)
                }
            },
            ondataopen: ()=>{
                Janus.log("The DataChannel is available!")
                // register in room
                joinRoomData(dataHandler,roomId,userId,userName)
                
            },
            ondata: (data)=>{
                debug_data(data)
                const data_json = JSON.parse(data)
                setData(data_json["text"])
                console.debug("the text" + data_json["text"])
            },
            oncleanup: () =>Janus.log(" ::: Got a cleanup notification :::")
        })
    })
}