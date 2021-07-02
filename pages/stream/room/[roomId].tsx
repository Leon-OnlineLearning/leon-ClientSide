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
    const user = useUser();

    const [lectureId,queryChecked] = useRouterQuery("lectureId")
    
    const [room, setRoom] = useState<LiveRoom>()
    useEffect(() => {
        if (lectureId){
            getRoomByLectureId(lectureId as string)
                .then(room => setRoom(room))
        }
    }
    , [queryChecked])


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