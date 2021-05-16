import CoursesLayout from "../../components/admin/courses-layout/coures-layout";
import {
  AdminDashboard,
  AdminDashboardSelectedPage,
} from "../../components/admin/dashboard/admin-dashboard";

export default function Dashboard() {
  return (
    <AdminDashboard selectedPage={AdminDashboardSelectedPage.courses}>
      <CoursesLayout />
    </AdminDashboard>
  );
}

