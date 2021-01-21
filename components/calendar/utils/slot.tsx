import { CalendarEvent, EventProp } from "./event"
import styles from "./utils.module.css"
type SlotProperties = {
    dayInMonthIndex: number,
    active?: boolean,
    events?: Array<EventProp>
}

export default function Slot({ dayInMonthIndex, active, events }: SlotProperties) {
    const color = active ? "active" : "inactive"
    return (
        <>
            <div className={`${styles[`slot-${color}`]} p-3`} >
                {dayInMonthIndex > 0 ? dayInMonthIndex : ""}
                {
                    events ? events.length ?
                        <CalendarEvent events={events} /> : "" : ""}
            </div>
        </>
    );
}