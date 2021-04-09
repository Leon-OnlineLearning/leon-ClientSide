import styles from "./student-attendance.module.css"
import Dropdown from "react-bootstrap/Dropdown"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Button from "react-bootstrap/Button"
import { useState } from "react";
import { Table } from "react-bootstrap";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from "victory";

export default function ProfessorStudentAttendance() {

    // Hard-coded data
    const data = [
        { lecture: "1", "students": 4 },
        { lecture: "2", "students": 5 },
        { lecture: "3", "students": 6 },
        { lecture: "4", "students": 6 },
        { lecture: "5", "students": 10 },
        { lecture: "6", "students": 10 },
        { lecture: "7", "students": 6 },
        { lecture: "8", "students": 6 },
        { lecture: "9", "students": 6 },
        { lecture: "10", "students": 1 },
        { lecture: "11", "students": 1 },
        { lecture: "12", "students": 1 },
    ]

    const [courseName, setCourseName] = useState("Course Name");
    const [lectureName, setLectureName] = useState("Lecture");

    const onCourseSelected = (eventKey: string) => {
        setCourseName(eventKey);
    }
    const onLectureSelected = (eventKey: string) => {
        setLectureName(eventKey);
    }
    return (
        <>
            <div className="m-3">
                <div className={`${styles["container"]}`}>
                    <section className="m-2">
                        <h2 className="m-2">Students Attendance</h2>
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
                            <Dropdown onSelect={onLectureSelected} className={`${styles["dropdown-area"]}`} >
                                <Dropdown.Toggle variant="primary" id="courses" className={`${styles["dropdown-btn"]}`}>
                                    {lectureName}
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{ width: "100%" }}>
                                    <Dropdown.Item eventKey="Lecture 1" >Lecture 1</Dropdown.Item>
                                    <Dropdown.Item eventKey="Lecture 2" >Lecture 2</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </span>
                        <Table hover bordered className={`${styles["attendance-table"]}`}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Ahmed</td>
                                    <td>
                                        <i className="bi bi-check-circle-fill"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ahmed2</td>
                                    <td><i className="bi bi-check-circle-fill"></i></td>
                                </tr>
                                <tr>
                                    <td>Ahmed3</td>
                                    <td><i className="bi bi-check-circle-fill"></i></td>
                                </tr>
                                <tr>
                                    <td>Ahmed4</td>
                                    <td>{" "}</td>
                                </tr>
                                <tr>
                                    <td>Ahmed5</td>
                                    <td>{" "}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <span style={{ display: "flex", justifyContent: "center" }}>
                            <ButtonGroup aria-label="Pages" className="mx-2">
                                <Button>1</Button> <Button variant="secondary">2</Button> <Button variant="secondary">3</Button> <Button variant="secondary">4</Button>
                            </ButtonGroup>
                            <Button>{">"}</Button>
                        </span>
                    </section>
                    <section className={`${styles["stats-container"]} m-2`}>
                        <VictoryChart animate domainPadding={20}>
                            <VictoryAxis label="lecture" > </VictoryAxis>
                            <VictoryAxis label="No. Students" dependentAxis ></VictoryAxis>
                            <VictoryBar style={{ data: { fill: "#007BFF" } }} data={data} x="lecture" y="students"></VictoryBar>
                        </VictoryChart>
                        <h3>Students Statistics:</h3>
                        <Table hover>
                            <tbody>
                                <tr>
                                    <td>Maximum number of students</td>
                                    <td>12</td>
                                </tr>
                                <tr>
                                    <td>Minimum number of students</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>Mean</td>
                                    <td>6.2</td>
                                </tr>
                                <tr>
                                    <td>Median</td>
                                    <td>5.5</td>
                                </tr>
                                <tr>
                                    <td>Lecture with maximum attendance</td>
                                    <td>lecture 5</td>
                                </tr>
                                <tr>
                                    <td>Lecture with minimum attendance</td>
                                    <td>lecture 10</td>
                                </tr>
                            </tbody>
                        </Table>
                    </section>
                </div>
            </div>
        </>
    );
}
