import Slot from "./utils/slot";
import styles from "./calender.module.css";
import { EventProp } from "./utils/event";

type CalenderProps = {
    year: number,
    month: number,
    events?: Array<EventProp>
}


export default function Calender({ year, month, events }: CalenderProps) {
    return (
        <div className={`${styles["calender-layout"]}`}>
            {_Calendar({ year: year, month: month, events: events })}
        </div>
    )
}

function indexDateMapper(week: number, day: number, firstDayIndex: number, firstDay: Date) {
    let res = new Date()
    res.setDate(firstDay.getDate() + (day + 7 * week) - firstDayIndex)
    return res
}

/**
 * 
 * @param param0 
 */
function _Calendar({ year, month, events }: CalenderProps): Array<React.Component> {
    // assuming events are mapped to a month makes sense from having year and month
    let firstDay = new Date(year, month - 1, 1);
    let numberOfDays = new Date(year, month - 1, 0).getDate();
    let dayNames = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]
    let firstDayIndex = 0
    for (let index = 0; index < dayNames.length; index++) {
        const element = dayNames[index];
        if (element === firstDay.toString().split(' ')[0]) {
            firstDayIndex = index
            break;
        }
    }
    let lastDayIndex = firstDayIndex + numberOfDays - 1;
    let res = []
    let counter = 0
    for (let i = 0; i < 5; i++) {
        res[i] = []
        for (let j = 0; j < 7; j++) {

            if (counter >= firstDayIndex && counter <= lastDayIndex) {
                let eves = new Array<EventProp>()
                let counterDate =  indexDateMapper(i, j, firstDayIndex, firstDay)
                for (let e of events) {
                    if (e.date.getFullYear() === counterDate.getFullYear() && e.date.getMonth() === counterDate.getMonth() && e.date.getDate() === counterDate.getDate()) {
                        console.log("found!");
                        eves.push(e)
                    }
                }
                res[i][j] = <Slot dayInMonthIndex={counter - firstDayIndex + 1} active events={eves} ></Slot>
            } else {
                res[i][j] = <Slot dayInMonthIndex={counter - firstDayIndex + 1} ></Slot>
            }
            counter++;
        }
        // res[i].push(<br/>)
    }
    return res
}