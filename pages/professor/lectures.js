import ProfessorLectures from "../../components/professor/lectures/lectures"
import { ProfessorDashboard, ProfessorDashboardSelectedPage } from "../../components/professor/dashboard/professor-dashboard";

export default function Dashboard() {
    return (
        <>
            <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.lectures}>
                    <ProfessorLectures lectures={
                        [
                            {
                                lectureTitle: "Lect 2",
                                lectureDate: new Date(2019, 2, 4)
                            },
                            {
                                lectureTitle: "Lect 1",
                                lectureDate: new Date(2019, 2, 2)
                            },
                            {
                                lectureTitle: "Lect 2",
                                lectureDate: new Date(2019, 2, 4)
                            },
                            {
                                lectureTitle: "Lect 1",
                                lectureDate: new Date(2019, 2, 2)
                            },
                            {
                                lectureTitle: "Lect 2",
                                lectureDate: new Date(2019, 2, 4)
                            },
                            {
                                lectureTitle: "Lect 1",
                                lectureDate: new Date(2019, 2, 2)
                            },
                        ]
                    }></ProfessorLectures>
            </ProfessorDashboard>
        </>
    )
}