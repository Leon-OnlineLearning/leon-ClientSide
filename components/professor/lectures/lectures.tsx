import { useState } from "react";
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
    const [lectureName, setLectureName] = useState()
    const [selectedCourse, setSelectedCourse] = useState()
    const today = new Date()
    const [courseDate, setCourseDate] = useState(`${today.getFullYear()}-${("0"+(today.getMonth()+1)).slice(-2)}-${("0"+today.getDate()).slice(-2)}`)
    console.log('date is:',courseDate);
    
    const [courseTime, setCourseTime] = useState(``)

    const onLectureNameChange = (e) => {
        const newValue = e.target.value;
        
        console.log("new lecture name",newValue);
        setLectureName(newValue)
    }

    const onSelectedCourseChange = (e) => {
        const newValue = e.target.value;
        console.log("new selected course",newValue);
        setSelectedCourse(newValue)
    }

    const onCourseTimeChange = (e) => {
        const newValue = e.target.value;
        console.log("new selected course",newValue);
        // setSelectedCourse(newValue)
    }

    const onCourseDateChange = (e) => {
        console.log("value is: ",e.target.value);
        
        const newValue = new Date(e.target.value);
        console.log(newValue.getDate());
         
        setCourseDate(`${newValue.getFullYear()}-${("0"+(newValue.getMonth()+1)).slice(-2)}-${("0"+newValue.getDate()).slice(-2)}`)
    }

    return (
        <>
            <div className={styles["professor-lecture-layout"]}>
                <div className={styles["professor-current-lectures"]}>
                    {
                        lectures.map(lec => {
                            return <LectureCard key={lec.lectureTitle + lec.lectureDate.toString()} lectureDate={lec.lectureDate} lectureTitle={lec.lectureTitle} />
                        })
                    }
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
                            <Form.Control type="date" value={courseDate} onChange={onCourseDateChange}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formCourseDate">
                            <Form.Label>Course time</Form.Label>
                            <Form.Control type="time" value={courseTime} onChange={onCourseTimeChange}>
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