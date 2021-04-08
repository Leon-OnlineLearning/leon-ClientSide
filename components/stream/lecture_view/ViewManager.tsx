import { forwardRef } from 'react'
import { UserRole } from '../../../model/users/User'



interface callControls_view {
    isReadyToJoin: boolean,

    muteLocal: boolean,
    muteRemote: boolean,
    setMuteLocal: CallableFunction,
    setMuteRemote: CallableFunction,

    participants: Array<any>
}

interface dataControl_view {
    setDataToSend: (data: string) => void,
    dataRecived: string,
    role: UserRole,
}




export default function ViewManager(props: callControls_view & dataControl_view) {

 
    const joining_state = props.isReadyToJoin ? 'joined call' : "loading..."

    return (
        <>
            {joining_state}
            {props.isReadyToJoin &&<>
                <button onClick={()=>props.setMuteLocal(muteLocal => !muteLocal)}>toggleAudio
                </button><p>audio is {props.muteLocal ? "off" : "on"}</p>
                </>
            }
            <p>i am lecture view</p>
        </>
    )
}