import DashboardLayout from "../../components/dashboard-layout/dashboard-layout";
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
                    } text={"Attendance"}></SidebarElement>
                    <SidebarElement href="/professor/chat" iconClassName={"bi-chat-text-fill"
                    } text={"Chat"} selected></SidebarElement>
                    <SidebarElement href="/professor/exams" iconClassName={"bi-card-checklist"
                    } text={"Exams"}></SidebarElement></>
            }></DashboardLayout>
        </>
    )
}