import {
  AdminDashboard,
  AdminDashboardSelectedPage,
} from "../../components/admin/dashboard/admin-dashboard";

export default function Dashboard() {
    return (
      <AdminDashboard selectedPage={AdminDashboardSelectedPage.courses}>
      </AdminDashboard>
    );
}

