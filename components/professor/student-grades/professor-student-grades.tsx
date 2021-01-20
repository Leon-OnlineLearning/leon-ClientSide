import styles from "./student-grades.module.css"
import Dropdown from "react-bootstrap/Dropdown"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Button from "react-bootstrap/Button"
import { useState } from "react";
import { Table } from "react-bootstrap";
export default function ProfessorStudentGrades() {
    const [yearName, setYearName] = useState("Years");
    const [courseName, setCourseName] = useState("Course Name");

    const onYearsSelected = (eventKey: string) => {
        setYearName(eventKey);
    }
    const onCourseSelected = (eventKey: string) => {
        setCourseName(eventKey);
    }
    return (
        <>
            <span className={`${styles["dropdown-container"]}`}>
                <Dropdown onSelect={onYearsSelected} className={`${styles["dropdown-area"]}`}>
                    <Dropdown.Toggle variant="primary" id="years" className={`${styles["dropdown-btn"]}`}>
                        {yearName}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={`${styles["dropdown-item"]}`}>
                        <Dropdown.Item eventKey="Year1" >Year1</Dropdown.Item>
                        <Dropdown.Item eventKey="Year2" >Year2</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
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
                        <th>Name</th>
                        <th>Exam 1</th>
                        <th>Exam 2</th>
                        <th>Sum</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Ahmed</th>
                        <th>10</th>
                        <th>10</th>
                        <th>20</th>
                    </tr>
                    <tr>
                        <th>Ahmed2</th>
                        <th>10</th>
                        <th>15</th>
                        <th>25</th>
                    </tr>
                </tbody>
            </Table>
            <span className="p-2" style={{ display: "flex", justifyContent: "center" }}>
                Overall performance: <b>45/50 = 90%</b>
            </span>
            <span style={{ display: "flex", justifyContent: "center" }}>
                <ButtonGroup aria-label="Pages" className="mx-2">
                    <Button>1</Button> <Button variant="secondary">2</Button> <Button variant="secondary">3</Button> <Button variant="secondary">4</Button>
                </ButtonGroup>
                <Button>{">"}</Button>
            </span>
        </>
    );
}