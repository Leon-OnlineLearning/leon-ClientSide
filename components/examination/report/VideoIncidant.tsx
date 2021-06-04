export default function VideoIncidant(props:{
    incident: {
        startingFrom: number,
        endingAt: number
    }
}){
    return  (<>
    <h1>start time : {props.incident.startingFrom}</h1>
    <h1>end time : {props.incident.endingAt}</h1>
    <br></br>
    </>);
}