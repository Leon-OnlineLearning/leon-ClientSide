import DashboardLayout from "../../components/dashboard-layout/dashboard-layout";
import ProfessorStudentAttendance from "../../components/professor-student-attendace/professor-student-attendance";
import { SidebarElement } from "../../components/sidebar/sidebar";

export default function Dashboard() {
    return (
        <>
            <DashboardLayout SidebarElements={
                <><SidebarElement href="/professor" iconClassName={"bi-house-fill"
                } text={"Home"}></SidebarElement>
                    <SidebarElement href="/professor/lectures" iconClassName={"bi-play-fill"
                    } text={"Lectures"}></SidebarElement>
                    <SidebarElement href="/professor/attendance" iconClassName={"bi-clipboard-check"
                    } text={"Attendance"} selected></SidebarElement>
                    <SidebarElement href="/professor/chat" iconClassName={"bi-chat-text-fill"
                    } text={"Chat"}></SidebarElement>
                    <SidebarElement href="/professor/exams" iconClassName={"bi-card-checklist"
                    } text={"Exams"}></SidebarElement></>
            }>
                {<ProfessorStudentAttendance></ProfessorStudentAttendance>}
            </DashboardLayout>
        </>
    )
}