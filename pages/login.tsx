import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form";
import { FormControl } from "react-bootstrap";

export default function LoginPage() {
    return (
        <>
            <div style={{ width: "100vw", height: "100vh", backgroundImage: "linear-gradient(45deg, #0275D8 , #5BC0DE)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Card style={{ width: "500px" }}>
                    <Card.Body>
                        <Card.Title>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <b>Sign In</b>
                            </div>
                        </Card.Title>
                        <Card.Body >
                            <Form style={{ display: "flex", flexDirection: "column" }}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="example@domain.com"></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password"></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Remember me" />
                                </Form.Group>
                                <Button variant="link">Forgot your password?</Button>
                                <Button className="my-2" variant="outline-primary"><i className="bi bi-file-person-fill"></i> Login</Button>{' '}
                                <Button className="my-2" variant="outline-success"><i className="bi bi-google"></i> Sign in with google</Button>{' '}
                            </Form>
                        </Card.Body>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}