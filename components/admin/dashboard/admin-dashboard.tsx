import {useRouter} from "next/router";
import {logout} from "../../../controller/user/user";
import DashboardLayout from "../../dashboard-layout/dashboard-layout";
import { SidebarElement } from "../../sidebar/sidebar";

export enum AdminDashboardSelectedPage {
  accounts,
  events,
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
  const router = useRouter()
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
              onClick={async ()=>{await logout(); router.push('/')}}
            ></SidebarElement>
          </>
        }
      >
        {children}
      </DashboardLayout>
    </>
  );
}
