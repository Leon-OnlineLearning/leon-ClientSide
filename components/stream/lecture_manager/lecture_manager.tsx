import React, { useRef, useState } from 'react'
import ViewManager from '../lecture_view/ViewManager';
import StreamManager from '../stream/stream_manager';
import User, { UserRole } from '../../../model/users/User'





export default function Lecture_manager({ plugins_meta, userData, roomId }) {


    // session states
    const [isJanusConnected, setIsJanusConnected] = useState(false);

    /* ------------------------------ callControls ------------------------------ */

    /**
     * setup is complate and ready to join a the call 
    */
    const [isReadyToJoin, setIsReadyToJoin] = useState(false);
    const [startCall, setStartCall] = useState(false)
    const [endCall, setEndCall] = useState(false);
    const [muteAudio, setMuteAudio] = useState(true);
    const [participants, setParticipants] = useState([]);
    const audioSourceDeviceRef = useRef(null)



    // dataControls
    const [dataToSend, setDataToSend] = useState("initial message");
    const [dataRecived, setDataRecived] = useState("");


    const shared_props = {
        // session
        isJanusConnected: isJanusConnected,

        // call
        endCall: endCall,
        setEndCall: setEndCall,
        muteAudio: muteAudio,
        setMuteAudio: setMuteAudio,

    }

    return (
        <>
            <StreamManager
                {...shared_props}
                setIsJanusConnected={setIsJanusConnected}

                setIsReadyToJoin={setIsReadyToJoin}
                startCall={startCall}
                setParticipants={setParticipants}

                dataToSend={dataToSend}
                setDataRecived={setDataRecived}
                userName={userData.name}
                room={roomId}
            />

            <ViewManager
                {...shared_props}
                isReadyToJoin={isReadyToJoin}
                participants={participants}
                setStartCall={setStartCall}

                setDataToSend={setDataToSend}
                dataRecived={dataRecived}
                role={userData.role}
            />

        </>
    )
}
