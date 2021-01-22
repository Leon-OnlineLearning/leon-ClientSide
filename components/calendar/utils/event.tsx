import { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import {Event} from "../../../model/event";

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
                        {events[0].date.getFullYear() + "/" + (events[0].date.getMonth() + 1) + "/" + events[0].date.getDate()}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        events.map(
                            e => {
                                return (<Card key={e.title + e.description} className="m-2">
                                    <Card.Body>
                                        <Card.Title>
                                            {e.title}
                                        </Card.Title>
                                        <Card.Text>
                                            {e.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>)
                            }
                        )
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}