import React from 'react'
import { UserRole } from '../../../model/users/User'
import { PdfRole } from '../viewer/pdfRole'


interface callControlsView {
    isReadyToJoin: boolean,

    muteLocal: boolean,
    muteRemote: boolean,
    setMuteLocal: CallableFunction,
    setMuteRemote: CallableFunction,

    participants: Array<any>
}

export interface dataControlView {
    setDataToSend: (data: string) => void,
    dataRecived: string,
    role: UserRole,
}




export default function ViewManager(props: callControlsView & dataControlView) {

 
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
            <h1>{props.dataRecived}</h1>
            <PdfRole {...props}/>
        </>
    )
}
