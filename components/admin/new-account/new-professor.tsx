import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import User from "../../../model/users/User";
//import { sendUserData } from "../../../controller/user/user";
import { useEffect, useState } from "react";
import { getAllCourses } from "../../../controller/courses/courses";
import styles from "./new-account.module.css";
import { createNewProfessor } from "../../../controller/user/user";

type NewStudentProps = {
  userDate: User;
};

function NewProfessor({ userDate }: NewStudentProps) {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    async function fetchYears() {
      const cs = await getAllCourses();
      setAllCourses(cs);
    }
    fetchYears();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("clicked");
    const newProfessor = { ...userDate, courses: selectedCourses }
    console.log("the new professor is", newProfessor);
    const [err, p] = await createNewProfessor(newProfessor)
    if (!err) {
      alert("yay!")
      console.log(p);
    }
    else {
      console.log(err);
      alert(`error 😥`)
    }
  };

  const onSelectCourseChange = (e) => {
    let options = e.target.options;
    let res = [];
    for (let i = 0; i < options.length; i++) {
      const opt = options[i];
      if (opt.selected) {
        res.push(opt.value);
      }
    }
    setSelectedCourses(res)
  };

  //const onYearsSelectedHandler = (eventkey: string) => {
  //console.log(eventkey)
  //setYearName(eventkey);
  //};

  return (
    <>
      <Form
        onSubmit={onSubmitHandler}
        className={`${styles["new-account-from"]}`}
      >
        <Form.Group
          controlId="newProfessorForm.SelectedCourses"
          onChange={onSelectCourseChange}
        >
          <Form.Label>Select Courses</Form.Label>
          <Form.Control as="select" multiple>
            {allCourses
              ? allCourses.map((course) => {
                console.log("course is", course);
                return <option key={course.id} value={course.id}>{course.name}</option>
              })
              : "loading courses..."}
          </Form.Control>
        </Form.Group>
        <Button type="submit">Create new user</Button>
      </Form>
    </>
  );
}

export default function newProfessorComponentGenerator(userDate: User) {
  return <NewProfessor userDate={userDate} />;
}
