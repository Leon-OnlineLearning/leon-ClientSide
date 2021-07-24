import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Modal, Row, Spinner } from 'react-bootstrap';
import useUserMedia from '../../../hooks/useUserMedia';





export default function LivenessCheck(props:{checkLiveness:boolean,img_url:string}) {

    const mediaStream = useUserMedia({ audio: false, video: true });
    const videoRef = useRef(null)



    useEffect(() => {
        if (mediaStream && videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            console.log("src obj is", mediaStream);
        }
    }, [mediaStream,props.checkLiveness])


    

    return (<>
                <Row>
                    <Col>
                    <Row>
                        <Col>
                        <h3> make this gesture with you hand</h3>
                        <img src={props.img_url} 
                        width="300" height="300" />
                        </Col>
                    </Row>
                    </Col>
                    <Col>
                        <video ref={videoRef} 
                        width="100%"
                            autoPlay />
                    </Col>
                </Row>
    </>
    )

}


