import ProfessorLectures from "../../components/professor/lectures/lectures"
import { ProfessorDashboard, ProfessorDashboardSelectedPage } from "../../components/professor/dashboard/professor-dashboard";
import { getAllLectureByProfessor } from "../../controller/user/professor/professor";
import LocalStorageContext from "../../contexts/localStorageContext";
import { useState ,useEffect, useContext} from "react";
import { Lecture } from "../../model/lecture";

export default function Dashboard() {
    
    const [lectures, setLectures] = useState<Lecture[]>([])
    const localStorageContext = useContext(LocalStorageContext)


    useEffect(() => {
        getAllLectureByProfessor(localStorageContext.userId)
        .then(lecs => {
            console.debug(lecs)
            setLectures(lecs)})
    }, [])
    
    return (
        <>
            <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.lectures}>
                    <ProfessorLectures lectures={lectures}></ProfessorLectures>
            </ProfessorDashboard>
        </>
    )
}