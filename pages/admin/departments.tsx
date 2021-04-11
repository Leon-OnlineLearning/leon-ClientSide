import {
  AdminDashboard,
  AdminDashboardSelectedPage,
} from "../../components/admin/dashboard/admin-dashboard";
import ListLayout from "../../components/list-layout/list-layout";
import {
  editDepartment,
  deleteDeprtment,
  getDepartments,
  addNewDepartment
} from "../../controller/departments";

export default function Dashboard() {
    return (
      <AdminDashboard selectedPage={AdminDashboardSelectedPage.departments}>
        <ListLayout
          title="Departments"
          onFetchItems={getDepartments}
          onEditItem={editDepartment}
          onAddNewItem={addNewDepartment}
          onDeleteItem={deleteDeprtment}
        />
      </AdminDashboard>
    );
}

