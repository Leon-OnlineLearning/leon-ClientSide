import moment from "moment";
import { useState } from "react";
import { Form } from "react-bootstrap";


const date_iso8601 = "yyyy-MM-DDThh:mm"
export default function Start_end_time() {
    const [startTime, setStartTime] = useState(moment().format(date_iso8601))

    return (
        <>
            <Form.Group controlId="validationCustom03">
                <Form.Label>start time</Form.Label>
                <Form.Control name="startTime"
                    required
                    type="datetime-local"
                    min={moment().format(date_iso8601)}
                    value={startTime}
                    onChange={(event) => setStartTime(event.target.value)}
                />
            </Form.Group>


            <Form.Group controlId="validationCustom03">
                <Form.Label>end time</Form.Label>
                <Form.Control name="endTime"
                    required
                    type="datetime-local"
                    min={date_minus_minute(startTime)}
                    defaultValue={startTime}
                />
            </Form.Group>


        </>
    )
}
const timeOffset = () => new Date().getTimezoneOffset() * 60000
const now_iodate = (date=new Date()) => new Date(date.getTime() - timeOffset()).toISOString().slice(0, 16);
const date_minus_minute = (time: string) => moment(time).add(5, 'minutes').format(date_iso8601);
