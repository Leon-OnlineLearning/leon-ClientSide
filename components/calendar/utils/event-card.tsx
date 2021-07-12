import Card from "react-bootstrap/Card"
import { Event } from "../../../model/event"
import { dateFormatter } from "../../../utils/formatter"

type EventCardProps = {
    event: Event
}
export default function EventCard({ event: e }: EventCardProps) {
    return (
        <Card key={e.title + e.description} className="m-2">
            <Card.Body>
                <Card.Title>
                    <strong className="badge bg-primary text-light">{e.type}</strong> {" "}{e.title}
                </Card.Title>
                <hr></hr>
                <Card.Text>
                    <i className="bi bi-calendar-event"></i> 
                    From: <strong>{dateFormatter(e.startTime)}</strong> 
                    To: <strong>{dateFormatter(e.endTime)}</strong>
                </Card.Text>
                    <hr></hr>
                    <strong>Description:</strong> <br />
                    {e.description}
            </Card.Body>
        </Card>
    )
}