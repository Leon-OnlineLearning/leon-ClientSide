import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { dateToInputDateStringValue, dateToInputTimeStringValue } from "../../../utils/formatter";
import LectureCard from "../../lecture-card/lecture-card";
import styles from "./lectures.module.css";
import { Lecture } from "../../../model/lecture"

type ProfessorLecturesProps = {
    lectures: [Lecture]
}

export default function ProfessorLectures({ lectures }: ProfessorLecturesProps) {
    const [lectureName, setLectureName] = useState("")
    const [selectedCourse, setSelectedCourse] = useState("Select a course")
    const today = new Date()
    const [lectureDate, setLectureDate] = useState(dateToInputDateStringValue(today))
    const [lectureTime, setLectureTime] = useState(dateToInputTimeStringValue(today))
    const [deleteDialogShown, setDeleteDialogShown] = useState(false)
    const [deletionMessage, setDeletionMessage] = useState("")
    const [lectureIdDelete, setLectureIdDelete] = useState("")

    const editLectureHandler = ({ lectureTitle, lectureDate, course }: Lecture) => {
        console.log(lectureDate);

        setLectureName(lectureTitle)
        setLectureDate(dateToInputDateStringValue(lectureDate))
        setLectureTime(dateToInputTimeStringValue(lectureDate))
        setSelectedCourse(course)
    }

    const deleteLectureHandler = ({ lectureTitle, id }: Lecture) => {
        setDeletionMessage(`Are you sure you want to delete ${lectureTitle}?`)
        setDeleteDialogShown(true)
        setLectureIdDelete(id)
    }

    const deleteLecture = () => {
        console.log("deleting lecture", lectureIdDelete, "...");
    }

    const onLectureNameChange = (e) => {
        const newValue = e.target.value;

        console.log("new lecture name", newValue);
        setLectureName(newValue)
    }

    const onSelectedCourseChange = (e) => {
        const newValue = e.target.value;
        setSelectedCourse(newValue)
    }

    const onCourseTimeChange = (e) => {
        const newValue: string = e.target.value;
        setLectureTime(newValue)
    }

    const onCourseDateChange = (e) => {
        console.log("value is: ", e.target.value);

        setLectureDate(e.target.value)
        // const newValue = new Date(e.target.value);
        // console.log(newValue.getDate());

        // setLectureDate(`${newValue.getFullYear()}-${("0"+(newValue.getMonth()+1)).slice(-2)}-${("0"+newValue.getDate()).slice(-2)}`)
    }

    return (
        <>
            <div className={styles["professor-lecture-layout"]}>
                <div className={styles["professor-current-lectures"]}>
                    {
                        lectures.map(lec => {
                            return <LectureCard key={lec.lectureTitle + lec.lectureDate.toString()} lectureDate={lec.lectureDate} lectureTitle={lec.lectureTitle} onEditHandler={() => editLectureHandler(lec)} onDeleteHandler={() => deleteLectureHandler(lec)} />
                        })
                    }
                    <Modal show={deleteDialogShown} onHide={() => setDeleteDialogShown(false)}>
                        <Modal.Body>
                            {deletionMessage}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={() => deleteLecture()}>Yes</Button>
                            <Button onClick={() => setDeleteDialogShown(false)}>No</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className={`p-3 m-3`}>
                    <h2>Create or edit lecture</h2>
                    <Form>
                        <Form.Group controlId="formLectureTitle">
                            <Form.Label>Lecture title</Form.Label>
                            <Form.Control placeholder="Enter lecture title" onChange={onLectureNameChange} value={lectureName}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formCourseSelect">
                            <Form.Label>Select course</Form.Label>
                            <Form.Control as="select" value={selectedCourse} onChange={onSelectedCourseChange}>
                                <option>Course 1</option>
                                <option>Course 2</option>
                                <option>Course 3</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formCourseDate">
                            <Form.Label>Course date</Form.Label>
                            <Form.Control type="date" value={lectureDate} onChange={onCourseDateChange}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formCourseDate">
                            <Form.Label>Course time</Form.Label>
                            <Form.Control type="time" value={lectureTime} onChange={onCourseTimeChange}>
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