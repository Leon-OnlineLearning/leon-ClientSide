import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form";
import { FormControl } from "react-bootstrap";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import axios from "axios"
import config from "../utils/config";
import styles from "../styles/login.module.css";
import { refreshToken, storeUserSession } from "../controller/tokens";
import React, { useState } from "react";
import jwtDecode from "jwt-decode";

// login logic
// in case of google
// send tokenId to /auth/google
// Show loading indicator with portals
//// the following is unified in google and basic ////
// recive {refresh token, jwt}
// store refresh token in indexed db
// redirect to suitable dashboard

export default function LoginPage() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [invalidCredentials, setInvalidCredentials] = useState(false)

    const onGoogleSignInSuccess = (response: GoogleLoginResponse) => {
        axios.post(`${config.serverBaseUrl}/auth/google`, { tokenId: response.tokenId })
            .then(response => response.data)
            .then(data => {
                storeUserSession(data.refreshToken, data.token)
            })
            .catch(err => console.error(err))
    }

    const handleLogin = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        //TODO validate the form fields
        axios.post(`${config.serverBaseUrl}/auth/login`, { email, password })
            .then(response => response.data)
            .then(data => {
                storeUserSession(data.refreshToken, data.token)
            })
            .catch(err => {
                const response = err.response
                if (err.response.status == 401) { setInvalidCredentials(true) }
            })
    }

    return (
        <>
            <div style={{ width: "100vw", height: "100vh", backgroundImage: "linear-gradient(45deg, #0275D8 , #5BC0DE)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Card style={{ width: "500px" }}>
                    <Card.Body>
                        <Card.Title>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <b>Sign in</b>
                            </div>
                        </Card.Title>
                        <Card.Body >
                            <Form style={{ display: "flex", flexDirection: "column" }}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control onChange={(e) => setEmail(e.target.value)} required value={email} type="email" placeholder="example@domain.com"></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={(e) => setPassword(e.target.value)} required value={password} type="password" placeholder="Password"></Form.Control>
                                </Form.Group>
                                <div style={{ display: invalidCredentials ? "block" : "none", color: "red" }}>Invalid email/password</div>
                                <Button variant="link">Forgot your password?</Button>
                                <div className={`${styles["login-group"]}`}>
                                    <Button type="submit" onClick={handleLogin} className={`my-2 ${styles["loginbtn"]}`} variant="outline-primary"><i className="bi bi-file-person-fill"></i> Login</Button>{' '}
                                    <GoogleLogin clientId="627445614367-q6p0r94ibunlplu7mcoqi893fgmggeno.apps.googleusercontent.com"
                                        theme="dark"
                                        onSuccess={onGoogleSignInSuccess}
                                    />
                                </div>
                            </Form>
                        </Card.Body>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}