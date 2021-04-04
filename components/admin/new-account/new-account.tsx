import { useState } from "react";
import { Card, Form, Dropdown } from "react-bootstrap";
import styles from "./new-account.module.css";
import changeSynchronizer from "../../../utils/change-synchronizer";
import User from "../../../model/users/User";
import isValidEmail from "../../../utils/validEmail";
import isValidName from "../../../utils/validName";
import isStrongPassword from "../../../utils/strongPassword";
import {log} from "util";

/**
 * Create new account components
 * privilagesComponents {Object} keys are the privileges names and values are the corresponding components
 */
export default function NewAccount({ privilagesComponents }) {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const privileges = Object.keys(privilagesComponents);
  const [privilage, setPrevilage] = useState(privileges[0]);
	const [userEmailIsInvalid, setUserEmailIsInvalid] = useState(false)
	const [passwordIsInvalid, setPasswordIsInvalid] = useState(false)
	const [retypedPasswordIsInvalid, setRetypedPasswordIsInvalid] = useState(false)
	const [firstNameIsInValid, setFirstNameIsInvalid] = useState(false)
	const [lastNameIsInvalid, setLastNameIsInvalid] = useState(false)


  //TODO validate values on privileges selected
	//
	const validate = () => {
		const userEmailIsInvalid = !isValidEmail(userEmail)
		setUserEmailIsInvalid(userEmailIsInvalid)
		const firstNameIsInValid = !isValidName(firstName)
		setFirstNameIsInvalid(firstNameIsInValid)
		const lastNameIsInvalid = !isValidName(lastName)
		setLastNameIsInvalid(lastNameIsInvalid)
		const passwordIsInvalid = !isStrongPassword(password)
		setPasswordIsInvalid(passwordIsInvalid)
		const retypedPasswordIsInvalid = !(retypedPassword === password)
		setRetypedPasswordIsInvalid(retypedPasswordIsInvalid)
		return !(userEmailIsInvalid || firstNameIsInValid || lastNameIsInvalid || passwordIsInvalid || retypedPasswordIsInvalid);
	}

  const handleOnPrivilageSelected = (e) => {
		const valid = validate()
		console.log(valid ,e)
		if (validate())
			setPrevilage(e);
  };


  return (
    <div>
      <Card className={`p-3`}>
        <Card.Title>Create a new account</Card.Title>
        <Form className={`${styles["new-account-form"]}`}>
          <Form.Group>
            <Form.Control
              className={`${styles["controller"]}`}
              placeholder="Email Address"
              type="email"
              value={userEmail}
              onChange={(e) => changeSynchronizer(e, setUserEmail)}
							isInvalid={userEmailIsInvalid}
            />
						<Form.Control.Feedback>Please insert your email address</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              className={`${styles["controller"]}`}
              placeholder="Password"
              type="password"
              required
              value={password}
              onChange={(e) => changeSynchronizer(e, setPassword)}
							isInvalid={passwordIsInvalid}
            />
						<Form.Control.Feedback>Please insert your email address</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              className={`${styles["controller"]}`}
              placeholder="Retype password"
              type="password"
              required
              value={retypedPassword}
              onChange={(e) => changeSynchronizer(e, setRetypedPassword)}
							isInvalid={retypedPasswordIsInvalid}
            />
						<Form.Control.Feedback>Please insert your email address</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              className={`${styles["controller"]}`}
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => changeSynchronizer(e, setFirstName)}
							isInvalid={firstNameIsInValid}
            />
						<Form.Control.Feedback>Please insert your email address</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className={`${styles["controller"]}`}>
            <Form.Control
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => changeSynchronizer(e, setLastName)}
							isInvalid={lastNameIsInvalid}
            />
						<Form.Control.Feedback>Please insert your email address</Form.Control.Feedback>
          </Form.Group>
        </Form>
        <Dropdown
          onSelect={handleOnPrivilageSelected}
          className={`${styles["controller"]}`}
        >
          <Dropdown.Toggle
            variant="primary"
            id="years"
            className={`${styles["dropdown-btn"]}`}
          >
            {privilage}
          </Dropdown.Toggle>
          <Dropdown.Menu className={`${styles["dropdown-item"]}`}>
            {privileges.map((priv) => (
              <Dropdown.Item key={priv} eventKey={`${priv.toLowerCase()}`}>
                {priv}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {privilagesComponents[privilage](
          new User(firstName, lastName, userEmail)
        )}
      </Card>
    </div>
  );
}
