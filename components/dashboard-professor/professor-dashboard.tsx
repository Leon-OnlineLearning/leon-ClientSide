import DashboardLayout from "../dashboard-layout/dashboard-layout";
import { SidebarElement } from "../sidebar/sidebar";

export enum ProfessorDashboardSelectedPage {
    home,
    attendance,
    lectures,
    chat,
    exams,
    grads
}

export type ProfessorDashboardProps = {
    selectedPage: ProfessorDashboardSelectedPage,
    children: React.Component
}

export function ProfessorDashboard({ selectedPage, children }: ProfessorDashboardProps) {
    return (
        <>
            <DashboardLayout SidebarElements={
                <>
                    <SidebarElement href="/professor" iconClassName={"bi-house-fill"
                    } text={"Home"} selected={selectedPage === ProfessorDashboardSelectedPage.home}></SidebarElement>
                    <SidebarElement href="/professor/lectures" iconClassName={"bi-play-fill"
                    } text={"Lectures"} selected={selectedPage === ProfessorDashboardSelectedPage.lectures}></SidebarElement>
                    <SidebarElement href="/professor/attendance" iconClassName={"bi-clipboard-check"
                    } text={"Attendance"} selected={selectedPage === ProfessorDashboardSelectedPage.attendance}></SidebarElement>
                    <SidebarElement href="/professor/chat" iconClassName={"bi-chat-text-fill"
                    } text={"Chat"} selected={selectedPage === ProfessorDashboardSelectedPage.chat}></SidebarElement>
                    <SidebarElement href="/professor/exams" iconClassName={"bi-card-checklist"
                    } text={"Exams"} selected={selectedPage === ProfessorDashboardSelectedPage.exams}></SidebarElement>
                </>
            }>
                {children}
            </DashboardLayout>
        </>
    );
}