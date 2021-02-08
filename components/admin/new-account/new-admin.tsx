import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import User from "../../../model/users/User";
import { sendUserData } from "../../../controller/user/user";
import { useEffect, useState } from "react";
import { getAllCourses } from "../../../controller/courses/courses";
import styles from "./new-account.module.css";

type NewStudentProps = {
  userDate: User;
};

//TODO make admin selection
function NewAdmin({ userDate }: NewStudentProps) {
  const [yearName, setYearName] = useState("Select student's year");
  const [years, setYears] = useState([]);

  useEffect(() => {
    async function fetchYears() {
      //const ys = await 
      //setYears(ys)
    }
    fetchYears();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await sendUserData({ ...userDate, year: yearName });
  };

  const onYearsSelectedHandler = (eventkey: string) => {
		console.log(eventkey)
    setYearName(eventkey);
  };

  return (
    <>
        <Button type="submit">Create new user</Button>
    </>
  );
}

export default function newAdminComponentGenerator(userDate: User) {
  return <NewAdmin userDate={userDate} />;
}
