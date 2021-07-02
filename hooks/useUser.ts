import { useContext, useEffect, useState } from "react";
import LocalStorageContext from "../contexts/localStorageContext";
import User, { UserRole } from "../model/users/User";

export default function useUser() {
    const [user, setUser] = useState<User>();
    const localStorageContext = useContext(LocalStorageContext)
    
    useEffect(() => {
        const firstName = localStorageContext.firstName
        const lastName = localStorageContext.lastName
        const role = localStorageContext.role
        const id = localStorageContext.userId
        let user = new User(firstName, lastName, "", id)
        user.role = role as UserRole
        setUser(user)

    }, [])

    return user
    
}