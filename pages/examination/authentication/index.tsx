import Link from 'next/link'
import dynamic from 'next/dynamic';
import PageHeader from '../../../components/examination/authenticate/layout/header';
import { useEffect, useState } from 'react';
// SSR most be closed as loading it at node give has some problems and not required
const CameraView = dynamic(() => import('../../../components/examination/authenticate/CameraView'),
    {
        ssr: false,
        loading: () => <p>loading ...</p>
    });

export enum AuthInstructions {
    greeting = "welcome please wait",
    model_loading = "model is loading",
    put_face = "please put your face in circle",
    bad_lighting = "make sure location is well lit",
    start_recording = "recording start",
    authontication_finished = "authontication finished press done below"
}


export default function Authenticate() {
    // inidcate if vedio has been recorded and ready to leave page
    const [isDone, setIsDone] = useState(false);
    useEffect(() => {
        if (isDone) {
            setcurrentInstuction(AuthInstructions.authontication_finished)
        }
    }, [isDone])

    const [currentInstuction, setcurrentInstuction] = useState(AuthInstructions.greeting);

    return (
        <>
            <PageHeader centerTitle="Authenticate" />


            <div className="d-flex flex-column justify-content-center my-3" style={{ width: "100%", alignItems: "center", }} >
                <h2>{currentInstuction} </h2>
                <CameraView
                    accaptableWidth={230}
                    accaptableHieght={230}
                    accaptableScore={0.95}
                    setIsDone={setIsDone}
                    setcurrentInstuction={setcurrentInstuction}
                />
            </div>
            <div className="d-flex justify-content-center" style={{ width: "100%" }}>
                <Link href="/examination/form_viewer/6cc2aa24-a155-4590-a4b5-e06c26eb78be">
                    <a>
                        <button className="btn btn-primary mx-auto" hidden={!isDone}>done</button>
                    </a>

                </Link>
            </div>
        </>



    )
}