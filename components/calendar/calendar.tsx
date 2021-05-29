import Slot from "./utils/slot";
import styles from "./calender.module.css";
import { Event } from "../../model/event";
import DayName from "./utils/dayname";
import { CSSProperties, useEffect, useState } from "react";

type CalenderDaysProps = {
    year: number,
    month: number,
    events?: Array<Event>
}

type CalenderProps = {
    getEvents: (year: number, month: number) => Promise<Event[]>,
    style?: CSSProperties
}


export default function Calendar({ getEvents, style }: CalenderProps): JSX.Element {
    const today = new Date()
    const [year, setYear] = useState(today.getFullYear())
    const [month, setMonth] = useState(today.getMonth() + 1)
    const [events, setEvents] = useState([])

    useEffect(() => {
        const _getEvents = async () => {
            setEvents(await getEvents(year, month))
        }
        _getEvents()
    }, []);

    const changeYear = (amount: number) => setYear(year + amount)
    const upYear = () => { changeYear(1) }
    const downYear = () => { changeYear(-1) }

    const changeMonth = async (amount: number) => {
        let newMonth = month + amount
        let y = year
        let m = month
        if (newMonth < 1) {
            y-- // to avoid concurrency issues i won't use the value from year and month to get events later
            m = 12
        } else if (newMonth > 12) {
            y++ // to avoid concurrency issues i won't use the value from year and month to get events later
            m = 1
        } else {
            m = newMonth
        }
        setEvents(await getEvents(y, m))
        setYear(y)
        setMonth(m)
    }
    const upMonth = () => { changeMonth(1) }
    const downMonth = () => { changeMonth(-1) }

    return (
        <>
            <div style={style}>
                <div className={`${styles["calendar-header"]} bg-primary p-3 m-3 text-light`}>
                    <i className="bi bi-caret-left-fill" onClick={downYear}></i> {year} <i className="bi bi-caret-right-fill" onClick={upYear}></i>
                    <i className="bi bi-caret-left-fill" onClick={downMonth}></i> {month} <i className="bi bi-caret-right-fill" onClick={upMonth}></i>
                </div>
                <CalendarDays year={year} month={month} events={events}></CalendarDays>
            </div>
        </>
    )
}

function CalendarDays({ year, month, events }: CalenderDaysProps) {
    // a wrapper around calender days to add it in grid layout
    return (
        <div className={`${styles["calender-layout"]} m-3`}>
            {_CalendarDays({ year: year, month: month, events: events })}
        </div>
    )
}
/**
 * 
 * @param week NOTE: make sure to pass the week correctly
 * @param day 
 * @param firstDayIndex 
 * @param firstDay 
 */
function indexDateMapper(week: number, day: number, firstDayIndex: number, firstDay: Date) {

    let res = new Date(firstDay)
    res.setDate(firstDay.getDate() + (day + 7 * week) - firstDayIndex)
    return res
}

/**
 * 
 * @param param0 
 */
function _CalendarDays({ year, month, events }: CalenderDaysProps): Array<JSX.Element> {
    let firstDay = new Date(year, month - 1, 1);
    let numberOfDays = new Date(year, month, 0).getDate();
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
    res[0] = dayNames.map(name => <DayName key={name} dayName={name}></DayName>)
    let counter = 0
    for (let i = 1; i <= 6; i++) {
        res[i] = []
        for (let j = 0; j < 7; j++) {

            if (counter >= firstDayIndex && counter <= lastDayIndex) {
                let eves = new Array<Event>()
                let counterDate = indexDateMapper(i - 1, j, firstDayIndex, firstDay)
                for (let e of events) {
                    // FIXME the time in backend is saved as startTime not startDate 
                    if (e.startDate?.getFullYear() === counterDate.getFullYear() && e.startDate?.getMonth() === counterDate.getMonth() && e.startDate?.getDate() === counterDate.getDate()) {
                        eves.push(e)
                    }
                }
                res[i][j] = <Slot key={`${i}${j} ${firstDay.toDateString()}`} dayInMonthIndex={counter - firstDayIndex + 1} active events={eves} numberOfDaysInMonth={numberOfDays}></Slot>
            } else {
                res[i][j] = <Slot key={`${i}${j} ${firstDay.toDateString()}`} dayInMonthIndex={counter - firstDayIndex + 1} numberOfDaysInMonth={numberOfDays}></Slot>
            }
            counter++;
        }
        // res[i].push(<br/>)
    }
    return res
}