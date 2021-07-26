import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Event, EventType } from "../../../model/event";
import { dateFormatter } from "../../../utils/formatter";

type EventCardProps = {
  event: Event;
};
export default function EventCard({ event: e }: EventCardProps) {
  const router = useRouter();
  console.log("event type",e.eventType, "lecture event?", e.eventType === EventType.LECTURE);
  return (
    <Card key={e.title + e.description} className="m-2">
      <Card.Body>
        <Card.Title>
          <strong className="badge bg-primary text-light">{e.eventType}</strong>{" "}
          {e.title}
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
        {e.eventType === EventType.LECTURE ? isActive(e.startTime, e.endTime) ? (
          <Button
            onClick={() => {
              router.push(`/lecture/${e.id}`);
            }}
          >
            Join lecture
          </Button>
        ): "" : ""}
      </Card.Body>
    </Card>
  );
}

/**
 *
 * @description
 * check that: |startTime ---<= currentTime <---- endTime|
 *
 * @param startTime  
 * @param endTime
 * @returns whether or not the event is currently active
 */
export function isActive(startTime: Date, endTime: Date) {
  const currentTime = new Date();
  return currentTime >= startTime && currentTime < endTime;
}
