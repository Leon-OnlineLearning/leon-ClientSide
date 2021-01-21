import { Event, EventProp } from "./event"
type SlotProperties = {
    dayInMonthIndex: number,
    active?: boolean,
    events?: Array<EventProp>
}

export default function Slot({ dayInMonthIndex, active, events }: SlotProperties) {
    const color = active ? "#ffff00" : "#eeeeee";
    return (
        <>
            <div style={{ backgroundColor: color }} >
                {dayInMonthIndex}
                {
                    events ?
                        events.map(event => {
                            console.log("event is", event);
                            return <Event key={event.title} title={event.title} description={event.description} date={event.date}></Event>
                        }) : ""}
            </div>
        </>
    );
}