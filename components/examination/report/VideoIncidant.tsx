import config from '../../../utils/config'





export default function VideoIncidant(props:{
    incident: {
        startingFrom: number,
        endingAt: number
    },
    examId: string
    userId: string
}){

    const duration = props.incident.endingAt-props.incident.startingFrom

    const query_params = `startingTime=${props.incident.startingFrom}&duration=${duration}&userId=${props.userId}&examId=${props.examId}`
    const url = `${config.serverBaseUrl}/exams/video?${query_params}`
    console.debug(url)
    return  (<>
    <h1>start time : {props.incident.startingFrom}</h1>
    <h1>end time : {props.incident.endingAt}</h1>
    <br></br>
    <video id="videoPlayer" controls src={url} preload="metadata"/>
    </>);
}