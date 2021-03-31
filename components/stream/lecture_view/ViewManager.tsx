import {UserRole} from '../../../model/users/User'


interface sessionState_view {
    isJanusConnected:boolean
}

interface callControls_view {
    isReadyToJoin:boolean,
    endCall:boolean,
    setEndCall:CallableFunction,
    muteAudio:boolean,
    setMuteAudio:CallableFunction,
}

interface dataControl_view {
    setDataToSend:(data:string) => void,
    dataRecived:string,
    role:UserRole
}


export default function ViewManager(props : callControls_view & dataControl_view & sessionState_view){
    return <p>i am lecture view</p>
}