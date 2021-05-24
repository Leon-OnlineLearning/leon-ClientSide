import ProfessorStudentAttendance from "../../components/professor/student-attendace/professor-student-attendance"
import {ProfessorDashboard, ProfessorDashboardSelectedPage} from "../../components/professor/dashboard/professor-dashboard";
import React from "react";
import { Button } from "react-bootstrap";
import router from "next/router";

export default function Dashboard() {
    
    // TODO view created exams
    return (
        <>
            <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.exams}>
                <Button onClick={()=>{router.push('/professor/createExam')}}>add exam</Button>
            </ProfessorDashboard>
        </>
    )
}