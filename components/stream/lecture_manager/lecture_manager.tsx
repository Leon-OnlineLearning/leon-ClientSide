import React, { useRef, useState } from 'react'
import ViewManager from '../lecture_view/ViewManager';
import StreamManager from '../stream/stream_manager';
import User, { UserRole } from '../../../model/users/User'





export default function LectureManager(props:{ userData:User, roomId :number, endRoom:()=>void}) {


    /* ------------------------------ callControls ------------------------------ */

    /**
     * isReadyToJoin -> setup is complete and ready to join a the call 
     * WARN must check this variable before doing any unmute
     * the behavior will be unexpected otherwise
    */
    const [isReadyToJoin, setIsReadyToJoin] = useState(false);
    const [muteLocal, setMuteLocal] = useState(true);
    const [muteRemote, setMuteRemote] = useState(true);
    const [participants, setParticipants] = useState([]);

    
    // control sent and received data
    const [dataToSend, setDataToSend] = useState("initial message");
    const [dataReceived, setDataReceived] = useState("");


    const callStates = {
        muteLocal : muteLocal,
        muteRemote : muteRemote,
    }
    const controlCall = {
        setMuteLocal : setMuteLocal,
        setMuteRemote : setMuteRemote
    }

    const dataIO_remote = {
        dataToSend : dataToSend,
        setDataReceived : setDataReceived
    }

    const dataIO_local = {
        setDataToSend : setDataToSend,
        dataReceived : dataReceived
    }
    return (
        <>
            <StreamManager
                setIsReadyToJoin={setIsReadyToJoin}
                {...callStates}
                {...dataIO_remote}
                setParticipants={setParticipants}

                userName={props.userData.fullName}
                room={props.roomId}
            />

            <ViewManager
                isReadyToJoin={isReadyToJoin}
                {...callStates}
                {...controlCall}
                {...dataIO_local}
                participants={participants}
                role={props.userData.role}
                endRoom={props.endRoom}
            />

        </>
    )
}
