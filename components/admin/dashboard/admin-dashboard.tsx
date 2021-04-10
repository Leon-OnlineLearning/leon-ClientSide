import DashboardLayout from "../../dashboard-layout/dashboard-layout";
import { SidebarElement } from "../../sidebar/sidebar";

export enum AdminDashboardSelectedPage {
  accounts,
  lectures,
  events,
  exams,
  departments,
  courses
}

export interface AdminDashboardProps extends React.HTMLAttributes<HTMLElement> {
  selectedPage: AdminDashboardSelectedPage;
}

export function AdminDashboard({
  selectedPage,
  children,
}: AdminDashboardProps) {
  return (
    <>
      <DashboardLayout
        SidebarElements={
          <>
            <SidebarElement
              href="/admin"
              iconClassName={"bi-person-circle"}
              text={"Home"}
              selected={selectedPage === AdminDashboardSelectedPage.accounts}
            ></SidebarElement>
            <SidebarElement
              href="/admin/lectures"
              iconClassName={"bi-play-fill"}
              text={"Lectures"}
              selected={selectedPage === AdminDashboardSelectedPage.lectures}
            ></SidebarElement>
            <SidebarElement
              href="/admin/exams"
              iconClassName={"bi-card-checklist"}
              text={"Exams"}
              selected={selectedPage === AdminDashboardSelectedPage.exams}
            ></SidebarElement>
            <SidebarElement
              href="/admin/departments"
              iconClassName={"bi bi-building"}
              text={"Departments"}
              selected={selectedPage === AdminDashboardSelectedPage.departments}
            ></SidebarElement>
            <SidebarElement
              href="/admin/courses"
              iconClassName={"bi bi-filter-square-fill"}
              text={"Courses"}
              selected={selectedPage === AdminDashboardSelectedPage.courses}
            ></SidebarElement>
            <SidebarElement
              href="/"
              iconClassName={"bi-arrow-left"}
              text={"Log out"}
            ></SidebarElement>
          </>
        }
      >
        {children}
      </DashboardLayout>
    </>
  );
}
