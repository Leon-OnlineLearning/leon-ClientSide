import moment from "moment";
import { useState } from "react";
import { Form } from "react-bootstrap";


const date_iso8601 = "yyyy-MM-DDThh:mm"
export default function Start_end_time() {
    const [startTime, setStartTime] = useState(moment().format(date_iso8601))
    const [duration, setDuration] = useState(30) // default duration is 30 minutes

    return (
        <>
            <Form.Group controlId="validationCustom03">
                <Form.Label>availability start time</Form.Label>
                <Form.Control name="startTime"
                    required
                    type="datetime-local"
                    min={moment().format(date_iso8601)}
                    value={startTime}
                    onChange={(event) => setStartTime(event.target.value)}
                />
            </Form.Group>

            <Form.Group >
                <Form.Label>duration in minutes</Form.Label>
                <Form.Control name="duration"
                    required
                    type="number"
                    min={1}
                    value={duration}
                    onChange={(event) => setDuration(parseInt(event.target.value))}
                />
            </Form.Group>

            <Form.Group >
                <Form.Label>availability end time</Form.Label>
                <Form.Control name="endTime"
                    required
                    type="datetime-local"
                    min={date_plus_minutes(startTime,duration)}
                    defaultValue={date_plus_minutes(startTime,duration)}
                />
            </Form.Group>



        </>
    )
}
const timeOffset = () => new Date().getTimezoneOffset() * 60000
const date_plus_minutes = (time: string,minutes=1) => moment(time).add(minutes, 'minutes').format(date_iso8601);
