import React from 'react'
import { Button } from 'react-bootstrap'
import { UserRole } from '../../../model/users/User'
import { PdfRole } from './pdfViewer/pdfRole'


interface callControlsView {
    isReadyToJoin: boolean,

    muteLocal: boolean,
    muteRemote: boolean,
    setMuteLocal: React.Dispatch<React.SetStateAction<boolean>>,
    setMuteRemote: React.Dispatch<React.SetStateAction<boolean>>,
    endRoom: ()=>void,

    participants: Array<any>
}

export interface dataControlView {
    setDataToSend: (data: string) => void,
    dataReceived: string,
    role: UserRole,
}




export default function ViewManager(props: callControlsView & dataControlView) {

 
    const joining_state = props.isReadyToJoin ? 'joined call' : "loading..."

    return (
        <>
            {joining_state}
            {props.isReadyToJoin &&<>
                <Button onClick={()=>props.setMuteLocal(muteLocal => !muteLocal)}>
                    toggleAudio
                </Button>
                <hr />
                <p>audio is {props.muteLocal ? "off" : "on"}</p>
                
                <Button variant="danger" onClick={()=>props.endRoom()}>hangup</Button>
                </>
            }
            {/* <p>i am lecture view</p> */}
            {/* <h1>{props.dataReceived}</h1> */}
            <PdfRole {...props}/>
        </>
    )
}
