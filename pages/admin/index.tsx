import {
  AdminDashboard,
  AdminDashboardSelectedPage,
} from "../../components/admin/dashboard/admin-dashboard";
import ButtonsListLayout from "../../components/buttons-list-layout/buttons-list-layout";
import AccountSettings from "../../components/accounts-settings/account-settings";
import CreateNewAccount from "../../components/admin/new-account/new-account";
import newStudentComponentGenerator from "../../components/admin/new-account/new-student";
import newProfessorComponentGenerator from "../../components/admin/new-account/new-professor";
import newAdminComponentGenerator from "../../components/admin/new-account/new-admin";

export default function Dashboard() {
  return (
    <AdminDashboard selectedPage={AdminDashboardSelectedPage.accounts}>
      <ButtonsListLayout
        pages={{
          "Create new accounts": (
            <CreateNewAccount
              privilagesComponents={{
                student: newStudentComponentGenerator,
                professor: newProfessorComponentGenerator,
                admin: newAdminComponentGenerator,
              }}
            />
          ),
          "Manage privileges": <AccountSettings />,
          "Update account settings": <AccountSettings />,
          "Manage Users": <AccountSettings />,
        }}
      ></ButtonsListLayout>
    </AdminDashboard>
  );
}