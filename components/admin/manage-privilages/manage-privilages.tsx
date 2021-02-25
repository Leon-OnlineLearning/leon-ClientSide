import { Card } from "react-bootstrap";
import User from "../../../model/users/User";

function AccountCard(props: User) {
   return (
       <>
        <Card>
            <Card.Title>{`${props.firstName} ${props.lastName}`}</Card.Title>
            <Card.Body>
                <strong>Email</strong> {props.email}
                <strong>Role</strong> {props.}
            </Card.Body>
        </Card>
       </>
   ) 
}

export default function ManagePrivileges() {
    return (
        <>
            {/* search for account */} 
            {/* get list of results */} 
        </>
    )
}