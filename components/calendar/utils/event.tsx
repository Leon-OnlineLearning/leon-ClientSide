import { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { Event } from "../../../model/event";
import { dateFormatter } from "../../../utils/formatter"
import EventCard from "./event-card";

type CalendarEventProps = {
    events?: Array<Event>
}

export function CalendarEvent({ events }: CalendarEventProps) {
    const [showEventDialog, setShowEventDialog] = useState(false)

    const showEvents = () => { setShowEventDialog(true) }
    const hideEvents = () => { setShowEventDialog(false) }

    return (
        <>
            <span onClick={showEvents} style={{ cursor: "pointer" }} className="badge badge-info m-1">
                {events.length}
            </span>
            <Modal scrollable show={showEventDialog} onHide={hideEvents}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {events[0].startDate.getFullYear() + "/" + (events[0].startDate.getMonth() + 1) + "/" + events[0].startDate.getDate()}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Header>
                    {
                        events.map(
                            e => {
                                return (<EventCard event={e}></EventCard>)
                            }
                        )
                    }
                </Modal.Header>
            </Modal>
        </>
    );
}