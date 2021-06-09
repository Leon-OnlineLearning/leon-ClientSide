import React, { useEffect, useState } from "react";
import { UserRole } from "../../../model/users/User";
import { dataControlView } from "../lecture_view/ViewManager";
import AdminViewer from "./adminViewer";
import StudentViewer from "./studentViewer";


type messageData = {
    type: "mouse" | "page",
    X?: number, //pointer x postion
    Y?: number, //pointer x postion
    N?: number  // pageNumber

}


export function PdfRole(props: dataControlView) {

    const [pointerPositionX, setPointerPositionX] = useState(100);
    const [pointerPositionY, setPointerPositionY] = useState(100);
    const [pageNumber, setPageNumber] = useState(1);

    // data recived -> set component state based on it
    useEffect(() => {
        if (props.role == UserRole.Student && props.dataRecived) {
            try {                
                const data_json = JSON.parse(props.dataRecived) as messageData
                if (data_json.hasOwnProperty("type")) { //make sure we can parse the message
                    if (data_json.type == "mouse") {
                        setPointerPositionX(data_json.X)
                        setPointerPositionY(data_json.Y)
                    }
                    else if (data_json.type == "page") {
                        setPageNumber(data_json.N)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }, [props.dataRecived])


    // send mouse data
    useEffect(() => {
        if (props.role == UserRole.Professor && pointerPositionX > 0 && pointerPositionY > 0){
            let msg: messageData = { type: "mouse", X: pointerPositionX, Y: pointerPositionY }
            props.setDataToSend(JSON.stringify(msg))
        }
    }, [pointerPositionX, pointerPositionY])

    // send page data
    useEffect(() => {
        if (props.role == UserRole.Professor){
        let msg: messageData = { type: "page", N: pageNumber }
        props.setDataToSend(JSON.stringify(msg))
    }
    }, [pageNumber])



    return <>
        {props.role == UserRole.Student &&
            <StudentViewer
                pointerPositionX={pointerPositionX}
                pointerPositionY={pointerPositionY}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
            />
        }
        {props.role == UserRole.Professor &&
            <AdminViewer
                pointerPositionX={pointerPositionX}
                setPointerPositionX={setPointerPositionX}
                pointerPositionY={pointerPositionY}
                setPointerPositionY={setPointerPositionY}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
            />
        }
    </>
}