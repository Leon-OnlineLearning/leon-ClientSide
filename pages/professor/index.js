import { ProfessorDashboard, ProfessorDashboardSelectedPage } from "../../components/professor/dashboard/professor-dashboard";
import Calendar from "../../components/calendar/calendar"
import { getEvents } from "../../controller/getEvent"
import styles from "../../styles/home.module.css"
import Notifications from "../../components/notifications/notifications"

export default function Dashboard() {
    //TODO for testing only
    const notifications = [
        { title: "someone did sosmething", date: new Date().toDateString() },
        { title: "someone did oather thing", date: new Date(2021, 0, 15).toDateString() },
        { title: "someone did otheddr thing", date: new Date(2021, 0, 4).toDateString() },
        { title: "someone did somsadething", date: new Date().toDateString() },
        { title: "someone did otddher thing", date: new Date(2021, 0, 15).toDateString() },
        { title: "someone did othser thing", date: new Date(2021, 0, 4).toDateString() },
        { title: "someone did somesthing", date: new Date().toDateString() },
        { title: "someone did otherasdasd thing", date: new Date(2021, 0, 15).toDateString() },
        { title: "someone did wother thing", date: new Date(2021, 0, 4).toDateString() },
    ]
    return (
        <>
            <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.home}>
                <div className={`${styles["calendar-layout"]}`}>
                    <Calendar getEvents={getEvents} style={{ width: "70%" }}></Calendar>
                    <div className={`${styles['notifications-pane']}`}>
                        <Notifications notifications={notifications}></Notifications>
                    </div>
                </div>
            </ProfessorDashboard>
        </>
    )
}