import { Button, Card } from "react-bootstrap";
import styles from "./lectures.module.css";

type LectureCardProps = {
    lectureTitle: string,
    lectureDate: Date
}

export default function LectureCard({ lectureTitle, lectureDate }: LectureCardProps) {
    return (
        <Card className="p-3 m-3">
            <Card.Title>
                <div style={{ fontWeight: 700 }}>{lectureTitle}</div>
            </Card.Title>
            <Card.Text>
                {lectureDate.toString()} <br></br>
                <div className={styles["buttons-container"]}>
                    <Button className="m-2" style={{ width: "100%" }}><i className="bi bi-pencil-fill"></i> Edit</Button>
                    <Button variant="danger" className="m-2" style={{ width: "100%" }}><i className="bi bi-trash-fill"></i> Delete</Button>
                </div>
            </Card.Text>
        </Card>
    )
}