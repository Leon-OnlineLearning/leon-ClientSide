import React, { useRef, useState } from 'react'
import ViewManager from '../lecture_view/ViewManager';
import StreamManager from '../stream/stream_manager';
import User, { UserRole } from '../../../model/users/User'





export default function Lecture_manager({ plugins_meta, userData, roomId }) {


    /* ------------------------------ callControls ------------------------------ */

    /**
     * isReadyToJoin -> setup is complate and ready to join a the call 
     * WARN must check this variable before doing any unmute
     * the behavior will be unexpected otherwise
    */
    const [isReadyToJoin, setIsReadyToJoin] = useState(false);
    const [muteLocal, setMuteLocal] = useState(true);
    const [muteRemote, setMuteRemote] = useState(true);
    const [participants, setParticipants] = useState([]);

    
    // control sent and recived data
    const [dataToSend, setDataToSend] = useState("initial message");
    const [dataRecived, setDataRecived] = useState("");


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
        setDataRecived : setDataRecived
    }

    const dataIO_local = {
        setDataToSend : setDataToSend,
        dataRecived : dataRecived
    }
    return (
        <>
            <StreamManager
                setIsReadyToJoin={setIsReadyToJoin}
                {...callStates}
                {...dataIO_remote}
                setParticipants={setParticipants}

                userName={userData.name}
                room={roomId}
            />

            <ViewManager
                isReadyToJoin={isReadyToJoin}
                {...callStates}
                {...controlCall}
                {...dataIO_local}
                participants={participants}
                role={userData.role}
            />

        </>
    )
}
