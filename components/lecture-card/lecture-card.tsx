import { Button, Card } from "react-bootstrap";
import { Lecture } from "../../model/lecture";
import styles from "./lectures.module.css";

type LectureCardProps = {
    lectureTitle: string,
    lectureDate: Date,
    onEditHandler: () => void,
    onDeleteHandler: () => void,
    onStartHandler: () => void
}

export default function LectureCard({ lectureTitle, lectureDate, onEditHandler, onDeleteHandler,onStartHandler }: LectureCardProps) {
    return (
        <Card className="p-3 m-3">
            <Card.Title>
                <div style={{ fontWeight: 700 }}>{lectureTitle}</div>
            </Card.Title>
            <Card.Text>
                {lectureDate.toString()} <br></br>
            </Card.Text>
            <div className={styles["buttons-container"]}>
                <Button onClick={onStartHandler} variant="success" className="m-2" style={{ width: "100%" }}><i className="bi bi-play-fill"></i> Start</Button>
                <Button onClick={onEditHandler} className="m-2" style={{ width: "100%" }}><i className="bi bi-pencil-fill"></i> Edit</Button>
                <Button onClick={onDeleteHandler} variant="danger" className="m-2" style={{ width: "100%" }}><i className="bi bi-trash-fill"></i> Delete</Button>
            </div>
        </Card>
    )
}