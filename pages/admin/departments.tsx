import {
  AdminDashboard,
  AdminDashboardSelectedPage,
} from "../../components/admin/dashboard/admin-dashboard";
import DepartmentLayout from "../../components/admin/departments-layout/department-layout";
import {
  editDepartment,
  deleteDepartment,
  getDepartments,
  addNewDepartment
} from "../../controller/departments";

export default function Dashboard() {
    return (
      <AdminDashboard selectedPage={AdminDashboardSelectedPage.departments}>
        <DepartmentLayout
          title="Departments"
          onFetchItems={getDepartments}
          onEditItem={editDepartment}
          onAddNewItem={addNewDepartment}
          onDeleteItem={deleteDepartment}
        />
      </AdminDashboard>
    );
}

