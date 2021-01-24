import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { EventType } from "../../../model/event"

export default function CreateEventCard() {
    let options = []
    for (let value in EventType) {
        options.push(
            value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        )
    }

    return (
        <Card className="m-2">
            <Card.Body>
                <Form>
                    <Form.Group className="mx-3" controlId="formEventTitle">
                        <Form.Label>Event title</Form.Label>
                        <Form.Control placeholder="Enter event title"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mx-3" controlId="formCourseSelect">
                        <Form.Label>Event type</Form.Label>
                        <Form.Control as="select" >
                            {options.map(
                                opt => { return (<option>{opt}</option>) }
                            )}
                        </Form.Control>
                    </Form.Group>

                    <div className="container">
                        <div className="row">
                            <div className="col-sm">
                                <Form.Group controlId="formStartDate">
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control type="date">
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="col-sm">
                                <Form.Group controlId="formEndDate">
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control type="date">
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm">
                                <Form.Group controlId="formStartTimeDate">
                                    <Form.Label>Start time</Form.Label>
                                    <Form.Control type="time">
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="col-sm">
                                <Form.Group controlId="formEndTimeDate">
                                    <Form.Label>End time</Form.Label>
                                    <Form.Control type="time">
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Button type="submit">
                            <i className="bi bi-save-fill"></i> Create event</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    )
}