import { Button, Form } from "react-bootstrap";
import LectureCard from "../../lecture-card/lecture-card";
import styles from "./lectures.module.css";
type LectureInfo = {
    lectureTitle: string,
    lectureDate: Date
}

type ProfessorLecturesProps = {
    lectures: [LectureInfo]
}

export default function ProfessorLectures({ lectures }: ProfessorLecturesProps) {
    return (
        <>
            <div className={styles["professor-lecture-layout"]}>
                <div className={styles["professor-current-lectures"]}>
                    {
                        lectures.map(lec => {
                            return <LectureCard key={lec.lectureTitle} lectureDate={lec.lectureDate} lectureTitle={lec.lectureTitle} />
                        })
                    }
                </div>
                <div className={`p-3 m-3`}>
                    <h2>Create or edit lecture</h2>
                    <Form>
                        <Form.Group controlId="formLectureTitle">
                            <Form.Label>Lecture title</Form.Label>
                            <Form.Control placeholder="Enter lecture title"></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formCourseSelect">
                            <Form.Label>Select course</Form.Label>
                            <Form.Control as="select">
                                <option>Course 1</option>
                                <option>Course 2</option>
                                <option>Course 3</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formCourseDate">
                            <Form.Label>Course date</Form.Label>
                            <Form.Control type="date">
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formCourseDate">
                            <Form.Label>Course time</Form.Label>
                            <Form.Control type="time">
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit">
                            <i className="bi bi-save-fill"></i> Save changes</Button>
                    </Form>
                </div>
            </div>
        </>
    );
}