export default function VideoIncidant(props:{
    incident: {
        startTime: number,
        endTime: number
    }
}){
    return  (<>
    <h1>start time : {props.incident.startTime}</h1>
    <h1>end time : {props.incident.endTime}</h1>
    <br></br>
    </>);
}