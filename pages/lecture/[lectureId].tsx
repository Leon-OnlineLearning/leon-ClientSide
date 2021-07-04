import { useState, useEffect } from "react";
import LectureManager from "../../components/stream/lecture_manager/lecture_manager";
import { getRoomByLectureId } from "../../controller/lectures/lectures";
import { useRouterQuery } from "../../hooks/useRouteQuery";
import useUser from "../../hooks/useUser";
import { LiveRoom } from "../../model/LiveRoom";

/**
 * lecture page
 * @returns react component
 */
export default function room() {
    // TODO make this an id and get room number from backend
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


    return (<>
        {user && room &&
            <LectureManager
                userData={user}
                roomId={room.roomId}
            />
        }
    </>
    )

}