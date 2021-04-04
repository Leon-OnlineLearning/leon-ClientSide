import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import User from "../../../model/users/User";
import { sendUserData } from "../../../controller/user/user";
import { useEffect, useState } from "react";
import { getAllYears } from "../../../controller/years/yearsController";
import styles from "./new-account.module.css";

type NewStudentProps = {
  userDate: User;
};

function NewStudent({ userDate }: NewStudentProps) {
  const [yearName, setYearName] = useState("Select student's year");
  const [years, setYears] = useState([]);

  useEffect(() => {
    async function fetchYears() {
      const ys = await getAllYears();
      setYears(ys);
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
      <Form
        onSubmit={onSubmitHandler}
        className={`${styles["new-account-from"]}`}
      >
        <Dropdown
          onSelect={onYearsSelectedHandler}
          className={`${styles["controller"]}`}
        >
          <Dropdown.Toggle variant="primary" id="years">
            {yearName}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {years.length ? (
              years.map((y) => <Dropdown.Item key={y} eventKey={y}>{y}</Dropdown.Item>)
            ) : (
              <Dropdown.Item>Loading years...</Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
        <Button type="submit">Create new user</Button>
      </Form>
    </>
  );
}

export default function newStudentComponentGenerator(userDate: User) {
  return <NewStudent userDate={userDate} />;
}
