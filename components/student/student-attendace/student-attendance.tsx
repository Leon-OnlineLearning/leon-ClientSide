import styles from "./student-attendance.module.css"
import Dropdown from "react-bootstrap/Dropdown"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Button from "react-bootstrap/Button"
import { useState } from "react";
import { Table } from "react-bootstrap";
export default function StudentAttendance() {
    const [courseName, setCourseName] = useState("Course Name");

    const onCourseSelected = (eventKey: string) => {
        setCourseName(eventKey);
    }
    return (
        <>
            <div className="m-3">
                <h2 className="m-2">Your Attendance</h2>
                <span className={`${styles["dropdown-container"]}`}>
                    <Dropdown onSelect={onCourseSelected} className={`${styles["dropdown-area"]}`}>
                        <Dropdown.Toggle variant="primary" id="courses" className={`${styles["dropdown-btn"]}`}>
                            {courseName}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ width: "100%" }}>
                            <Dropdown.Item eventKey="Course 1" >Course 1</Dropdown.Item>
                            <Dropdown.Item eventKey="Course 2" >Course 2</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </span>
                <Table hover bordered className={`${styles["attendance-table"]}`}>
                    <thead>
                        <tr>
                            <th>Lecture Title </th>
                            <th>Attended</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Lecture 1</th>
                            <th><i className="bi bi-check-circle-fill"></i></th>
                        </tr>
                        <tr>
                            <th>Lecture 2</th>
                            <th>{" "}</th>
                        </tr>
                        <tr>
                            <th>Lecture 3</th>
                            <th><i className="bi bi-check-circle-fill"></i></th>
                        </tr>
                        <tr>
                            <th>Lecture 4</th>
                            <th><i className="bi bi-check-circle-fill"></i></th>
                        </tr>
                        <tr>
                            <th>Lecture 5</th>
                            <th>{" "}</th>
                        </tr>
                    </tbody>
                </Table>
                <span style={{ display: "flex", justifyContent: "center" }}>
                    <ButtonGroup aria-label="Pages" className="mx-2">
                        <Button>1</Button> <Button variant="secondary">2</Button> <Button variant="secondary">3</Button> <Button variant="secondary">4</Button>
                    </ButtonGroup>
                    <Button>{">"}</Button>
                </span>
            </div>
        </>
    );
}