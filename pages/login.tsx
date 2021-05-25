/**
 * ABOUT THE "WITH CREDENTIALS" FLAG 
 *           ------------
 * 
 * JWT should be stored in an HTTPOnly cookie theses cookies are 
 * used in authentication process. If with credential is set to true
 * this indicates that cookies will be used in authentication process.
 * 
 * One more thing about it, if it was false (the default behavior) the jwt cookie
 * will be ignored.
 * 
 * for more details see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
 */

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import axios from "axios"
import config from "../utils/config";
import styles from "../styles/login.module.css";
import { storeUserSession } from "../controller/tokens";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router"
import { useError } from "../hooks/useError"
import LocalStorageContext, { userDataInterface } from "../contexts/localStorageContext";

export const getUserDataLocalStorage = ():userDataInterface => ({
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
    refreshToken: localStorage.getItem('refreshToken'),
    userId: localStorage.getItem('id'),
    embeddingSigned: localStorage.getItem('embedding-signed'),
    role: localStorage.getItem('role')
})


// login logic
// in case of google
// send tokenId to /auth/google
// Show loading indicator with portals
//// the following is unified in google and basic ////
// receive {refresh token, jwt}
// store refresh token in indexed db
// redirect to suitable dashboard
export default function LoginPage() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, errorMsg, setErrorMsg] = useError()
    const router = useRouter()

    const handleRedirection = (userRole: string) => {
        if (userRole.toLowerCase() === "student") {
            router.push('/student')
        } else if (userRole.toLowerCase() === "professor") {
            router.push('/professor')
        } else if (userRole.toLowerCase() === "admin") {
            router.push('/admin')
        }
    }

    const onGoogleSignInSuccess = (response: GoogleLoginResponse) => {
        axios.post(`${config.serverBaseUrl}/auth/google`, { tokenId: response.tokenId }, { withCredentials: true })
            .then(response => response.data)
            .then(data => {
                storeUserSession(data.refreshToken, data.token)
            }).then(_ => { handleRedirection(localStorage.getItem('role')) })
            .catch(err => console.error(err))
    }

    const localStorageContext = useContext(LocalStorageContext)
    const updateContext = (data:userDataInterface)=>{
        localStorageContext.setEmbeddingSigned(data.embeddingSigned)
        localStorageContext.setFirstName(data.firstName)
        localStorageContext.setLastName(data.lastName)
        localStorageContext.setRefreshToken(data.refreshToken)
        localStorageContext.setUserId(data.userId)
        localStorageContext.setRole(data.role)
    }


    const handleLogin = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        //TODO validate the form fields
        axios.post(`${config.serverBaseUrl}/auth/login`, { email, password }, { withCredentials: true })
            .then(response => response.data)
            .then(data => {
                storeUserSession(data.refreshToken, data.token)
                updateContext(getUserDataLocalStorage())
            }).then(_ => { handleRedirection(localStorage.getItem('role')) })
            .catch(err => {
                const response = err.response
                if (!response || response.status == 500) { setErrorMsg("Server error please try again later"); }
                else if (response.status == 401) { setErrorMsg("Invalid email or password") }
                else if (response.status == 429) { setErrorMsg("Login attempts limited has been exceeded") }
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
                                <div style={{ display: error ? "block" : "none", color: "red" }}>{errorMsg}</div>
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
