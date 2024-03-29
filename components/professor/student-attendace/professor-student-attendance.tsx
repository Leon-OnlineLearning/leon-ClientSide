import styles from "./student-attendance.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryStack,
} from "victory";
import {
  getLecturesStatsByCourse,
  getLecturesToCourse,
} from "../../../controller/courses/courses";
import {
  LectureStatsData,
  getLecturesStatsData,
} from "../../../controller/lectures/lectures";
import { getAllCoursesByProfessor } from "../../../controller/user/professor/professor";

export default function ProfessorStudentAttendance() {
  const [data, setData] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [LectureId, setLectureId] = useState("");
  const [stats, setStats] = useState<LectureStatsData>({
    lectureWithMaxStudents: "",
    lectureWithMinStudents: "",
    maxNumberOfStudents: 0,
    minNumberOfStudents: 0,
    mean: 0,
  });
  // Hard-coded data
  // const data = [
  //     { lecture: "1", "students": 4 },
  //     { lecture: "2", "students": 5 },
  //     { lecture: "3", "students": 6 },
  //     { lecture: "4", "students": 6 },
  //     { lecture: "5", "students": 10 },
  //     { lecture: "6", "students": 10 },
  //     { lecture: "7", "students": 6 },
  //     { lecture: "8", "students": 6 },
  //     { lecture: "9", "students": 6 },
  //     { lecture: "10", "students": 1 },
  //     { lecture: "11", "students": 1 },
  //     { lecture: "12", "students": 1 },
  // ]

  const [courseName, setCourseName] = useState("Course Name");
  const sep = "[SEP]"; // to separate the id and name for event keys
  const [lectureName, setLectureName] = useState("Lecture");
  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);

  const onCourseSelected = (eventKey: string) => {
    const [courseId, courseName] = eventKey.split(sep);
    setCourseId(courseId);
    setCourseName(courseName);
  };
  const onLectureSelected = (eventKey: string) => {
    const [lectureId, lectureName] = eventKey.split(sep);
    setLectureId(lectureId);
    setLectureName(lectureName);
  };

  // TODO: courses effect
  useEffect(() => {
    const _getCourses = async () => {
      const _courses = await getAllCoursesByProfessor(
        window.localStorage.getItem("id")
      );
      setCourses(_courses);
    };
    _getCourses();
  }, []);

  // stats effect
  useEffect(() => {
    const _getLectureState = async () => {
      if (courseId) {
        const _stats = await getLecturesStatsByCourse(courseId);
        setStats(getLecturesStatsData(_stats));
        const res = [];
        Object.keys(_stats).forEach((key) => {
          res.push({ lecture: key, students: _stats[key] });
        });
        setData(res);
      }
    };
    _getLectureState();
  }, [courseId]);

  // lectures effect
  useEffect(() => {
    const _getLecturesForCourse = async () => {
      if (courseId) {
        const _lectures = await getLecturesToCourse(courseId);
        setLectures(_lectures);
      }
    };
    _getLecturesForCourse();
  }, [courseId]);

  return (
    <>
      <div className="m-3">
        <div className={`${styles["container"]}`}>
          <section className="m-2">
            <h2 className="m-2">Students Attendance</h2>
            <span className={`${styles["dropdown-container"]}`}>
              <Dropdown
                onSelect={onCourseSelected}
                className={`${styles["dropdown-area"]}`}
              >
                <Dropdown.Toggle
                  variant="primary"
                  id="courses"
                  className={`${styles["dropdown-btn"]}`}
                >
                  {courseName}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: "100%" }}>
                  {courses.map((course) => {
                    return (
                      <Dropdown.Item
                        eventKey={`${course.id}${sep}${course.name}`}
                      >
                        {course.name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown
                onSelect={onLectureSelected}
                className={`${styles["dropdown-area"]}`}
              >
                <Dropdown.Toggle
                  variant="primary"
                  id="courses"
                  className={`${styles["dropdown-btn"]}`}
                >
                  {lectureName}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: "100%" }}>
                  {lectures.map((lec) => {
                    return (
                      <Dropdown.Item eventKey={`${lec.id}${sep}${lec.title}`}>
                        {lec.title}
                      </Dropdown.Item>
                    );
                  })}
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
                  <td>
                    <i className="bi bi-check-circle-fill"></i>
                  </td>
                </tr>
                <tr>
                  <td>Ahmed3</td>
                  <td>
                    <i className="bi bi-check-circle-fill"></i>
                  </td>
                </tr>
                <tr>
                  <td>Ahmed4</td>
                  <td> </td>
                </tr>
                <tr>
                  <td>Ahmed5</td>
                  <td> </td>
                </tr>
              </tbody>
            </Table>
            <span style={{ display: "flex", justifyContent: "center" }}>
              <ButtonGroup aria-label="Pages" className="mx-2">
                <Button>1</Button> <Button variant="secondary">2</Button>{" "}
                <Button variant="secondary">3</Button>{" "}
                <Button variant="secondary">4</Button>
              </ButtonGroup>
              <Button>{">"}</Button>
            </span>
          </section>
          <section className={`${styles["stats-container"]} m-2`}>
            <VictoryChart animate domainPadding={20}>
              <VictoryAxis label="lecture"> </VictoryAxis>
              <VictoryAxis label="No. Students" dependentAxis></VictoryAxis>
              <VictoryBar
                style={{ data: { fill: "#007BFF" } }}
                data={data}
                x="lecture"
                y="students"
              ></VictoryBar>
            </VictoryChart>
            <h3>Students Statistics:</h3>
            <Table hover>
              <tbody>
                <tr>
                  <td>Maximum number of students</td>
                  <td>{stats.maxNumberOfStudents}</td>
                </tr>
                <tr>
                  <td>Minimum number of students</td>
                  <td>{stats.minNumberOfStudents}</td>
                </tr>
                <tr>
                  <td>Mean</td>
                  <td>{stats.mean}</td>
                </tr>
                <tr>
                  <td>Lecture with maximum attendance</td>
                  <td>{stats.lectureWithMaxStudents}</td>
                </tr>
                <tr>
                  <td>Lecture with minimum attendance</td>
                  <td>{stats.lectureWithMinStudents}</td>
                </tr>
              </tbody>
            </Table>
          </section>
        </div>
      </div>
    </>
  );
}
