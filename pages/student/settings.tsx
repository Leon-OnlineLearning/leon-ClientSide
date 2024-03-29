
import { StudentDashboardSelectedPage, StudentDashboard } from "../../components/student/dashboad/student-dashboard";
import { useState } from "react";
import { Notification } from "../../model/notification"
import ButtonsListLayout from "../../components/buttons-list-layout/buttons-list-layout";
import AccountSettings from "../../components/accounts-settings/account-settings";

export default function Dashboard() {
    const [showAddEvent, setShowAddEvent] = useState(false)
    //TODO for testing only
    // const notifications: Array<Notification> = [
    //     { title: "someone did sosmething", date: new Date() },
    //     { title: "someone did oather thing", date: new Date(2021, 0, 15) },
    //     { title: "someone did otheddr thing", date: new Date(2021, 0, 4) },
    //     { title: "someone did somsadething", date: new Date() },
    //     { title: "someone did otddher thing", date: new Date(2021, 0, 15) },
    //     { title: "someone did othser thing", date: new Date(2021, 0, 4) },
    //     { title: "someone did somesthing", date: new Date() },
    //     { title: "someone did otherasdasd thing", date: new Date(2021, 0, 15) },
    //     { title: "someone did wother thing", date: new Date(2021, 0, 4) },
    // ]
    return (
        <>
            <StudentDashboard selectedPage={StudentDashboardSelectedPage.accountSettings}>
                <ButtonsListLayout pages={
                    {
                        "Account Settings": <AccountSettings />,
                    }
                }></ButtonsListLayout>
            </StudentDashboard>
        </>
    )
}