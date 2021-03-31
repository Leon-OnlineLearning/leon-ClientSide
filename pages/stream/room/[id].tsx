import { useRouter } from 'next/router'

import Lecture_manager from '../../../components/stream/lecture_manager/lecture_manager'
import { useEffect, useRef, useState } from 'react'



const hard_coded_plugs = [{ type: "main", views: ["side", "header"] }, { type: "secondry", views: ["main"] }]
/**
 * contain 
 * @returns react component
 */
export default function room() {
    // TODO make this an id and get room number from backend
    const router = useRouter()
    const { role } = router.query
    // get the tocken from header
    const accessTocken = ""
    
    // only used for testing
    const studnetUser = {role:"student"}
    const teacherUser = {role:"student"}


    let user = role == "student" ? studnetUser : teacherUser
    
    const [plugin_meta, setPlugin_meta] = useState([])
    useEffect(() => { setPlugin_meta(hard_coded_plugs) }, [])


    return(
        <>
            <Lecture_manager 
            plugins_meta = {plugin_meta}
            userData = {user}
            />
        </>
    )

}