import { useEffect, useRef } from "react";
import Janus from "../../../public/janus/janus";
import { joinRoom, sendData } from "./dataRoomUtils";


import { dataControl_stream, participantInfo_stream } from "./stream_manager";

export default function DataPlugin(props:dataControl_stream &{ janus: Janus } & participantInfo_stream) {
    
    
    const dataHandlerRef = useRef(null)



    // send new data 
    useEffect(() => {
        if (dataHandlerRef.current){
            sendData(dataHandlerRef.current ,props.dataToSend,props.room)
        }
        
    }, [props.dataToSend])
        

    /**
     * onInit
     */
    useEffect( () =>{
        async function getHandler(){
            let dataHandler = await joinRoom(props.janus,
                props.room,props.userName,props.userName,
                props.setDataReceived)
                
            dataHandlerRef.current = dataHandler
        }
        getHandler()
    },[])
    return <div></div>    
}