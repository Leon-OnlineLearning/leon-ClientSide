
import DashboardLayout from "../../dashboard-layout/dashboard-layout";
import { SidebarElement } from "../../sidebar/sidebar";

export enum StudentDashboardSelectedPage {
    home,
    attendance,
    chat,
    grads,
    accountSettings
}

export interface StudentDashboardProps extends React.HTMLAttributes<HTMLElement> {
    selectedPage: StudentDashboardSelectedPage,

}

export function StudentDashboard({ selectedPage, children }: StudentDashboardProps) {
    return (
        <>
            <DashboardLayout SidebarElements={
                <>
                    <SidebarElement href="/student" iconClassName={"bi-house-fill"
                    } text={"Home"} selected={selectedPage === StudentDashboardSelectedPage.home}></SidebarElement>
                    <SidebarElement href="/student/attendance" iconClassName={"bi-clipboard-check"
                    } text={"Attendance"} selected={selectedPage === StudentDashboardSelectedPage.attendance}></SidebarElement>
                    <SidebarElement href="/student/chat" iconClassName={"bi-chat-text-fill"
                    } text={"Chat"} selected={selectedPage === StudentDashboardSelectedPage.chat}></SidebarElement>
                    <SidebarElement href="/student/grades" iconClassName={"bi-percent"
                    } text={"Grades"} selected={selectedPage === StudentDashboardSelectedPage.grads}></SidebarElement>
                    <SidebarElement
                        href="/student/settings"
                        iconClassName={"bi-person-circle"}
                        text={"Account"}
                        selected={
                            selectedPage === StudentDashboardSelectedPage.accountSettings
                        }
                    ></SidebarElement>
                    <SidebarElement
                        href="/"
                        iconClassName={"bi-arrow-left"}
                        text={"Log out"}
                    ></SidebarElement>
                </>
            }>
                {children}
            </DashboardLayout>
        </>
    );
}