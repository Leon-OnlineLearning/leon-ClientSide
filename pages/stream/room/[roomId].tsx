import { useRouter } from 'next/router'

import LectureManager from '../../../components/stream/lecture_manager/lecture_manager'
import { useEffect, useState } from 'react'
import User, { UserRole } from '../../../model/users/User'
import Student from '../../../model/users/Student';



/**
 * lecture page
 * @returns react component
 */
export default function room() {
    // TODO make this an id and get room number from backend
    const [user, setUser] = useState<User>();


    // TODO make this useUser hook
    useEffect(() => {
        const firstName = localStorage.getItem("firstName")
        const lastName = localStorage.getItem("lastName")
        // TODO add email to localStorage
        const email = "not yet implemented"
        const role = localStorage.getItem("role")
        const id = localStorage.getItem("id")
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