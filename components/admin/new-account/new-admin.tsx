import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import User from "../../../model/users/User";
import { createNewAdmin, createNewStudent } from "../../../controller/user/user";
import { useEffect, useState } from "react";
import { getAllCourses } from "../../../controller/courses/courses";
import styles from "./new-account.module.css";

type NewStudentProps = {
  userDate: User;
};

//TODO make admin selection
function NewAdmin({ userDate }: NewStudentProps) {

  useEffect(() => {
    async function fetchYears() {
      //const ys = await 
      //setYears(ys)
    }
    fetchYears();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const [err, user] = await createNewAdmin({ ...userDate });
    if (user) {
      alert("user created successfully");
    }
    if (err) {
      alert(err.message)
      console.log(err);
    }
  };

  return (
    <>
      <Form onSubmit={onSubmitHandler}>
        <Button type="submit">Create new user</Button>
      </Form>
    </>
  );
}

export default function newAdminComponentGenerator(userDate: User) {
  return <NewAdmin userDate={userDate} />;
}
