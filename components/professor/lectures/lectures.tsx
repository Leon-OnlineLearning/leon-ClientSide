import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { dateToInputDateStringValue, dateToInputTimeStringValue } from "../../../utils/formatter";
import LectureCard from "../../lecture-card/lecture-card";
import styles from "./lectures.module.css";
import { Lecture } from "../../../model/lecture"
import ProgressBar from "react-bootstrap/ProgressBar"
import { createNewLecture, editLecture } from "../../../controller/upload-lectures"

type ProfessorLecturesProps = {
    lectures: Lecture[]
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
    const [progress, setProgress] = useState(0)
    const [lectureID, setLectureId] = useState("")
    const [successMessage, setSuccessMessage] = useState(false)
    let edit = false;
    // validation
    const [isLectureNameValid, setIsLectureNameValid] = useState(true)
    const [selectedFile, setSelectedFile] = useState();

    const validate = () => {
        let result = true
        const lecNameValidState = lectureName.length !== 0
        result = result && lecNameValidState && selectedFile !== undefined
        console.log("eveything is valid", result);

        setIsLectureNameValid(
            lecNameValidState
        )
        return result;
    }

    const editLectureHandler = ({ lectureTitle, lectureDate, course, id }: Lecture) => {

        setLectureName(lectureTitle)
        setLectureDate(dateToInputDateStringValue(lectureDate))
        setLectureTime(dateToInputTimeStringValue(lectureDate))
        setSelectedCourse(course)
        setLectureId(id)
        edit = true
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
    }

    const onFileUploadChange = (e) => {
<<<<<<< HEAD
        setSelectedFile(e.target.files[0])
    }

    const progressUpdate = (event) => {
        setProgress(Math.round((100 * event.loaded) / event.total));
    }


    const submitLecturesForm = () => {
        const formDate = new FormData()
        formDate.append('lectureName', lectureName)
        formDate.append('lectureDate', lectureDate)
        formDate.append('lectureTime', lectureTime)
        formDate.append('lectureCourse', selectedCourse)
        formDate.append('lectureFile', selectedFile)

        if (validate()) {
            if (edit) {
                // edit lecture
                editLecture(formDate, lectureID, progressUpdate)
                    .then(() => setSuccessMessage(true))
                    .catch((err) => console.error(err))
            } else {
                // create new lecture
                createNewLecture(formDate, progressUpdate)
                    .then(() => setSuccessMessage(true))
                    .catch((err) => console.error(err))
            }
        }
=======
        
>>>>>>> dev-student
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
                        <Modal.Header>
                            {deletionMessage}
                        </Modal.Header>
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
                            <Form.Control placeholder="Enter lecture title" onChange={onLectureNameChange} value={lectureName} isInvalid={!isLectureNameValid}></Form.Control>
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
                        <input type="file" onChange={onFileUploadChange} accept=".pdf" aria-label="upload file" />
                        {
                            <div style={{ marginTop: "8px", opacity: (progress !== 0 && progress !== 100) ? 100 : 0 }}>
                                <ProgressBar now={progress} className={`${styles['progress-bar']}`}></ProgressBar>
                            </div>
                        } <br />
                        <Button onClick={submitLecturesForm}>
                            <i className="bi bi-save-fill"></i> Save changes</Button>
                        <Modal show={successMessage} onHide={() => setSuccessMessage(false)}>
                            <Modal.Body>
                                Upload completed
                            </Modal.Body>
                        </Modal>
                    </Form>
                </div>
            </div>
        </>
    );
}