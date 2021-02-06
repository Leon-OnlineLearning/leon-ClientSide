import { AdminDashboard, AdminDashboardSelectedPage  } from "../../components/admin/dashboard/admin-dashboard"
import ButtonsListLayout from "../../components/buttons-list-layout/buttons-list-layout";
import AccountSettings from "../../components/accounts-settings/account-settings"

export default function Dashboard() {
    return (
        <AdminDashboard selectedPage={AdminDashboardSelectedPage.accounts}>
            <ButtonsListLayout pages={
                {
                    "Create new accounts": <AccountSettings />,
                    "Manage privileges": <AccountSettings />,
                    "Update account settings": <AccountSettings />,
                    "Manage Users": <AccountSettings />,
                }
            }></ButtonsListLayout>
        </AdminDashboard>
    )
}
