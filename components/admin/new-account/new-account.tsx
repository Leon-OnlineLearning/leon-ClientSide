import { useState } from "react";
import { Card, Form, Dropdown } from "react-bootstrap";
import styles from "./new-account.module.css";
import changeSynchronizer from "../../../utils/change-synchronizer";
import User from "../../../model/users/User";

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

  const handleOnPrivilageSelected = (e) => {
    setPrevilage(e);
  };

  //TODO validate values on privileges selected

  return (
    <div>
      <Card className={`p-3`}>
        <Card.Title>Create a new account</Card.Title>
        <div className={`${styles["new-account-form"]}`}>
          <Form.Group>
            <Form.Control
              className={`${styles["controller"]}`}
              placeholder="Email Address"
              type="email"
              required
              value={userEmail}
              onChange={(e) => changeSynchronizer(e, setUserEmail)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className={`${styles["controller"]}`}
              placeholder="Password"
              type="password"
              required
              value={password}
              onChange={(e) => changeSynchronizer(e, setPassword)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control className={`${styles["controller"]}`}
              placeholder="Retype password"
              type="password"
              required
              value={retypedPassword}
              onChange={(e) => changeSynchronizer(e, setRetypedPassword)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control className={`${styles["controller"]}`}
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => changeSynchronizer(e, setFirstName)}
            />
          </Form.Group>
          <Form.Group className={`${styles["controller"]}`}>
            <Form.Control
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => changeSynchronizer(e, setLastName)}
            />
          </Form.Group>
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
        </div>
      </Card>
    </div>
  );
}
