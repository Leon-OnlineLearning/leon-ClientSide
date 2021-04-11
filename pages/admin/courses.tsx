import {
  AdminDashboard,
  AdminDashboardSelectedPage,
} from "../../components/admin/dashboard/admin-dashboard";
import ListLayout from "../../components/list-layout/list-layout";
import {getAllCourses, editCourse, addNewCourse, deleteCourse} from "../../controller/courses/courses";

export default function Dashboard() {
    return (
      <AdminDashboard selectedPage={AdminDashboardSelectedPage.courses}>
        <ListLayout
          title="Courses"
          onFetchItems={getAllCourses}
          onEditItem={editCourse}
          onAddNewItem={addNewCourse}
          onDeleteItem={deleteCourse}
        />
      </AdminDashboard>
    );
}

