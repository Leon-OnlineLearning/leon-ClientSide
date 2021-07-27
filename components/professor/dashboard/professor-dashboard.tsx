import { logout } from "../../../controller/user/user";
import DashboardLayout from "../../dashboard-layout/dashboard-layout";
import { SidebarElement } from "../../sidebar/sidebar";

export enum ProfessorDashboardSelectedPage {
  home,
  attendance,
  lectures,
  chat,
  exams,
  grads,
  accountSettings,
  models
}

export interface ProfessorDashboardProps
  extends React.HTMLAttributes<HTMLElement> {
  selectedPage: ProfessorDashboardSelectedPage;
}

export function ProfessorDashboard({
  selectedPage,
  children,
}: ProfessorDashboardProps) {
  return (
    <>
      <DashboardLayout
        SidebarElements={
          <>
            <SidebarElement
              href="/professor"
              iconClassName={"bi-house-fill"}
              text={"Home"}
              selected={selectedPage === ProfessorDashboardSelectedPage.home}
            ></SidebarElement>
            <SidebarElement
              href="/professor/lectures"
              iconClassName={"bi-play-fill"}
              text={"Lectures"}
              selected={
                selectedPage === ProfessorDashboardSelectedPage.lectures
              }
            ></SidebarElement>
            <SidebarElement
              href="/professor/attendance"
              iconClassName={"bi-clipboard-check"}
              text={"Attendance"}
              selected={
                selectedPage === ProfessorDashboardSelectedPage.attendance
              }
            ></SidebarElement>
            <SidebarElement
              href="/professor/exams"
              iconClassName={"bi-card-checklist"}
              text={"Exams"}
              selected={selectedPage === ProfessorDashboardSelectedPage.exams}
            ></SidebarElement>
            {/* <SidebarElement
              href="/professor/grades"
              iconClassName={"bi-percent"}
              text={"Grades"}
              selected={selectedPage === ProfessorDashboardSelectedPage.grads}
            ></SidebarElement> */}
            <SidebarElement
              href="/professor/models"
              iconClassName={"bi-gear-wide-connected"}
              text={"Models"}
              selected={
                selectedPage === ProfessorDashboardSelectedPage.models
              }
            ></SidebarElement>
            <SidebarElement
              href="/professor/settings"
              iconClassName={"bi-person-circle"}
              text={"Account"}
              selected={
                selectedPage === ProfessorDashboardSelectedPage.accountSettings
              }
            ></SidebarElement>
            <SidebarElement
              href="/"
              iconClassName={"bi-arrow-left"}
              text={"Log out"}
              onClick={async () => await logout()}
            ></SidebarElement>
          </>
        }
      >
        {children}
      </DashboardLayout>
    </>
  );
}
