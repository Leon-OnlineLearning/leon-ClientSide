import { CalendarEvent, EventProp } from "./event"
import styles from "./utils.module.css"
type SlotProperties = {
    dayInMonthIndex: number,
    numberOfDaysInMonth: number,
    active?: boolean,
    events?: Array<EventProp>
}

export default function Slot({ dayInMonthIndex, numberOfDaysInMonth, active, events }: SlotProperties) {
    const color = active ? "active" : "inactive"
    
    return (
        <>
            <div className={`${styles[`slot-${color}`]} p-3`} >
                {dayInMonthIndex > 0 && dayInMonthIndex <= numberOfDaysInMonth ? dayInMonthIndex : <span style={{opacity:0}}>"*"</span>}
                {
                    events ? events.length ?
                        <CalendarEvent events={events} /> : "" : ""}
            </div>
        </>
    );
}