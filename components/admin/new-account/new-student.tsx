import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import User from "../../../model/users/User";
import { createNewStudent } from "../../../controller/user/user";
import { useEffect, useState } from "react";
import { getAllYears } from "../../../controller/years/yearsController";
import styles from "./new-account.module.css";
import { useError } from "../../../hooks/useError";
import { FormControl } from "react-bootstrap";

type NewStudentProps = {
  userDate: User;
};

function NewStudent({ userDate }: NewStudentProps) {

  const [year, setYear] = useState(1);
  const [error, errorMsg, setError] = useError();

  const yearChangingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const writtenYear = parseInt(e.target.value)
    if (writtenYear && writtenYear >= 1) {
      setYear(writtenYear)
    } else {
      setError("year must be greater than 1")
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(userDate);
    
    await createNewStudent({ ...userDate, year });
  };

  return (
    <>
      <Form
        onSubmit={onSubmitHandler}
        className={`${styles["new-account-from"]}`}
      >
        <FormControl type="text" name="year" as="input" onChange={yearChangingHandler} />
        <div style={{ display: error ? "block" : "none", color: "red" }}>{errorMsg}</div>
        <Button type="submit">Create new user</Button>
      </Form>
    </>
  );
}

export default function newStudentComponentGenerator(userDate: User) {
  return <NewStudent userDate={userDate} />;
}
