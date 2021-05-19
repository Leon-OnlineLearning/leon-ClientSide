import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import User from "../../../model/users/User";
import { createNewStudent } from "../../../controller/user/user";
import { useEffect, useState } from "react";
import { getAllYears } from "../../../controller/years/yearsController";
import styles from "./new-account.module.css";
import { useError } from "../../../hooks/useError";
import { Dropdown, DropdownButton, FormControl } from "react-bootstrap";
import { getDepartments } from "../../../controller/departments";
import Item from "../../../model/Item";

type NewStudentProps = {
  userDate: User;
};

function NewStudent({ userDate }: NewStudentProps) {

  const [year, setYear] = useState(1);
  const [error, errorMsg, setError] = useError();
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState<Item | undefined>();

  const yearChangingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const writtenYear = parseInt(e.target.value)
    if (writtenYear && writtenYear >= 1) {
      setYear(writtenYear)
    } else {
      setError("year must be greater than 1")
    }
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("here is user data", userDate);
    const [err, user] = await createNewStudent({ ...userDate, year, department: selectedDepartment.id });
    console.log("err", err, "user", user);
    
    if (user) {
      alert("user created successfully!")
    }
    if (err) {
      alert(err.message)
      console.log(err);
    }
  };

  useEffect(() => {
    const _getD = async () => {
      const departments = await getDepartments();
      setDepartments(departments);
    }
    _getD();
  }, []);


  const handleOnDepartmentSelected = (id: string) => {
    console.log("why are you e: ", id)
    setSelectedDepartment(
      departments.filter((dep) => {
        return dep.id === id;
      })[0]
    );
  }

  return (
    <>
      <Form
        onSubmit={onSubmitHandler}
        className={`${styles["new-account-from"]}`}
      >
        <FormControl
          className={`${styles["form-item"]}`}
          placeholder="year"
          type="text"
          name="year"
          as="input"
          onChange={yearChangingHandler}
        />
        <div style={{ display: error ? "block" : "none", color: "red" }}>
          {errorMsg}
        </div>
        <DropdownButton
          title={selectedDepartment ? selectedDepartment.name : "Departments"}
          onSelect={handleOnDepartmentSelected}
        >
          {departments.map(dep => {
            return <Dropdown.Item key={dep.id} eventKey={dep.id}>
              {dep.name}
            </Dropdown.Item>
          })}
        </DropdownButton>
        <Button type="submit">Create new user</Button>
      </Form>
    </>
  );
}

export default function newStudentComponentGenerator(userDate: User) {
  return <NewStudent userDate={userDate} />;
}
