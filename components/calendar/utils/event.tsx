import { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { Event } from "../../../model/event";
import { dateFormatter } from "../../../utils/formatter"

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
                <Modal.Body>
                    {
                        events.map(
                            e => {
                                return (<Card key={e.title + e.description} className="m-2">
                                    <Card.Body>
                                        <Card.Title>
                                            <strong className="badge bg-primary text-light">{e.type}</strong> {" "}{e.title}
                                        </Card.Title>
                                        <hr></hr>
                                        <Card.Text>
                                            <i className="bi bi-calendar-event"></i> From: <strong>{dateFormatter(e.startDate)}</strong> To: <strong>{dateFormatter(e.endDate)}</strong>
                                            <hr></hr>
                                            <strong>Description:</strong> <br />
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