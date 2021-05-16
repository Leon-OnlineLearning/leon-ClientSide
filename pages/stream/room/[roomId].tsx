import { useRouter } from 'next/router'

import LectureManager from '../../../components/stream/lecture_manager/lecture_manager'
import { useContext, useEffect, useState } from 'react'
import User, { UserRole } from '../../../model/users/User'
import Student from '../../../model/users/Student';
import LocalStorageContext from '../../../contexts/localStorageContext';



/**
 * lecture page
 * @returns react component
 */
export default function room() {
    // TODO make this an id and get room number from backend
    const [user, setUser] = useState<User>();
    const localStorageContext = useContext(LocalStorageContext)


    // TODO make this useUser hook
    useEffect(() => {
        const firstName = localStorageContext.firstName
        const lastName = localStorageContext.lastName
        // TODO add email to localStorage
        const email = "not yet implemented"
        const role = localStorageContext.role
        const id = localStorageContext.userId
        let user = new User(firstName, lastName, email, "", id)
        user.role = role as UserRole
        setUser(user)

    }, [])

    const router = useRouter()
    const { roomId } = router.query

    console.log(user)
    return (<>
        {user &&
            <LectureManager
                userData={user}
                roomId={roomId as string}
            />
        }
    </>
    )

}