import ProfessorStudentAttendance from "../../components/professor/student-attendace/professor-student-attendance"
import {ProfessorDashboard, ProfessorDashboardSelectedPage} from "../../components/professor/dashboard/professor-dashboard";
import Chat from "../../components/chat/chat"

export default function Dashboard() {
    let msgs = [
        {message: "hi", sender: "me", date: new Date()},
        {message: "Hello", sender: "ahmed", date: new Date(2020,0,22,4,6)},
        {message: "Welcome", sender: "hamada", date: new Date()},
        {message: "Welcome to the course", sender: "Dr hamada", date: new Date()},
        {message: "Welcome Dr hamada", sender: "sstudent", date: new Date()},
        {message: "Welcome Dr hamada", sender: "sstudent", date: new Date()},
        {message: "Welcome Dr hamada", sender: "sstudent", date: new Date()},
        {message: "Welcome Dr hamada", sender: "sstudent", date: new Date()},
        {message: "Welcome Dr hamada", sender: "sstudent", date: new Date()},
        {message: "Welcome Dr hamada", sender: "sstudent", date: new Date()},
        {message: "Welcome Dr hamada", sender: "sstudent", date: new Date()},
    ]
    return (
        <>
            <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.chat}>
                <Chat yearSelection messages={msgs} senderName="me" professorPrefix="Dr"></Chat>
            </ProfessorDashboard>
        </>
    )
}