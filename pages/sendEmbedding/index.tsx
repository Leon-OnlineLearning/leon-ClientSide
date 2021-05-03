import Link from 'next/link'
import dynamic from 'next/dynamic';
import PageHeader from '../../components/examination/authenticate/layout/header';
import { useEffect, useState } from 'react';
import { StudentDashboard, StudentDashboardSelectedPage } from '../../components/student/dashboad/student-dashboard';
// SSR most be closed as loading it at node give has some problems and not required
const CameraView = dynamic(() => import('../../components/examination/authenticate/CameraView'),
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
            localStorage.setItem("embedding-signed", "1")
            setcurrentInstuction(AuthInstructions.authontication_finished)
        }
    }, [isDone])

    const [currentInstuction, setcurrentInstuction] = useState(AuthInstructions.greeting);

    return (
        <>
            <PageHeader centerTitle="Authenticate" />


            <div className="d-flex flex-column align-items-center my-3 w-100">
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
                <Link href="/student">
                    <a>
                        <button className="btn btn-primary mx-auto" hidden={!isDone}>done</button>
                    </a>

                </Link>
            </div>
        </>



    )
}