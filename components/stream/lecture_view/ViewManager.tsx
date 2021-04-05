import { forwardRef } from 'react'
import { UserRole } from '../../../model/users/User'


interface sessionState_view {
    isJanusConnected: boolean
}

interface callControls_view {
    isReadyToJoin: boolean,
    setStartCall: CallableFunction,
    endCall: boolean,
    setEndCall: CallableFunction,
    muteAudio: boolean,
    setMuteAudio: CallableFunction,
    participants: Array<any>
}

interface dataControl_view {
    setDataToSend: (data: string) => void,
    dataRecived: string,
    role: UserRole
}




function ViewManager(props: callControls_view & dataControl_view & sessionState_view, audioSourceDeviceRef) {
    return (
        <>
            <audio ref={audioSourceDeviceRef} autoPlay />
            {props.isReadyToJoin && <button onClick={() => { props.setStartCall(true) }}>join call</button>}
            <p>i am lecture view</p>


        </>
    )
}


export default forwardRef(ViewManager)