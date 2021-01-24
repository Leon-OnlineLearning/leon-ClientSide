import ProfessorLectures from "../../components/professor/lectures/lectures"
import { ProfessorDashboard, ProfessorDashboardSelectedPage } from "../../components/professor/dashboard/professor-dashboard";

export default function Dashboard() {
    return (
        <>
            <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.lectures}>
                    <ProfessorLectures lectures={
                        [
                            {
                                id:"Not very random id",
                                lectureTitle: "Lect 2",
                                lectureDate: new Date(2019, 2, 4)
                            },
                            {
                                lectureTitle: "Lect 1",
                                lectureDate: new Date(2019, 2, 2)
                            },
                            {
                                lectureTitle: "Lect 3",
                                lectureDate: new Date(2020, 2, 4)
                            },
                            {
                                lectureTitle: "Lect 2",
                                lectureDate: new Date(2019, 3, 2)
                            },
                            {
                                lectureTitle: "Lect 6",
                                lectureDate: new Date(2119, 2, 4)
                            },
                            {
                                lectureTitle: "Lect 8",
                                lectureDate: new Date(2019, 2, 3)
                            },
                        ]
                    }></ProfessorLectures>
            </ProfessorDashboard>
        </>
    )
}