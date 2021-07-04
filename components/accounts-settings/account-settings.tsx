import Card from "react-bootstrap/Card"
import styles from "./account-settings.module.css"
import Form from "react-bootstrap/Form"
import { Button } from "react-bootstrap"
import {isCorrectPassword} from "../../controller/passwordChecking"
import {useState} from "react"

export default function AccountSettings() {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [retypeNewPassword, setRetypeNewPassword] = useState("")

    const [isOldPasswordValid, setIsOldPasswordValid] = useState(true)
    const [isRetypedPasswordValid, setIsRetypedPasswordValid] = useState(true)

    const validation = () => {
        if (!isCorrectPassword(oldPassword,"TODO add account id here")){
            setIsOldPasswordValid(false)
            return false
        } else {setIsOldPasswordValid(true)}
        if (newPassword!==retypeNewPassword) {
            setIsRetypedPasswordValid(false)
            return false
        } else {setIsRetypedPasswordValid(true)}
        return true
    }

    const oldPasswordChangeHandler = (e) => {
        setOldPassword(e.target.value)
    }

    const newPasswordChangeHandler = (e) => {
        setNewPassword(e.target.value)
    }

    const retypedNewPasswordChangeHandler = (e) => {
        setRetypeNewPassword(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let validationResult = validation()
    }

    return (
        <div className={`${styles["container"]}`}>
            <Card className="p-3">
                <Card.Title>
                    Change password
                </Card.Title>
                <Card.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId="formOldPassword">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control onChange={oldPasswordChangeHandler} isInvalid={!isOldPasswordValid} type="password" placeholder="Enter your old password" />
                        </Form.Group>
                        <Form.Group controlId="formNewPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control onChange={newPasswordChangeHandler} type="password" placeholder="Enter your new password" />
                        </Form.Group>
                        <Form.Group controlId="formRetypeNewPassword">
                            <Form.Control onChange={retypedNewPasswordChangeHandler} isInvalid={!isRetypedPasswordValid} type="password" placeholder="Retype your password"/>
                        </Form.Group>
                        <Button type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}
