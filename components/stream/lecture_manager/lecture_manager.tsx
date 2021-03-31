import React, { useRef, useState } from 'react'
import ViewManager from '../lecture_view/ViewManager';
import StreamManager from '../stream/stream_manager';
import User , {UserRole} from '../../../model/users/User'

export default function Lecture_manager({ plugins_meta, userData}) {


    // session states
    const [isJanusConnected, setIsJanusConnected] = useState(false);

    // callControls
    const [isReadyToJoin, setIsReadyToJoin] = useState(false);
    const [endCall, setEndCall] = useState(false);
    const [muteAudio, setMuteAudio] = useState(true);


    const audioSourceDeviceRef = useRef(null)

    // dataControls
    const [dataToSend, setDataToSend] = useState("initial message");
    const [dataRecived, setDataRecived] = useState("");


    const shared_props = {
        // session
        isJanusConnected:isJanusConnected,
    
        // call
        endCall:endCall,
        setEndCall:setEndCall,
        muteAudio:muteAudio,
        setMuteAudio:setMuteAudio,
    
    }

    return (
        <>
            <StreamManager
                {...shared_props}
                setIsJanusConnected={setIsJanusConnected}

                setIsReadyToJoin={setIsReadyToJoin}
                audioSourceDevice={audioSourceDeviceRef.current}

                dataToSend={dataToSend}
                setDataRecived={setDataRecived}
            />

            <ViewManager
                {...shared_props}
                isReadyToJoin={isReadyToJoin}

                setDataToSend={setDataToSend}
                dataRecived={dataRecived}
                role={userData.role}
            />

        </>
    )
}
