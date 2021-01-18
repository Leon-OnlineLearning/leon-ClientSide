import DashboardLayout from "../../components/dashboard-layout/dashboard-layout";
import { SidebarElement } from "../../components/sidebar/sidebar"

export default function Dashboard() {
    return (
        <>
            <DashboardLayout SidebarElements={
                <><SidebarElement href="/professor/dashboard" iconClassName={"bi-house-fill"
                } text={"Home"}></SidebarElement>
                    <SidebarElement href="/professor/dashboard" iconClassName={"bi-play-fill"
                    } text={"Lectures"}></SidebarElement>
                    <SidebarElement href="/professor/dashboard" iconClassName={"bi-clipboard-check"
                    } text={"Attendance"}></SidebarElement>
                    <SidebarElement href="/professor/dashboard" iconClassName={"bi-chat-text-fill"
                    } text={"Chat"}></SidebarElement>
                    <SidebarElement href="/professor/dashboard" iconClassName={"bi-card-checklist"
                    } text={"Exams"}></SidebarElement></>
            }></DashboardLayout>
        </>
    )
}