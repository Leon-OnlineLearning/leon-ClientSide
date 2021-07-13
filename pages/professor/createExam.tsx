import React from "react";
import ExamForm from "../../components/examination/create_exam/examform/examForm";
import { ProfessorDashboard, ProfessorDashboardSelectedPage } from "../../components/professor/dashboard/professor-dashboard";





export default function createExamView() {
    return (<>
        <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.exams}>
        <ExamForm />
        </ProfessorDashboard>
    </>)
}
function validateTitle(title: string) {
    if (title.length > 0)
        return true

    return false
}