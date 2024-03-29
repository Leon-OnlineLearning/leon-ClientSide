import { ProfessorDashboard, ProfessorDashboardSelectedPage } from "../../components/professor/dashboard/professor-dashboard";
import Calendar from "../../components/calendar/calendar"
import { getEvents } from "../../controller/getEvent"
import styles from "../../styles/home.module.css"
import Notifications from "../../components/notifications/notifications"
import Fab from "../../components/fab/fab"
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CreateEventCard from "../../components/calendar/utils/create-event-card"
import {Notification} from "../../model/notification"

export default function Dashboard() {
    const [showAddEvent, setShowAddEvent] = useState(false)
    //TODO for testing only
    // const notifications : Array<NotificVjjation> = [
    //     { title: "someone did sosmething", date: new Date()},
    //     { title: "someone did oather thing", date: new Date(2021, 0, 15)},
    //     { title: "someone did otheddr thing", date: new Date(2021, 0, 4)},
    //     { title: "someone did somsadething", date: new Date()},
    //     { title: "someone did otddher thing", date: new Date(2021, 0, 15)},
    //     { title: "someone did othser thing", date: new Date(2021, 0, 4)},
    //     { title: "someone did somesthing", date: new Date()},
    //     { title: "someone did otherasdasd thing", date: new Date(2021, 0, 15)},
    //     { title: "someone did wother thing", date: new Date(2021, 0, 4)},
    // ]
    return (
        <>
            <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.home}>
                <div className={`${styles["calendar-layout"]}`}>
                    <Calendar getEvents={getEvents} style={{ width: "100%" }}></Calendar>
                    {/* <div className={`${styles['notifications-pane']}`}>
                        <Notifications notifications={notifications}></Notifications>
                    </div> */}
                </div>
                <Fab onClick={() => setShowAddEvent(true)}><span style={{fontSize:"24px", fontWeight:700}}>+</span></Fab>
                <Modal show={showAddEvent} onHide={() => setShowAddEvent(false)}>
                    <Modal.Title className="m-3">Create new event</Modal.Title>
                    <CreateEventCard></CreateEventCard>
                </Modal>
            </ProfessorDashboard>
        </>
    )
}